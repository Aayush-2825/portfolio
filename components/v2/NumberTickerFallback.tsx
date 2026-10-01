"use client";

import { motion } from "motion/react";

import { durations, ease, useMotionOK } from "@/lib/motion";

export function NumberTickerFallback({ value }: { value: string }) {
  const motionOK = useMotionOK();
  return (
    <motion.span
      initial={motionOK ? { opacity: 0, y: 10 } : false}
      whileInView={motionOK ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={motionOK ? { duration: durations.base, ease } : undefined}
    >
      {value}
    </motion.span>
  );
}
