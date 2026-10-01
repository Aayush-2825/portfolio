"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { useMotionOK } from "@/lib/motion";

export function MarqueeFallback({ items }: { items: string[] }) {
  const motionOK = useMotionOK();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const loop = [...items, ...items];

  return (
    <div ref={ref} className="overflow-hidden border-y border-border py-4">
      <motion.div
        className="flex min-w-max gap-8 font-mono text-xs uppercase text-muted"
        animate={motionOK && inView ? { x: [0, -680] } : undefined}
        transition={motionOK ? { duration: 22, ease: "linear", repeat: Infinity } : undefined}
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="whitespace-nowrap">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
