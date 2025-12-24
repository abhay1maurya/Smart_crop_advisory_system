🌾 Crop Recommendation Model
Smart Crop Advisory System (SCAS – Krishi Sahayak)
Module Type: Machine Learning (Tabular Data)
Purpose: Recommend the most suitable crop based on soil nutrients and weather conditions
Scope: Academic / College Project Only

📌 Module Overview
The Crop Recommendation Model is a core component of the Smart Crop Advisory System.
It analyzes soil nutrient values (N, P, K, pH) along with weather parameters to recommend the best crop for cultivation.

The model is designed specifically for North Indian agro‑climatic conditions, including regions such as:

Uttar Pradesh

Punjab

Uttarakhand

Instead of relying on a single algorithm, this module uses a Stacking Ensemble Learning approach to improve accuracy and robustness.

🧠 Machine Learning Architecture
🔹 Problem Type
Supervised Multiclass Classification

Output: Crop Name (Label)

🔹 Algorithms Used
The final model is a Stacking Ensemble, consisting of:

Role	Algorithm	Purpose
Base Learner	Random Forest	Handles non‑linear soil–crop relationships
Base Learner	XGBoost	Improves accuracy through gradient boosting
Base Learner	K‑Nearest Neighbors (KNN)	Captures local soil similarity patterns
Meta‑Learner	Logistic Regression	Learns how much to trust each base model
This architecture reduces overfitting and improves generalization.

📥 Input Features
The model accepts 7 numerical input features:

Feature	Description	Unit
N	Nitrogen content	kg/ha
P	Phosphorus content	kg/ha
K	Potassium content	kg/ha
Temperature	Average temperature	°C
Humidity	Relative humidity	%
pH	Soil pH value	pH
Rainfall	Annual rainfall	mm
📌 Important:

N, P, K values must be entered in kg/ha (as per soil test report)

Other parameters use standard units

⚙️ Feature Engineering
The model does not use raw values alone.
It derives biologically meaningful indicators to improve predictions.

1️⃣ Nutrient Ratios
Plants respond to nutrient balance rather than absolute quantity.

N_ratio = N / (N + P + K)
P_ratio = P / (N + P + K)
K_ratio = K / (N + P + K)
2️⃣ Aridity Index
Represents water availability relative to temperature.

Aridity_Index = Rainfall / (Temperature + ε)
3️⃣ Water Stress Index
High temperature with low humidity causes crop stress.

Water_Stress = Temperature × (100 − Humidity)
These engineered features significantly increase model accuracy.

🛠️ Preprocessing Pipeline
Missing value handling (dataset assumed clean)

Feature scaling using StandardScaler

Label encoding for crop names

Strict feature order validation during deployment

All preprocessing steps used during training are reused during prediction.

📂 Files Used in This Module
File	Description
model_training.ipynb	Jupyter notebook used for training
crop_model_final.pkl	Trained stacking model
scaler_final.pkl	StandardScaler
label_encoder_final.pkl	Crop label encoder
feature_order.pkl	Feature order verification
crop_api.py	FastAPI backend for predictions
🔌 API Integration (FastAPI)
The crop model is exposed via FastAPI for frontend integration.

Start the API
uvicorn crop_api:app --reload
Purpose of crop_api.py
Accepts user input from frontend

Applies preprocessing & feature engineering

Loads trained model and artifacts

Returns predicted crop as JSON response

💻 Environment Setup
✅ Supported Python Version
Python 3.9 – 3.11

❌ Python 3.14 is NOT supported

Virtual Environment (Recommended)
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
Alternative
Model training notebooks can be executed in Google Colab or Jupyter Notebook

📊 Model Performance
Metric	Value
Accuracy	~91–92%
Number of Crops	80
Validation	Stratified K‑Fold Cross Validation
Dataset Type	Clean benchmark dataset
⚠️ Accuracy may reduce with noisy real‑world soil data.

🧪 How to Use the Model
Obtain soil data from:

Soil Health Card

Agricultural lab report

Enter values in the frontend:

N, P, K → kg/ha

Other values → default units

Submit input → receive recommended crop

⚠️ Limitations
Trained on structured datasets (controlled conditions)

Does not account for:

Crop growth stage

Market prices

Farmer financial constraints

The model provides decision support, not guaranteed outcomes.

📜 Disclaimer
This module is copyrighted

Intended only for college / academic use

Not approved for commercial deployment

Recommendations are advisory only

📝 License
Academic Use License
Free to use for learning, demos, and project evaluation.