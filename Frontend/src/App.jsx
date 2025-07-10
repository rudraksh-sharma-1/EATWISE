import React, { useEffect } from "react";
import Navbar from "@/Componenets/Navbar.jsx";
import Login from "./Pages/Login";
import SignIn from "./Pages/Signin";
import { ToastContainer } from 'react-toastify';
import BlogHome from "./Pages/BlogHome";
import Blog from "./Pages/Blog";
import { Route, Routes, useLocation } from "react-router-dom";
import { MeteorDemo } from "./Pages/Homepage";
import Footer from "./Componenets/Footer";
import AuthRedirect from "./utils/AuthRedirect";
import MainPage from "./DietChartPages/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import useAuthStore from "./Store/AuthStore";
import LoginRequiredPopup from "./Componenets/LoginRequiredPopup";
import BlogDetailPage from "./Pages/IndividualBlog";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  const location = useLocation(); // Hook to track route changes
  const {isAdmin} = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever the route changes
  }, [location]);

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<MeteorDemo />} />
        <Route path="/signin"
          element={
            <AuthRedirect>
              <SignIn />
            </AuthRedirect>
          }
        />
        <Route path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        {isAdmin ?(
          <Route path="/admin/*" element={<AdminPanel />} />
        ):("")}
        <Route path="/bloghome" element={<BlogHome />} />
        <Route path="/blog"
          element={
            <ProtectedRoute>
              <Blog/>
            </ProtectedRoute>
          }
        />
        <Route path="/blogs/:id" element={
          <ProtectedRoute>
            <BlogDetailPage/>
          </ProtectedRoute>
        } />
        <Route path="/dietchart" element={<MainPage />} />
      </Routes>

      <LoginRequiredPopup />

      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
