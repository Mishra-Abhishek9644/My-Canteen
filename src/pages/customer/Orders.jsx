import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All"); // 👈 new filter state

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Cancel order handler
  const handleCancel = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId && order.status === "Pending"
        ? { ...order, status: "Cancelled" }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Apply filter
  const filteredOrders = orders.filter((order) =>
    filter === "All" ? true : order.status === filter
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>

      {/* Filter buttons */}
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

              {/* Status with color */}
              <p
                className={`font-semibold ${
                  order.status === "Pending"
                    ? "text-yellow-600"
                    : order.status === "Completed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {order.status}
              </p>

              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <div className="font-bold mt-2">Total: ₹{order.total}</div>

              {/* Cancel button only if order is still pending */}
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
