# 💅 Beauty Line Academy – Digital Platform Project

This repository is based on the **Beauty Line Academy Project Brief**, which defines the requirements for building a complete digital ecosystem for a professional beauty academy.

The goal is to translate a real-world beauty business into a **full-stack web application** that supports education, product sales, and equipment management.

---

## 📌 Project Overview

**Beauty Line Academy** is a professional training center and beauty supplier with over 10 years of experience in the industry.  
The academy operates around three main pillars:

- 🎓 **Professional Education**
- 🧴 **Cosmetic Distribution**
- 🛠️ **Aesthetic Equipment Sales & Rental**

This project challenges developers to recreate this ecosystem as a **digital monolith**, combining business logic, e-commerce features, and educational workflows.

---

## 🎯 Mission Statement

As a developer, your mission is to build a business-oriented platform that:

- Showcases courses with an intuitive booking experience
- Presents equipment with clear **purchase vs. rental** options
- Allows professionals to easily find products through categories and filters
- Simulates a real-world professional software development workflow

This is **not just a website**, but a **business management tool**.

---

## 🧱 Suggested Tech Stack

The stack reflects tools commonly used in modern full-stack bootcamps:

### Frontend

- Vite
- React

### Backend

- Node.js
- Express

### Database

- MongoDB
- Mongoose

---

## 🚀 Running Locally

Follow these steps to run the Beauty Line Academy application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

You can verify your installations by running:

```bash
node --version
npm --version
```

### Setup & Run Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/robdll/beautyline-academy.git
cd beautyline-academy
```

#### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backEnd
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` to set your MongoDB connection string and desired port (see `backEnd/.env.example` for details).

Start the backend server:

```bash
npm run dev
```

The backend will be running at **http://localhost:3000**

#### 3. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontEnd
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` to set your Cloudinary cloud name (see `frontEnd/.env.example` for details).

Start the frontend development server:

```bash
npm run dev
```

The frontend will be running at **http://localhost:5173**

### Accessing the Application

- **Frontend**: Open your browser and go to [http://localhost:5173](http://localhost:5173)
- **Backend API**: The API is available at [http://localhost:3000](http://localhost:3000)

### Optional: MongoDB Setup

The project uses MongoDB as its database. While the database integration is still in development, you can prepare for it by:

1. Installing [MongoDB Community Edition](https://www.mongodb.com/try/download/community) locally, or
2. Setting up a free cloud database with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

When the database integration is complete, you'll need to add your MongoDB connection string to the backend's `.env` file:

```bash
MONGODB_URI=mongodb://localhost:27017/beautyline-academy
# or use your MongoDB Atlas connection string
```

---
