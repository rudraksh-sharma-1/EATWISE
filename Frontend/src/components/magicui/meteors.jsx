
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number = 50,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            // Increased head size from `size-0.5` to `w-1.5 h-1.5`
            "pointer-events-none absolute w-1 h-1 rotate-[var(--angle)] animate-meteor rounded-full bg-green-600/60 shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          <div
            className="pointer-events-none absolute top-1/2 -z-10 h-0.5 w-[60px] -translate-y-1/2 bg-gradient-to-r from-green-600/50 to-transparent"
          />
        </span>
      ))}
    </>
  );
};
