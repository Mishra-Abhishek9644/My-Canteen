// pages/customer/UserProfile.jsx ← REPLACE ENTIRE FILE
import { useAuth } from "../../Context/AuthContext";

function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">My Profile</h2>

      <div className="space-y-6 text-lg">
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="font-semibold">Username</p>
          <p className="text-2xl font-bold text-orange-700">{user?.username || "Guest"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold">Email</p>
          <p className="text-gray-700">{user?.email || "-"}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold">Role</p>
          <p className="text-blue-700 font-bold">{user?.role || "customer"}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full mt-10 bg-red-500 text-white py-4 rounded-lg font-bold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;