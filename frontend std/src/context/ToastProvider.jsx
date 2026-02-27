import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      theme={theme === "forest" ? "dark" : "light"}
    />
  );
};

export default ToastProvider;