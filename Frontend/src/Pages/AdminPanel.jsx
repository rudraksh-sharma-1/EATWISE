import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BlogList from "../Componenets/BlogList";
import UserList from "@/Componenets/UserList"; 


function AdminPanel() {
  return (
    <div className="flex min-h-screen bg-[#E1EEBC]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-xl">
        <div className="px-6 py-5 border-b border-[#d5e5ab]">
          <h2 className="text-3xl font-bold text-[#328E6E]">Admin Panel</h2>
        </div>
        <nav className="flex flex-col gap-2 p-4 text-lg font-medium text-gray-800">
          <Link
            to="/admin/users"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#E6F3EC] transition"
          >
            📋 User List
          </Link>
          <Link
            to="/admin/blogs"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#E6F3EC] transition"
          >
            📝 Blog List
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-4xl font-bold text-[#328E6E] mb-6">
                  Welcome to the Admin Dashboard
                </h1>
                <p className="text-lg text-gray-800">
                  Use the sidebar to navigate through different admin tools and pages.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
