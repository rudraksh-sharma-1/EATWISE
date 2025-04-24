"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Card, CardContent } from "@/components/ui/card";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { Heart } from "lucide-react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import axios from "axios";
import moment from "moment";


const BlogHomePage = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs/all"); // Replace with deployed URL if needed
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  

  return (
    <div className="relative min-h-screen bg-[#E1EEBC] text-white px-4 py-10">
     {/* Header with Ripple Background */}
<div className="relative h-[500px] flex flex-col items-center justify-center z-10">
  <div className="absolute inset-0 w-full">
    <RetroGrid />
  </div>

  <h1 className="text-[color:#328E6E] text-4xl font-bold relative z-10">
    Living Through Daily
  </h1>

  <div className="relative z-10">
    <LineShadowText className="text-[color:#328E6E] text-7xl sm:text-9xl font-bold">
      Intentionality
    </LineShadowText>

    {/* Button positioned below and right of Intentionality */}
    <div className="absolute right-0 mt-4 translate-y-full">
      <Link to="/blog">
        <InteractiveHoverButton className="text-white">
          Create Your Blog!
        </InteractiveHoverButton>
      </Link>
    </div>
  </div>
</div>


      {/* Nav */}
      <nav className="flex font-serif justify-center space-x-6 mt-6 text-3xl text-white/80">
        <a href="#" className="hover:text-white text-[color:#328E6E]">All Posts</a>
        <a href="#" className="hover:text-white text-[color:#328E6E]">Make a Change</a>
        <a href="#" className="hover:text-white text-[color:#328E6E]">Recipes</a>
        <a href="#" className="hover:text-white text-[color:#328E6E]">Tips</a>
      </nav>

      {/* Blog Posts */}
      <div className="mt-10 space-y-8 max-w-4xl mx-auto z-10 relative">
        {posts.map((post) => (
          <Link key={post._id} to={`/blogs/${post._id}`} className="flex flex-col md:flex-row bg-[#E1EEBC] border-[#444] shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden">
            <Card
            key={post._id}
            className="flex flex-col md:flex-row bg-[#E1EEBC] border-[#444] shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden"
          >
            <div className="md:w-1/2 p-2">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="rounded-lg w-auto h-auto object-fill"
              />
            </div>
            <CardContent className="md:w-1/2 p-6 text-black space-y-3">
              <div className="text-sm text-black/60">
                {post.author} • {moment(post?.createdAt).format('DD-MM-YYYY')} • ~{moment(post?.createdAt).format('HH:mm')}
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
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogHomePage;
