"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useSpring } from "motion/react";
import { useMotionOK } from "@/lib/motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0.1 to 0.4
  className?: string;
}

function subscribeHover(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getHoverSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getHoverServerSnapshot() {
  return false;
}

export function Magnetic({ children, strength = 0.25, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionOK = useMotionOK();
  const canHover = useSyncExternalStore(subscribeHover, getHoverSnapshot, getHoverServerSnapshot);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover || !motionOK || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!canHover || !motionOK) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
