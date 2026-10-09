"use client";

import { motion } from "motion/react";
import { type ReactNode, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { durations, ease, useMotionOK } from "@/lib/motion";

/* ─── Section Header ─── */

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode;
  description?: string;
  trailing?: ReactNode;
  className?: string;
};

export function SectionHeader({
  index,
  label,
  title,
  description,
  trailing,
  className,
}: SectionHeaderProps) {
  const motionOK = useMotionOK();

  return (
    <header
      className={cn(
        "mb-12 flex flex-col gap-6 border-b border-border pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        <motion.p
          className="mb-4 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground"
          initial={motionOK ? { opacity: 0, x: -16 } : false}
          whileInView={motionOK ? { opacity: 1, x: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={motionOK ? { duration: durations.base, ease } : undefined}
        >
          {index ? (
            <>
              <span className="text-accent font-semibold">{index}</span>
              <span className="h-px w-6 bg-accent/60" />
            </>
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          )}
          <span className="text-accent font-medium">{label}</span>
        </motion.p>

        <motion.div
          initial={motionOK ? { opacity: 0, y: 24, filter: "blur(4px)" } : false}
          whileInView={motionOK ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            motionOK
              ? { duration: durations.slow, ease, delay: 0.08 }
              : undefined
          }
        >
          {typeof title === "string" ? (
            <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] tracking-[-0.045em] text-foreground">
              {title}
            </h2>
          ) : (
            title
          )}
        </motion.div>
      </div>

      {(description || trailing) && (
        <motion.div
          className="max-w-sm shrink-0 sm:text-right"
          initial={motionOK ? { opacity: 0, y: 16 } : false}
          whileInView={motionOK ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            motionOK
              ? { duration: durations.base, ease, delay: 0.16 }
              : undefined
          }
        >
          {description && (
            <p className="text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          )}
          {trailing}
        </motion.div>
      )}
    </header>
  );
}

/* ─── Tech Badge ─── */

type TechBadgeProps = {
  name: string;
  interactive?: boolean;
  className?: string;
};

export function TechBadge({
  name,
  interactive = false,
  className,
}: TechBadgeProps) {
  const motionOK = useMotionOK();

  if (!interactive) {
    return (
      <span
        className={cn(
          "border border-border bg-surface/30 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground",
          className,
        )}
      >
        {name}
      </span>
    );
  }

  return (
    <motion.span
      whileHover={motionOK ? { y: -2, scale: 1.03 } : undefined}
      whileTap={motionOK ? { scale: 0.97 } : undefined}
      className={cn(
        "cursor-default border border-border bg-surface/40 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_12px_rgba(255,77,31,0.2)]",
        className,
      )}
    >
      {name}
    </motion.span>
  );
}

/* ─── Background Grid ─── */

type BackgroundGridProps = {
  size?: number;
  opacity?: number;
  className?: string;
};

export function BackgroundGrid({
  size = 72,
  opacity = 0.45,
  className,
}: BackgroundGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(to right, rgb(242 240 234 / 5%) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(242 240 234 / 5%) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 65%, transparent)",
        opacity,
      }}
    />
  );
}

/* ─── Stagger Reveal ─── */

type StaggerRevealProps = {
  children: ReactNode;
  index?: number;
  className?: string;
};

export function StaggerReveal({
  children,
  index = 0,
  className,
}: StaggerRevealProps) {
  const motionOK = useMotionOK();

  return (
    <motion.div
      className={className}
      initial={motionOK ? { opacity: 0, y: 28, filter: "blur(4px)" } : false}
      whileInView={motionOK ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        motionOK
          ? { duration: durations.base, ease, delay: Math.min(index * 0.08, 0.4) }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

/* ─── Spotlight Card (Interactive Mouse Follower) ─── */

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  onClick?: () => void;
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 77, 31, 0.14)",
  spotlightSize = 340,
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border border-border bg-background transition-colors duration-300",
        className,
      )}
    >
      {/* Spotlight beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
