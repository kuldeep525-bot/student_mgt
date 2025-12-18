# backend of project

### folder structure

```pgsql

│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── note.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── note.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── utils/
│   │   └── token.js
│   │
│   └── app.js
│
├── server.js
├── .env
└── package.json
```