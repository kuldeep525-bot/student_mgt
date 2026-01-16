# StudentMGT – Frontend (HTML, CSS)

This is the **production-style frontend UI** for the **StudentMGT** project, built using **pure HTML and CSS**. JavaScript logic (API calls, auth, state) is intentionally kept separate and can be added later.

---

## 🚀 Tech Stack

- **HTML5** – Semantic, accessible markup
- **CSS3** – Modular, reusable, responsive design
- **Vanilla JS** – (to be added by developer)

---

## 📁 Folder Structure

```
frontend/
│
├── login.html
├── register.html
├── dashboard.html
│
├── css/
│   ├── base.css          # reset, variables, global styles
│   ├── layout.css        # layout helpers (container, wrappers)
│   ├── components.css    # buttons, cards, forms, modal
│   ├── auth.css          # login & register page styles
│   ├── dashboard.css     # dashboard & notes UI
│   └── responsive.css    # media queries (mobile first)
│
└── assets/
    └── images/
```

---

## 🎯 Pages Overview

### 🔐 Auth Pages

- `login.html` – User login UI
- `register.html` – User registration UI

Features:

- Centered card layout
- Reusable form components
- Mobile-first responsive design

---

### 📊 Dashboard Page

- `dashboard.html`

Features:

- Top navigation bar
- Notes grid layout
- Add / Edit note modal
- Empty state support
- Fully responsive (mobile → desktop)

---

## 🎨 CSS Architecture (Why This Approach?)

- **base.css** → global reset & CSS variables
- **layout.css** → page structure & containers
- **components.css** → reusable UI blocks
- **page-level CSS** → page-specific styling
- **responsive.css** → clean media queries

This structure follows **separation of concerns**, making the UI scalable and easy to maintain.

---

## 📱 Responsive Design Strategy

- Mobile-first design
- Flexbox & CSS Grid
- Breakpoints:

  - `768px` → Tablet
  - `1024px` → Desktop

---

## 🔌 Backend Integration Ready

This frontend is designed to work seamlessly with a REST API backend.

Expected API mapping:

| Page        | API                       |
| ----------- | ------------------------- |
| Login       | POST `/api/auth/login`    |
| Register    | POST `/api/auth/register` |
| Dashboard   | GET `/api/notes`          |
| Add Note    | POST `/api/notes`         |
| Edit Note   | PUT `/api/notes/:id`      |
| Delete Note | DELETE `/api/notes/:id`   |

---

## ▶️ How to Run

1. Open the `frontend` folder
2. Use **Live Server** (VS Code extension) or any static server
3. Start from `login.html`

> ⚠️ Do not open files directly using `file://` when using JS fetch later

---

## 🧪 Status

- ✅ UI Complete (HTML + CSS)
- ✅ Responsive
- ✅ Production-ready structure
- ⏳ JavaScript integration pending

---

## 💬 Interview Explanation (One Line)

> “I built a production-ready frontend using pure HTML and CSS with a modular architecture, reusable components, and mobile-first responsive design, keeping it backend-integration ready.”

---

## 📌 Next Improvements

- Add JavaScript for API integration
- Form validation
- Loader & error states
- Pagination logic

---

**Author:** Kuldeep Kumar
