import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default RequireAuth;
