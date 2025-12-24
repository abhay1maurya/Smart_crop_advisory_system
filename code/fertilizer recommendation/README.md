
# 🧪 Smart Crop Advisory System (SCAS) - Module: Fertilizer Recommendation

> **Part of the Krishi Sahayak Ecosystem** > *An Intelligent Nutrient Management System using Ensemble Machine Learning.*

![Python](https://img.shields.io/badge/Python-3.14%20-blue)
![ML](https://img.shields.io/badge/Model-Voting%20Ensemble-orange)
![Accuracy](https://img.shields.io/badge/Accuracy-95.75%25-brightgreen)
![Backend](https://img.shields.io/badge/API-FastAPI-teal)
![Status](https://img.shields.io/badge/Status-Academic%20Prototype-lightgrey)

## 📌 Module Overview

The **Fertilizer Recommendation Model** acts as the chemical expert within the Krishi Sahayak system. Instead of relying on manual guesswork or generic dosage, this module analyzes the specific chemical composition of the soil to recommend the exact fertilizer required.

By correlating crop requirements with current soil nutrient levels, the system aims to:
* 📉 **Reduce Cost:** Prevent excessive use of expensive fertilizers.
* 🌱 **Improve Yield:** Ensure crops get exactly what they lack.
* 🌍 **Protect Soil:** Prevent soil degradation caused by chemical imbalance.

---

## 🧠 Machine Learning Architecture

**Problem Type:** Supervised Multiclass Classification  
**Output:** Recommended Fertilizer Name (e.g., Urea, DAP, MOP)

To ensure high reliability, we utilize an **Ensemble Learning Approach** specifically a **Voting Classifier**.

| Component | Algorithm | Role |
| :--- | :--- | :--- |
| **Model A** | **Random Forest** | Handles complex, non-linear relationships between soil nutrients and crop types. |
| **Model B** | **Gradient Boosting** | Reduces bias and improves generalization on unseen data. |
| **Aggregator** | **Soft Voting** | Averages the probability outputs of both models to select the most confident prediction. |

---

## 🧠 Intelligent Logic Layer (Post-Processing)

Unlike standard ML models that simply output a label, this module includes a **Rule-Based Logic Layer** to ensure recommendations are chemically sound.

* **Scenario A:** If the model predicts a complex fertilizer, but **Nitrogen** is critically low → The system overrides/refines the suggestion to **Urea** (High N).
* **Scenario B:** If **Phosphorus** is the limiting factor → The system prioritizes **DAP**.
* **Scenario C:** If **Potassium** is deficient → The system suggests **MOP**.

> This hybrid approach (ML + Rule-based verification) ensures the output is not just statistically correct, but **agronomically valid**.

---

## 📥 Input Data Specifications

The model processes **8 key agricultural parameters**:

| Feature | Description | Type |
| :--- | :--- | :--- |
| **Crop Type** | The specific crop being cultivated | Categorical (Encoded) |
| **Soil Type** | Texture/Composition (e.g., Loamy, Sandy) | Categorical (Encoded) |
| **Nitrogen (N)** | Current Nitrogen level in soil | Numerical |
| **Phosphorus (P)**| Current Phosphorus level in soil | Numerical |
| **Potassium (K)** | Current Potassium level in soil | Numerical |
| **Temperature** | Avg. climatic temperature | Numerical |
| **Humidity** | Relative air humidity | Numerical |
| **Moisture** | Current soil moisture content | Numerical |

**Dataset Size:** ~5,500 Records (Sourced from public agricultural repositories).

---

## 🛠️ Project Structure

```text
📂 fertilizer_recommendation/
│
├── 📄 fertilizer_api.py        # FastAPI Microservice (Entry Point)
├── 📄 fertilizer_model_final.pkl # Serialized Model + Scalers + Encoders
├── 📄 fertilizer_training.ipynb  # Jupyter Notebook for Training
├── 📄 requirements.txt         # Python Dependencies
│
└── 📄 README.md                # Documentation

```

---

## 💻 Environment Setup

### 1. Prerequisites

* **Python Version:** 3.14


### 2. Installation

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

---

## ▶️ Running the Service

The model is exposed via a lightweight FastAPI server.

1. **Start the Server:**
```bash
python fertilizer_api.py

```


2. **Access Points:**
* **API URL:** `http://127.0.0.1:8001`
* **Swagger UI (Testing):** `http://127.0.0.1:8001/docs`



---

## 📊 Model Performance

* **Test Accuracy:** **~95.75%**
* **Validation Strategy:** Stratified K-Fold Cross Validation.
* **Robustness:** High precision in distinguishing between chemically similar fertilizers (e.g., 14-35-14 vs. 17-17-17).

---

## ⚠️ Limitations

* **Dosage:** The model recommends the *type* of fertilizer, not the exact quantity (kg/acre). Quantity depends on the specific age of the crop.
* **Growth Stage:** Recommendations assume a pre-sowing or general deficiency context, not specific growth stages (e.g., flowering vs. fruiting).

---

## 📜 Disclaimer & License

* **Academic Use Only:** This project is developed strictly for educational purposes and college evaluations.
* **Advisory Nature:** Recommendations are based on data patterns. Always consult a local agricultural extension officer before application.
* **License:** Free for academic and learning use.

---

<p align="center">
<b>Krishi Sahayak</b> | Smart Farming for a Better Future
</p>

