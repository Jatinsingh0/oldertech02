import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Adjust the path to your actual state shape

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default CheckAuth;
