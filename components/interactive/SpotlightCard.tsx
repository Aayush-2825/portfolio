"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useMotionOK } from "@/lib/motion";
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
  size = 360,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionOK = useMotionOK();
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -999, y: -999 });
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });

      if (motionOK) {
        const normX = (x / rect.width - 0.5) * 2;
        const normY = (y / rect.height - 0.5) * 2;
        setTilt({
          rx: Number((-(normY * 4.5)).toFixed(2)),
          ry: Number((normX * 4.5).toFixed(2)),
        });
      }
    },
    [motionOK, onMouseMove]
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
      setTilt({ rx: 0, ry: 0 });
    },
    [onMouseLeave]
  );

  const transformStyle =
    motionOK && (tilt.rx !== 0 || tilt.ry !== 0)
      ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
      : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d12] transition-colors duration-300 will-change-transform",
        className
      )}
      style={{
        transform: transformStyle,
        transition:
          "transform 250ms cubic-bezier(0.23, 1, 0.32, 1), border-color 300ms ease, background-color 300ms ease",
        ...style,
      }}
      {...props}
    >
      {/* Dynamic Mouse Spotlight Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Mouse Spotlight Border Stroke Highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300 ease-out"
        style={{
          opacity,
          padding: "1px",
          background: `radial-gradient(${size * 0.75}px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 80%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
