// pages/customer/Home.jsx  ← FULL REPLACEMENT
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaUtensils, FaClock, FaStar, FaPlus, FaMinus } from "react-icons/fa";
import canteenImg from '../../assets/canteen.jpg';
import { useCart } from '../../Context/CartContext.jsx';
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMenu } from "../../services/api";  // ← NEW

const Home = () => {
  const { user } = useAuth();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [comboItems, setComboItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // FETCH REAL MENU & SHOW ONLY COMBOS
  useEffect(() => {
    getMenu()
      .then(res => {
        const combos = res.data.filter(item => item.category.toLowerCase() === "combo");
        setComboItems(combos);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load combos");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const getItemQuantity = (id) => {
    return cartItems.find(item => item._id === id)?.quantity || 0;
  };

  if (loading) return <div className="text-center py-20 text-2xl">Loading combos...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero + Search — SAME AS BEFORE */}
      <div className="relative h-[500px] w-full bg-gray-900 overflow-hidden">
        <img src={canteenImg} alt="Canteen" className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80'} />
        <div className="absolute bg-black/50 inset-0 flex items-center justify-center">
          <div className="w-full max-w-2xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-xl">
              Welcome to <span className="text-orange-400">Campus Canteen</span>
            </h1>
            <div className="relative max-w-md mx-auto">
              <input
                type="text" placeholder="Search for food items..."
                className="w-full py-3 px-5 rounded-full backdrop-blur-sm bg-white/10 border-0 focus:ring-2 focus:ring-orange-500 shadow-lg font-bold text-xl text-white"
                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600">
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S COMBOS — REAL FROM DB */}
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Today's Special Combos</h2>
          <p className="text-gray-600 mt-2">Delicious meals at discounted prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comboItems.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500">No combos today</p>
          ) : (
            comboItems.map((item) => {
              const quantity = getItemQuantity(item._id);
              return (
                <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-2xl">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover hover:scale-105 transition" />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">₹{item.price}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" /><span className="text-gray-700">4.5</span>
                      </div>
                      {quantity === 0 ? (
                        <button onClick={() => !user ? (toast.error("Login required!") || navigate("/login")) : addToCart({ ...item, id: item._id })}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2 bg-orange-100 rounded-lg px-2 py-1">
                          <button onClick={() => updateQuantity(item._id, quantity - 1)}><FaMinus /></button>
                          <span className="w-8 text-center font-medium">{quantity}</span>
                          <button onClick={() => updateQuantity(item._id, quantity + 1)}><FaPlus /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Features + Footer — 100% SAME */}
      {/* ... your exact same code below ... */}
      {/* (Copy from your old file — no change needed) */}
    </div>
  );
};

export default Home;