import { Meteors } from "@/components/magicui/meteors";
import { VideoText } from "@/components/magicui/video-text";
import { BoxRevealDemo } from "@/Componenets/BoxRevealDemo";
import ContactUs from "@/Componenets/ContactUs";
import OrbitingCirclesDemo from "../Componenets/OrbitingCirclesDemo";
import { MarqueeDemo } from "@/Componenets/MarqueeDemo";
import React from "react";

export function MeteorDemo() {
  return (
    <>
      <div className="relative flex h-[calc(110vh-4rem)] w-full max-w-full flex-col items-center justify-center overflow-hidden bg-[#DAFFD6]">
        <Meteors number={50} />
        <span className="relative h-[320px] w-full overflow-hidden">
          <VideoText src="https://cdn.magicui.design/ocean-small.webm">
            Eat Wise
          </VideoText>
        </span>
      </div>
      <div className="flex justify-center items-center">
        <BoxRevealDemo>Typing Animation</BoxRevealDemo>
        <OrbitingCirclesDemo />
      </div>

      <MarqueeDemo />
      <ContactUs/>
    </>
  );
}
