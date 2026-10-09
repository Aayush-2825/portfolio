"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useMotionOK } from "@/lib/motion";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function TargetCursorFallback() {
  const hydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const motionOK = useMotionOK();
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 32, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 450, damping: 32, mass: 0.2 });

  useEffect(() => {
    if (!motionOK) return;

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, [data-interactive='true'], .cursor-pointer")
      );
      setIsPointer(isInteractive);
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [motionOK, x, y]);

  if (!hydrated || !motionOK) {
    return null;
  }

  return (
    <>
      {/* Outer reactive ring */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent mix-blend-difference lg:block"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          scale: isClicking ? 0.85 : 1,
          backgroundColor: isPointer ? "rgba(255, 77, 31, 0.15)" : "rgba(255, 77, 31, 0)",
          borderColor: isPointer ? "rgba(255, 77, 31, 0.9)" : "rgba(255, 77, 31, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Inner precise dot */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block"
        style={{
          x,
          y,
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
