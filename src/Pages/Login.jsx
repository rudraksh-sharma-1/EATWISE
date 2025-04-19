import React from "react";
import { Button } from "@/components/ui/button";
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

function ShineBorderDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="relative overflow-hidden max-w-[500px] w-full min-h-[500px] p-8">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" className="h-12 text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">Password</Label>
              <Input id="password" type="password" className="h-12 text-base" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="mt-6">
          <Button className="w-full h-12 text-lg">Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ShineBorderDemo;
