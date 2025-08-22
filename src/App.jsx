// App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import Navbar from "./components/Navbar";
import { CartProvider } from "./Context/CartContext";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import Login from "./pages/customer/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Feedback from "./pages/customer/Feedback";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks";
import Profile from './pages/customer/Profile'
import Contact from "./pages/customer/Contact";
import AdminMessages from "./pages/admin/AdminMessages";
import About from "./pages/customer/About";
import NotFound from "./pages/NotFound";
// 🔹 Inner component so we can use useAuth()
function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useAuth() || {};

  // ⏳ wait for AuthProvider to restore user from localStorage
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <div className="container mx-auto p-4">
        <Routes>
          {/* ✅ Redirect admins away from "/" */}
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />

          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />



          {/* Customer-only routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute role="customer">
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute role="customer">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute role="customer">
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="customer">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedbacks"
            element={
              <ProtectedRoute role="admin">
                <AdminFeedbacks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute role="admin">
                <AdminMessages />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
