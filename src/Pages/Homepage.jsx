import { Meteors } from "@/components/magicui/meteors";
import { BoxRevealDemo } from "@/Componenets/BoxRevealDemo";
import ContactUs from "@/Componenets/ContactUs";
import OrbitingCirclesDemo from "../Componenets/OrbitingCirclesDemo";
import { MarqueeDemo } from "@/Componenets/MarqueeDemo";
import { AuroraText } from "@/components/magicui/aurora-text";
import React from "react";

export function MeteorDemo() {
  return (
    <>
      <div className="relative flex h-[calc(70vh-4rem)] w-full max-w-full flex-col items-center justify-center overflow-hidden bg-[#E1EEBC]">
      <div className="absolute inset-0 z-0 scale-[2]">
        <Meteors number={100} />
      </div>
        <span className="relative h-[320px] w-full overflow-hidden flex justify-center items-center">
        <h1 className="font-serif text-[8rem] font-bold tracking-tighter">
                Eat <AuroraText className="font-Rockbilly text-[4rem]">WISE</AuroraText>
            </h1>
        </span>
      </div>
      <div className="flex justify-center items-center bg-[#E1EEBC] ">
        <BoxRevealDemo>Typing Animation</BoxRevealDemo>
        <OrbitingCirclesDemo />
      </div>
      <div className="bg-[#E1EEBC]">
      <MarqueeDemo />
      <ContactUs/>
      </div>
    </>
  );
};
