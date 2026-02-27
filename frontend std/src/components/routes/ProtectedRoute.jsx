import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useContext(NotesContext);

  if (authLoading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;