// pages/customer/Orders.jsx  ← FULL REPLACEMENT
import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/api";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data))
      .catch(() => toast.error("Failed to load orders"));
  }, []);

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

  const statusColor = (s) => {
    if (s === "Pending") return "bg-yellow-100 text-yellow-700";
    if (s === "Completed") return "bg-green-100 text-green-700";
    if (s === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

      <div className="flex gap-3 mb-6">
        {["All", "Pending", "Completed", "Cancelled"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-medium ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
            {f}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between">
                <p><strong>Order ID:</strong> {order._id.slice(-6)}</p>
                <span className={`px-4 py-1 rounded-full text-sm font-bold ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600">₹{order.totalAmount} • {new Date(order.createdAt).toLocaleString()}</p>
              <div className="mt-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;