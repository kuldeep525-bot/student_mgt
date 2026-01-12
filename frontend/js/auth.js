//import pe dikkat a rhi hai
//register form
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

//swithc UI

function showRegister() {
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
}

function showLogin() {
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //page ko reload hona se rokta hai
  //input value uthao

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  //validation

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    console.log(data.message);

    if (response.ok) {
      alert("Registration successful");
      window.location.href = "login.html";
    }

    if (!response.ok) {
      if (Array.isArray(data.error)) {
        alert(data.error.join("\n"));
      } else {
        alert(data.message);
      }
      return;
    }
  } catch (error) {
    alert("Server error");
    console.error(error);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //input value uthao
  const email = document.getElementById("loginemail").value.trim();
  const password = document.getElementById("loginpassword").value.trim();

  //validation

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  //main work backend ki api call karo
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    alert("Login successful");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Server error");
  }
});
