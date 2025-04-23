import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import React from "react";
import { Link } from "react-router-dom";
import { BoxReveal } from "@/components/magicui/box-reveal";

export function BoxRevealDemo() {
  return (
    <div className="size-full items-center justify-center overflow-hidden p-8">
      <BoxReveal boxColor={"#262626 "} duration={0.8}>
        <h1 className="text-[3.5rem] text-[#328E6E] font-bold">
        An innovative approach to your nutrition</h1>
      </BoxReveal>

      <BoxReveal boxColor={"#262626 "} duration={.8}>
        <h2 className="mt-[.5rem] text-[1.2rem]">
        An innovative approach to your nutrition involves blending technology with personalized health data to create a smarter, more effective diet plan. By using mobile apps, wearable devices, and AI-driven insights, individuals can track their calorie intake, monitor vital health indicators, and receive real-time suggestions tailored to their unique body needs and lifestyle. This approach emphasizes not just what you eat, but when and how you eat, encouraging mindful habits and balanced choices. It promotes sustainable wellness by integrating scientific knowledge with user-friendly tools, making healthy living more accessible, engaging, and effective for everyone.
        </h2>
      </BoxReveal>

      
      <Link to="/dietchart" className="text-[#EB5A3C]"><InteractiveHoverButton className="mt-[1.6rem] text-white">Explore</InteractiveHoverButton></Link>
    </div>
  );
}
