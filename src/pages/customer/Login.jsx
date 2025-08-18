import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("customer"); // default
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username) {
      alert("Enter a username!");
      return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify({ username, role }));

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleLogin}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
