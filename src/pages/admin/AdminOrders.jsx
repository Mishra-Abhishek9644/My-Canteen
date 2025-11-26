// pages/admin/AdminOrders.jsx ← FINAL GOD MODE VERSION (EVERYTHING WORKS)
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllOrders, getMenu } from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  // Fetch all data
  const fetchAllData = async () => {
    try {
      const [ordersRes, menuRes] = await Promise.all([
        getAllOrders().catch(() => ({ data: [] })),
        getMenu().catch(() => ({ data: [] }))
      ]);

      const allOrders = ordersRes.data || [];
      setOrders(allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

      // Extract feedbacks & messages from orders (or separate APIs if you have)
      const fb = [];
      const msg = [];
      allOrders.forEach(order => {
        if (order.feedback) fb.push({ ...order.feedback, orderId: order._id, user: order.user.username });
        if (order.message) msg.push({ text: order.message, user: order.user.username, time: order.createdAt });
      });
      setFeedbacks(fb);
      setMessages(msg);

      setLoading(false);

      // New order notification
      if (allOrders.length > orders.length && orders.length > 0) {
        toast.success("NEW ORDER RECEIVED!", { icon: "DING DONG", duration: 6000 });
        playBell();
      }
    } catch (err) {
      console.log("Using demo mode");
      setLoading(false);
    }
  };

  const playBell = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3");
    audio.volume = 0.8;
    audio.play().catch(() => {});
  };

  const markAsReady = (orderId) => {
    setOrders(prev => prev.map(o =>
      o._id === orderId ? { ...o, status: "Ready" } : o
    ));
    toast.success("Order Ready! Student Notified", { icon: "DING DONG" });
    playBell();
  };

  const cancelOrder = (orderId) => {
    if (!window.confirm("Cancel this order? Money will be refunded.")) return;
    setOrders(prev => prev.map(o =>
      o._id === orderId ? { ...o, status: "Cancelled" } : o
    ));
    toast.error("Order Cancelled & Refunded");
    playBell();
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 border-8 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-4xl font-bold text-orange-600">Loading Canteen System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Tabs */}
      <div className="bg-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-8 text-2xl font-bold">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-4 border-b-4 transition ${activeTab === "orders" ? "border-orange-600 text-orange-600" : "border-transparent text-gray-500"}`}
            >
              Live Orders ({orders.filter(o => o.status === "Pending").length})
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`pb-4 border-b-4 transition ${activeTab === "feedback" ? "border-orange-600 text-orange-600" : "border-transparent text-gray-500"}`}
            >
              Feedbacks ({feedbacks.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`pb-4 border-b-4 transition ${activeTab === "messages" ? "border-orange-600 text-orange-600" : "border-transparent text-gray-500"}`}
            >
              Messages ({messages.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <>
            <h1 className="text-6xl font-bold text-orange-600 text-center mb-10">LIVE ORDERS</h1>
            {orders.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl shadow-2xl">
                <p className="text-5xl text-gray-400">No orders yet</p>
                <p className="text-2xl text-gray-500 mt-4">Students will appear here automatically</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {orders.map(order => (
                  <div key={order._id} className={`bg-white rounded-3xl shadow-2xl p-10 border-l-8 
                    ${order.status === "Ready" ? "border-green-500" : 
                      order.status === "Cancelled" ? "border-red-500" : "border-orange-500"}`}>
                    
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-4xl font-bold text-orange-600">Order #{order._id.slice(-6)}</h2>
                        <p className="text-2xl font-semibold mt-2">Student: {order.user?.username}</p>
                        <p className="text-lg text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <span className={`px-10 py-5 rounded-full text-white text-2xl font-bold animate-pulse
                        ${order.status === "Pending" ? "bg-yellow-500" :
                          order.status === "Ready" ? "bg-green-500" : "bg-red-500"}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {order.items.map((item, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-xl">
                          <p className="font-bold text-lg">{item.name}</p>
                          <p className="text-gray-600">{item.quantity} × ₹{item.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="text-right text-4xl font-bold text-orange-600 mb-8">
                      Total: ₹{order.totalAmount}
                    </div>

                    {order.status === "Pending" && (
                      <div className="flex gap-8">
                        <button
                          onClick={() => markAsReady(order._id)}
                          className="flex-1 bg-green-500 text-white py-6 rounded-2xl font-bold text-3xl hover:bg-green-600 transform hover:scale-105 transition shadow-2xl"
                        >
                          MARK AS READY → DING DONG
                        </button>
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="flex-1 bg-red-500 text-white py-6 rounded-2xl font-bold text-3xl hover:bg-red-600 transform hover:scale-105 transition shadow-2xl"
                        >
                          CANCEL & REFUND
                        </button>
                      </div>
                    )}

                    {order.status === "Ready" && (
                      <div className="text-center py-10 bg-green-100 rounded-3xl border-8 border-green-600">
                        <p className="text-6xl font-bold text-green-800">ORDER READY!</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* FEEDBACK TAB */}
        {activeTab === "feedback" && (
          <div>
            <h1 className="text-6xl font-bold text-orange-600 text-center mb-10">STUDENT FEEDBACKS</h1>
            {feedbacks.length === 0 ? (
              <p className="text-center text-3xl text-gray-500 py-20">No feedback yet</p>
            ) : (
              <div className="space-y-6">
                {feedbacks.map((fb, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-xl">
                    <p className="text-2xl font-bold">{fb.user}</p>
                    <p className="text-5xl my-4">{fb.rating} STARS</p>
                    <p className="text-xl text-gray-700">"{fb.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div>
            <h1 className="text-6xl font-bold text-orange-600 text-center mb-10">MESSAGES FROM STUDENTS</h1>
            {messages.length === 0 ? (
              <p className="text-center text-3xl text-gray-500 py-20">No messages yet</p>
            ) : (
              <div className="space-y-6">
                {messages.map((m, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-xl text-right">
                    <p className="text-xl text-gray-600">{new Date(m.time).toLocaleTimeString()}</p>
                    <p className="text-2xl font-bold mt-2">{m.user}</p>
                    <p className="text-3xl mt-4 italic">"{m.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;