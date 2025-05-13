import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import axios from "axios";
import moment from "moment";

function UserList() {
  const [users, setUsers] = useState([
    {
      _id: "example123",
      fullName: "Chitransh",
      email: "chitranshghai@gmail.com",
    },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/all");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    // Uncomment when you have a backend running
    // fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#328E6E] mb-6">👥 User List</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#328E6E] rounded-xl bg-white text-gray-800">
          <thead className="bg-[#328E6E] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-[#d5e5ab]">
                <td className="px-4 py-3">{user.fullName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-[#EB5A3C] text-white rounded-md hover:bg-[#cf462a] transition"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs/all");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/blogs/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#E1EEBC] text-white px-4 py-10">
      <h1 className="text-[color:#328E6E] text-4xl font-bold relative z-10">Blog List</h1>

      <div className="mt-10 space-y-8 max-w-4xl z-10 relative">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col md:flex-row bg-[#E1EEBC] border-[#444] shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden"
          >
            <Card className="flex flex-col md:flex-row bg-[#E1EEBC] border-[#444] rounded-xl overflow-hidden">
              <div className="md:w-1/2 p-2">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="rounded-lg w-auto h-auto object-fill"
                />
              </div>

              <CardContent className="md:w-1/2 p-6 text-black space-y-3">
                <div className="text-sm text-black/60">
                  {post.author} • {moment(post?.createdAt).format("DD-MM-YYYY")} • ~
                  {moment(post?.createdAt).format("HH:mm")}
                </div>
                <h3 className="text-xl font-semibold text-black">{post.title}</h3>
                <p className="text-sm text-black/80">{post.preview}</p>
                <div className="flex items-center text-xs text-black/50 gap-4 pt-2">
                  <span>0 views</span>
                  <span>0 comments</span>
                  <span className="flex items-center gap-1">
                    0 <Heart className="w-4 h-4 text-[color:#EB5A3C]" />
                  </span>
                </div>

                {/* Delete button */}
                <div className="pt-3">
                  <button
                    onClick={() => handleDeleteBlog(post._id)}
                    className="px-4 py-2 bg-[#EB5A3C] text-white rounded-md hover:bg-[#cf462a] transition"
                  >
                    Delete Blog
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-black text-center text-lg mt-6">No blogs available.</p>
        )}
      </div>
    </div>
  );
};


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
