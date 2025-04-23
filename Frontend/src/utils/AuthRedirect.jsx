// src/utils/AuthRedirect.js
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../Store/AuthStore";

const AuthRedirect = ({ children }) => {
  const { token } = useAuthStore();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRedirect;
