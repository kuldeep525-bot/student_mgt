import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NotesContext } from "../../context/NotesContext";
import api from "../../services/api";

const Navbar = () => {
  const { user, setUser, authLoading } = useContext(NotesContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      {/* LEFT - LOGO */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold tracking-wide">
          NoteSphere
        </Link>
      </div>

      {/* CENTER MENU (Desktop) */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          <li>
            <Link to="/">Home</Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/notes">My Notes</Link>
              </li>
            </>
          )}

          <li>
            <details>
              <summary>Products</summary>
              <ul className="p-2 bg-base-100 w-44 z-10">
                <li>
                  <a>URL Shortner</a>
                </li>
                <li>
                  <a className="opacity-50 cursor-not-allowed">Upcoming...</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end gap-3">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          title="Toggle Theme"
        >
          {theme === "forest" ? "🌙" : "☀️"}
        </button>

        {authLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            {/* ✅ UPDATED AVATAR LOGIC */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user.profileImg ? (
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={user.profileImg}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
            >
              <li className="px-3 py-2 font-semibold text-sm opacity-70">
                {user.name}
              </li>

              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/notes">My Notes</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link to="/admin/dashboard" className="text-warning">
                    Admin Panel
                  </Link>
                </li>
              )}

              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>

            <Link to="/signup" className="btn btn-sm btn-outline">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
