// pages/customer/Menu.jsx ← REPLACE ENTIRE FILE
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMenu } from "../../services/api";

const MenuPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('all');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  useEffect(() => setSearchTerm(initialSearch), [initialSearch]);

  useEffect(() => {
    getMenu()
      .then(res => { setMenuItems(res.data); setLoading(false); })
      .catch(() => { toast.error("Failed to load menu"); setLoading(false); });
  }, []);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (activeCategory === 'all' || item.category === activeCategory);
  });

  const getQuantity = (_id) => cartItems.find(i => i._id === _id)?.quantity || 0;

  if (loading) return <div className="text-center py-20 text-2xl">Loading menu...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <input
            type="text" placeholder="Search food..."
            className="w-full p-4 rounded-full border focus:ring-2 focus:ring-orange-500"
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-white border'}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            const qty = getQuantity(item._id);
            return (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-orange-600 font-bold text-xl mt-2">₹{item.price}</p>

                  <div className="mt-4 flex justify-center">
                    {qty === 0 ? (
                      <button
                        onClick={() => !user ? (toast.error("Login required!") || navigate("/login")) : addToCart(item)}
                        className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 font-bold"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 bg-orange-100 px-4 py-2 rounded-full">
                        <button onClick={() => updateQuantity(item._id, qty - 1)} className="text-orange-600">
                          <FaMinus />
                        </button>
                        <span className="font-bold text-lg w-10 text-center">{qty}</span>
                        <button onClick={() => updateQuantity(item._id, qty + 1)} className="text-orange-600">
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
    </div>
  );
};

export default MenuPage;