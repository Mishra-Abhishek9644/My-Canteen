// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Menu from './pages/customer/Menu';
import Navbar from './components/Navbar';
import { CartProvider } from './Context/CartContext';
import CartSidebar from './components/CartSidebar';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';
import Login from './pages/customer/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/Dashboard';
import { AuthProvider } from './Context/AuthContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar onCartClick={() => setIsCartOpen(true)} />

          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Login />} />

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

              {/* Admin-only routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>

          </div>

          {/* Sidebar */}
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </CartProvider>
        </AuthProvider>
    </Router>
  );
}

export default App;
