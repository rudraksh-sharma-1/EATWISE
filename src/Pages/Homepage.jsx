import { Meteors } from "@/components/magicui/meteors";
import { VideoText } from "@/components/magicui/video-text";
import React from "react";

export function MeteorDemo() {
  return (
    <div className="relative flex h-[calc(100vh-4rem)] w-full max-w-full flex-col items-center justify-center overflow-hidden">
      <Meteors number={30} />
      <span className="relative h-[320px] w-fit overflow-hidden">
      <VideoText src="https://cdn.magicui.design/ocean-small.webm">
        Vital Metrics
      </VideoText>
    </span>
    </div>
  );
}
