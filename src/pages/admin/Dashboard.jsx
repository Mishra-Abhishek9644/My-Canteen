// pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0, pending: 0, ready: 0, cancelled: 0, revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAllOrders();
        const orders = res.data || [];
        setStats({
          total: orders.length,
          pending: orders.filter(o => o.status === "Pending").length,
          ready: orders.filter(o => o.status === "Ready").length,
          cancelled: orders.filter(o => o.status === "Cancelled").length,
          revenue: orders.filter(o => o.status === "Ready").reduce((sum, o) => sum + o.totalAmount, 0)
        });
      } catch {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-orange-600 mb-16">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition">
            <p className="text-5xl font-bold text-orange-600">{stats.total}</p>
            <p className="text-xl text-gray-700 mt-4">Total Orders</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition">
            <p className="text-5xl font-bold">{stats.pending}</p>
            <p className="text-xl mt-4">Pending</p>
          </div>
          <div className="bg-green-500 text-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition">
            <p className="text-5xl font-bold">{stats.ready}</p>
            <p className="text-xl mt-4">Ready</p>
          </div>
          <div className="bg-red-500 text-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition">
            <p className="text-5xl font-bold">{stats.cancelled}</p>
            <p className="text-xl mt-4">Cancelled</p>
          </div>
          <div className="bg-purple-600 text-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition">
            <p className="text-5xl font-bold">₹{stats.revenue}</p>
            <p className="text-xl mt-4">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;