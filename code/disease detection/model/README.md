

# Smart Crop Advisory System 🌱

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Backend](https://img.shields.io/badge/Backend-Java%20Spring%20Boot-red)
![ML Engine](https://img.shields.io/badge/ML%20Engine-Python%20FastAPI-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-orange)

An advanced, data-driven agricultural advisory platform designed for farmers in North India. This system integrates **Ensemble Machine Learning** for crop/fertilizer recommendations and **Deep Learning (CNNs)** for plant disease diagnosis into a unified, accessible web interface.


## 🚀 Features

### 1. Smart Crop Recommendation
* **Input:** Soil parameters (N, P, K, pH) and climatic conditions (Temperature, Humidity, Rainfall).
* **Logic:** Uses a **Voting Ensemble Classifier** (Random Forest + XGBoost + KNN) to predict the most viable crop.
* **Accuracy:** ~95% on Indian datasets.

### 2. Fertilizer Optimization
* **Input:** Soil nutrient data and specific crop type.
* **Logic:** A **Hybrid Model** combining ML classification with a Rule-Based Logic Layer.
* **Output:** Translates complex chemical deficiencies into actionable advice (e.g., *"Apply 50kg Urea per acre"*).

### 3. Visual Disease Detection
* **Input:** Image upload of a plant leaf.
* **Technology:** **MobileNetV2 (Transfer Learning)** trained on the PlantVillage dataset.
* **Capability:** Detects 33+ diseases across crops like Potato, Tomato, Rice, and Corn.

---

## 🏗️ System Architecture

The project follows a **Microservices Architecture** to ensure scalability and fault tolerance.



[Image of System Architecture Diagram]


* **Frontend (User Interface):** Lightweight HTML5/CSS3/JavaScript (PWA-ready).
* **Orchestration Layer (Backend):** Java **Spring Boot** handles user management, history tracking, and routing.
* **Intelligence Layer (Microservices):**
    * **Service A (Port 8000):** Crop Prediction API (Scikit-learn).
    * **Service B (Port 8001):** Fertilizer Logic API.
    * **Service C (Port 8002):** Disease Detection API (TensorFlow/Keras).

---

## 🛠️ Tech Stack

| Component | Technology | Version |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap | 5.3 |
| **Backend Core** | Java, Spring Boot | 3.x |
| **ML Services** | Python, FastAPI, Uvicorn | 3.10 |
| **ML Libraries** | Scikit-Learn, Pandas, NumPy | Latest |
| **Deep Learning** | TensorFlow, Keras, Pillow | 2.10.1 |
| **Database** | MySQL / H2 (Configurable) | 8.0 |

---

## ⚙️ Installation & Setup

### Prerequisites
* **Java JDK 17+** installed.
* **Anaconda** or **Miniconda** installed (Critical for TensorFlow compatibility).
* **Git** installed.

### Step 1: Clone the Repository
```bash
git clone [https://github.com/yourusername/smart-crop-advisory.git](https://github.com/yourusername/smart-crop-advisory.git)
cd smart-crop-advisory
Step 2: Setup Python Microservices (The Brain)
Note: We use Python 3.10 to avoid TensorFlow version conflicts.

Create Environment:

Bash

conda create -n scas_env python=3.10 -y
conda activate scas_env
Install Dependencies: Navigate to the ml_services folder (or where your requirements.txt is):

Bash

pip install -r requirements.txt
(Ensure tensorflow==2.10.1 and protobuf==3.19.6 are specified to prevent crashes).

Launch ML Services: You need to run the API scripts. It is best to run them in separate terminals or use a runner script.

Bash

# Terminal 1 - Disease API
python disease_api.py

# Terminal 2 - Crop/Fertilizer API
python crop_api.py
Verify they are running on localhost:8000 and localhost:8002.

Step 3: Setup Java Spring Boot (The Body)
Open the project in IntelliJ IDEA or Eclipse.

Update application.properties with your database credentials (if using MySQL).

Run Application.java.

The server should start on localhost:8080.

🖥️ Usage
Open your browser and go to http://localhost:8080 (or open index.html directly if testing frontend only).

Crop Tool: Enter soil N-P-K values to see what to grow.

Fertilizer Tool: Select your soil type and crop to get dosage advice.

Doctor Tool: Upload a leaf image. The system will resize it to 224x224, send it to the Python API, and return the disease diagnosis.

📂 Project Structure
Plaintext

smart-crop-advisory/
├── backend-java/           # Spring Boot Application
│   ├── src/main/java/      # Controllers, Services, Models
│   └── src/main/resources/ # Application properties
├── ml-services/            # Python Microservices
│   ├── models/             # Saved .h5 and .pkl files
│   ├── crop_api.py         # FastAPI for Text Data
│   ├── disease_api.py      # FastAPI for Image Data
│   ├── requirements.txt    # Python dependencies
│   └── class_indices.json  # Class labels for disease model
└── frontend/               # Web Interface
    ├── css/                # Stylesheets
    ├── js/                 # API connection logic
    └── images/             # Assets
🔬 Research Basis
This project is grounded in contemporary research (2023-2025):

Ensemble Learning: Validated by Pawan et al. (2024) for superior accuracy over single decision trees.

Hybrid Fertilizer Logic: Implements the "Logic Translation Layer" proposed by Mamatha & Nayak (2024).

Visual AI: Uses Transfer Learning (MobileNetV2) as recommended by Chaudhary (2023) for North Indian crops.

Web Architecture: Adopts a PWA approach over Native Apps based on accessibility studies by Murad (2025).

🤝 Contributing
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.