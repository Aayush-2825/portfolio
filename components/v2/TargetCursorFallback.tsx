"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

import { useMotionOK } from "@/lib/motion";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function TargetCursorFallback() {
  const hydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const motionOK = useMotionOK();
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const springX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.2 });

  useEffect(() => {
    if (!motionOK) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [motionOK, x, y]);

  if (!hydrated || !motionOK) {
    return null;
  }

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent mix-blend-difference lg:block"
      style={{ x: springX, y: springY }}
    />
  );
}
