
# 🌾 Smart Crop Advisory System (SCAS) - North India Edition

**An Advanced Machine Learning System for Precision Agriculture**

This project utilizes a **Stacking Ensemble Architecture** (Random Forest, XGBoost, KNN) to recommend the optimal crop for a specific soil and climate profile. Unlike basic models, this system employs **biological feature engineering** (Nutrient Ratios, Aridity Indices) to achieve superior accuracy (~92%) across 80 different crops relevant to North India (Punjab, UP, Uttarakhand).

---

## ⚠️ Important: Model Weights Download
**The trained model file (`crop_model_final.pkl`) is approximately 3GB and is too large for GitHub.**

You must download the model artifacts from the link below and place them in the root directory of this project before running the code.

👉 **[DOWNLOAD MODEL FILES FROM GOOGLE DRIVE HERE]** *(https://drive.google.com/drive/folders/1b207FouxGG8C_SIUUtqrKEZw9FU3pMJW?usp=sharing)*

**Required Files to Download:**
1. `crop_model_final.pkl` (The Stacking Ensemble)
2. `scaler_final.pkl` (StandardScaler)
3. `label_encoder_final.pkl` (LabelEncoder)
4. `feature_order.pkl` (Column Verification)

---

## 🚀 Key Features

* **Region Specific:** Tailored for North Indian climates (Rice-Wheat cycles, Sugarcane, Hills of Uttarakhand).
* **Advanced Architecture:** Uses `StackingClassifier` to combine the strengths of:
    * **Random Forest:** For robust decision boundaries.
    * **XGBoost:** For gradient boosting performance on tabular data.
    * **KNN:** For capturing local similarity clusters (essential for rare fruits).
    * **Logistic Regression (Meta-Learner):** "The Manager" that learns which model to trust.
* **Bio-Feature Engineering:** Calculates `N_ratio`, `P_ratio`, `Water_Stress_Index`, and `Aridity_Index` to simulate biological growth triggers.
* **Robust Preprocessing:** Includes noise injection for data augmentation and strict order enforcement for deployment safety.

---

## 🛠️ Project Structure

```bash
├── crop_data_final_data.csv       # Raw Dataset
├── north_india_crops_augmented.csv # Augmented & Cleaned Dataset
├── model_training.ipynb           # Main Jupyter Notebook (Training Pipeline)
├── app.py                         # (Optional) Streamlit Web Interface
├── requirements.txt               # Python Dependencies
├── README.md                      # Documentation
│
└── [Artifacts - Downloaded from Drive]
    ├── crop_model_final.pkl
    ├── scaler_final.pkl
    ├── label_encoder_final.pkl
    └── feature_order.pkl
````

-----

## ⚙️ Feature Engineering Logic

This model does not just look at raw N, P, K. It calculates biological interaction terms:

1.  **Nutrient Ratios:** Plants respond to the *balance* of nutrients, not just the raw amount.
      * `N_ratio = N / (N + P + K)`
      * `P_ratio = P / (N + P + K)`
2.  **Aridity Index:** A proxy for water availability versus evaporation.
      * `Aridity = Rainfall / (Temperature + 1e-5)`
3.  **Water Stress:** High heat combined with low humidity causes rapid transpiration stress.
      * `Stress = Temperature * (100 - Humidity)`

-----

## 💻 Installation & Usage

### 1\. Setup Environment

```bash
# Clone the repository
git clone [https://github.com/yourusername/smart-crop-advisor.git](https://github.com/yourusername/smart-crop-advisor.git)
cd smart-crop-advisor

# Install dependencies
pip install -r requirements.txt
```

### 2\. Verify Model

Ensure you have downloaded the `.pkl` files from the Google Drive link above.

### 3\. Run Prediction (Script)

You can use the python script to make a prediction:

```python
import joblib
import pandas as pd
import numpy as np

# Load Artifacts
model = joblib.load('crop_model_final.pkl')
scaler = joblib.load('scaler_final.pkl')
encoder = joblib.load('label_encoder_final.pkl')
cols = joblib.load('feature_order.pkl')

# Input Data (Example: Rice Conditions)
# N, P, K, Temp, Humidity, pH, Rain
raw_input = [80, 40, 40, 25, 80, 7, 200]

# ... (Apply Feature Engineering Logic Here) ...
# See 'model_training.ipynb' for the exact transformation code.
```

-----

## 📊 Performance

  * **Accuracy:** \~91-92% on Test Set
  * **Classes:** 80 Unique Crops
  * **Evaluation:** Validated using Stratified K-Fold Cross Validation.

-----

## 📝 License

This project is licensed under the MIT License.

````
