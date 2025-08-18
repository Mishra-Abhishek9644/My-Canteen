// src/data/products.js

import Samosa from '../assets/Samosa.jpg'; // for the samosa image

export const products = [
  // ====== Combo Items (from Home.jsx) ======
  {
    id: 'combo-1',
    name: "Burger Combo",
    price: 180,
    description: "Burger + Fries + Coke",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    category: "combo",
    type: "non-veg",
    spicy: false,
    rating: 4.5
  },
  {
    id: 'combo-2',
    name: "Pizza Combo",
    price: 250,
    description: "Medium Pizza + Garlic Bread + Soft Drink",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    category: "combo",
    type: "veg",
    spicy: false,
    rating: 4.5
  },
  {
    id: 'combo-3',
    name: "Healthy Bowl",
    price: 150,
    description: "Salad + Smoothie + Granola",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    category: "combo",
    type: "veg",
    spicy: false,
    rating: 4.3
  },
  {
    id: 'combo-4',
    name: "Yo Combo",
    price: 180,
    description: "Burger + Fries + Coke",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    category: "combo",
    type: "non-veg",
    spicy: false,
    rating: 4.4
  },
  {
    id: 'combo-5',
    name: "Mo Combo",
    price: 250,
    description: "Medium Pizza + Garlic Bread + Soft Drink",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    category: "combo",
    type: "veg",
    spicy: false,
    rating: 4.5
  },
  {
    id: 'combo-6',
    name: "Nahh Bowl",
    price: 150,
    description: "Salad + Smoothie + Granola",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    category: "combo",
    type: "veg",
    spicy: false,
    rating: 4.2
  },

  // ====== Menu Items (from Menu.jsx) ======
  {
    id: 'menu-1',
    name: "Veg Burger",
    price: 50,
    description: "Fresh veg patty with lettuce and mayo",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    category: "snacks",
    type: "veg",
    spicy: false,
    rating: 4.2
  },
  {
    id: 'menu-2',
    name: "Chicken Pizza",
    price: 120,
    description: "12-inch pizza with chicken toppings",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    category: "main",
    type: "non-veg",
    spicy: true,
    rating: 4.5
  },
  {
    id: 'menu-3',
    name: "Fruit Salad",
    price: 60,
    description: "Seasonal fruits with honey dressing",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    category: "healthy",
    type: "veg",
    spicy: false,
    rating: 4.0
  },
  {
    id: 'menu-4',
    name: "Masala Dosa",
    price: 70,
    description: "Crispy dosa with potato filling",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    category: "breakfast",
    type: "veg",
    spicy: true,
    rating: 4.7
  },
  {
    id: 'menu-5',
    name: "Chicken Biryani",
    price: 150,
    description: "Hyderabadi style biryani with raita",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    category: "main",
    type: "non-veg",
    spicy: true,
    rating: 4.8
  },
  {
    id: 'menu-6',
    name: "Cold Coffee",
    price: 40,
    description: "Iced coffee with cream",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0",
    category: "beverages",
    type: "veg",
    spicy: false,
    rating: 4.3
  },
  {
    id: 'menu-7',
    name: "Samosa",
    price: 20,
    description: "Tasty Samosa With Sauce",
    image: Samosa,
    category: "snacks",
    type: "veg",
    spicy: false,
    rating: 4.3
  }
];
