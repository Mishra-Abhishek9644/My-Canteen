import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <p className="font-semibold">Payment: {order.payment}</p>
              <p className="font-semibold">Status: {order.status}</p>

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
