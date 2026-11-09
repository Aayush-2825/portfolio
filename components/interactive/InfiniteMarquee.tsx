"use client";

import { useMotionOK } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items?: string[];
  direction?: "left" | "right";
  speed?: number; // seconds
  className?: string;
}

const DEFAULT_ITEMS = [
  "NIT HAMIRPUR",
  "RELIANCE FOUNDATION SCHOLAR",
  "DOZO TECHNICAL CO-FOUNDER",
  "DISTRIBUTED SYSTEMS",
  "WEBSOCKET DISPATCH",
  "ACID TRANSACTIONS",
  "JEE ADVANCED TOP 1%",
  "NEXT.JS 16 & REACT 19",
  "POSTGRESQL & REDIS",
  "PRE-INCUBATION RECIPIENT",
];

export function InfiniteMarquee({
  items = DEFAULT_ITEMS,
  direction = "left",
  speed = 28,
  className = "",
}: MarqueeProps) {
  const motionOK = useMotionOK();

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden border-y border-white/[0.08] bg-[#070709] py-3.5 select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Edge gradient masks for seamless fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#070709] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#070709] to-transparent" />

      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-8",
          motionOK && "animate-marquee",
          direction === "right" && "direction-reverse"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((item, idx) => (
          <div key={`item-1-${idx}`} className="flex items-center gap-8 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/75 font-medium hover:text-accent transition-colors">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-8",
          motionOK && "animate-marquee",
          direction === "right" && "direction-reverse"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden="true"
      >
        {items.map((item, idx) => (
          <div key={`item-2-${idx}`} className="flex items-center gap-8 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/75 font-medium hover:text-accent transition-colors">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
