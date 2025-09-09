# 🚀 Expanders API

A Node.js + TypeScript API that integrates MySQL, MongoDB, and Gmail for authentication and application functionality.  

---

## 📑 Table of Contents
- [Features](#-features)
- [Environment Setup](#-environment-setup)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Postman Collection](#-postman-collection)
- [Tech Stack](#-tech-stack)

---

## ✨ Features
- TypeScript-based Node.js backend
- MySQL & MongoDB database integration
- Gmail integration via App Passwords
- JWT-based authentication
- Ready-to-use Postman collection for API testing

---

## ⚙️ Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=server_port_number

# MySQL
SQL_HOST=my_sql_host
SQL_USER=my_sql_user
SQL_PASS=my_sql_password
SQL_DATABASE_NAME=expanders

# MongoDB
MONGO_HOST=mongodb_host
MONGO_PORT=27017

# Gmail (App Password required)
GMAIL_USER=your_gmail_account
GMAIL_APP_PASSWORD=your_gmail_app_password

# JWT
JWT_SECRET=your_long_secret_key

---

## 📦 Installation
Make sure you have Node.js and TypeScript installed.

# Install dependencies
npm install

# Development mode
npm run start:dev (this will compile and run the code all in one go)

---

## 🧪 Postman Collection

A Postman collection (expanders.postman_collection.json) is included in the project.
Import it into Postman
 to test API endpoints quickly.

---

🛠️ Tech Stack

Node.js (Runtime)

Express.js (Framework)

TypeScript (Language)

MySQL (Relational Database)

MongoDB (NoSQL Database)

JWT (Authentication)

Nodemailer / Gmail API (Email Integration)

