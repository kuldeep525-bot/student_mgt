```md
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);
const [notes, setNotes] = useState([]);
const [dashboardStats, setDashboardStats] = useState(null);
const [loading, setLoading] = useState(false);

// verify user

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
/_ ================= FETCH FUNCTIONS ================= _/

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
getAllNotes();
}
} catch (error) {
console.log(error);
}
};

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
        getAllNotes,
        getArchivedNotes,
        getTrashNotes,
        getFavouriteNotes,
        getDashboard,
        createNote,
      }} >
{children}
</NotesContext.Provider>
);
};

export default NotesProvider;
```

```
import { useContext, useEffect, useState, useMemo } from "react";
import { NotesContext } from "../../context/NotesContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

import { FaEdit } from "react-icons/fa";
import {
  MdDelete,
  MdArchive,
  MdOutlineUnarchive,
  MdRestore,
  MdDeleteForever,
} from "react-icons/md";
import { CiStar } from "react-icons/ci";
import Footer from "../layout/Footer";
import {
  showError,
  showInfo,
  showSuccess,
  showWarning,
} from "../../utils/toast";

const AllNotes = () => {
  const { notes = [], getAllNotes, loading } = useContext(NotesContext);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    showSuccess("Notes fetched successfully");
    getAllNotes();
  }, []);

  /* ===== Common Refresh ===== */
  const refreshNotes = async () => {
    await getAllNotes();
  };

  /* ===== Actions ===== */
  const handleSoftDelete = async (e, id) => {
    e.stopPropagation();
    const res = await api.patch(`/api/notes/deletenote/${id}`);
    showInfo(res.data.message);
    refreshNotes();
  };

  const handleHardDelete = async (e, id) => {
    e.stopPropagation();
    const res = await api.delete(`/api/notes/harddeletenote/${id}`);
    showWarning(res.data.message);
    refreshNotes();
  };

  const handleRestore = async (e, id) => {
    e.stopPropagation();

    const res = await api.patch(`/api/notes/restorenote/${id}`);
    showSuccess(res.data.message);
    refreshNotes();
  };

  const handleFavourite = async (e, note) => {
    e.stopPropagation();
    const res = await api.patch(
      `/api/notes/${note.isFavourite ? "unfavourite" : "favourite"}/${note._id}`,
    );
    showInfo(res.data.message);
    refreshNotes();
  };

  const handleArchive = async (e, note) => {
    e.stopPropagation();
    const res = await api.patch(
      `/api/notes/${note.isArchived ? "unarchive" : "archive"}/${note._id}`,
    );
    showSuccess(res.data.message);
    refreshNotes();
  };

  /* ===== Optimized Filtering ===== */
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        if (filter === "archived") return note.isArchived && !note.isDeleted;
        if (filter === "favourite") return note.isFavourite && !note.isDeleted;
        if (filter === "trash") return note.isDeleted;
        return !note.isDeleted;
      })
      .filter((note) =>
        note.title?.toLowerCase().includes(search.toLowerCase()),
      );
  }, [notes, filter, search]);

  return (
    <>
      <div className="flex min-h-screen bg-base-200">
        {/* SIDEBAR */}
        <div className="w-64 bg-base-100 p-6 border-r">
          <h2 className="text-xl font-bold mb-8">My Notes</h2>

          <ul className="space-y-3">
            {["all", "archived", "favourite", "trash"].map((item) => (
              <li
                key={item}
                onClick={() => setFilter(item)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                  filter === item
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/notes/create")}
            className="btn btn-primary w-full mt-10"
          >
            + New Note
          </button>
        </div>

        {/* MAIN */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold capitalize">{filter} Notes</h1>

            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link
                to="/dashboard"
                className="text-lg font-semibold hover:text-primary"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    onClick={() => navigate(`/notes/edit/${note._id}`)}
                    className="bg-base-100 p-6 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
                  >
                    <h3 className="font-semibold text-lg">{note.title}</h3>

                    <p className="text-sm opacity-60 mt-2 line-clamp-3">
                      {note.content}
                    </p>

                    <div className="flex justify-end gap-4 mt-4 text-lg">
                      {filter !== "trash" && (
                        <>
                          <FaEdit
                            className="text-green-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/notes/edit/${note._id}`);
                            }}
                          />

                          <CiStar
                            onClick={(e) => handleFavourite(e, note)}
                            className={`${
                              note.isFavourite
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />

                          {note.isArchived ? (
                            <MdOutlineUnarchive
                              onClick={(e) => handleArchive(e, note)}
                              className="text-blue-600"
                            />
                          ) : (
                            <MdArchive
                              onClick={(e) => handleArchive(e, note)}
                              className="text-gray-400"
                            />
                          )}
                        </>
                      )}

                      {filter === "trash" ? (
                        <>
                          <MdRestore
                            onClick={(e) => handleRestore(e, note._id)}
                            className="text-green-600"
                          />
                          <MdDeleteForever
                            onClick={(e) => handleHardDelete(e, note._id)}
                            className="text-red-600"
                          />
                        </>
                      ) : (
                        <MdDelete
                          onClick={(e) => handleSoftDelete(e, note._id)}
                          className="text-red-500"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="opacity-60">No Notes Found</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllNotes;


```
