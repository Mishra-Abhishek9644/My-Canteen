// pages/admin/AdminOrders.jsx ← CREATE THIS FILE
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllOrders } from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      // Sort newest first
      setOrders((res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    } catch {
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const markAsReady = (orderId) => {
    setOrders(prev => prev.map(o => 
      o._id === orderId ? { ...o, status: "Ready" } : o
    ));
    toast.success("Order marked as Ready!");
    // Play bell sound (next step)
  };

  const cancelOrder = (orderId) => {
    if (!window.confirm("Cancel this order?")) return;
    setOrders(prev => prev.map(o => 
      o._id === orderId ? { ...o, status: "Cancelled" } : o
    ));
    toast.success("Order cancelled");
  };

  if (loading) return <div className="text-center py-20 text-3xl">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-orange-600 text-center mb-10">Admin - Live Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-2xl text-gray-600">No orders yet</div>
        ) : (
          <div className="grid gap-6">
            {orders.map(order => (
              <div key={order._id} className={`bg-white rounded-2xl shadow-xl p-8 border-l-8 
                ${order.status === "Ready" ? "border-green-500" : 
                  order.status === "Cancelled" ? "border-red-500" : "border-orange-500"}`}>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-2xl font-bold">Order #{order._id.slice(-6)}</p>
                    <p className="text-lg">Customer: <strong>{order.user?.username || "Unknown"}</strong></p>
                    <p className="text-gray-600">Time: {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>

                  <span className={`px-6 py-3 rounded-full text-white text-xl font-bold
                    ${order.status === "Pending" ? "bg-yellow-500" :
                      order.status === "Ready" ? "bg-green-500" : "bg-red-500"}`}>
                    {order.status}
                  </span>
                </div>

                <div className="border-t pt-4 mb-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <span className="font-medium">{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="font-bold text-xl text-right mt-4 text-orange-600">
                    Total: ₹{order.totalAmount}
                  </div>
                </div>

                {order.status === "Pending" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => markAsReady(order._id)}
                      className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-green-600 transition"
                    >
                      Mark as Ready
                    </button>
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="flex-1 bg-red-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-red-600 transition"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}

                {order.status === "Ready" && (
                  <div className="text-center p-6 bg-green-100 rounded-xl">
                    <p className="text-2xl font-bold text-green-800">Order Ready for Collection!</p>
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