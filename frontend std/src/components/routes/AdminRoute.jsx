import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useContext(NotesContext);

  if (authLoading) return <p>Loading...</p>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;