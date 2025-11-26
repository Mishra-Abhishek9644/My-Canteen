// pages/customer/Login.jsx  ← REPLACE ENTIRE FILE
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";  // ← ADD THIS

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "", email: "", password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();  // ← Get login function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await loginUser(formData.email, formData.password);
      } else {
        if (!formData.username.trim()) return toast.error("Username required!");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email!");
        if (formData.password.length < 6) return toast.error("Password must be 6+ chars!");

        res = await registerUser(formData.username, formData.email, formData.password);
      }

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update context immediately
      login(res.data.user);

      toast.success(isLogin ? "Login Successful!" : "Registered Successfully!");

      // Redirect
      setTimeout(() => {
        navigate(res.data.user.role === "admin" ? "/admin/dashboard" : "/");
      }, 800);

    } catch (err) {
      const msg = err.response?.data?.message || "Server error. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        {isLogin ? "Welcome Back!" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:opacity-60 font-bold text-lg"
        >
          {loading ? "Please wait..." : (isLogin ? "Login" : "Register")}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        {isLogin ? "New here? " : "Already have account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-orange-600 font-bold hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Login;