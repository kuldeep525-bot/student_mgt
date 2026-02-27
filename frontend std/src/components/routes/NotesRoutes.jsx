import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Signup } from "../auth/SignUp";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import CreateNote from "../pages/CreateNote";
import Logout from "../auth/Logout";
import AllNotes from "../pages/Allnotes";
import EditNotes from "../pages/EditNotes";
import AdminDashboard from "../../admin/AdminDashboard";
import { AdminLogin } from "../../admin/auth/adminLogin";
import UsersList from "../../admin/UsersList";
import CreatePaper from "../../admin/CreatePaper";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../layout/Profile";

const NotesRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <AllNotes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes/create"
        element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes/edit/:id"
        element={
          <ProtectedRoute>
            <EditNotes />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/login"
        element={
          <AdminRoute>
            <AdminLogin />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UsersList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/create-paper"
        element={
          <AdminRoute>
            <CreatePaper />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default NotesRoutes;
