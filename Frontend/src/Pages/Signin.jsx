import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../Store/AuthStore";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Particles } from "@/components/magicui/particles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../utils/axios.js";


function SignIn() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error("Full name is required!");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format!");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const { fullName, email, password } = formData;
      const res = await instance.post("/api/auth/register", {
        fullName,
        email,
        password,
      });

      toast.success("Successfully Signed Up!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed. Try again later."
      );
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-[#E1EEBC] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <Card className="relative z-10 max-w-[500px] w-full min-h-[500px] p-8 bg-[#E1EEBC] shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-xl">
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
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl text-[#EB5A3C]">Sign Up</CardTitle>
          <CardDescription className="text-xl">
            Already have an account?{" "}
            <Link to="/login" className="text-[#EB5A3C]">
              Log in!
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-2xl text-[#EB5A3C]">
                Username
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="[Your Name]"
                className="h-12 text-base border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-2xl text-[#EB5A3C]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                placeholder="name@example.com"
                onChange={handleChange}
                className="h-12 text-base border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-2xl text-[#EB5A3C]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*******"
                className="h-12 text-base border-black"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-2xl text-[#EB5A3C]"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="*******"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 text-base border-black"
              />
            </div>
            <InteractiveHoverButton type="submit">Sign Up</InteractiveHoverButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
