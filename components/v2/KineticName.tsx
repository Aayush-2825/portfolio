"use client";

import { motion } from "motion/react";

import { IntroReveal } from "@/components/v2/IntroReveal";
import { durations, ease, stagger, useMotionOK } from "@/lib/motion";

export function KineticName({ name }: { name: string }) {
  const motionOK = useMotionOK();
  const letters = name.toUpperCase().split("");

  return (
    <IntroReveal>
      <span aria-label={name} className="inline-flex" role="text">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            aria-hidden="true"
            initial={motionOK ? { opacity: 0, y: "0.35em" } : false}
            animate={motionOK ? { opacity: 1, y: 0 } : undefined}
            transition={motionOK ? { duration: durations.base, ease, delay: index * stagger } : undefined}
          >
            {letter === " " ? "\u00a0" : letter}
          </motion.span>
        ))}
      </span>
    </IntroReveal>
  );
}
