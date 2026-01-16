// auth.js
(function () {
  // REGISTER
  let registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !email || !password) {
        alert("All fields are required");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Registration successful");
          window.location.href = "login.html";
        } else {
          alert(
            data.message ||
              (Array.isArray(data.error) ? data.error.join("\n") : "")
          );
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    });
  }

  // LOGIN
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginemail").value.trim();
      const password = document.getElementById("loginpassword").value.trim();

      if (!email || !password) {
        alert("All fields are required");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login successful");
          // Redirect to dashboard
          // From index.html or login.html (adjust path)
          if (window.location.pathname.endsWith("index.html")) {
            window.location.href = "pages/dashboard.html";
          } else {
            window.location.href = "dashboard.html";
          }
        } else {
          alert(data.message || "Login failed");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    });
  }
})();
