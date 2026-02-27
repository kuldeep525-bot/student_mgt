import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import Footer from "../components/layout/Footer";
import { showError, showInfo, showSuccess, showWarning } from "../utils/toast";
import { NotesContext } from "../context/NotesContext";

const UsersList = () => {
  const { user: currentUser } = useContext(NotesContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/v2/admin/getAll");
      setUsers(res.data.user || []);
    } catch (err) {
      showError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type, id) => {
    // 🚫 Prevent self block
    if (type === "block" && id === currentUser?._id) {
      showError("You cannot block yourself.");
      return;
    }

    setActionLoading(id);

    let url = "";

    switch (type) {
      case "block":
        url = `/api/v2/admin/users/${id}/block`;
        break;
      case "unblock":
        url = `/api/v2/admin/users/${id}/unblock`;
        break;
      case "restore":
        url = `/api/v2/admin/users/${id}`;
        break;
      default:
        showWarning("Invalid action");
        setActionLoading(null);
        return;
    }

    try {
      await api.patch(url);

      // Optimistic Update
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
                ...user,
                status:
                  type === "block"
                    ? "blocked"
                    : type === "unblock"
                      ? "active"
                      : user.status,
                isDeleted: type === "restore" ? false : user.isDeleted,
              }
            : user,
        ),
      );

      // ✅ Toast AFTER success
      if (type === "block") showSuccess("User blocked successfully");
      if (type === "unblock") showInfo("User unblocked successfully");
      if (type === "restore") showSuccess("User restored successfully");
    } catch (error) {
      showError(error.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Users Management</h1>
            <span className="badge badge-primary">Total: {users.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Deleted</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="font-medium">
                      {user.name}
                      {user._id === currentUser?._id && (
                        <span className="badge badge-outline badge-info ml-2 text-xs">
                          You
                        </span>
                      )}
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <StatusBadge status={user.status} />
                    </td>

                    <td>
                      {user.isDeleted ? (
                        <span className="badge badge-error badge-outline">
                          Yes
                        </span>
                      ) : (
                        <span className="badge badge-success badge-outline">
                          No
                        </span>
                      )}
                    </td>

                    <td className="space-x-2">
                      {user.status !== "blocked" && (
                        <button
                          disabled={actionLoading === user._id}
                          onClick={() => handleAction("block", user._id)}
                          className="btn btn-xs btn-error"
                        >
                          {actionLoading === user._id ? "..." : "Block"}
                        </button>
                      )}

                      {user.status === "blocked" && (
                        <button
                          disabled={actionLoading === user._id}
                          onClick={() => handleAction("unblock", user._id)}
                          className="btn btn-xs btn-success"
                        >
                          {actionLoading === user._id ? "..." : "Unblock"}
                        </button>
                      )}

                      {user.isDeleted && (
                        <button
                          disabled={actionLoading === user._id}
                          onClick={() => handleAction("restore", user._id)}
                          className="btn btn-xs btn-primary"
                        >
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-10 opacity-60">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    active: "badge badge-success",
    blocked: "badge badge-error",
    inactive: "badge badge-warning",
  };

  return <span className={map[status] || "badge badge-neutral"}>{status}</span>;
};

export default UsersList;
