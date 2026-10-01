"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { useMotionOK } from "@/lib/motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) {
      return;
    }

    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, [motionOK]);

  return children;
}
