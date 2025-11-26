// src/Context/CartContext.jsx ← REPLACE ENTIRE FILE
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (_id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item._id === _id ? { ...item, quantity } : item));
  };

  const removeFromCart = (_id) => {
    setCart(prev => prev.filter(item => item._id !== _id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems: cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);