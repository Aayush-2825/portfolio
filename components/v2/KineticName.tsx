"use client";

import { motion } from "motion/react";
import { durations, ease, stagger, useMotionOK } from "@/lib/motion";

export function KineticName({ name }: { name: string }) {
  const motionOK = useMotionOK();
  const words = name.toUpperCase().split(" ");
  let globalIndex = 0;

  return (
    <span
      aria-label={name}
      className="inline-flex flex-wrap items-baseline gap-x-[0.25em] text-foreground"
      role="text"
    >
      {words.map((word, wordIdx) => {
        const letters = word.split("");
        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {letters.map((letter) => {
              const currentIndex = globalIndex++;
              return (
                <motion.span
                  key={`${letter}-${currentIndex}`}
                  aria-hidden="true"
                  initial={false}
                  whileHover={
                    motionOK
                      ? {
                          y: -8,
                          scale: 1.08,
                          color: "var(--accent)",
                          transition: { type: "spring", stiffness: 450, damping: 15 },
                        }
                      : undefined
                  }
                  className="cursor-default select-none text-foreground font-semibold inline-block transition-colors duration-150"
                  style={{ opacity: 1, color: "var(--foreground, #f2f0ea)" }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
