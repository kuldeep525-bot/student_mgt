import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (filter) => {
    navigate(`/notes?filter=${filter}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-base-100 p-6 border-r border-base-300 hidden md:block shadow-lg">
      <h2 className="text-xl font-bold mb-8">My Notes</h2>

      <ul className="space-y-4 text-sm">
        <li
          onClick={() => navigate("/dashboard")}
          className={`cursor-pointer hover:text-primary ${
            isActive("/dashboard") ? "text-primary font-semibold" : ""
          }`}
        >
          Dashboard
        </li>

        <li onClick={() => goTo("all")} className="cursor-pointer hover:text-primary">
          All Notes
        </li>

        <li onClick={() => goTo("archived")} className="cursor-pointer hover:text-primary">
          Archive
        </li>

        <li onClick={() => goTo("favourite")} className="cursor-pointer hover:text-primary">
          Favourite
        </li>

        <li onClick={() => goTo("trash")} className="cursor-pointer hover:text-primary">
          Trash
        </li>
      </ul>

      <button
        onClick={() => navigate("/notes/create")}
        className="btn btn-primary w-full mt-10"
      >
        + New Note
      </button>
    </div>
  );
};

export default Sidebar;