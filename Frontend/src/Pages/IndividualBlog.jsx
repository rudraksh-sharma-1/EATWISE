// BlogDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import instance from "../utils/axios.js";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await instance.get(`/api/blogs/blog/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center text-black py-10">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center text-red-500 py-10">Blog not found.</div>;
  }

  return (
    <div className="relative min-h-screen bg-[#E1EEBC] px-4 py-10 text-black">
      <div className="absolute inset-0">
        <RetroGrid />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-[color:#328E6E] mb-4">{blog.title}</h1>
        <div className="text-[color:#328E6E] text-6xl mb-4">
          {blog.category}
        </div>

        <div className="text-sm text-gray-600 mb-6">
          By <span className="font-semibold">{blog.author}</span> •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl mb-8 shadow-md"
        />
        <div className="prose prose-lg prose-green max-w-none text-black" dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
