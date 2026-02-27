import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { NotesContext } from "../../context/NotesContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(NotesContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/auth/logout",
        {},
        { withCredentials: true },
      );

      toast.success("Logged out successfully");

      setUser(null);

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-6">Logout</h1>

        <div className="space-y-4">
          <button onClick={handleLogout} className="btn btn-error w-full">
            Yes, Logout
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-outline w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
