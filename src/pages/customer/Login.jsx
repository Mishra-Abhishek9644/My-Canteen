// pages/customer/Login.jsx  ← FULL REPLACEMENT (handles 400 errors)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api";
import toast from "react-hot-toast";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "", email: "", password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        // LOGIN — no username needed
        res = await loginUser(formData.email, formData.password);
      } else {
        // REGISTER — username required
        if (!formData.username.trim()) {
          toast.error("Username is required for registration!");
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Please enter a valid email!");
          return;
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters!");
          return;
        }
        res = await registerUser(formData.username, formData.email, formData.password);
      }

      // SUCCESS — save & redirect
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(isLogin ? "Login Successful! 🎉" : "Registered Successfully!");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      // CATCH 400/500 ERRORS — show real message
      const errorMsg = err.response?.data?.message || "Something went wrong. Try again.";
      console.error("Login/Register Error:", errorMsg);  // ← DEBUG IN CONSOLE
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
        {isLogin ? "Welcome Back!" : "Join Campus Canteen"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 font-bold text-lg"
        >
          {loading ? "Loading..." : (isLogin ? "Login" : "Register")}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have one? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-orange-500 font-bold hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Login;