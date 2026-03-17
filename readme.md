# 📚 Student Notes & Papers Platform (MERN Stack)

A full-stack **Student Learning Platform** where students can access study notes, purchase exam papers, and manage their learning resources.

The project is built using the **MERN Stack (MongoDB, Express, React, Node.js)** and includes a complete **authentication system, admin dashboard, notes management, and paper purchasing system**.

---

# 🚀 Live Features

Live Link: https://deploying-cyan.vercel.app/

### 👨‍🎓 Student Features

* User Registration & Login
* Google OAuth Login
* Forgot / Reset Password
* Create & Manage Notes
* Upload Study Materials
* View All Notes
* Purchase Exam Papers
* Download Purchased Papers
* Personal Dashboard

---

### 👨‍💻 Admin Features

Admin dashboard allows administrators to:

* Manage Users
* Block / Unblock Users
* Create Exam Papers
* Manage Papers
* View Platform Data
* Monitor User Activities

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* DaisyUI
* Axios
* React Router DOM
* Framer Motion
* React Toastify
* Recharts
* QR Code Generator

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Google OAuth
* Multer (File Upload)
* Cloudinary (File Storage)
* Nodemailer / Brevo SMTP
* Cron Jobs
* REST API

---

# 📂 Project Structure

```
project-root
│
├── frontend
│   ├── src
│   │   ├── admin
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── validations
│   │   └── job
│
└── README.md
```

---

# 🔐 Authentication System

The platform includes a secure authentication system:

* User Registration
* Login with JWT
* Google OAuth Login
* Password Reset via Email
* Secure Route Protection

---

# 📖 Notes Module

Students can manage study notes:

* Create Notes
* Upload Notes
* Edit Notes
* Delete Notes
* View All Notes

All notes are stored securely in **MongoDB**.

---

# 📄 Papers Purchase System

Students can purchase exam papers.

Features include:

* View Available Papers
* Purchase Papers
* Verify Purchase
* Download Purchased Papers

---

# 📁 File Upload System

File uploads are handled using:

* Multer Middleware
* Cloudinary Storage

Supported files:

* Study Notes
* Exam Papers

---

# 📧 Email System

The platform sends automated emails for:

* Password Reset
* Account Notifications

Email service uses:

* Nodemailer
* Brevo SMTP

---

# ⏱ Background Jobs

Cron jobs are used to:

* Clean unused files
* Maintain database consistency

---

# ⚙️ Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/kuldeep525-bot/student_mgt.git
```

---

### 2️⃣ Install Dependencies

Frontend

```
cd frontend
npm install
```

Backend

```
cd backend
npm install
```

---

### 3️⃣ Run Development Servers

Backend

```
npm run dev
```

Frontend

```
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file inside the **backend** directory.

```
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

BREVO_EMAIL=your_email
BREVO_SMTP_KEY=your_key

GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
```

---

# 🌐 API Base URL

```
http://localhost:4000/api
```

---

# 🚀 Deployment

The project can be deployed using:

Frontend

* Render
* Vercel
* Netlify

Backend

* Render
* Railway
* AWS
* DigitalOcean

---

# 👨‍💻 Author

Kuldeep Kumar
MERN Stack Developer

GitHub:
https://github.com/kuldeep525-bot/student_mgt

---
