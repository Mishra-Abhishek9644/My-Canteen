import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMyOrders, cancelOrderApi } from "../../services/api";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Load orders on mount
  useEffect(() => { if (user) fetchOrders(); }, [user]);

  // Cancel order via API
  const cancelOrder = async (id) => {
    if (!window.confirm("❗Cancel this order permanently?")) return;
    try {
      await cancelOrderApi(id);         // 🔥 Now calls backend
      toast.success("Order cancelled");
      fetchOrders();                   // Refresh orders after cancel
    } catch {
      toast.error("Cancel failed");
    }
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading orders...</div>;

  if (orders.length === 0) return (
    <div className="text-center py-28">
      <h2 className="text-3xl font-bold text-gray-600 mb-6">No Orders Yet</h2>
      <button onClick={() => window.location.href="/menu"} className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600">
        Order Something
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-10">My Orders</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-orange-500">

            <div className="flex justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">Order #{order._id.slice(-6)}</p>
                <p className="font-bold text-lg">₹{order.totalAmount}</p>
                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <span className={`px-4 py-2 rounded-full text-white text-sm font-bold
                ${order.status === "Pending" ? "bg-yellow-500" :
                  order.status === "Ready" ? "bg-green-500" :
                  order.status === "Completed" ? "bg-blue-500" :
                  order.status === "Cancelled" ? "bg-red-500" : "bg-gray-500"}`}>
                {order.status}
              </span>
            </div>

            <div>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b py-1">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {order.status === "Pending" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600">
                Cancel Order
              </button>
            )}

            {order.status === "Ready" && (
              <div className="mt-4 p-3 text-center text-green-700 bg-green-100 rounded-lg font-bold">
                READY for Pickup!
              </div>
            )}

            {order.status === "Completed" && (
              <div className="mt-3 text-center text-blue-600 font-bold">
                Order Completed ✔
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
