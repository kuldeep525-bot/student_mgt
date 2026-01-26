# backend of project

### folder structure :version 1

│
├── src/
│ ├── config/
│ │ └── db.js
│ │
│ ├── models/
│ │ ├── User.js
│ │ └── Note.js
│ │
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── note.routes.js
│ │
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── note.controller.js
│ │
│ ├── middleware/
│ │ └── auth.middleware.js
│ │
│ │
├── server.js
├── .env
└── package.json

```

### version 2

student-management-backend/
│
├── src/
│ │
│ ├── config/
│ │ ├── db.js # MongoDB connection
│ │ ├── googleAuth.js # Google OAuth
│ │
│ ├── controllers/
│ │ ├── user.controller.js # Login, Register, Google OAuth
│ │ ├── note.controller.js # Notes CRUD (soft delete)
│ │ └── admin.controller.js # Admin specific actions
│ │
│ ├── models/
│ │ ├── user.model.js # User schema (role, googleId, status)
│ │ └── note.model.js # Note schema (isDeleted)
│ │
│ ├── routes/
│ │ ├── user.routes.js # /login /register /google
│ │ ├── note.routes.js # Notes APIs
│ │ └── admin.routes.js # Admin routes
│ │
│ ├── middlewares/
│ │ ├── jwt.middleware.js # JWT verify
│ │ ├── admin.middleware.js # User / Admin check
│ │ ├── block.middleware.js # Blocked user check
│ │ └── validate.middleware.js #validate middleware
│ │
│ ├── services/
│ │ ├── google.service.js # Google token verification
│ │ ├── email.service.js # Forgot password emails
│ │ └── token.service.js # JWT / reset token logic
│ │
│ │
│ ├── validators/
│ │ ├── auth.validator.js # Login/Register validation
│ │ ├── note.validator.js # Notes validation
│ │
│ │
│ └── server.js # Server entry point
│
│
├── .env # Environment variables
├── .gitignore
├── package.json
└── README.md # V2 documentation
```
