"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { useMotionOK } from "@/lib/motion";

export function ScrollProgress() {
  const motionOK = useMotionOK();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      initial={{ scaleX: 0 }}
      style={{ scaleX: motionOK ? scaleX : 1 }}
    />
  );
}
