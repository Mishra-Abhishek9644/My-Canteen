// pages/customer/Menu.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { getMenu } from "../../services/api";

const MenuPage = () => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("all");

  const params = new URLSearchParams(useLocation().search);
  useEffect(()=>setSearch(params.get("search") || ""), []);
  
  useEffect(() => {
    getMenu().then(r => { setMenu(r.data); setLoading(false); })
             .catch(()=>toast.error("Menu load failed"));
  }, []);

  const categories = ["all", ...new Set(menu.map(i=>i.category))];
  const filtered = menu.filter(
    i => i.name.toLowerCase().includes(search.toLowerCase()) && (active==='all' || i.category===active)
  );
  const qty = id => cartItems.find(x=>x._id===id)?.quantity || 0;

  if (loading) return <div className="text-center py-20 text-xl">Loading Menu...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        <input
          placeholder="Search items..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
          className="w-full p-4 rounded-full border focus:ring-2 focus:ring-orange-500 mb-8"
        />

        <div className="flex gap-3 flex-wrap mb-8">
          {categories.map(c=>
            <button key={c} onClick={()=>setActive(c)}
              className={`px-6 py-2 rounded-full font-medium ${active===c?"bg-orange-500 text-white":"bg-white border"}`}>
              {c}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filtered.map(i=>{
            const count = qty(i._id);

            // 🔥 BACKEND LOCAL IMAGES HANDLED
            const img = i.image?.startsWith("/assets")
              ? `https://my-canteen-backend-f1yq.onrender.com${i.image}`
              : i.image;

            return(
              <div key={i._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
                <img src={img} alt={i.name} className="w-full h-48 object-cover" />

                <div className="p-4">
                  <h3 className="font-bold text-lg">{i.name}</h3>
                  <p className="text-orange-600 font-bold text-xl mt-2">₹{i.price}</p>

                  {count === 0 ? (
                    <button
                      onClick={()=>!user ? (toast.error("Login required!") || navigate("/login")) : addToCart(i)}
                      className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full">
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex mt-4 justify-center bg-orange-100 px-4 py-2 rounded-full gap-5">
                      <button onClick={()=>updateQuantity(i._id, count-1)}><FaMinus/></button>
                      <span className="font-bold">{count}</span>
                      <button onClick={()=>updateQuantity(i._id, count+1)}><FaPlus/></button>
                    </div>
                  )}

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default MenuPage;
