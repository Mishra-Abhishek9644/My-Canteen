import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart , FaUser} from "react-icons/fa";


function Navbar({ onCartClick }) {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout } = useAuth(); // 👈 from context

  return (
    <nav className="bg-orange-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Campus Canteen
        </Link>

        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/menu" className="hover:underline">Menu</Link>

          {/* Cart */}
          <button onClick={onCartClick} className="relative hover:text-gray-200">
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* User section */}
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <FaUser />
                <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-sm font-semibold">
                  {user.username}
                </span>
              </div>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
