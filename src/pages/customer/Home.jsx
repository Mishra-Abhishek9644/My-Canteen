// pages/customer/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaStar, FaPlus, FaMinus, FaHeart, FaPhone, FaInfoCircle } from "react-icons/fa";
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

  const getQty = id => cartItems.find(x => x._id === id)?.quantity || 0;
  const handleSearch = () => searchValue.trim() && navigate(`/menu?search=${searchValue}`);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading combos...</div>;

  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[470px] bg-black overflow-hidden">
        <img
          src={canteenImg}
          alt="canteen"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e)=>e.target.src="https://images.unsplash.com/photo-1551183053-bf91a1d81141"}
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
            Welcome to <span className="text-orange-500">Campus Canteen</span>
          </h1>

          <p className="text-gray-200 text-lg mt-3">Fresh food • Fast delivery • Best prices</p>

          {/* Search */}
          <div className="relative mt-6 w-full max-w-md">
            <input
              placeholder="Search food..."
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
              onKeyDown={e=>e.key==="Enter" && handleSearch()}
              className="w-full px-6 py-3 rounded-full bg-white/20 text-white placeholder-gray-300
                         focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>


      {/* ================= SPECIAL COMBO DEALS ================= */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800">🔥 Today's Combo Deals</h2>
        <p className="text-center text-gray-600 mb-8">Limited time offers</p>

        <div className="grid px-6 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {comboItems.map(item => {
            const qty = getQty(item._id);

            // 🔥 FIXED — LOCAL BACKEND IMAGE HANDLING
            const imageSrc = item.image?.startsWith("/assets")
              ? `https://my-canteen-backend-f1yq.onrender.com${item.image}`
              : item.image;

            return (
              <div key={item._id} className="bg-white rounded-xl shadow-xl hover:scale-[1.03] transition overflow-hidden">
                <img src={imageSrc} alt={item.name} className="w-full h-48 object-cover" />

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-extrabold text-orange-600">₹{item.price}</p>
                    <div className="flex items-center text-yellow-500 text-sm"><FaStar /><span className="ml-1">4.5</span></div>
                  </div>

                  {/* Add / Remove */}
                  <div className="mt-4">
                    {qty === 0 ? (
                      <button
                        onClick={() => !user ? (toast.error("Login to add items") || navigate("/login")) : addToCart(item)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-bold"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="bg-orange-100 flex justify-between items-center py-2 px-3 rounded-lg">
                        <button onClick={() => updateQuantity(item._id, qty-1)}>-</button>
                        <span className="font-bold">{qty}</span>
                        <button onClick={() => updateQuantity(item._id, qty+1)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">

          <div>
            <h3 className="text-lg font-bold text-white">Campus Canteen</h3>
            <p>Made with ❤️ for students</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Quick Links</h3>
            <Link className="block hover:text-orange-400" to="/menu">Menu</Link>
            <Link className="block hover:text-orange-400" to="/orders">My Orders</Link>
            <Link className="block hover:text-orange-400" to="/feedback">Feedback</Link>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Support</h3>
            <Link className="block hover:text-orange-400" to="/contact"><FaPhone className="inline" /> Contact Us</Link>
            <Link className="block hover:text-orange-400" to="/about"><FaInfoCircle className="inline" /> About</Link>
          </div>

        </div>

        <p className="text-center text-gray-500 mt-6">© {new Date().getFullYear()} Campus Canteen</p>
      </footer>

    </div>
  );
};

export default Home;
