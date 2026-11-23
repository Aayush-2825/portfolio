"use client";

import React, { useState } from "react";
import { useMotionOK } from "@/lib/motion";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export function LogoMark({
  className,
  size = 32,
  interactive = true,
}: LogoMarkProps) {
  const motionOK = useMotionOK();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
    sound.playHover(1600, 0.015);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none group cursor-pointer",
        className
      )}
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Aayush Raj Architectural Monogram Logo"
    >
      <svg
        viewBox="0 0 44 44"
        width={size}
        height={size}
        className={cn(
          "overflow-visible transition-transform duration-300 ease-out",
          motionOK && isHovered && "scale-110 -rotate-3"
        )}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Luminous Accent Glow */}
          <linearGradient id="logo-vermillion" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d1f" />
            <stop offset="100%" stopColor="#ff7a45" />
          </linearGradient>

          {/* Blueprint Grid Crosshair Glow Filter */}
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Precision Crosshair Guide Marks (Static Anchor Geometry) */}
        <line x1="22" y1="1" x2="22" y2="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
        <line x1="22" y1="40" x2="22" y2="43" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
        <line x1="1" y1="22" x2="4" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
        <line x1="40" y1="22" x2="43" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />

        {/* 2. Outer Architectural CAD Hexagon Frame with Stroke Draw-On */}
        <polygon
          points="22,5 39,13 39,31 22,39 5,31 5,13"
          pathLength={1}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          fill="rgba(15,16,21,0.7)"
          className={cn(
            motionOK && "animate-logo-frame-draw",
            isHovered && "stroke-accent/60"
          )}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: motionOK ? 0 : 0,
            transition: "stroke 0.3s ease",
          }}
        />

        {/* 3. Monogram "A" - Left Chevron Peak */}
        <path
          d="M 12 30 L 19 14 L 23 23"
          pathLength={1}
          stroke="url(#logo-vermillion)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={isHovered ? "url(#logo-glow)" : undefined}
          className={motionOK ? "animate-logo-stroke-draw" : undefined}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: motionOK ? 0 : 0,
            animationDelay: "0.15s",
          }}
        />
        {/* "A" Crossbar */}
        <line
          x1="15"
          y1="25"
          x2="22"
          y2="25"
          pathLength={1}
          stroke="url(#logo-vermillion)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className={motionOK ? "animate-logo-stroke-draw" : undefined}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: motionOK ? 0 : 0,
            animationDelay: "0.3s",
          }}
        />

        {/* 4. Monogram "R" - Right Pillar & Loop */}
        <path
          d="M 23 14 L 27.5 14 C 31.5 14 31.5 21 27.5 21 L 23 21 M 26.5 21 L 32 30"
          pathLength={1}
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={motionOK ? "animate-logo-stroke-draw" : undefined}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: motionOK ? 0 : 0,
            animationDelay: "0.45s",
          }}
        />

        {/* 5. Center Intersection Node (Pulsing Amber/Vermillion Beacon) */}
        <circle
          cx="22"
          cy="22"
          r="1.5"
          fill="#ff4d1f"
          className={cn(
            "transition-opacity duration-300",
            motionOK && "animate-pulse"
          )}
        />
      </svg>
    </div>
  );
}
