🌿 Plant Disease Detection Model
Smart Crop Advisory System (SCAS – Krishi Sahayak)
Module Type: Deep Learning (Image Classification)
Purpose: Detect plant diseases from leaf images
Scope: Academic / College Project Only

📌 Module Overview
The Plant Disease Detection Model is a deep learning–based module developed as part of the Smart Crop Advisory System (Krishi Sahayak).
It identifies crop diseases from uploaded plant leaf images using a Convolutional Neural Network (CNN).

The model enables early disease detection, helping farmers:

Take preventive action

Reduce crop loss

Minimize excessive pesticide usage

This module is deployed as a FastAPI microservice for real‑time image‑based prediction.

🧠 Model Description
🔹 Model Architecture
Architecture: MobileNetV2 (Transfer Learning)

Framework: TensorFlow + Keras

Input Size: 224 × 224 × 3 (RGB)

Output: Disease class + confidence score

Classes: 34 plant disease categories

Model Type: Multi‑class Image Classification

Only the trained model weights (.h5) are loaded at runtime to ensure fast API startup and modular deployment.

📊 Dataset Information
Dataset Source: Kaggle (Plant disease datasets)

Total Classes: 34

Dataset Size: ~11 GB (limited for deep CNN training)

Training Platform: Kaggle Notebook (GPU enabled)

⚠️ Important Limitation:
The dataset is relatively small for a CNN with 34 classes.
Better accuracy can be achieved with more images per class.

⚙️ Training Details
Parameter	Value
Training Device	GPU (Kaggle)
Epochs	15
Training Time	~1 hour
Optimizer	Adam
Loss Function	Categorical Cross‑Entropy
Accuracy Achieved	~83%
📌 With more training data and epochs, accuracy can be improved further.

🛠️ Project Structure
plant_disease_detection/
│
├── disease_api.py               # FastAPI service for disease prediction
├── final_disease_model.h5       # Trained CNN model weights
├── class_indices.json           # Class index → disease name mapping
├── plant_disease_model.ipynb    # Training notebook
├── requirements.txt             # Python dependencies
└── README_DISEASE_MODEL.md      # Documentation
📌 Dataset Drive Link:
(To be added separately in Google Drive due to large size)

💻 Environment Setup (IMPORTANT)
✅ Python & Environment
Python Version: 3.10

Environment Type: Conda (Recommended for TensorFlow stability)

Create Conda Environment
conda create -n plant_disease_env python=3.10 -y
conda activate plant_disease_env
Install Dependencies
pip install -r requirements.txt
Or manually:

pip install fastapi uvicorn tensorflow pillow numpy
🚀 How the System Works
User uploads a plant leaf image

Image is resized to 224 × 224

Image is preprocessed and normalized

CNN model predicts class probabilities

System returns:

Disease name

Confidence score

Uploaded filename

🔌 API Details
Endpoint
POST /predict_disease
Request
Content‑Type: multipart/form‑data

Parameter: file (leaf image)

Response (JSON)
{
  "disease": "Tomato___Late_Blight",
  "confidence": "89.05%",
  "filename": "leaf.jpg"
}
▶️ Running the Service
Ensure Required Files Exist
final_disease_model.h5

class_indices.json

Start the API Server
python disease_api.py
API URL:
http://127.0.0.1:8002

Swagger Docs:
http://127.0.0.1:8002/docs

🔐 Security & Usage Notes
CORS enabled for frontend integration

Uploaded images are processed temporarily

Images are not stored permanently

No user data is saved

⚠️ Predictions are advisory only and not guaranteed.

🔗 Integration in Krishi Sahayak
This module integrates with:

Spring Boot backend (REST API)

Web frontend (image upload UI)

Farmer advisory dashboard

It supports:

Early disease identification

Risk reduction

Better crop management decisions

⚠️ Limitations
Limited dataset size for 34 classes

Performance may drop on:

Blurry images

Poor lighting

Field background noise

📌 More training data = better accuracy.

📌 Future Enhancements
Add more crop varieties & diseases

Increase dataset size

Cloud deployment (Docker / AWS / GCP)

Multi‑language disease explanations

Severity level prediction

📜 Disclaimer
This module is copyrighted

Developed only for college / academic use

Not approved for commercial deployment

Results are decision support, not guarantees

📝 License
Academic Use License
Free to use for learning, demos, and project evaluation.