import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
        if (!email || !password) {
      return alert("Email and password required");
    }

    try {
      const res = await axios.post(
        BASE_URL + "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        },
      );
      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      data-theme="forest"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm opacity-70 mt-1">
            Login to access your dashboard
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(() => e.target.value);
              }}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={() => handleLogin()}
            className="btn btn-primary w-full mt-2"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-6 text-sm opacity-70">
          Don’t have an account?{" "}
          <span className="link link-primary cursor-pointer">
            <Link to={"/signup"}>Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
