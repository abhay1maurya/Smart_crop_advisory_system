import pandas as pd
import numpy as np
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

# 1. Define Input Schema
# Matches the 10 features used in training
class FertilizerInput(BaseModel):
    Temperature: float
    Humidity: float      # Maps to 'Moisture' or 'Rainfall' context? 
                         # NOTE: Your training used 'Moisture' and 'Rainfall'.
                         # Usually Humidity is distinct. Let's stick to the EXACT columns from training.
    Moisture: float      # Soil Moisture
    Rainfall: float      
    PH: float
    Soil_Type: str       # Input as string (e.g. "Loamy")
    Crop_Type: str       # Input as string (e.g. "Rice")
    Nitrogen: float
    Potassium: float
    Phosphorous: float
    Carbon: float        # Don't forget Carbon! It was in your feature list.

# 2. Load Artifacts
print("⏳ Loading Fertilizer Model Artifacts...")
try:
    # This file contains: {'model', 'encoders', 'scaler', 'feature_order'}
    artifacts = joblib.load('fertilizer_model_final.pkl')
    model = artifacts['model']
    encoders = artifacts['encoders']
    scaler = artifacts['scaler']
    feature_order = artifacts['feature_order']
    print("✅ Model & Artifacts Loaded Successfully.")
    print(f"   Expecting Columns: {feature_order}")
except FileNotFoundError:
    print("❌ CRITICAL ERROR: 'fertilizer_model_final.pkl' not found.")
    exit()

app = FastAPI(title="Smart Fertilizer Advisory API")

# 3. Enable CORS (Critical for your HTML frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# LOGIC LAYER: Advice Generator
# ---------------------------------------------------------
def get_advice(fertilizer_name):
    """
    Returns a user-friendly explanation for the recommendation.
    """
    name = fertilizer_name.strip().title()
    
    advice_map = {
        "Urea": "Your soil needs high Nitrogen for leaf growth.",
        "Dap": "Recommended for high Phosphorus requirement and root development.",
        "Muriate Of Potash": "Essential for Potassium deficiency and disease resistance.",
        "Balanced Npk Fertilizer": "A balanced mix (19-19-19) for general crop health.",
        "Water Retaining Fertilizer": "Chosen to help your soil hold moisture in dry conditions.",
        "Compost": "Organic matter recommended to improve soil structure and Carbon.",
        "Organic Fertilizer": "Eco-friendly option to boost long-term soil fertility.",
        "Gypsum": "Recommended to fix Calcium/Sulfur deficiency or improve soil structure.",
        "Lime": "Suggested to balance acidic soil (low pH).",
        "General Purpose Fertilizer": "Standard nutrient mix suitable for current conditions."
    }
    
    return advice_map.get(name, "Standard recommendation based on soil analysis.")

# ---------------------------------------------------------
# API ENDPOINT
# ---------------------------------------------------------
@app.post("/predict_fertilizer")
def predict_fertilizer(data: FertilizerInput):
    # 1. Preprocess Strings (Title Case to match training)
    # The frontend might send "loamy", we need "Loamy" (or "Loamy Soil" depending on training)
    # We strip 'Soil' if it's there to be safe, then add it back if needed, 
    # OR just trust the Title Case if your encoder expects "Loamy".
    
    # Check your encoder classes printout from training! 
    # Usually it was 'Loamy' or 'Loamy Soil'. I will assume 'Loamy' based on common datasets,
    # BUT I added a fuzzy matcher below to be safe.
    soil_in = data.Soil_Type.strip().title()
    crop_in = data.Crop_Type.strip().title()
    
    # 2. Smart Validation & Encoding
    # -----------------------------------------------------
    soil_encoder = encoders['Soil'] # Changed key from 'Soil_Type' to 'Soil' based on your training code
    crop_encoder = encoders['Crop'] # Changed key from 'Crop_Type' to 'Crop'
    
    # Helper to find close match
    if soil_in not in soil_encoder.classes_:
        return {"error": f"Unknown Soil: '{soil_in}'. Valid: {list(soil_encoder.classes_)}"}
        
    if crop_in not in crop_encoder.classes_:
        return {"error": f"Unknown Crop: '{crop_in}'. Valid: {list(crop_encoder.classes_)}"}

    try:
        soil_code = soil_encoder.transform([soil_in])[0]
        crop_code = crop_encoder.transform([crop_in])[0]
        
        # 3. Create DataFrame (Strict Feature Order)
        # -----------------------------------------------------
        # Map input Pydantic fields to the EXACT DataFrame columns used in training
        # Training Columns: ['Temperature', 'Moisture', 'Rainfall', 'PH', 'Soil', 'Crop', 
        #                    'Nitrogen', 'Potassium', 'Phosphorous', 'Carbon']
        
        input_data = pd.DataFrame([{
            'Temperature': data.Temperature,
            'Moisture': data.Moisture,
            'Rainfall': data.Rainfall,
            'PH': data.PH,
            'Soil': soil_code,
            'Crop': crop_code,
            'Nitrogen': data.Nitrogen,
            'Potassium': data.Potassium,
            'Phosphorous': data.Phosphorous,
            'Carbon': data.Carbon
        }])
        
        # Reorder just in case
        input_data = input_data[feature_order]
        
        # 4. Scale
        # -----------------------------------------------------
        scaled_input = scaler.transform(input_data)
        
        # 5. Predict
        # -----------------------------------------------------
        pred_idx = model.predict(scaled_input)[0]
        prediction_name = encoders['Target'].inverse_transform([pred_idx])[0]
        
        # 6. Confidence
        probs = model.predict_proba(scaled_input)
        confidence = float(probs[0][pred_idx] * 100)
        
        # 7. Get Advice
        reason = get_advice(prediction_name)
        
        return {
            "recommendation": prediction_name,
            "reason": reason,
            "confidence": round(confidence, 2)
        }

    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

if __name__ == '__main__':
    # Running on 8001 to keep separate from Crop Service
    uvicorn.run(app, host='127.0.0.1', port=8001)