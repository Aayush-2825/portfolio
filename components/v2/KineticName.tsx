"use client";

import { motion } from "motion/react";
import { useMotionOK } from "@/lib/motion";
import { sound } from "@/lib/sound";

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
          <span
            key={wordIdx}
            className="inline-flex overflow-hidden py-1 whitespace-nowrap"
          >
            {letters.map((letter) => {
              const currentIndex = globalIndex++;
              return (
                <motion.span
                  key={`${letter}-${currentIndex}`}
                  aria-hidden="true"
                  initial={motionOK ? { y: "115%", opacity: 0 } : false}
                  animate={motionOK ? { y: "0%", opacity: 1 } : undefined}
                  transition={{
                    duration: 0.65,
                    delay: 0.12 + currentIndex * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={
                    motionOK
                      ? {
                          y: -6,
                          scale: 1.06,
                          color: "var(--accent)",
                          transition: { type: "spring", stiffness: 450, damping: 15 },
                        }
                      : undefined
                  }
                  onMouseEnter={() => {
                    if (motionOK) {
                      sound.playHover(1300 + currentIndex * 50, 0.012);
                    }
                  }}
                  className="cursor-default select-none text-foreground font-semibold inline-block transition-colors duration-150 will-change-transform"
                  style={{ color: "var(--foreground, #f2f0ea)" }}
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
