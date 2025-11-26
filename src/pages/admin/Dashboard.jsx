// pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    ready: 0,
    cancelled: 0,
    revenue: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await getAllOrders();
      const orders = res.data || [];

      setStats({
        total: orders.length,

        // 🔥 FIXED — MongoDB stores lowercase
        pending: orders.filter(o => o.status?.toLowerCase() === "pending").length,
        ready: orders.filter(o => o.status?.toLowerCase() === "ready").length,
        cancelled: orders.filter(o => o.status?.toLowerCase() === "cancelled").length,

        // 🔥 Revenue = Only completed / ready orders
        revenue: orders
          .filter(o => o.status?.toLowerCase() === "ready")
          .reduce((sum, o) => sum + o.totalAmount, 0)
      });
    } catch (err) {
      console.log("Dashboard load failed");
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3000); // 🔥 Live every 3 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-orange-600 mb-16">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          <StatCard label="Total Orders" value={stats.total} color="white" text="text-orange-600" />
          <StatCard label="Pending" value={stats.pending} color="bg-yellow-500 text-white" />
          <StatCard label="Ready" value={stats.ready} color="bg-green-500 text-white" />
          <StatCard label="Cancelled" value={stats.cancelled} color="bg-red-500 text-white" />
          <StatCard label="Revenue" value={`₹${stats.revenue}`} color="bg-purple-600 text-white" />

        </div>
      </div>
    </div>
  );
};

// 🔥 Clean reusable stat card
const StatCard = ({ label, value, color, text }) => (
  <div className={`rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition ${color}`}>
    <p className={`text-5xl font-bold ${text || ""}`}>{value}</p>
    <p className="text-xl mt-4">{label}</p>
  </div>
);

export default AdminDashboard;
