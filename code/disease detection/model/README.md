🌿 Plant Disease Detection Service
Smart Crop Advisory System (Krishi Sahayak)

📌 Overview
The Plant Disease Detection Service is a deep learning–based microservice developed as part of the Smart Crop Advisory System (Krishi Sahayak).
This service uses a Convolutional Neural Network (CNN) built on MobileNetV2 architecture to identify plant diseases from uploaded leaf images.
It is implemented using FastAPI and exposes a REST API for real‑time disease prediction.

🧠 Model Description
Architecture: MobileNetV2 (Transfer Learning)

Input Size: 224 × 224 × 3 (RGB image)

Output: Disease class with confidence score

Training Framework: TensorFlow / Keras

Model Type: Image Classification (Multi‑class)

The model is trained separately and only the trained weights (.h5) are loaded at runtime to ensure faster startup and modular deployment.

📂 Project Files
plant_disease_detection/
│
├── disease_api.py              # FastAPI service for disease prediction
├── final_disease_model.h5      # Trained CNN model weights
├── class_indices.json          # Mapping of class index to disease name
├── plant_disease_model.ipynb   # Model training notebook
└── README.md                   # Project documentation
⚙️ Technology Stack
Backend API: FastAPI

Deep Learning: TensorFlow, Keras

Model Architecture: MobileNetV2

Image Processing: Pillow (PIL), NumPy

Server: Uvicorn

Language: Python 3.8+

🚀 How the System Works
User uploads a plant leaf image.

Image is resized to 224×224 and preprocessed.

CNN model predicts disease class probabilities.

The system returns:

Predicted disease name

Confidence score

Uploaded filename

🔌 API Endpoint
POST /predict_disease
📥 Request
Content‑Type: multipart/form-data

Parameter: file (leaf image)

📤 Response (JSON)
{
  "disease": "Tomato___Late_Blight",
  "confidence": "89.05%",
  "filename": "leaf.jpg"
}
▶️ How to Run the Service
1️⃣ Install Dependencies
pip install fastapi uvicorn tensorflow pillow numpy
2️⃣ Ensure Required Files Exist
final_disease_model.h5

class_indices.json

3️⃣ Start the API Server
python disease_api.py
The service will start at:

http://127.0.0.1:8002
Swagger API Docs:

http://127.0.0.1:8002/docs
🔐 Security & Usage Notes
The service allows CORS access for frontend integration.

Uploaded images are processed temporarily and not stored permanently.

This module is designed for academic and research purposes only.

Predictions are advisory, not guaranteed outcomes.

🎯 Integration in Krishi Sahayak
This service integrates with:

Spring Boot Backend (via REST calls)

Web Frontend (image upload interface)

Farmer Advisory Dashboard

It supports early disease detection to:

Reduce crop loss

Minimize pesticide misuse

Improve decision‑making

📌 Future Enhancements
Add support for more crop varieties

Deploy on cloud (Docker / AWS / GCP)

Add multi‑language disease descriptions

Improve accuracy with larger datasets