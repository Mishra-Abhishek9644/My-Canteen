// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';

function Navbar({ onCartClick }) {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-orange-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Campus Canteen
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/menu" className="hover:underline">Menu</Link>
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
