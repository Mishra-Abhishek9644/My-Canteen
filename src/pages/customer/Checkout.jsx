// pages/customer/Checkout.jsx ← REPLACE ENTIRE FILE (FINAL VERSION)
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
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!user) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    try {
      // FINAL PAYLOAD THAT YOUR BACKEND ACCEPTS
      const orderPayload = {
        items: cartItems.map(item => ({
          product: item._id,        // ← This is what your backend expects
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || ""
        })),
        totalAmount: totalPrice
      };

      console.log("Sending order:", orderPayload); // ← Remove later if you want

      const response = await createOrder(orderPayload);

      clearCart();
      toast.success("Order Placed Successfully! Your food is being prepared");
      navigate("/orders");

    } catch (err) {
      console.error("Order Error:", err.response || err);
      
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error ||
                      "Failed to place order. Try again.";

      toast.error(errorMsg);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-32">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Your cart is empty</h2>
        <button 
          onClick={() => navigate("/menu")} 
          className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-10">
      <h2 className="text-4xl font-bold text-orange-600 text-center mb-8">Checkout</h2>

      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between items-center bg-gray-50 p-5 rounded-xl">
            <div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
            </div>
            <p className="text-xl font-bold text-orange-600">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t-4 border-orange-200">
        <div className="flex justify-between items-center text-2xl font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">₹{totalPrice}</span>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-6">Payment Method: Cash on Delivery (COD)</p>
        
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-orange-500 text-white py-5 rounded-2xl text-2xl font-bold hover:bg-orange-600 transform hover:scale-105 transition duration-200 shadow-lg"
        >
          Confirm Order & Pay at Counter
        </button>
      </div>
    </div>
  );
}

export default Checkout;