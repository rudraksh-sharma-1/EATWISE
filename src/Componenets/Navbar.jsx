// components/Navbar.tsx
"use client";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import clsx from "clsx"; // optional utility for cleaner classnames
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

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
        "sticky top-0 z-50 w-full px-6 py-4 border-b backdrop-blur-md bg-[#328E6E] transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="top-0 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-xl font-bold size-20">
          <Link to='/'>
          <img
            src="https://i.postimg.cc/155sCgjV/logo.png"
            alt="LOGO"
            className="pt-4"
          />
          </Link>
        </div>


        {/* Middle: Empty space */}
        <div className="flex-1" />
        {/* Right: Sign In button */}
        <InteractiveHoverButton className="text-white"><Link to='/Login'>SignIn</Link></InteractiveHoverButton>
      </div>
    </nav>
  );
}
