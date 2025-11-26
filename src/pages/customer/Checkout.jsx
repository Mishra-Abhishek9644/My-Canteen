// pages/customer/Checkout.jsx ← REPLACE FULLY
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { createOrder } from "../../services/api";

function Checkout() {
  const { cartItems, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return toast.error("Cart is empty!");

    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await createOrder({
        items: cartItems.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalPrice
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick={() => navigate("/menu")} className="mt-4 bg-orange-500 text-white px-6 py-3 rounded">
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Checkout</h2>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between border-b pb-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
            </div>
            <p className="font-bold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t-2 border-orange-200">
        <div className="flex justify-between text-xl font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">₹{totalPrice}</span>
        </div>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="w-full mt-8 bg-orange-500 text-white py-4 rounded-lg text-xl font-bold hover:bg-orange-600 transition"
      >
        Confirm Order (COD)
      </button>
    </div>
  );
}

export default Checkout;