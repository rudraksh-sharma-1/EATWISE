import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import useAuthStore from "../Store/AuthStore";

function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setErrorMsg(data.message || "Login failed");
        return;
      }

      setToken(data.token);
      setUser(data.user);
      toast.success("Login successful!");
      navigate("/");

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-[#E1EEBC] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <Card className="relative z-10 max-w-[500px] w-full min-h-[500px] p-8 overflow-hidden bg-[#E1EEBC] shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-xl">
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
          <CardTitle className="text-3xl text-[#EB5A3C]">Log In</CardTitle>
          <CardDescription className="text-xl">
            Enter your credentials to access your account
          </CardDescription>
          <CardDescription className="text-xl">
            Don’t have an Account yet?{" "}
            <Link to="/Signin" className="text-[#EB5A3C]">
              Sign Up!
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-2xl text-[#EB5A3C]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12 text-base border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-2xl text-[#EB5A3C]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                className="h-12 text-base border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
            <CardFooter className="mt-6 text-white p-0">
              <InteractiveHoverButton type="submit">
                Log In
              </InteractiveHoverButton>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
