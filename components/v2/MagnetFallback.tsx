"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useMotionOK } from "@/lib/motion";

export function MagnetFallback({ children }: { children: ReactNode }) {
  const motionOK = useMotionOK();
  return (
    <motion.span
      className="inline-flex"
      whileHover={motionOK ? { y: -3 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
}
