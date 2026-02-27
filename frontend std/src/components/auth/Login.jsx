import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { NotesContext } from "../../context/NotesContext";
import { toast } from "react-toastify";
import { showError, showSuccess } from "../../utils/toast";

export const Login = () => {
  const { verifyUser } = useContext(NotesContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!email || !password) {
    toast.warning("Email and password required");
    return;
  }
  try {
  const res =  await axios.post(
      BASE_URL + "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    showSuccess("Login successful");
    
    await verifyUser();
    console.log(res)

    navigate("/dashboard", { replace: true });

  } catch (error) {
    console.log(error.message)
    showError(
      error.response?.data?.message || "Login failed"
    );
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />

          <button onClick={handleLogin} className="btn btn-primary w-full">
            Login
          </button>
        </div>

        <p className="text-sm text-center mt-6 opacity-70">
          Don’t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
