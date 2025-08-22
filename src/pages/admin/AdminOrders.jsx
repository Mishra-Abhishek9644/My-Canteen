import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const sorted = [...storedOrders].sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0) // 👈 sort by timestamp
    );
    setOrders(sorted);
  }, []);

  const saveOrders = (updated) => {
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    saveOrders(updatedOrders);
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Preparing":
        return "bg-orange-100 text-orange-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 👇 filter orders by search (username or ID)
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.user && o.user.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Order ID or Username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full p-2 border rounded"
      />

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No matching orders.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">
                Date:{" "}
                {order.timestamp
                  ? new Date(order.timestamp).toLocaleString()
                  : "Unknown"}
              </p>

              {/* customer badge */}
              <p className="font-medium">
                Customer:{" "}
                <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                  {order.user || "Unknown"}
                </span>
              </p>

              <p className="font-semibold">Payment: {order.payment}</p>
              <p className="font-semibold">Total: ₹{order.total}</p>

              <ul className="mt-2 text-sm">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
