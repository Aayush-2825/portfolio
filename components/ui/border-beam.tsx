"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
  delay = 0,
  borderWidth = 1.5,
  colorFrom = "#ff4d1f",
  colorTo = "#ffaa40",
  reverse = false,
}: BorderBeamProps) {
  const id = useId();
  const gradientId = `border-beam-grad-${id.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-0",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full rounded-[inherit]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="50%" stopColor={colorTo} stopOpacity="0.75" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect
          x={borderWidth}
          y={borderWidth}
          width={`calc(100% - ${borderWidth * 2}px)`}
          height={`calc(100% - ${borderWidth * 2}px)`}
          rx="12"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={borderWidth}
          strokeDasharray={`${size} 800`}
          animate={{
            strokeDashoffset: reverse ? [-1000, 0] : [0, -1000],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        />
      </svg>
    </div>
  );
}
