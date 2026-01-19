import { API_BASE_URL } from "./config.js";

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      window.location.href = "login.html";
    }
  } catch (error) {
    window.location.href = "login.html";
  }
};
