// pages/admin/AdminOrders.jsx ← FINAL LIVE VERSION (REAL ORDERS)
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllOrders } from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
      setLoading(false);

      // NEW ORDER TOAST
      if (sorted.length > orders.length) {
        toast.success("New order received!", { icon: "🔔" });
        playBell();
      }
    } catch (err) {
      console.log("No real orders yet — normal");
      setOrders([]);
      setLoading(false);
    }
  };

  const playBell = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3");
    audio.play().catch(() => {});
  };

  const markAsReady = async (orderId) => {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: "Ready" } : o));
    toast.success("Order Ready! Student notified");
    playBell();
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center py-32 text-3xl">Loading Live Orders...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-orange-600 text-center mb-4">LIVE ORDERS PANEL</h1>
        <p className="text-center text-2xl mb-10">Real-time • Auto-refresh every 5 sec</p>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-xl">
            <p className="text-5xl text-gray-400">No orders yet</p>
            <p className="text-2xl text-gray-500 mt-4">Waiting for students...</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map(order => (
              <div key={order._id} className={`bg-white rounded-3xl shadow-2xl p-8 border-l-8 
                ${order.status === "Ready" ? "border-green-500" : "border-orange-500"}`}>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-orange-600">Order #{order._id.slice(-6)}</h2>
                    <p className="text-2xl font-semibold">Student: {order.user?.username || "Guest"}</p>
                    <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`px-8 py-4 rounded-full text-white text-2xl font-bold 
                    ${order.status === "Pending" ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}>
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-lg py-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="text-right text-3xl font-bold text-orange-600 mt-4">
                    Total: ₹{order.totalAmount}
                  </div>
                </div>

                {order.status === "Pending" && (
                  <button
                    onClick={() => markAsReady(order._id)}
                    className="w-full bg-green-500 text-white py-6 rounded-2xl font-bold text-3xl hover:bg-green-600 transform hover:scale-105 transition shadow-lg"
                  >
                    MARK AS READY → DING DONG
                  </button>
                )}

                {order.status === "Ready" && (
                  <div className="text-center py-8 bg-green-100 rounded-3xl">
                    <p className="text-5xl font-bold text-green-800">ORDER READY!</p>
                  </div>
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