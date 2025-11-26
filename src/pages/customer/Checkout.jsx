// pages/customer/Checkout.jsx  ← FULL REPLACEMENT
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { createOrder } from "../../services/api";

function Checkout() {
  const { cartItems, clearCart, totalPrice } = useCart();
  const [paymentMethod] = useState("COD");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

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
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: totalPrice
      });

      clearCart();
      toast.success("Order Placed Successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t pt-4 font-bold text-xl">
          Total: ₹{totalPrice}
        </div>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="w-full mt-8 bg-orange-500 text-white py-4 rounded-lg text-xl hover:bg-orange-600 font-bold"
      >
        Confirm Order (COD)
      </button>
    </div>
  );
}

export default Checkout;