import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });

  /* ================= VERIFY USER ================= */
// verify first user
  const verifyUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  /* ================= OLD FUNCTIONS (UNCHANGED) ================= */

  const getAllNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/notes/getallnotes");
      if (res.data.success) {
        setNotes(res.data.notes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getArchivedNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/notes/archived");
      if (res.data.success) {
        setNotes(res.data.notes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTrashNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/notes/trash");
      if (res.data.success) {
        setNotes(res.data.notes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFavouriteNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/notes/favourite");
      if (res.data.success) {
        setNotes(res.data.notes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= NEW SMART FUNCTION ================= */

  const getSmartNotes = async (params = {}) => {
    try {
      setLoading(true);

      const res = await api.get("/api/notes/smartsearch", {
        params,
      });

      if (res.data.success) {
        setNotes(res.data.notes);
        setPagination({
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalResults: res.data.totalResults,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DASHBOARD ================= */

  const getDashboard = async () => {
    try {
      const res = await api.get("/api/notes/dashboard");
      if (res.data.success) {
        setDashboardStats(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (data) => {
    try {
      const res = await api.post("/api/notes/create", data);
      if (res.data.success) {
        getAllNotes(); // Purana behavior same
      }
    } catch (error) {
      console.log(error);
    }
  };
// pass props
  return (
    <NotesContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        verifyUser,
        notes,
        setNotes,
        dashboardStats,
        loading,
        pagination,
        getAllNotes, // old
        getArchivedNotes, // old
        getTrashNotes, // old
        getFavouriteNotes, // old
        getSmartNotes, // new
        getDashboard,
        createNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
