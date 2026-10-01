"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { useMotionOK } from "@/lib/motion";

export function ScrollVelocityFallback({ items }: { items: string[] }) {
  const motionOK = useMotionOK();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const rows = [items, [...items].reverse()];

  return (
    <div ref={ref} className="grid gap-3 overflow-hidden">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="flex min-w-max gap-6 font-mono text-xs uppercase text-muted-foreground"
          animate={motionOK && inView ? { x: rowIndex === 0 ? [0, -520] : [-520, 0] } : undefined}
          transition={motionOK ? { duration: 18 + rowIndex * 3, ease: "linear", repeat: Infinity } : undefined}
        >
          {[...row, ...row].map((item, index) => (
            <span key={`${item}-${index}`} className="whitespace-nowrap border border-border px-3 py-2">
              {item}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
