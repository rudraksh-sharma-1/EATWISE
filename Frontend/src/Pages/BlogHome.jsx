"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Particles } from "@/components/magicui/particles";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Heart } from "lucide-react";

const BlogHomePage = () => {
  const posts = [
    {
      title: "Vitamin rich fruits & veggies",
      subtitle:
        "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....",
      date: "Mar 22, 2023",
      readTime: "2 min read",
      likes: 2,
      image: "/images/fruits-veggies.jpg",
    },
    {
      title: "A healthy alternative to fries",
      subtitle:
        "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....",
      date: "Mar 22, 2023",
      readTime: "1 min read",
      likes: 3,
      image: "/images/healthy-fries.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-10">
      <Particles className="absolute inset-0 z-0 pointer-events-none" />

      {/* Header */}
      <div className="relative text-center z-10">
        <h1 className="text-pink-500 text-4xl font-bold">My Weight Loss</h1>
        <h2 className="text-[#7ed6df] text-3xl font-bold italic underline decoration-[#7ed6df]/50">
          Journey
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex justify-center space-x-6 mt-6 text-sm text-white/80">
        <a href="#" className="hover:text-white">All Posts</a>
        <a href="#" className="hover:text-white">Make a Change</a>
        <a href="#" className="hover:text-white">Recipes</a>
        <a href="#" className="hover:text-white text-pink-500">Tips</a>
      </nav>

      {/* Blog Posts */}
      <div className="mt-10 space-y-8 max-w-4xl mx-auto z-10 relative">
        {posts.map((post, index) => (
          <Card
            key={index}
            className="flex flex-col md:flex-row bg-[#121212] border border-[#444] rounded-lg overflow-hidden shadow-lg"
          >
            <div className="md:w-1/2">
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
            />
            </div>
            <CardContent className="md:w-1/2 p-6 text-white space-y-3">
              <div className="text-sm text-white/60">Admin • {post.date} • {post.readTime}</div>
              <h3 className="text-xl font-semibold text-white">{post.title}</h3>
              <p className="text-sm text-white/80">{post.subtitle}</p>
              <div className="flex items-center text-xs text-white/50 gap-4 pt-2">
                <span>0 views</span>
                <span>0 comments</span>
                <span className="flex items-center gap-1">
                  {post.likes} <Heart className="w-4 h-4 text-pink-500" />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default BlogHomePage;
