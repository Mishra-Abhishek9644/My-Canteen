import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

function Navbar({ onCartClick }) {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Campus Canteen
        </Link>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* Guest Links */}
          {!user && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/menu" className="hover:underline">Menu</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </>
          )}

          {/* Customer Links */}
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

          {/* Admin Links */}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/admin/orders" className="hover:underline">Orders</Link>
              <Link to="/admin/feedbacks" className="hover:underline">Feedbacks</Link>
              <Link to="/admin/messages" className="hover:underline">Messages</Link>
            </>
          )}

          {/* User section */}
          // In Navbar → replace the user section with this:
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">{user.username}</span>
              <button onClick={logout} className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold hover:bg-gray-100">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-orange-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 px-4 py-3 space-y-3 space-x-5">
          {!user && (
            <>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </>
          )}

          {user && user.role === "customer" && (
            <>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
              <Link to="/orders" onClick={() => setIsOpen(false)}>My Orders</Link>
              <Link to="/feedback" onClick={() => setIsOpen(false)}>Feedback</Link>
              <button onClick={onCartClick} className="flex items-center mt-2">
                <FaShoppingCart className="mr-1" /> Cart ({totalQuantity})
              </button>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/admin/orders" onClick={() => setIsOpen(false)}>Orders</Link>
              <Link to="/admin/feedbacks" onClick={() => setIsOpen(false)}>Feedbacks</Link>
              <Link to="/admin/messages" onClick={() => setIsOpen(false)}>Messages</Link>
            </>
          )}

          {user ? (
            <>
              {/* Only customers get Profile */}
              {user.role === "customer" && (
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className="flex items-center"
                >
                  <FaUser className="mr-2" /> Profile
                </button>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
