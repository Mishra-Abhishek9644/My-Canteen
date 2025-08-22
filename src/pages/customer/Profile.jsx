// pages/customer/UserProfile.jsx
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";

function UserProfile() {
  const { username, logout } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = storedOrders.filter((o) => o.user === username);

    const total = userOrders.length;
    const pending = userOrders.filter((o) => o.status === "Pending").length;
    const completed = userOrders.filter((o) => o.status === "Completed").length;
    const cancelled = userOrders.filter((o) => o.status === "Cancelled").length;

    setStats({ total, pending, completed, cancelled });
  }, [username]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>

      <div className="mb-6">
        <p className="text-lg">
          <span className="font-semibold">Username:</span> {username}
        </p>
      </div>

      {/* Order stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-orange-100 rounded-lg text-center">
          <p className="text-xl font-bold">{stats.total}</p>
          <p className="text-gray-700">Total Orders</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <p className="text-xl font-bold">{stats.pending}</p>
          <p className="text-gray-700">Pending</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-xl font-bold">{stats.completed}</p>
          <p className="text-gray-700">Completed</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg text-center">
          <p className="text-xl font-bold">{stats.cancelled}</p>
          <p className="text-gray-700">Cancelled</p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
