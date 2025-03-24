import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedAuthRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default ProtectedAuthRoute;
