// pages/admin/AdminOrders.jsx → FINAL LIVE + UPDATE + CANCEL
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllOrders, updateOrder, cancelOrderApi } from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await getAllOrders();
    const sorted = (res.data || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // 🔔 NEW ORDER NOTIFICATION
    if (sorted.length > orders.length && orders.length !== 0) {
      toast.success("New order received! 🔔");
      playBell();
    }

    setOrders(sorted);
    setLoading(false);
  };

  const playBell = () => {
    new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3").play();
  };

  // 🔥 Mark Order Ready (Backend Connected)
  const markAsReady = async (id) => {
    await updateOrder(id, "ready");
    toast.success("Order marked READY");
    fetchOrders();
  };

  // ❌ Cancel Order
  const cancelOrder = async (id) => {
    if (!confirm("Cancel the order?")) return;
    await cancelOrderApi(id);
    toast.error("Order Cancelled ❌");
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
    const refresh = setInterval(fetchOrders, 5000);
    return () => clearInterval(refresh);
  }, []);

  if (loading) return <h1 className="text-center text-4xl py-40">Loading Live Orders...</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold text-orange-600 text-center mb-3">LIVE ORDERS PANEL</h1>
        <p className="text-center text-2xl mb-10">Live Refresh • Admin Control • Ready + Cancel</p>

        {orders.length === 0 ? (
          <div className="text-center py-32 text-gray-500 text-4xl">No Orders Yet 😴</div>
        ) : (
          <div className="grid gap-8">
            {orders.map(order => (
              <div key={order._id} className={`bg-white rounded-3xl shadow-2xl p-8 border-l-8
                ${order.status === "ready" ? "border-green-500" : "border-orange-500"}`}>

                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-orange-600">Order #{order._id.slice(-5)}</h2>
                    <p className="text-xl font-semibold">Student: {order.user?.username}</p>
                    <p className="text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <span className={`px-6 py-3 rounded-full text-white text-xl font-bold capitalize
                    ${order.status === "pending" ? "bg-yellow-500"
                      : order.status === "cancelled" ? "bg-red-500"
                      : "bg-green-600"}`}>
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  {order.items.map((item, i) => (
                    <p key={i} className="flex justify-between text-lg py-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </p>
                  ))}
                  <p className="text-right text-3xl font-bold text-orange-600">₹{order.totalAmount}</p>
                </div>

                {/* ---------------- BUTTONS ---------------- */}
                {order.status === "pending" && (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => markAsReady(order._id)}
                      className="bg-green-500 text-white text-xl py-4 rounded-xl hover:bg-green-600">
                      ✔ MARK AS READY
                    </button>

                    <button 
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-500 text-white text-xl py-4 rounded-xl hover:bg-red-600">
                      ❌ CANCEL
                    </button>
                  </div>
                )}

                {order.status === "ready" && (
                  <p className="text-center text-green-700 text-3xl font-bold py-4">READY ✔</p>
                )}

                {order.status === "cancelled" && (
                  <p className="text-center text-red-600 text-3xl font-bold py-4">CANCELLED ❌</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
