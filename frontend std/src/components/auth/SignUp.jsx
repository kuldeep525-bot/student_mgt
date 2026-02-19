
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, email, password, role } = formData;

    // frontend validation
    if (!name || !email || !password ) {
      return alert("All fields are required");
    }


    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register", 
        { name, email, password, role }
      );

      alert(response.data.message);

      // redirect to login
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      data-theme="forest"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm opacity-70 mt-1">Sign up to get started</p>
        </div>

        <div className="space-y-4">

          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>


          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-2"
          >
            Create Account
          </button>
        </div>

        <div className="text-center mt-6 text-sm opacity-70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
