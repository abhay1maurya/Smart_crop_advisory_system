import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
import numpy as np
from PIL import Image
import json
import io
import os

# ==========================================
# 1. SETUP APP
# ==========================================
app = FastAPI(title="Plant Disease Detection Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Variables
MODEL = None
CLASS_NAMES = None

# ==========================================
# 2. ARCHITECTURE RECONSTRUCTION
# ==========================================
def build_model(num_classes):
    """
    Rebuilds the exact same architecture used in training.
    This bypasses version mismatches in the saved file.
    """
    print("🔨 Rebuilding Model Architecture locally...")
    
    # 1. Define Input
    inputs = tf.keras.Input(shape=(224, 224, 3))

    # 2. Data Augmentation (Must be included to match layer count, even if unused)
    # We interpret them as simple layers to avoid serialization issues
    x = layers.RandomFlip("horizontal_and_vertical")(inputs)
    x = layers.RandomRotation(0.2)(x)
    x = layers.RandomZoom(0.2)(x)
    x = layers.RandomContrast(0.2)(x)

    # 3. Preprocessing (The part that caused the 127.5 error)
    # We use the local version of MobileNetV2 preprocessing
    x = tf.keras.applications.mobilenet_v2.preprocess_input(x)

    # 4. Base Model (MobileNetV2)
    base_model = MobileNetV2(input_shape=(224, 224, 3),
                             include_top=False,
                             weights=None) # Don't download imagenet, we load your weights later
    base_model.trainable = False 
    
    x = base_model(x, training=False)

    # 5. Head
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.2)(x)
    
    # 6. Output (Float32 for stability)
    outputs = layers.Dense(num_classes, activation='softmax', dtype='float32')(x)

    model = models.Model(inputs, outputs)
    return model

# ==========================================
# 3. STARTUP EVENT
# ==========================================
@app.on_event("startup")
def load_artifacts():
    global MODEL, CLASS_NAMES
    print("⏳ Starting System...")
    
    try:
        # A. Load Class Names FIRST (Need this to build model)
        if os.path.exists('class_indices.json'):
            with open('class_indices.json', 'r') as f:
                CLASS_NAMES = json.load(f)
            print(f"✅ Loaded {len(CLASS_NAMES)} Classes.")
        else:
            print("❌ Error: class_indices.json not found!")
            return

        # B. Build the empty model structure
        MODEL = build_model(len(CLASS_NAMES))
        
        # C. Load the trained weights
        # Note: We use try/except to handle potential layer mismatch warnings
        print("⏳ Loading Weights from .h5 file...")
        MODEL.load_weights('final_disease_model.h5')
        print("✅ Weights Loaded Successfully.")
        
        # Warmup prediction (Optional, checks if everything works)
        # dummy_input = np.zeros((1, 224, 224, 3))
        # MODEL.predict(dummy_input)
        # print("✅ Model Warmup Complete.")

    except Exception as e:
        print(f"❌ CRITICAL ERROR: {e}")
        print("Tip: If Layer mismatch occurs, ensure training code matches 'build_model' exactly.")

# ==========================================
# 4. PREDICTION LOGIC
# ==========================================
def prepare_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.post("/predict_disease")
async def predict(file: UploadFile = File(...)):
    if not MODEL:
        return {"error": "Model failed to initialize."}
    
    try:
        contents = await file.read()
        processed_image = prepare_image(contents)
        
        predictions = MODEL.predict(processed_image)
        
        predicted_class_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]) * 100)
        
        # Handle case where index might be out of bounds (rare)
        if predicted_class_index < len(CLASS_NAMES):
            predicted_class_name = CLASS_NAMES[predicted_class_index]
        else:
            predicted_class_name = "Unknown"

        return {
            "disease": predicted_class_name,
            "confidence": f"{confidence:.2f}%",
            "filename": file.filename
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)