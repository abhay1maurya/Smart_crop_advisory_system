import pandas as pd
import numpy as np
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import warnings

# Suppress sklearn version warnings if you haven't retrained yet
warnings.filterwarnings("ignore", category=UserWarning)

# 1. Define Input Schema
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# 2. Load Artifacts (Global Load)
print("⏳ Loading Model Artifacts...")
try:
    # Joblib automatically handles the compressed file you created
    model = joblib.load('crop_model_final.pkl')
    scaler = joblib.load('scaler_final.pkl')
    encoder = joblib.load('label_encoder_final.pkl')
    cols = joblib.load('feature_order.pkl')
    print("✅ Model & Artifacts Loaded Successfully.")
except FileNotFoundError as e:
    print(f"❌ CRITICAL ERROR: Missing file. {e}")
    print("Ensure 'crop_model_final.pkl', 'scaler_final.pkl', 'label_encoder_final.pkl', and 'feature_order.pkl' are in this folder.")
    exit()

# 3. Initialize App
app = FastAPI(title="Smart Crop Advisory API")

# 4. Enable CORS (Critical for Frontend Connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (HTML file, Java, React, etc.)
    allow_credentials=True,
    allow_methods=["*"],  # Allows POST, GET, OPTIONS
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Crop Recommendation API is Running. Use /predict to get a recommendation."}

@app.post("/predict")
def predict_crop(data: CropInput):
    # A. Convert Input JSON to DataFrame
    input_df = pd.DataFrame([[
        data.N, data.P, data.K, data.temperature, 
        data.humidity, data.ph, data.rainfall
    ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])
    
    # B. Feature Engineering (The "Brain" of the operation)
    # Must match the Training Logic EXACTLY
    input_df['total_nutrients'] = input_df['N'] + input_df['P'] + input_df['K'] + 1e-5
    input_df['N_ratio'] = input_df['N'] / input_df['total_nutrients']
    input_df['P_ratio'] = input_df['P'] / input_df['total_nutrients']
    input_df['K_ratio'] = input_df['K'] / input_df['total_nutrients']
    input_df['aridity_index'] = input_df['rainfall'] / (input_df['temperature'] + 1e-5)
    input_df['water_stress'] = input_df['temperature'] * (100 - input_df['humidity'])
    
    # C. Drop Redundant Column
    input_df = input_df.drop(['total_nutrients'], axis=1)
    
    # D. Enforce Column Order (Safety Net)
    # This ensures columns are in the exact order the model expects
    try:
        input_df = input_df[cols]
    except KeyError as e:
        return {"error": f"Column mismatch. Missing: {e}"}
    
    # E. Scale & Predict
    scaled_data = scaler.transform(input_df)
    
    # Get probabilities
    probs = model.predict_proba(scaled_data)
    
    # Find the winner
    best_idx = np.argmax(probs)
    prediction = encoder.inverse_transform([best_idx])[0]
    confidence = float(probs[0][best_idx] * 100)
    
    return {
        "prediction": prediction,
        "confidence": round(confidence, 2)
    }

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)