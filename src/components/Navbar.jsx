import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

function Navbar({ onCartClick }) {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-orange-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Campus Canteen
        </Link>

        <div className="flex space-x-6 items-center">
          {/* Links for guests */}
          {!user && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/menu" className="hover:underline">Menu</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </>
          )}

          {/* Links for customers */}
          {user && user.role === "customer" && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/menu" className="hover:underline">Menu</Link>
              <Link to="/orders" className="hover:underline">My Orders</Link>
              <Link to="/feedback" className="hover:underline">Feedback</Link>

              {/* Cart button */}
              <button
                onClick={onCartClick}
                className="relative hover:text-gray-200"
              >
                <FaShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Links for admins */}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/admin/orders" className="hover:underline">Orders</Link>
              <Link to="/admin/feedbacks" className="hover:underline">Feedbacks</Link>
              <Link to="/admin/messages" className="hover:underline">Messages</Link>
            </>
          )}

          {/* User section */}
          {user ? (
            <div className="flex items-center space-x-3">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate("/profile")} // 👈 profile page
              >
                <FaUser />
                <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-sm font-semibold">
                  Profile
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
