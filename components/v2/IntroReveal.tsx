"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";

import { durations, ease, useReducedMotionSafe } from "@/lib/motion";

let introSnapshot: boolean | undefined;

function readIntroSnapshot() {
  if (introSnapshot !== undefined) {
    return introSnapshot;
  }

  try {
    const seen = window.sessionStorage.getItem("aayush-v2-intro-seen");
    introSnapshot = seen !== "1";
    if (introSnapshot) {
      window.sessionStorage.setItem("aayush-v2-intro-seen", "1");
    }
  } catch {
    introSnapshot = true;
  }

  return introSnapshot;
}

function subscribe() {
  return () => undefined;
}

export function IntroReveal({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotionSafe();
  const firstSession = useSyncExternalStore(subscribe, readIntroSnapshot, () => false);
  const shouldReveal = firstSession && reducedMotion === false;

  return (
    <motion.span
      initial={shouldReveal ? { opacity: 0, y: "0.35em" } : false}
      animate={shouldReveal ? { opacity: 1, y: 0 } : undefined}
      transition={shouldReveal ? { duration: durations.slow, ease } : undefined}
    >
      {children}
    </motion.span>
  );
}
