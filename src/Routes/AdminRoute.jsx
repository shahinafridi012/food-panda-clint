import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // Allow both 'admin' and 'super admin'
  if (user?.role !== "admin" && user?.role !== "super admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
