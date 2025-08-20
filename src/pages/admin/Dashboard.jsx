import { useEffect, useState } from "react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;
  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
          <h3 className="text-sm text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold">{pendingOrders}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
          <h3 className="text-sm text-gray-500">Completed Orders</h3>
          <p className="text-2xl font-bold">{completedOrders}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500">
          <h3 className="text-sm text-gray-500">Cancelled Orders</h3>
          <p className="text-2xl font-bold">{cancelledOrders}</p>
        </div>
      </div>

      {/* Revenue */}
      <div className="mt-6 bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
        <h3 className="text-sm text-gray-500">Total Revenue</h3>
        <p className="text-2xl font-bold">₹{totalRevenue}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
