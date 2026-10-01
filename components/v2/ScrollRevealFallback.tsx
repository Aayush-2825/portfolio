"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { durations, ease, useMotionOK } from "@/lib/motion";

export function ScrollRevealFallback({ children }: { children: ReactNode }) {
  const motionOK = useMotionOK();

  return (
    <motion.div
      initial={motionOK ? { opacity: 0, y: 18 } : false}
      whileInView={motionOK ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.25 }}
      transition={motionOK ? { duration: durations.base, ease } : undefined}
    >
      {children}
    </motion.div>
  );
}
