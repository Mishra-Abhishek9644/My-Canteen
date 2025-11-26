// components/CartSidebar.jsx ← REPLACE ENTIRE FILE
import { useCart } from "../Context/CartContext";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b bg-orange-500 text-white">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-white hover:bg-orange-600 p-2 rounded">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price} each</p>
              </div>

              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 flex items-center justify-center"
                >
                  <FaMinus size={12} />
                </button>

                <span className="font-bold text-lg w-10 text-center">{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-green-500 text-white w-8 h-8 rounded-full hover:bg-green-600 flex items-center justify-center"
                >
                  <FaPlus size={12} />
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800 ml-2 font-medium text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span className="text-orange-600">₹{totalPrice}</span>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;