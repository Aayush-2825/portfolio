// Source: https://motion.dev/docs/react-reduce-motion
"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

import { durations, ease, useReducedMotionSafe } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
};

export function Reveal({ children, ...props }: RevealProps) {
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const reducedMotion = useReducedMotionSafe();
  const motionEnabled = hydrated && reducedMotion === false;

  return (
    <motion.div
      key={motionEnabled ? "motion" : "static"}
      initial={motionEnabled ? { opacity: 0, y: 16 } : false}
      whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={motionEnabled ? { duration: durations.base, ease } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
