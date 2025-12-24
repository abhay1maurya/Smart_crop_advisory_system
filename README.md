


# 🌾 Smart Crop Advisory System (Krishi Sahayak)

> **An AI‑based Decision Support System for Sustainable Agriculture**

![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7+-green)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-teal)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12-orange)
![Status](https://img.shields.io/badge/Status-Academic%20Project-lightgrey)

## 📌 Project Overview

The **Smart Crop Advisory System (Krishi Sahayak)** is an innovative academic project designed to bridge the gap between technology and traditional farming. By leveraging **Artificial Intelligence (AI)** and **Machine Learning (ML)**, this system acts as a digital companion for farmers, assisting them in making data-driven agricultural decisions.

The platform provides intelligent recommendations to reduce guesswork, minimize crop failure risks, and promote sustainable, efficient agricultural practices.

---

## 📑 Table of Contents
- [Key Features](#-key-features)
- [System Architecture & Models](#-system-architecture--models)
- [Technologies Used](#-technologies-used)
- [Dataset Details](#-dataset-details)
- [Installation & Setup](#-installation--setup)
- [Disclaimer](#-disclaimer)

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **🌱 Crop Recommendation** | Suggests the most profitable and suitable crop based on N-P-K soil nutrients, pH levels, and weather conditions. |
| **🧪 Fertilizer Optimization** | Analyzes soil data to recommend the precise fertilizer and dosage required for optimal growth. |
| **🌿 Disease Detection** | Uses Deep Learning (CNN) to scan leaf images and detect plant diseases with high accuracy. |
| **🌦️ Weather Advisory** | Integrates real-time weather APIs to provide forecasts and alerts relevant to farming activities. |
| **🤖 Multilingual Chatbot** | An NLP-based assistant that resolves farmer queries in simple, regional languages. |
| **📝 Community Blog** | A knowledge-sharing platform connecting farmers with agriculture experts. |

---

## 🧠 System Architecture & Models

This project utilizes a hybrid architecture combining statistical Machine Learning and Deep Learning.

### 1. Crop Recommendation Model
* **Algorithm:** Ensemble Machine Learning (Random Forest / XGBoost).
* **Input Parameters:** Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, pH, Rainfall.
* **Goal:** maximize yield by matching soil profiles to crop requirements.

### 2. Fertilizer Recommendation Model
* **Algorithm:** Classification-based ML Model.
* **Training Data:** Trained on **~5,500 agricultural records**.
* **Output:** Specific fertilizer names (e.g., Urea, DAP, 14-35-14) based on soil deficiencies.

### 3. Plant Disease Detection Model
* **Architecture:** Convolutional Neural Network (CNN) based on **MobileNetV2** (Transfer Learning).
* **Capability:** Detects **34 different disease classes** across various crops.
* **Training:** Trained on the Kaggle PlantVillage dataset using GPU acceleration.

---

## 🛠️ Technologies Used

### **Backend & APIs**
* **Python (FastAPI):** For serving ML/DL models.
* **Java (Spring Boot):** For core application logic and user management.
* **REST APIs:** For communication between frontend and ML services.
* **Weather API:** For real-time climatic data.

### **Frontend**
* **HTML5, CSS3, JavaScript:** For a responsive and user-friendly interface.
* **Jinja2 / Thymeleaf:** For server-side rendering (if applicable).

### **Data & ML**
* **Machine Learning:** Scikit-learn, Pandas, NumPy.
* **Deep Learning:** TensorFlow, Keras.
* **Database:** MySQL (for user data and blogs).

---

## 📊 Dataset Details

The models were trained using public agricultural datasets sourced from Kaggle and government repositories. Key data points include:
* **Soil Metrics:** N, P, K ratios and pH values.
* **Environmental Factors:** Temperature, Humidity, Rainfall.
* **Image Data:** A large repository of healthy and infected plant leaf images.

---

## 💻 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Python 3.9+
* Java JDK 17+ (for Spring Boot)
* MySQL Server

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/smart-crop-advisory.git](https://github.com/your-username/smart-crop-advisory.git)
cd smart-crop-advisory

```

### 2. Backend (ML Services) Setup

```bash
cd ml_backend
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI Server
uvicorn main:app --reload --port 8000

```

### 3. Core Application Setup (Spring Boot)

1. Configure `application.properties` with your MySQL database credentials.
2. Build and run the project:

```bash
./mvnw spring-boot:run

```

### 4. Access the Application

Open your browser and navigate to: `http://localhost:8080`

---

## 🎯 Purpose of the Project

* **Reduce Risk:** Mitigate crop failure by analyzing scientific data.
* **Efficiency:** Optimize fertilizer usage to save costs and protect soil health.
* **Early Detection:** Identify diseases before they spread to the entire field.
* **Empowerment:** Provide farmers with actionable AI-based insights.

---

## ⚠️ Disclaimer

> **This project is developed strictly for Academic / College purposes.**

* It is **not intended for commercial use**.
* The predictions provided by the AI models are **advisory in nature**. Users should consult with local agricultural extension officers before making significant financial decisions based on these recommendations.

---

<p align="center">
Made with ❤️ for the Farming Community
</p>

```

```