Here is a significantly improved, professional-grade `README.md`. I have added **status badges**, **formatted tables**, **code blocks**, and **math notation** for your feature engineering section to make it look like a high-end data science project.


# 🌾 Smart Crop Advisory System (SCAS) - Module: Crop Recommendation

> **Part of the Krishi Sahayak Ecosystem** > *An AI‑driven approach to precision agriculture using Stacking Ensemble Learning.*

![Python](https://img.shields.io/badge/Python-3.9%20|%203.10%20|%203.11-blue)
![ML](https://img.shields.io/badge/Machine%20Learning-Stacking%20Ensemble-orange)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![Status](https://img.shields.io/badge/Status-Academic%20Prototype-lightgrey)

## 📌 Module Overview

The **Crop Recommendation Model** is the predictive engine of the Smart Crop Advisory System. It is designed to replace guesswork in farming with data-driven decisions. By analyzing specific soil nutrients and climatic patterns, it predicts the most biologically suitable crop for a specific field.

While tailored for **North Indian agro-climatic zones** (Punjab, Uttar Pradesh, Uttarakhand), the underlying logic is applicable to any region with similar soil profiles.

### 🚀 Key Differentiator
Unlike standard models that rely on a single algorithm (like Decision Trees), this module utilizes a **Stacking Ensemble Architecture**. This combines the strengths of multiple algorithms to minimize error and improve generalization on unseen data.

---

## 🧠 Machine Learning Architecture

**Problem Type:** Supervised Multiclass Classification  
**Output:** Crop Name (Label)

The system uses a 2-tier stacking approach:

| Tier | Role | Algorithm | Why it was chosen |
| :--- | :--- | :--- | :--- |
| **Level 0** | Base Learner | **Random Forest** | Handles high variance and non-linear soil-crop relationships. |
| **Level 0** | Base Learner | **XGBoost** | Powerful gradient boosting to reduce bias and improve accuracy. |
| **Level 0** | Base Learner | **KNN** | Captures local clusters of similar soil profiles effectively. |
| **Level 1** | Meta-Learner | **Logistic Regression** | learns the optimal weight for each base learner's prediction to make the final decision. |

---

## 📥 Input Data Specifications

The model requires 7 specific features. Data should ideally be sourced from a **Soil Health Card**.

| Feature | Description | Unit | Requirement |
| :--- | :--- | :--- | :--- |
| **N** | Nitrogen content | `kg/ha` | Critical |
| **P** | Phosphorus content | `kg/ha` | Critical |
| **K** | Potassium content | `kg/ha` | Critical |
| **pH** | Soil Acidity/Alkalinity | `0-14` | Critical |
| **Temperature**| Avg. field temperature | `°C` | Weather API / Sensor |
| **Humidity** | Relative humidity | `%` | Weather API / Sensor |
| **Rainfall** | Annual rainfall | `mm` | Weather API / History |

> **⚠️ Note on Units:** Please ensure N-P-K values are converted to **kg/ha**. Some labs report in ppm; these must be converted before input.

---

## ⚙️ Feature Engineering (The "Secret Sauce")

To boost accuracy beyond standard baselines, raw data is transformed into biologically meaningful indicators before being fed into the model:

### 1. Nutrient Ratios
Plants respond to the *balance* of nutrients, not just absolute values.
$$N_{ratio} = \frac{N}{N + P + K}$$

### 2. Aridity Index
Measures water availability relative to heat.
$$Aridity = \frac{Rainfall}{Temperature + \epsilon}$$

### 3. Water Stress Index
Identifies conditions where high heat and low humidity put crops at risk.
$$Stress = Temperature \times (100 - Humidity)$$

---

## 🛠️ Project Structure & Files

```text
📂 Crop_Module/
│
├── 📄 crop_api.py              # FastAPI Backend (Entry Point)
├── 📄 model_training.ipynb     # Jupyter Notebook for EDA & Training
├── 📄 requirements.txt         # Python Dependencies
│
├── 📂 artifacts/               # Serialized Objects
│   ├── 📄 crop_model_final.pkl     # The Trained Stacking Model
│   ├── 📄 scaler_final.pkl         # StandardScaler (for normalization)
│   ├── 📄 label_encoder_final.pkl  # Decodes 0,1,2 -> "Rice", "Maize"
│   └── 📄 feature_order.pkl        # Ensures input columns match training order

```

---

## 💻 Setup & Usage

### 1. Environment Setup

**Supported Python:** 3.9 – 3.11

*(Note: Python 3.12+ / 3.14 is currently not supported due to library dependencies)*

```bash
# Create Virtual Environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

```

### 2. Run the API

The model is served via FastAPI. Run the following command:

```bash
uvicorn crop_api:app --reload

```

*The API will start at `http://127.0.0.1:8000*`

---

## 📊 Model Performance

* **Accuracy:** ~91–92% (on Validation Set)
* **Classes:** 22 Unique Crops
* **Validation Method:** Stratified K-Fold Cross Validation
* **Dataset:** Precision Agriculture Benchmark Dataset (Clean)

> **⚠️ Real World Warning:** Accuracy may vary with noisy, real-world data collected from low-cost sensors.

---

## 📜 Disclaimer & License

* **Academic Use Only:** This project is developed strictly for educational purposes and college evaluations.
* **Advisory Nature:** The predictions are suggestions based on data patterns. They do not account for market rates, pest attacks, or sudden climate shifts.
* **Commercial Use:** Not approved for commercial deployment without further validation.

---

<p align="center">
<b>Krishi Sahayak</b> | Smart Farming for a Better Future
</p>

```

```