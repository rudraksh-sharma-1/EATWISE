// components/Navbar.tsx
"use client";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import clsx from "clsx"; // optional utility for cleaner classnames
import { RippleButton } from "@/components/magicui/ripple-button";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        setShow(true); // scrolling up (show navbar)
      } else {
        setShow(false); // scrolling down (hide navbar)
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 w-full px-6 py-4 border-b backdrop-blur-md bg-gray-950/50 transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-xl font-bold size-10">
          <Link to='/'>
          <img
            src="https://i.postimg.cc/jjxvgj2Z/Full-Logo-Transparent-No-Buffer.png"
            alt="LOGO"
          />
          </Link>
        </div>


        {/* Middle: Empty space */}
        <div className="flex-1" />

        {/* Right: Sign In button */}
        <RippleButton rippleColor="#0db9ff"><Link to='/Login'>SignIn</Link></RippleButton>
      </div>
    </nav>
  );
}
