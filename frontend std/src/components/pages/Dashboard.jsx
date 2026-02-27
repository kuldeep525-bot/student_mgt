import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { NotesContext } from "../../context/NotesContext";
import Footer from "../layout/Footer";

/* ================= Animated Counter ================= */
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;

    if (!value) {
      setCount(0);
      return;
    }

    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count}</span>;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { getDashboard, getAllNotes, dashboardStats, notes, loading } =
    useContext(NotesContext);

  const { user } = useContext(NotesContext);

  useEffect(() => {
    getDashboard();
    getAllNotes();
  }, []);

  const username = user?.name || "User";

  /* ================= PIE DATA (BACKEND BASED) ================= */

  const pieData = [
    {
      name: "Active",
      value:
        (dashboardStats?.totalNotes || 0) - (dashboardStats?.archiveNotes || 0),
    },
    {
      name: "Archived",
      value: dashboardStats?.archiveNotes || 0,
    },
    {
      name: "Trash",
      value: dashboardStats?.deleteNotes || 0,
    },
    {
      name: "Favourite",
      value: dashboardStats?.favouriteNotes || 0,
    },
  ];

  const COLORS = ["#6366F1", "#0EA5E9", "#EF4444", "#FACC15"];

  const recentNotes = notes?.filter((note) => !note.isDeleted)?.slice(0, 3);

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-base-200 to-base-300 transition-all duration-500">
        {/* SIDEBAR (UNCHANGED) */}
        <div className="w-64 bg-base-100 p-6 border-r border-base-300  md:block shadow-lg">
          <h2 className="text-xl font-bold mb-8">My Notes</h2>

          <ul className="space-y-4 text-sm">
            <li className="font-semibold text-primary">Dashboard</li>
            <li>
              <Link to="/notes" className="hover:text-primary transition">
                All Notes
              </Link>
            </li>
            <li
              onClick={() => navigate("/notes?filter=archived")}
              className="cursor-pointer hover:text-primary transition"
            >
              Archive
            </li>
            <li
              onClick={() => navigate("/notes?filter=trash")}
              className="cursor-pointer hover:text-primary transition"
            >
              Trash
            </li>
          </ul>

          <button
            onClick={() => navigate("/notes/create")}
            className="btn btn-primary w-full mt-10 rounded-xl shadow-md hover:scale-105 transition"
          >
            + New Note
          </button>
        </div>

        {/* MAIN */}
        <div className="flex-1 p-6 md:p-10">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Welcome, {username} 👋</h1>
            <button
              onClick={() => navigate("/notes/create")}
              className="btn btn-primary btn-sm hover:scale-105 transition"
            >
              + Create
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center mt-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              {/* STATS CARDS (BACKEND BASED) */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
                {[
                  {
                    label: "Total Notes",
                    value: dashboardStats?.totalNotes || 0,
                    gradient: "from-indigo-500 to-purple-500",
                  },
                  {
                    label: "Archived",
                    value: dashboardStats?.archiveNotes || 0,
                    gradient: "from-emerald-500 to-green-500",
                  },
                  {
                    label: "Trash",
                    value: dashboardStats?.deleteNotes || 0,
                    gradient: "from-red-500 to-pink-500",
                  },
                  {
                    label: "Favourite",
                    value: dashboardStats?.favouriteNotes || 0,
                    gradient: "from-yellow-400 to-orange-500",
                  },
                  {
                    label: "This Month",
                    value: dashboardStats?.thisMonthNotes || 0,
                    gradient: "from-violet-500 to-indigo-500",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-r ${item.gradient} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition duration-300`}
                  >
                    <p className="text-sm opacity-90">{item.label}</p>
                    <h2 className="text-3xl font-bold mt-2">
                      <AnimatedCounter value={item.value} />
                    </h2>
                  </div>
                ))}
              </div>

              {/* CHARTS */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* MONTHLY LINE CHART (BACKEND DATA) */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Monthly Notes</h2>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardStats?.monthlyStats || []}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#6366F1"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* PIE */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-6">
                    Notes Distribution
                  </h2>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RECENT NOTES */}
              <div>
                <h2 className="text-xl font-semibold mb-6">Recent Notes</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentNotes?.length > 0 ? (
                    recentNotes.map((note) => (
                      <div
                        key={note._id}
                        onClick={() => navigate(`/notes/edit/${note._id}`)}
                        className="bg-base-100 p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
                      >
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                        <p className="text-sm opacity-60 mt-2 line-clamp-3">
                          {note.content}
                        </p>
                        <div className="mt-4 text-xs opacity-50">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center opacity-60">
                      No notes yet.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
