# 📚 Student Notes & Papers Platform – Backend

This repository contains the **backend API** for the Student Notes & Papers Platform.
It is built using **Node.js, Express, and MongoDB** following an **MVC architecture**.

The backend provides secure APIs for authentication, notes management, paper purchasing, and admin operations.

---

# 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Google OAuth
* Multer (File Upload)
* Cloudinary (File Storage)
* Nodemailer / Brevo (Email Service)
* Cron Jobs
* REST API

---

# 📂 Project Structure

```
backend
│
├── src
│
│   ├── config
│   │    ├── db.js
│   │    └── googleAuth.js
│
│   ├── controllers
│   │    ├── auth.controller.js
│   │    ├── admin.controller.js
│   │    ├── user.controller.js
│   │    ├── notes.controller.js
│   │    └── paper.controller.js
│
│   ├── middleware
│   │    ├── auth.middleware.js
│   │    ├── admin.middleware.js
│   │    ├── jwt.middleware.js
│   │    ├── block.middleware.js
│   │    ├── multer.middleware.js
│   │    └── validate.middleware.js
│
│   ├── models
│   │    ├── user.Model.js
│   │    ├── notes.model.js
│   │    └── paper.model.js
│
│   ├── routes
│   │    ├── user.routes.js
│   │    ├── admin.routes.js
│   │    ├── notes.routes.js
│   │    └── paper.routes.js
│
│   ├── validations
│   │    ├── auth.validators.js
│   │    └── note.validators.js
│
│   └── job
│        ├── cleanup.job.js
│        └── date.js
```

---

# 🔐 Authentication System

The backend includes a complete authentication system:

* User Registration
* Login with JWT
* Google OAuth Login
* Password Reset via Email
* Secure Token Verification

Authentication is handled using **JWT middleware**.

---

# 📖 Notes Module

Users can manage study notes with the following features:

* Create Notes
* Upload Notes
* Edit Notes
* Delete Notes
* Fetch All Notes

Notes data is stored in **MongoDB** using Mongoose models.

---

# 📄 Papers Module

The system allows students to purchase exam papers.

Features include:

* Create Papers (Admin)
* List Papers
* Download Papers
* Paper purchase verification

---

# 👨‍💻 Admin Features

Admin users can:

* Manage users
* Block / unblock users
* Create and manage papers
* View platform data

Admin access is protected by **Admin Middleware**.

---

# 📧 Email System

Emails are used for:

* Password Reset
* Notifications

Email service is implemented using:

* Nodemailer
* Brevo SMTP

---

# 📁 File Upload

File uploads are handled using:

* Multer middleware
* Cloudinary storage

Supported uploads:

* Notes files
* Paper documents

---

# ⏱ Background Jobs

A cleanup job runs automatically to:

* Remove unused files
* Maintain database consistency

---

# ⚙️ Installation

Clone the repository

```
git clone https://github.com/yourusername/backend-project.git
```

Install dependencies

```
npm install
```

Start development server

```
npm run dev
```

Run production server

```
npm start
```

---

# 🌍 Environment Variables

Create a `.env` file in the root directory.

Example:

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

The backend can be deployed on:

* Render
* Railway
* AWS
* DigitalOcean

---

# 👨‍💻 Author

Kuldeep Kumar
MERN Stack Developer

GitHub: https://github.com/kuldeep525-bot/student_mgt/
