"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Particles } from "@/components/magicui/particles";
import { ShineBorder } from "@/components/magicui/shine-border";
import { RippleButton } from "@/components/magicui/ripple-button";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

const CreateBlog = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState("");

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newImagePreviews).then((newPreviews) => {
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    });
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  return (
    <div className="relative min-h-screen bg-[#E1EEBC] px-4 py-10 flex justify-center items-start">
      <Particles className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-0 z-0 rounded-xl overflow-visible pointer-events-none">
          <ShineBorder shineColor={["#90C67C", "#67AE6E", "#328E6E", "#A0C878", "#DF9755", "#EB5A3C"]} />
        </div>

        <Card className="w-full bg-[#E1EEBC] border-[#A4BE7B] shadow-[0_10px_40px_rgba(0,0,0,0.7)] rounded-xl z-10">
          <CardHeader>
            <CardTitle className="text-3xl text-[#EB5A3C]">Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 overflow-visible">

            {/* Post Title */}
            <div>
              <Label className="text-[#EB5A3C] text-lg">Post Title</Label>
              <Input placeholder="Enter your post title" className="mt-1 border-black text-base" />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-[#EB5A3C] text-lg">Featured Image</Label>
              <div className="mt-2 border-dashed border-2 border-[#A4BE7B] rounded-md p-6 flex flex-col items-center text-center text-[#285430]">
                <div className="text-4xl">☁️</div>
                <p>Drag and drop your images here or</p>
                <RippleButton
                  onClick={handleFileSelect}
                  className="mt-2 bg-[#67AE6E] text-white hover:bg-[#5F8D4E]"
                >
                  Browse Files
                </RippleButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Image Preview ${index}`}
                          className="max-w-full max-h-48 object-cover border border-[#5F8D4E] rounded-md"
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <Label className="text-[#EB5A3C] text-lg">Category</Label>
              <Select.Root value={category} onValueChange={setCategory}>
                <Select.Trigger
                  className="mt-1 w-full border border-black bg-[#E1EEBC] text-[#285430] px-4 py-2 rounded-md flex items-center justify-between hover:border-[#5F8D4E] focus:ring-2 focus:ring-[#5F8D4E] focus:outline-none"
                >
                  <Select.Value placeholder="Choose category" />
                  <Select.Icon>
                    <ChevronDown className="text-[#285430]" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Content className="bg-[#E1EEBC] border border-black rounded-md mt-1 z-50">
                  <Select.Viewport>
                    {["Nutrition Tips", "Healthy Recipes", "Fitness"].map((label, index) => (
                      <Select.Item
                        key={index}
                        value={label.toLowerCase().replace(" ", "-")}
                        className="px-4 py-2 text-[#285430] hover:bg-[#5F8D4E] hover:text-white cursor-pointer"
                      >
                        <Select.ItemText>{label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>

            {/* Content */}
            <div>
              <Label className="text-[#EB5A3C] text-lg">Content</Label>
              <Textarea placeholder="Start writing your post..." className="mt-1 h-40 border-black text-base" />
            </div>

            {/* Tags */}
            <div>
              <Label className="text-[#EB5A3C] text-lg">Tags</Label>
              <Input placeholder="Add tags separated by commas" className="mt-1 border-black text-base" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <RippleButton className="bg-[#67AE6E] hover:bg-[#5F8D4E] text-white">
                Publish Post
              </RippleButton>
              <RippleButton className="bg-[#67AE6E] text-[#285430] hover:bg-[#5F8D4E] text-white">
                Save Draft
              </RippleButton>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlog;
