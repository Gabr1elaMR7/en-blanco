// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, userRole }) => {
  if (!isAuthenticated || userRole !== "super") {
    // Redirigir a la página de inicio o login si no está autenticado o no es super
    return <Navigate to="/" />;
  }

  return children; // Si está autenticado y tiene el rol correcto, renderiza el contenido
};

export default ProtectedRoute;
