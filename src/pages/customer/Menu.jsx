import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; // 👈 NEW
import { FaSearch, FaFilter, FaStar, FaFire, FaLeaf, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from "../../Context/CartContext";
import { products } from '../../data/products';

const MenuPage = () => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const menuItems = products.filter(item => item.category !== 'combo');
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];


  const location = useLocation(); // 👈 NEW
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || ""; // 👈 take ?search= value

  // State for filters
  const [searchTerm, setSearchTerm] = useState(initialSearch); // 👈 default from URL
  const [activeCategory, setActiveCategory] = useState('all');
  const [foodType, setFoodType] = useState('all');
  const [spicyFilter, setSpicyFilter] = useState(false);

  // Sync searchTerm when URL changes
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  // Filter logic
  const filteredItems = menuItems.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === 'all' || item.category === activeCategory) &&
      (foodType === 'all' || item.type === foodType) &&
      (!spicyFilter || item.spicy)
    );
  });

  // cart quantity helper
  const getItemQuantity = (id) => {
    const itemInCart = cartItems.find(item => item.id === id);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for food items..."
            className="w-full py-3 px-5 pr-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="flex items-center gap-2 text-gray-700 mb-3">
            <FaFilter className="text-orange-500" /> Filters
          </h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Food Type</label>
              <select 
                className="border border-gray-300 rounded-md px-3 py-2"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="spicy"
                checked={spicyFilter}
                onChange={(e) => setSpicyFilter(e.target.checked)}
                className="h-5 w-5 text-orange-500 rounded"
              />
              <label htmlFor="spicy" className="flex items-center gap-1 text-sm text-gray-700">
                <FaFire className="text-red-500" /> Spicy Only
              </label>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const quantity = getItemQuantity(item.id);
              
              return (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      {item.type === 'veg' ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <FaLeaf className="text-green-500" /> Veg
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <FaFire className="text-red-500" /> Non-Veg
                        </span>
                      )}
                      {item.spicy && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <FaFire className="text-orange-500" /> Spicy
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <span className="text-orange-600 font-bold">₹{item.price}</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" />
                        <span className="text-gray-700">{item.rating}</span>
                      </div>
                      {quantity === 0 ? (
                        <button 
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No items found matching your filters</h3>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                setFoodType('all');
                setSpicyFilter(false);
              }}
              className="mt-4 text-orange-500 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;