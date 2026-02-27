import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import ThemeProvider from "./context/ThemeContext.jsx";
import NotesProvider from "./context/NotesContext.jsx";
// import ToastProvider from "./components/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./context/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotesProvider>
          <App />
          <ToastProvider />
        </NotesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
