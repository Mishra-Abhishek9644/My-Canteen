import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const { username } = useAuth();

  useEffect(() => {
  const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  // filter orders belonging to this user + sort newest → oldest
  const userOrders = storedOrders
    .filter((o) => o.user === username)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  setOrders(userOrders);
}, [username]);


  const handleCancel = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId && order.status === "Pending"
        ? { ...order, status: "Cancelled" }
        : order
    );
    setOrders(updatedOrders);

    // update localStorage (only for this user’s orders)
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newAllOrders = allOrders.map((order) =>
      order.id === orderId && order.user === username
        ? { ...order, status: "Cancelled" }
        : order
    );
    localStorage.setItem("orders", JSON.stringify(newAllOrders));
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>

      <div className="flex space-x-3 mb-6">
        {["All", "Pending", "Completed", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === f
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No {filter} orders.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <p className="font-semibold">Payment: {order.payment}</p>

              {/* colored status badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>

              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <div className="font-bold mt-2">Total: ₹{order.total}</div>

              {order.status === "Pending" && (
                <button
                  onClick={() => handleCancel(order.id)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
