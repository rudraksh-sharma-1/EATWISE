"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Particles } from "@/components/magicui/particles";
import { ShineBorder } from "@/components/magicui/shine-border";
import { RippleButton } from "@/components/magicui/ripple-button";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import Editor from "@/Componenets/Editor";
import axios from "axios";
import instance from "../utils/axios.js";
import useAuthStore from "../Store/AuthStore";

const CreateBlog = () => {
  const { token } = useAuthStore();
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreviews([reader.result]);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title || !editorContent || !category || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("blogContent", editorContent);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await instance.post(
        "/api/blogs/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", res.data);
      setIsDialogOpen(true);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to create blog");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  return (
    <div className="relative min-h-screen bg-[#E1EEBC] px-4 py-10 flex justify-center items-center">
      <Particles className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative w-full max-w-5xl">
        <div className="absolute inset-0 z-0 rounded-xl overflow-visible pointer-events-none">
          <ShineBorder
            shineColor={[
              "#90C67C",
              "#67AE6E",
              "#328E6E",
              "#A0C878",
              "#DF9755",
              "#EB5A3C",
            ]}
          />
        </div>

        <Card className="w-full bg-[#E1EEBC] border-[#A4BE7B] shadow-[0_10px_40px_rgba(0,0,0,0.7)] rounded-2xl z-10 min-h-[1050px] p-12">
          <CardHeader>
            <CardTitle className="text-5xl text-[#EB5A3C] font-bold text-center mb-6">
              Create New Blog Post
            </CardTitle>
          </CardHeader>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-[#E1EEBC] text-[#285430] border-[#A4BE7B]">
              <DialogHeader>
                <DialogTitle className="text-[#EB5A3C] text-3xl">
                  🎉 Blog Created!
                </DialogTitle>
              </DialogHeader>
              <p className="text-lg">Your blog post was successfully published.</p>
              <DialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-[#67AE6E] hover:bg-[#5F8D4E] text-white text-lg"
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <CardContent className="space-y-10 overflow-visible">
            {/* Title */}
            <div>
              <Label className="text-[#EB5A3C] text-2xl font-semibold">Post Title</Label>
              <Input
                placeholder="Enter your post title"
                className="mt-3 border-black text-xl py-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-[#EB5A3C] text-2xl font-semibold">Featured Image</Label>
              <div className="mt-4 border-dashed border-2 border-[#A4BE7B] rounded-lg p-8 flex flex-col items-center text-center text-[#285430]">
                <div className="text-6xl">☁️</div>
                <p className="text-xl mt-2">Drag and drop your images here or</p>
                <RippleButton
                  onClick={handleFileSelect}
                  className="mt-3 bg-[#67AE6E] text-white hover:bg-[#5F8D4E] text-xl px-8 py-3"
                >
                  Browse Files
                </RippleButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {imagePreviews.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-6">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-56 object-cover border border-[#5F8D4E] rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-0 right-0 text-red-500 hover:text-red-700 text-2xl"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <Label className="text-[#EB5A3C] text-2xl font-semibold">Category</Label>
              <Select.Root value={category} onValueChange={setCategory}>
                <Select.Trigger className="mt-3 w-full border border-black bg-[#E1EEBC] text-[#285430] px-5 py-4 rounded-lg flex items-center justify-between text-xl hover:border-[#5F8D4E] focus:ring-2 focus:ring-[#5F8D4E] focus:outline-none">
                  <Select.Value placeholder="Choose category" />
                  <Select.Icon>
                    <ChevronDown className="text-[#285430]" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Content className="bg-[#E1EEBC] border border-black rounded-lg mt-1 z-50">
                  <Select.Viewport>
                    {["Nutrition Tips", "Healthy Recipes", "Fitness"].map(
                      (label, index) => (
                        <Select.Item
                          key={index}
                          value={label.toLowerCase().replace(" ", "-")}
                          className="px-5 py-4 text-[#285430] text-xl hover:bg-[#5F8D4E] hover:text-white cursor-pointer"
                        >
                          <Select.ItemText>{label}</Select.ItemText>
                        </Select.Item>
                      )
                    )}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>

            {/* Content */}
            <div>
              <Label className="text-[#EB5A3C] text-2xl font-semibold">Content</Label>
              <div className="mt-3">
                <Editor onChange={setEditorContent} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-6 pt-6">
              <RippleButton
                className="bg-[#67AE6E] hover:bg-[#5F8D4E] text-white text-2xl px-8 py-4"
                onClick={handleSubmit}
              >
                Publish Post
              </RippleButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlog;
