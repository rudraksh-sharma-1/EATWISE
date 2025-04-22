import React from "react";
import { Link } from "react-router-dom";
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

function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-[#E1EEBC] overflow-hidden">
      
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      {/* Login Card */}
      <Card className="relative z-10 max-w-[500px] w-full min-h-[500px] p-8 overflow-hidden bg-[#E1EEBC] shadow-[0_10px_40px_rgba(0,0,0,0.6)] rounded-xl">
  <ShineBorder shineColor={["#90C67C", "#67AE6E", "#328E6E","#A0C878", "#DF9755", "#EB5A3C"]} />
  <CardHeader className="space-y-2">
    <CardTitle className="text-3xl text-[#EB5A3C]">Log In</CardTitle>
    <CardDescription className="text-xl">
      Enter your credentials to access your account
    </CardDescription>
    <CardDescription className="text-xl">
      Already have an account? <Link to='/Signin' className="text-[#EB5A3C]">Sign In!</Link>
    </CardDescription>
  </CardHeader>
  <CardContent className="mt-4">
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-2xl text-[#EB5A3C]">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" className="h-12 text-base border-black" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-2xl text-[#EB5A3C]">Password</Label>
        <Input id="password" type="password" placeholder="*******" className="h-12 text-base border-black" />
      </div>
    </form>
  </CardContent>
  <CardFooter className="mt-6 text-white">
  <InteractiveHoverButton>Log In</InteractiveHoverButton>
  </CardFooter>
</Card>
    </div>
  );
}

export default Login;
