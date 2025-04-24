import React from "react";
import { useEffect } from "react";  
import Navbar from "./Componenets/Navbar";
import Login from "./Pages/Login";
import SignIn from "./Pages/Signin";
import { Toaster } from "react-hot-toast";
import BlogHome from "./Pages/BlogHome";
import Blog from "./Pages/Blog";
import { Route, Routes } from "react-router-dom";
import { MeteorDemo } from "./Pages/Homepage";
import Footer from "./Componenets/Footer";
import AuthRedirect from "./utils/AuthRedirect";
import MainPage from "./DietChartPages/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import useAuthStore from "./Store/AuthStore";
import LoginRequiredPopup from "./Componenets/LoginRequiredPopup";
import BlogDetailPage from "./Pages/IndividualBlog";
function App() {

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<MeteorDemo />} />
        <Route
          path="/signin"
          element={
            <AuthRedirect>
              <SignIn />
            </AuthRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route path="/bloghome" element={<BlogHome />} />
        <Route
          path="/blog"
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
    </div>
  );
}

export default App;
