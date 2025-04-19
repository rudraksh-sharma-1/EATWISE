// components/Navbar.tsx
import React from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-sm border-b backdrop-blur-md bg-white/30">
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        MyLogo
      </div>

      {/* Middle: Empty space */}
      <div className="flex-1"></div>

      {/* Right: Sign In button */}
      <div>
        <Button variant="outline">Sign In</Button>
      </div>
    </nav>
  )
}
