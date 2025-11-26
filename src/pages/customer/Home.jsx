// pages/customer/Home.jsx  ← FINAL UPGRADED VERSION
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaStar, FaPlus, FaMinus, FaHeart, FaPhone, FaInfoCircle, FaUtensils } from "react-icons/fa";
import canteenImg from '../../assets/canteen.jpg';
import { useCart } from '../../Context/CartContext.jsx';
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMenu } from "../../services/api";

const Home = () => {
  const { user } = useAuth();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [comboItems, setComboItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMenu()
      .then(res => {
        const combos = res.data.filter(item => item.category.toLowerCase() === "combo");
        setComboItems(combos.slice(0, 8));
        setLoading(false);
      })
      .catch(() => toast.error("Failed to load combos"));
  }, []);

  const handleSearch = () => {
    if (searchValue.trim()) navigate(`/menu?search=${encodeURIComponent(searchValue)}`);
  };

  const getItemQuantity = id => cartItems.find(item => item._id === id)?.quantity || 0;

  if (loading) return <div className="text-center py-20 text-2xl">Loading combos...</div>;

  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[480px] bg-black overflow-hidden">
        <img src={canteenImg} alt="Canteen" 
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e)=>e.target.src="https://images.unsplash.com/photo-1551183053-bf91a1d81141"} />
        
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-orange-400">Campus Canteen</span>
          </h1>

          <p className="text-gray-200 mt-3 text-lg">Fresh food · Fast delivery · Best prices</p>

          {/* Search bar */}
          <div className="relative mt-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Search food..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={e => e.key==="Enter" && handleSearch()}
              className="w-full py-3 px-6 rounded-full bg-white/20 text-white placeholder-gray-200
                        backdrop-blur focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>


      {/* ================= SPECIAL COMBO DEALS ================= */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">🔥 Today's Combo Deals</h2>
        <p className="text-center text-gray-600 mb-10">Handpicked offers for you</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          {comboItems.map(item => {
            const qty = getItemQuantity(item._id);
            return (
              <div key={item._id} className="bg-white rounded-xl shadow-xl hover:scale-[1.03] transition overflow-hidden">
                <img src={item.image} alt="" className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-extrabold text-orange-600">₹{item.price}</p>
                    <div className="flex items-center text-yellow-500 text-sm"><FaStar/><span className="ml-1">4.5</span></div>
                  </div>

                  {/* Add-Remove Buttons */}
                  <div className="mt-4">
                    {qty === 0 ? (
                      <button 
                        onClick={() => !user ? (toast.error("Login to order") || navigate("/login")) : addToCart(item)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-bold">
                        Add to Cart
                      </button>
                    ) : (
                      <div className="bg-orange-100 flex justify-between items-center py-2 px-3 rounded-lg">
                        <button onClick={() => updateQuantity(item._id, qty-1)}><FaMinus/></button>
                        <span className="font-bold">{qty}</span>
                        <button onClick={() => updateQuantity(item._id, qty+1)}><FaPlus/></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ================= MODERN FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Campus Canteen</h3>
            <p>Your everyday food partner 🍽</p>
            <p className="mt-2"><FaHeart className="inline text-red-400" /> Made with love for students</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="hover:text-orange-400">Menu</Link></li>
              <li><Link to="/orders" className="hover:text-orange-400">My Orders</Link></li>
              <li><Link to="/feedback" className="hover:text-orange-400">Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-orange-400"><FaPhone className="inline mr-1" /> Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-orange-400"><FaInfoCircle className="inline mr-1" /> About</Link></li>
            </ul>
          </div>

        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} Campus Canteen • All Rights Reserved
        </p>
      </footer>

    </div>
  );
};

export default Home;
