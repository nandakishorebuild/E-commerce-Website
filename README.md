# 🛒 Store — E-Commerce Web App with Authentication

A modern **full stack web application** featuring secure authentication and a responsive e-commerce user interface. Built using **React.js, Node.js, Express.js, and MySQL**, this project focuses on authentication, routing, and frontend state management.

---

## 🌐 Live Demo

### 🔗 Frontend (Vercel)
👉 [https://e-commerce-website-test-2yjv.vercel.app](https://e-commerce-website-test-2yjv.vercel.app)

### 🔗 Backend (Render)
👉 [https://e-commerce-website-test.onrender.com](https://e-commerce-website-test.onrender.com)

---

## 📌 Description

This project demonstrates how to build a secure authentication system and integrate it with a modern e-commerce UI. Users can register, login, browse products, and manage their cart seamlessly.

---

## 🚀 Features

### 🔐 Authentication (Backend - Express.js)

* User Registration
* User Login
* JWT Authentication
* HTTP-only Cookies for secure sessions
* Protected Routes
* Logout functionality

---

### 🛍️ E-Commerce UI (Frontend - React.js)

* Product listing page
* Search functionality
* Pagination support
* Responsive design (mobile + desktop)

---

### 🛒 Cart Features

* Add items to cart
* Increase / decrease quantity
* Remove items
* Auto total price calculation

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MySQL
* JWT (jsonwebtoken)
* bcryptjs
* cookie-parser
* dotenv

---

## 📁 Project Structure

```bash
E-commerce-Website/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── App.jsx
├── server/
│   ├── index.js
│   ├── db.js
│   └── .env (not pushed)
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/nandakishorebuild/E-commerce-Website.git
cd E-commerce-Website
```

---

### 2️⃣ Install Dependencies

```bash
npm install
cd server
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file inside `server/`

```env
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_db
```

---

### 4️⃣ Setup MySQL Database

```sql
CREATE DATABASE auth_db;
USE auth_db;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
```

---

### 5️⃣ Run Application

#### Start Backend

```bash
cd server
node index.js
```

#### Start Frontend

```bash
npm run dev
```

---

### 🌐 Access Application (Local)

```
http://localhost:5173
```

> For the live hosted version, visit the links in the [Live Demo](#-live-demo) section above.

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT-based authentication
* HTTP-only cookies for security
* Environment variables for sensitive data

---

## 📚 What I Learned

* Building authentication using JWT
* Backend APIs using Express.js
* React routing and protected routes
* State management using Context API
* MySQL database integration

---

## 👨‍💻 Author

**Nanda Kishore**
Aspiring Full Stack Developer
GitHub: [https://github.com/nandakishorebuild](https://github.com/nandakishorebuild)

---

## 📄 License

This project is licensed under the MIT License.
