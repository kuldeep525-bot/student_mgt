import { Route, Routes } from "react-router";
import { Login } from "../auth/Login";
import { Signup } from "../auth/SignUp";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const NotesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default NotesRoutes;
