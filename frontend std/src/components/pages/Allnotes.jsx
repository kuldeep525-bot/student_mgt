import { useContext, useEffect, useState } from "react";
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
  showInfo,
  showSuccess,
  showWarning,
} from "../../utils/toast";

const AllNotes = () => {
  const { notes = [], getSmartNotes, loading } = useContext(NotesContext);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* ===== Initial Fetch ===== */
  useEffect(() => {
    getSmartNotes();
    showSuccess("Notes fetched successfully");
  }, []);

  /* ===== Filter Change ===== */
  const handleFilterChange = (type) => {
    setFilter(type);

    const query = {};

    if (type === "archived") query.archived = true;
    if (type === "favourite") query.favourite = true;
    if (type === "trash") query.deleted = true;

    getSmartNotes(query);
  };

  /* ===== Search (Debounce) ===== */
  useEffect(() => {
    const delay = setTimeout(() => {
      const query = {};

      if (filter === "archived") query.archived = true;
      if (filter === "favourite") query.favourite = true;
      if (filter === "trash") query.deleted = true;
      if (search) query.search = search;

      getSmartNotes(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, filter]);

  /* ===== Refresh ===== */
  const refreshNotes = () => {
    const query = {};

    if (filter === "archived") query.archived = true;
    if (filter === "favourite") query.favourite = true;
    if (filter === "trash") query.deleted = true;

    getSmartNotes(query);
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
      `/api/notes/${note.isFavourite ? "unfavourite" : "favourite"}/${note._id}`
    );
    showInfo(res.data.message);
    refreshNotes();
  };

  const handleArchive = async (e, note) => {
    e.stopPropagation();
    const res = await api.patch(
      `/api/notes/${note.isArchived ? "unarchive" : "archive"}/${note._id}`
    );
    showSuccess(res.data.message);
    refreshNotes();
  };

  return (
    <>
      <div className="flex min-h-screen bg-base-200">
        {/* Sidebar */}
        <div className="w-64 bg-base-100 p-6 border-r">
          <h2 className="text-xl font-bold mb-8">My Notes</h2>

          <ul className="space-y-3">
            {["all", "archived", "favourite", "trash"].map((item) => (
              <li
                key={item}
                onClick={() => handleFilterChange(item)}
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

        {/* Main */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold capitalize">
              {filter} Notes
            </h1>

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
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div
                    key={note._id}
                    onClick={() =>
                      navigate(`/notes/edit/${note._id}`)
                    }
                    className="bg-base-100 p-6 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
                  >
                    <h3 className="font-semibold text-lg">
                      {note.title}
                    </h3>

                    <p className="text-sm opacity-60 mt-2 line-clamp-3">
                      {note.content}
                    </p>

                    <div className="flex justify-end gap-4 mt-4 text-lg">
                      {filter === "trash" ? (
                        <>
                          <MdRestore
                            onClick={(e) =>
                              handleRestore(e, note._id)
                            }
                            className="text-green-600"
                          />
                          <MdDeleteForever
                            onClick={(e) =>
                              handleHardDelete(e, note._id)
                            }
                            className="text-red-600"
                          />
                        </>
                      ) : (
                        <>
                          <FaEdit
                            className="text-green-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/notes/edit/${note._id}`);
                            }}
                          />

                          <CiStar
                            onClick={(e) =>
                              handleFavourite(e, note)
                            }
                            className={`${
                              note.isFavourite
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />

                          {note.isArchived ? (
                            <MdOutlineUnarchive
                              onClick={(e) =>
                                handleArchive(e, note)
                              }
                              className="text-blue-600"
                            />
                          ) : (
                            <MdArchive
                              onClick={(e) =>
                                handleArchive(e, note)
                              }
                              className="text-gray-400"
                            />
                          )}

                          <MdDelete
                            onClick={(e) =>
                              handleSoftDelete(e, note._id)
                            }
                            className="text-red-500"
                          />
                        </>
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