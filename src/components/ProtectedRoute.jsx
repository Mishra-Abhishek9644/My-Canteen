import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Wrong role → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
