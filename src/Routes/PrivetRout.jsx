import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const PrivetRout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary text-3xl"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRout;
