
# 🌾 Smart Crop Advisory System – Backend

*AI-powered backend platform for intelligent agricultural decision support*

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![Java](https://img.shields.io/badge/Java-21-orange)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![AI](https://img.shields.io/badge/AI-Spring%20AI-purple)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Twilio-25D366)
![Build](https://img.shields.io/badge/Build-Maven-red)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📌 Project Overview

The **Smart Crop Advisory System – Backend** is a **Spring Boot 3.x–based, AI-driven backend application** designed to assist farmers with **data-driven agricultural insights**.

It integrates **AI advisory services, disease and weather alerts, WhatsApp notifications, and a community blogging platform** into a unified, scalable backend system.

🎓 **Academic Context**
**B.Tech Minor Project | AI + Agriculture**

---

## 🚀 Core Features

### 👤 User Management

* User registration and authentication
* Secure login using Spring Security
* Update and delete user profiles
* Fetch users by ID or email

### 🤖 AI Advisory

* AI chatbot for agriculture-related queries
* Streaming AI responses for real-time interaction
* AI-generated disease and advisory messages

### 📢 WhatsApp Alerts

* Twilio WhatsApp Sandbox integration
* Automated alert notifications
* Dynamic phone number support

### 📝 Blog & Community

* Create, update, and delete blog posts
* Comment system for community interaction
* Fetch blogs by user
* Knowledge sharing among farmers

---

## 🛠️ Technology Stack

| Layer                | Technology                  |
| -------------------- | --------------------------- |
| Backend Framework    | Spring Boot 3.x             |
| Programming Language | Java 21                     |
| ORM                  | Spring Data JPA (Hibernate) |
| Security             | Spring Security             |
| Database             | MySQL                       |
| AI Integration       | Spring AI (OpenAI)          |
| Messaging            | Twilio WhatsApp             |
| Build Tool           | Maven                       |

---

## 📂 Project Structure

```
Smart_Crop_Advisory_Backend/
│
├── 📂 Smart_crop_advisory_backend/        # [BACKEND API] Java Spring Boot
│   ├── pom.xml
│   ├── backend_sql.sql                    # Database Schema
│   └── src/main/java/com/example_Backend/
│       ├── SmartCropAdvisoryBackendApplication.java
│       ├── 📂 ConfigSecurity/             # Auth & Security
│       ├── 📂 Controllers/                # REST Controllers (Chat, User, Blog)
│       ├── 📂 DTO/                        # Data Transfer Objects
│       ├── 📂 Entity/                     # DB Models (User, Crop, Soil, etc.)
│       ├── 📂 Repository/                 # JPA Repositories
│       └── 📂 entityServices/             # Business Logic (Email, WhatsApp)
```

---

## ⚙️ Environment Configuration

### `application.properties` (Example)

```properties
spring.application.name=smart-crop-advisory-backend
server.port=8082

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/smart_crop_advisory_db
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# AI Configuration
spring.ai.openai.api-key=YOUR_OPENAI_API_KEY

# Twilio WhatsApp Configuration
twilio.account.sid=YOUR_TWILIO_ACCOUNT_SID
twilio.auth.token=YOUR_TWILIO_AUTH_TOKEN
twilio.whatsapp.from=whatsapp:+14155238886
```

---

## 🔐 Security Note

⚠️ **Never commit sensitive credentials to GitHub.**

Add the following entry to your `.gitignore` file:

```
application.properties
```

---

## 🧪 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/smart-crop-advisory-backend.git
```

### 2️⃣ Import the Project

* Open **Eclipse** or **IntelliJ IDEA**
* Import as an **Existing Maven Project**

### 3️⃣ Build the Project

```bash
mvn clean install
```

### 4️⃣ Run the Application

```bash
mvn spring-boot:run
```

The application will be available at:

```
http://localhost:8082
```

---

## 🔗 REST API Overview

### 👤 User APIs

```
POST   /User
GET    /User/login
GET    /User/byid/{id}
PUT    /User/update/{id}
DELETE /User/deleteuserbyid/{id}
```

### 🤖 AI Advisory APIs

```
GET /ai/demo?q=question
GET /ai/ask?q=question
GET /ai/alert?lang=hi&city=Delhi
```

### 📢 WhatsApp APIs

```
POST /whatsapp/sandbox/join
POST /whatsapp/sendmess
```

### 📝 Blog APIs

```
POST /blog/createBlog
GET  /blog
GET  /blog/getbyuserid/{id}
POST /blog/createdcomment/{id}
```

---

## 📲 WhatsApp Sandbox Setup

1. Start the backend application
2. Call the following API:

```http
POST /whatsapp/sandbox/join
```

✔ Opens WhatsApp automatically
✔ Joins Twilio Sandbox
✔ Enables alert delivery

---

## 📘 Documentation

* Minor Project Report
* System Architecture Diagram
* Workflow Diagram
* ER Diagram
* Methodology, Results, and Future Scope

---

## 👨‍💻 Contributors

| Name            |
| --------------- |
| **Shanu Ahmed** |
| Abhay Maurya    |
| Amit Yadav      |
| Varun Rana      |
| Samir Ahmad     |

---

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create a new feature branch
3. Commit changes with clear messages
4. Push the branch and open a Pull Request

---




