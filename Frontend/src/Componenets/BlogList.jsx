import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import moment from "moment";
import useAuthStore from "../Store/AuthStore";
import instance from "../utils/axios.js";


const BlogList = () => {

  const {token}= useAuthStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await instance.get("/api/blogs/all");
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
    await instance.delete(`/api/admin/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export default BlogList;
