import { API_BASE_URL } from "./config.js";

//REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); //page reload hona se rokta hai

    //take all the value that are required to register
    //trim() useful for extra spaces
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    //backend api call with fetch and async and await
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //save jwt in the cookies
        body: JSON.stringify({ name, email, password }), //js object=> json
      });

      //jo backend se data ayega voh hum data me store kar lnga
      const data = await response.json().catch(() => null);

      //error handling
      if (response.ok) {
        alert("Registration Successful");
        window.location.href = "login.html";
      }
      //  Backend se error message aaya → dikha diya
      //  Multiple errors ho to join kar diya
      else {
        alert(
          data.message ||
            (Array.isArray(data.error) ? data.error.join("\n") : ""),
        );
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong");
    }
  });
}

/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");
const logingoogleAuth = document.getElementById("google");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        alert(data?.message || "Login failed");
        return;
      }

      alert("Login Successfully");
      window.location.href = "../dashboard.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  });
}

if (logingoogleAuth) {
  logingoogleAuth.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:4000/api/auth/google";
  });
}
const logout = document.getElementById("logout");

if (logout) {
  logout.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        alert(data?.message || "Logout failed");
        window.location.href = "login.html";
        return;
      }

      alert("Logout Successfully");
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  });
}
