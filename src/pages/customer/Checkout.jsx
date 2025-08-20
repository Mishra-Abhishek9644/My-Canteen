// pages/customer/Checkout.jsx
import { useCart } from "../../Context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // 👈 import auth

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const { username } = useAuth(); // 👈 get current user

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Create a new order object linked to the logged-in customer
    const newOrder = {
      id: Date.now().toString() + Math.floor(Math.random() * 100000),
      items: cartItems,
      total: totalPrice,
      payment: paymentMethod,
      status: "Pending",
      date: new Date().toLocaleString(),
      user: username, // 👈 store username
    };

    try {
      const stored = localStorage.getItem("orders");
      const existingOrders = stored ? JSON.parse(stored) : [];

      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } catch (err) {
      console.error("Error saving order:", err);
      localStorage.setItem("orders", JSON.stringify([newOrder]));
    }

    clearCart();
    navigate("/orders");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Cash on Delivery
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="Online"
            checked={paymentMethod === "Online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Online Payment (Mock)
        </label>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
