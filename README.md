# React + Vite

# 🍔 MyCanteen – Campus Food Ordering System

## 📌 Project Overview
MyCanteen is a **React + TailwindCSS** based campus food ordering system built for SDJ College (TYBCA Semester 5).  
It allows **students** to browse the menu, place orders, and track them, while **admins** can manage orders and feedback.  
👉 Currently frontend-only (data stored in localStorage), but backend-ready for Node.js + MongoDB.

---

## 🚀 Features
### 👩‍🎓 Student Panel

- Login & Role-based Access – Students can log in and access only customer features (handled via localStorage).

- Browse Menu – Filter items by category, Veg/Non-Veg, and Spicy.

- Cart & Checkout – Add items to cart, update quantity, and proceed to checkout.

- Order History – View all previous orders (persisted in localStorage).

- Feedback System – Submit feedback about food and service.

### 🛠️ Admin Panel

- Admin Login & Role-based Access – Only admins can log in and access admin routes (simulated using localStorage).

- Dashboard – Overview of total orders and feedback.

- Order Management – View and manage student orders.

- Feedback Management – View and manage feedback submissions.

⚡ Note: Authentication is frontend-simulated using localStorage for role-based access.
For a real-world system, this can be upgraded to JWT Authentication with Node.js + MongoDB.

---

## 🖼️ Screenshots
(Add your screenshots here – Home, Menu, Cart, Admin Dashboard)

---

## 🏗️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **State Management**: Context API + LocalStorage
- **Routing**: React Router
- **Toast Notifications**: react-hot-toast

---

## 📂 Folder Structure
src/
├── components/ # Navbar, CartSidebar, ProtectedRoute
├── pages/
│ ├── customer/ # Home, Menu, Cart, Orders, Profile, Feedback
│ ├── admin/ # Dashboard, Orders, Feedbacks, Messages
│ └── NotFound.jsx
├── Context/ # AuthContext, CartContext
├── data/ # products.js
└── App.jsx


---

## 🔮 Future Scope
- Backend integration with Node.js + Express + MongoDB
- Online payment system
- Real-time order tracking

---

## 👨‍💻 Team Members
- Abhishek Mishra  
- Deepraj
- Devanshi
- Suraj Chaudhary  

---

## 📜 License
This project is for **academic purposes** only.

