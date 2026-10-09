"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
} as const;

export const stagger = 0.06;

const emptySubscribe = () => () => undefined;

function getCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

function getServerCoarsePointer() {
  return false;
}

export function useReducedMotionSafe() {
  return useReducedMotion();
}

export function useMotionOK() {
  const reducedMotion = useReducedMotionSafe();
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const coarsePointer = useSyncExternalStore(
    emptySubscribe,
    getCoarsePointer,
    getServerCoarsePointer,
  );

  return hydrated && reducedMotion === false && !coarsePointer;
}
