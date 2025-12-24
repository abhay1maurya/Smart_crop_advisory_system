🧪 Fertilizer Recommendation Model
Smart Crop Advisory System (SCAS – Krishi Sahayak)
Module Type: Machine Learning (Classification)
Purpose: Recommend the most suitable fertilizer based on crop, soil, and weather conditions
Scope: Academic / College Project Only

📌 Module Overview
The Fertilizer Recommendation Model is designed to assist farmers in selecting the appropriate fertilizer based on:

Crop type

Soil nutrient levels (N, P, K)

Soil condition

Weather parameters

Instead of manual guesswork, this model provides data‑driven fertilizer suggestions to improve yield and reduce excessive fertilizer usage.

The system recommends the name of the fertilizer (e.g., Urea, DAP, MOP, Complex NPK) based on learned patterns from agricultural data.

🧠 Machine Learning Architecture
🔹 Problem Type
Supervised Multiclass Classification

Output: Fertilizer Name

🔹 Algorithms Used
The model uses an Ensemble Learning approach (Voting Classifier):

Algorithm	Role
Random Forest	Handles non‑linear relationships and feature interactions
Gradient Boosting	Improves prediction accuracy and generalization
The final prediction is obtained using soft voting, which averages probabilities from both models.

📊 Dataset Information
Total Samples: ~5,500 records

Source: Public agricultural datasets (processed for academic use)

Dataset Location: dataset/ folder

Features Used:
Crop Type

Soil Type

Nitrogen (N)

Phosphorus (P)

Potassium (K)

Temperature

Humidity

Soil Moisture

Categorical features are encoded during preprocessing.

⚙️ Preprocessing Pipeline
Label Encoding for crop type and soil type

Feature scaling using StandardScaler

Feature order validation during prediction

Cleaned and normalized dataset used for training

The same preprocessing pipeline is reused during inference to ensure consistency.

📂 Files Used in This Module
File	Description
fertilizer_training.ipynb	Model training and evaluation notebook
fertilizer_model_final.pkl	Trained ensemble model with encoders & scaler
fertilizer_api.py	FastAPI backend for predictions
index_fertilizer.html	Frontend interface for testing
dataset/	Contains fertilizer dataset
requirements.txt	Python dependencies
💻 Environment Setup
✅ Supported Python Version
Python 3.9 – 3.11

❌ Python 3.14 is NOT valid and should not be used

Create Virtual Environment (Recommended)
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
Alternative
Training notebook can also be executed using Jupyter Notebook or Google Colab

🔌 API Integration (FastAPI)
The fertilizer model is exposed as a FastAPI microservice.

Start the API Server
python fertilizer_api.py
Server runs at: http://127.0.0.1:8001

Swagger UI available at:
http://127.0.0.1:8001/docs

The API receives soil, crop, and weather data and returns the recommended fertilizer name.

🧠 Fertilizer Logic Layer (Post‑Processing)
The system includes a logic layer to improve real‑world usability.

If the model predicts a generic fertilizer category, the logic layer refines it using N‑P‑K values:

If Nitrogen is low → Recommend Urea

If Phosphorus is low → Recommend DAP

If Potassium is low → Recommend MOP

This makes recommendations farmer‑friendly and actionable.

📊 Model Performance
Metric	Value
Test Accuracy	~95.75%
Algorithm	Voting Ensemble
Validation	Stratified K‑Fold
Dataset Size	~5,500 samples
⚠️ Performance may vary with real‑world soil report variations.

🧪 How to Use the Model
Enter soil and crop details from a soil report

Provide basic weather information

Submit the form via frontend or API

Receive the recommended fertilizer name

This assists farmers in nutrient‑balanced fertilizer selection.

⚠️ Limitations
Does not consider:

Crop growth stage

Fertilizer timing and dosage

Market availability

The model provides decision support, not guaranteed outcomes.

📜 Disclaimer
This module is copyrighted

Intended only for college / academic projects

Not for commercial deployment

Output recommendations are advisory

📝 License
Academic Use License
Free to use for learning, demos, and evaluation.