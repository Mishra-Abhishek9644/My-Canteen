import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaUtensils, FaClock, FaStar, FaPlus, FaMinus } from "react-icons/fa";
import canteenImg from '../../assets/canteen.jpg';
import { useCart } from '../../Context/CartContext.jsx';
import { products } from "../../data/products.js";

const Home = () => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const comboItems = products.filter(item => item.category === 'combo');

  // Search state for hero search bar
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/menu?search=${encodeURIComponent(searchValue)}`);
    }
  };

  // Get quantity for each item in cart
  const getItemQuantity = (id) => {
    const itemInCart = cartItems.find(item => item.id === id);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full bg-gray-900 overflow-hidden">
        <img
          src={canteenImg}
          alt="Canteen"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80';
          }}
        />

        {/* Dark overlay */}
        <div className="absolute bg-black/50 inset-0 flex items-center justify-center">
          <div className="w-full max-w-2xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-xl">
              Welcome to <span className="text-orange-400">Campus Canteen</span>
            </h1>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search for food items..."
                className="w-full py-3 px-5 rounded-full backdrop-blur-sm bg-white/10 border-0 focus:ring-2 focus:ring-orange-500 shadow-lg font-bold text-xl text-white"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-all"
              >
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Combo Deals Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Today's Special Combos</h2>
          <p className="text-gray-600 mt-2">Delicious meals at discounted prices</p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comboItems.map((item) => {
            const quantity = getItemQuantity(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-2xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" />
                      <span className="text-gray-700">4.5</span>
                    </div>
                    {quantity === 0 ? (
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2 bg-orange-100 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="text-orange-500 hover:text-orange-700 p-1"
                        >
                          <FaMinus />
                        </button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="text-orange-500 hover:text-orange-700 p-1"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaUtensils className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Fresh Food</h3>
              <p className="text-gray-600 mt-2">Made with quality ingredients daily</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaClock className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Fast Service</h3>
              <p className="text-gray-600 mt-2">Quick preparation for dine-in orders</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaStar className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Student Discount</h3>
              <p className="text-gray-600 mt-2">Special prices for college students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Campus Canteen</h3>
              <p className="text-gray-400">
                Providing delicious and affordable meals for students and staff.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/menu" className="text-gray-400 hover:text-orange-500">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-orange-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-orange-500">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
              <p className="text-gray-400">Monday - Friday: 8AM - 8PM</p>
              <p className="text-gray-400">Saturday: 9AM - 5PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Campus Canteen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
