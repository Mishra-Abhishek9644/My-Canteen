import { useCart } from "../Context/CartContext";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); 

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 pb-4 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 rounded"
                  disabled={item.quantity <= 1}
                >
                  <FaMinus size={12} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  <FaPlus size={12} />
                </button>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">₹{totalPrice}</span>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="w-full bg-orange-500 text-white py-2 rounded mb-2"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
