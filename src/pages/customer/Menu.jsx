// pages/customer/Menu.jsx  ← REPLACE ENTIRE FILE
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaStar, FaFire, FaLeaf, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMenu } from "../../services/api";  // ← NEW

const MenuPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('all');
  const [foodType, setFoodType] = useState('all');
  const [spicyFilter, setSpicyFilter] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  // FETCH REAL MENU FROM BACKEND
  useEffect(() => {
    getMenu()
      .then(res => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load menu");
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === 'all' || item.category === activeCategory) &&
      (foodType === 'all' || item.type === foodType) &&
      (!spicyFilter || item.spicy)
    );
  });

  const getItemQuantity = (id) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  if (loading) return <div className="text-center py-20">Loading menu...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* SAME UI AS BEFORE — NOTHING CHANGED VISUALLY */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for food items..."
            className="w-full py-3 px-5 pr-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-white border'}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Rest of your filters and grid — 100% SAME */}
        {/* ... your exact same JSX ... */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const quantity = getItemQuantity(item._id);
              return (
                <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <span className="text-orange-600 font-bold">₹{item.price}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      {quantity === 0 ? (
                        <button onClick={() => !user ? toast.error("Login required!") || navigate("/login") : addToCart({ ...item, id: item._id })}
                          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center space-x-3 bg-orange-100 rounded-lg px-4 py-2">
                          <button onClick={() => updateQuantity(item._id, quantity - 1)}><FaMinus /></button>
                          <span className="font-bold w-8 text-center">{quantity}</span>
                          <button onClick={() => updateQuantity(item._id, quantity + 1)}><FaPlus /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-xl text-gray-600">No items found</div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;