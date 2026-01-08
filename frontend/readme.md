
### file structure

```pgsql


frontend/
│
├── index.html              # Entry point (redirect to login)
│
├── pages/
│   ├── login.html          # Login page
│   ├── register.html       # Register page
│   └── dashboard.html      # Dashboard (protected)
│
├── css/
│   └── style.css           # Global styles, theme, fonts
│
├── js/
│   ├── auth.js             # Login & Register logic
│   ├── dashboard.js        # Dashboard logic
│   └── utils.js            # Helper functions (JWT, redirect)
│
├── assets/
│   ├── images/             # Logos, icons, illustrations
│   └── icons/              # SVG icons (optional)
│
└── README.md               # Frontend documentation

```


### project flow


```

START
  |
  v
Login Page
  |
  |-- success --> Save JWT
  |
  v
Dashboard
  |
  |-- View Notes --> Notes List Page
  |       |
  |       |-- Add --> Add/Edit Page
  |       |
  |       |-- Edit --> Add/Edit Page
  |       |
  |       |-- Delete --> Refresh List
  |
  |-- Profile --> Profile Page
  |
  |-- Logout --> Clear JWT --> Login Page
```