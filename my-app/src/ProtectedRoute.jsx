// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, userRole }) => {
  if (!isAuthenticated || userRole !== "super") {
    
    return <Navigate to="/" />;
  }

  return children; 
};

export default ProtectedRoute;
