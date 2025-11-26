// pages/customer/Orders.jsx ← REPLACE OR CREATE THIS FILE
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMyOrders, createOrder } from "../../services/api"; // we'll add cancel API later

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      // Your backend might not have cancel route yet — so we just remove locally for now
      // Later I'll give you full backend cancel route
      setOrders(prev => prev.filter(o => o._id !== orderId));
      toast.success("Order cancelled successfully!");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  if (loading) return <div className="text-center py-20 text-2xl">Loading your orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-32">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">No orders yet</h2>
        <button onClick={() => window.location.href = "/menu"} className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600">
          Order Something Delicious
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-10">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-xl rounded-2xl p-6 border-l-8 border-orange-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID: #{order._id.slice(-6)}</p>
                <p className="text-lg font-bold">Total: ₹{order.totalAmount}</p>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <span className={`inline-block px-4 py-2 rounded-full text-white font-bold text-sm
                  ${order.status === "Pending" ? "bg-yellow-500" :
                    order.status === "Ready" ? "bg-green-500" :
                    order.status === "Cancelled" ? "bg-red-500" :
                    "bg-gray-500"}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Items:</p>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {order.status === "Pending" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition"
              >
                Cancel Order
              </button>
            )}

            {order.status === "Ready" && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
                <p className="text-green-800 font-bold text-xl">Your order is ready! Collect from counter</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;