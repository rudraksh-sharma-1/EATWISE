// utils/ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/AuthStore";
import usePopupStore from "../store/popupStore";

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
