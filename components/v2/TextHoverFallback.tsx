"use client";

import { motion } from "motion/react";

import { useMotionOK } from "@/lib/motion";

export function TextHoverFallback({ children }: { children: string }) {
  const motionOK = useMotionOK();

  return (
    <motion.span
      className="inline-block transition-colors hover:text-accent"
      whileHover={motionOK ? { x: 8 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
}
