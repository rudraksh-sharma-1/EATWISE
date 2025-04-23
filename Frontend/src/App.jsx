import React from "react";
import Navbar from "./Componenets/Navbar";
import Login from "./Pages/Login";
import SignIn from "./Pages/Signin";
import { Toaster } from "react-hot-toast";
import BlogHome from "./Pages/BlogHome";
import Blog from "./Pages/Blog";
import { Route, Routes } from "react-router-dom";
import { MeteorDemo } from "./Pages/Homepage";
import Footer from "./Componenets/Footer";
import AuthRedirect from "./utils/AuthRedirect"; // 👈 import this at the top
import MainPage from "./DietChartPages/MainPage";


function App() {
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/dietchart" element={<MainPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
