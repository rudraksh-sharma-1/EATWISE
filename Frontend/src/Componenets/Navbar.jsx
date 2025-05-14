// components/Navbar.tsx
"use client";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import useAuthStore from "../store/AuthStore";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const { token, user, clearToken, isAdmin } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        setShow(true);
      } else {
        setShow(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 w-full px-6 py-4 border-b backdrop-blur-md bg-[#328E6E] transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="top-0 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="h-16 max-h-16 overflow-hidden flex items-center">
          <Link to="/">
            <img
              src="https://i.postimg.cc/155sCgjV/logo.png"
              alt="LOGO"
              className="w-20 h-20 object-contain"
            />
          </Link>
        </div>

        {/* Middle: Empty space */}
        <div className="flex-1" />
        
        {/* Right: User or Sign Up */}
        {!token ? (
          <Link to="/Signin">
            <InteractiveHoverButton className="text-white">Sign Up</InteractiveHoverButton>
          </Link>
        ) : (
          <div className="relative group">
            <button className="text-white text-lg font-semibold">
              {user?.fullName || "User"} ▼
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              {isAdmin ? (
                <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
                Admin Pannel
              </Link>
              ):("")}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
