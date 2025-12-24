
# 🌿 Smart Crop Advisory System (SCAS) - Module: Plant Disease Detection

> **Part of the Krishi Sahayak Ecosystem** > *An AI-powered Microservice for Early Plant Disease Diagnosis using Computer Vision.*

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Deep Learning](https://img.shields.io/badge/Model-MobileNetV2-orange)
![Framework](https://img.shields.io/badge/Framework-TensorFlow%20%7C%20Keras-red)
![Backend](https://img.shields.io/badge/API-FastAPI-green)
![Status](https://img.shields.io/badge/Status-Academic%20Prototype-lightgrey)

## 📌 Module Overview

The **Plant Disease Detection Model** is the "vision" component of the Krishi Sahayak system. It leverages **Deep Learning (CNNs)** to identify crop diseases solely from leaf images.

By automating visual diagnosis, this module helps farmers:
* 🕵️ **Detect infections early** before they spread.
* 📉 **Reduce crop loss** by timely intervention.
* 🧪 **Minimize chemical usage** by targeting specific diseases rather than spraying generic pesticides.

This module is deployed as a standalone **FastAPI Microservice**, allowing real-time image prediction via a REST API.

---

## 🧠 Model Architecture 

[Leaf Image]
     ↓
[Preprocessing + Augmentation]
     ↓
[MobileNetV2 CNN]
     ↓
[Global Avg Pooling]
     ↓
[Dense + Dropout]
     ↓
[Softmax Output]



We utilize **Transfer Learning** to achieve high accuracy with moderate computational resources.

| Component | Specification |
| :--- | :--- |
| **Architecture** | **MobileNetV2** (Pre-trained on ImageNet) |
| **Input Shape** | 224 × 224 × 3 (RGB) |
| **Model Type** | Multi-class Image Classifier |
| **Output** | Disease Class Name + Confidence Probability |
| **Optimization** | Categorical Cross-Entropy Loss / Adam Optimizer |

> **Why MobileNetV2?** It is a lightweight CNN architecture optimized for speed and low latency, making it ideal for deployment on web servers or mobile devices without requiring heavy GPU inference.

---

## 📊 Dataset & Training Details

* **Source:** Public Plant Disease Datasets (Kaggle). 
* **Classes:** **34 distinct categories** (Healthy & Diseased leaves).
* **Training Environment:** GPU-accelerated Kaggle Notebooks.

**Training Metrics:**
| Parameter | Value |
| :--- | :--- |
| **Epochs** | 15 |
| **Accuracy** | ~83% (Validation) |
| **Training Time** | ~1 Hour (on GPU) |

> **⚠️ Note on Performance:** The dataset size (~11GB raw) limits deep training on standard machines. Accuracy can be significantly improved by increasing the dataset size and training epochs.

---
DataSet: https://drive.google.com/drive/folders/1N62yK1BmaAkNnU68XRdbwdqv2Gs_RQsj?usp=drive_link
## 🛠️ Project Structure

```text
📂 plant_disease_detection/
│
├── 📄 disease_api.py           # FastAPI Microservice (Entry Point)
├── 📄 final_disease_model.h5   # The Trained CNN Weights (Binary)
├── 📄 class_indices.json       # Dictionary mapping ID (0) -> Label (Apple_Scab)
├── 📄 requirements.txt         # Python Dependencies
├── 📄 plant_disease_model.ipynb # Jupyter Notebook used for Training
└── 📄 README.md                # Documentation

```

---

## 💻 Environment Setup (Critical)

Due to TensorFlow version compatibility, we **strongly recommend** using Conda.

### 1. Create Environment

**Required Python Version:** 3.10

```bash
# Create a fresh Conda environment
conda create -n plant_disease_env python=3.10 -y

# Activate the environment
conda activate plant_disease_env

```

### 2. Install Dependencies

```bash
# Install required libraries
pip install fastapi uvicorn tensorflow pillow numpy python-multipart

```

---

## ▶️ Running the Service

1. Ensure `final_disease_model.h5` and `class_indices.json` are in the root folder.
2. Start the FastAPI server:

```bash
python disease_api.py

```

* **Server URL:** `http://127.0.0.1:8002`
* **Swagger Docs:** `http://127.0.0.1:8002/docs` (Test the API here)

---

## 🔌 API Documentation

### **Predict Disease**

Endpoint to upload an image and get a diagnosis.

* **URL:** `/predict_disease`
* **Method:** `POST`
* **Content-Type:** `multipart/form-data`

**Request:**

* `file`: The image file (JPG/PNG).

**Response (JSON):**

```json
{
  "disease": "Tomato___Late_Blight",
  "confidence": "89.05%",
  "filename": "uploaded_leaf.jpg"
}

```

---

## 🚀 How It Works (Pipeline)

1. **Upload:** User uploads a leaf image via the frontend.
2. **Preprocessing:**
* Image is resized to **224x224** pixels.
* Pixel values are normalized to the **[-1, 1]** range (MobileNet requirement).


3. **Inference:** The CNN model calculates probability scores for all 34 classes.
4. **Result:** The class with the highest probability is returned, formatted with a confidence percentage.

---

## ⚠️ Limitations & Future Enhancements

### Current Limitations

* **Background Noise:** The model performs best on images with simple backgrounds. Field photos with complex backgrounds may reduce accuracy.
* **Lighting:** Poor lighting or blurry images can lead to misclassification.

### Future Roadmap

* [ ] Integration with cloud storage (AWS S3) for image logging.
* [ ] Adding severity detection (Mild vs Severe infection).
* [ ] Expanding dataset to 50+ classes including regional crops.

---

## 📜 Disclaimer & License

* **Academic Use Only:** This module is developed strictly for educational purposes and college project evaluations.
* **Advisory Nature:** Results are based on probabilities. Always verify with an agricultural expert before applying chemical treatments.
* **License:** Free for academic and learning use.

---

<p align="center">
<b>Krishi Sahayak</b> | AI for a Greener Tomorrow
</p>

