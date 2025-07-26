// utils/ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/AuthStore.jsx"; // <--- Corrected casing (if it was wrong before) and added .jsx
import usePopupStore from "../Store/PopupStore.js";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  const { showLogin } = usePopupStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      showLogin(); // Trigger popup
    }
  }, [token, showLogin]);

  if (!token) {
    return null; // Don’t render the children yet
  }

  return children;
};

export default ProtectedRoute;
