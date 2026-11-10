"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  size?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 77, 31, 0.08)",
  borderColor = "rgba(255, 77, 31, 0.35)",
  size = 420,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -999, y: -999 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [onMouseMove]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      sound.playHover();
      setOpacity(1);
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      setOpacity(0);
    },
    [onMouseLeave]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d12] transition-all duration-300 ease-out hover:border-white/[0.22] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]",
        className
      )}
      style={style}
      {...props}
    >
      {/* Luminous Dynamic Mouse Spotlight Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Mouse Spotlight Border Stroke Highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300 ease-out"
        style={{
          opacity,
          padding: "1px",
          background: `radial-gradient(${size * 0.75}px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />

      {/* Card Content - rock-solid sharp text & controls */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
