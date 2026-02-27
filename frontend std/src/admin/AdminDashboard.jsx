import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "../services/api";
import Footer from "../components/layout/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/api/v2/admin/analytical");
      setData(res.data);
    } catch (err) {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const userGrowth = useMemo(() => {
    if (!data) return [];
    return data.charts.monthlyUserGrowth.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      total: item.total,
    }));
  }, [data]);

  const notesGrowth = useMemo(() => {
    if (!data) return [];
    return data.charts.monthlyNotesGrowth.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      total: item.total,
    }));
  }, [data]);

  const userStatusData = useMemo(() => {
    if (!data) return [];
    return [
      { name: "Active", value: data.users.activeUsers },
      { name: "Inactive", value: data.users.inactiveUsers },
      { name: "Blocked", value: data.users.blockedUsers },
    ];
  }, [data]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white bg-[#111827]">
        Loading Analytics...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#111827]">
        {error}
      </div>
    );

  return (
    <>
      <div className="p-8 bg-[#111827] min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

        {/* ===== ADMIN ACTION CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => navigate("/admin/users")}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Manage Users</h2>
            <p className="text-sm opacity-80">Block, Unblock & Restore users</p>
          </div>

          <div
            onClick={() => navigate("/admin/create-paper")}
            className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Upload Paper</h2>
            <p className="text-sm opacity-80">Upload Question & Answer PDFs</p>
          </div>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total Users" value={data.users.totalUsers} />
          <StatCard title="Total Notes" value={data.notes.totalNotes} />
          <StatCard title="Deleted Notes" value={data.notes.deletedNotes} />
        </div>

        {/* ===== CHARTS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ChartCard title="Monthly User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#60a5fa" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Monthly Notes Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={notesGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#34d399" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ===== PIE CHART ===== */}
        <div className="mt-12">
          <ChartCard title="User Status Distribution">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {userStatusData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
      <Footer />
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-[#1f2937] p-6 rounded-2xl shadow-md hover:shadow-xl transition">
    <h2 className="text-gray-400 mb-2">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg">
    <h2 className="mb-4 font-semibold text-lg">{title}</h2>
    {children}
  </div>
);

export default AdminDashboard;
