import React from "react";
import { cn } from "@/lib/utils";

interface CornerCrosshairsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

/**
 * Architectural registration marks (+) at the four corners of a container.
 * Signature visual motif for blueprint-editorial and precision engineering aesthetics.
 */
export function CornerCrosshairs({
  className,
  size = "md",
  color = "text-accent/40",
}: CornerCrosshairsProps) {
  const sizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  }[size];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 select-none overflow-visible", className)}
      aria-hidden="true"
    >
      <span className={cn("absolute -top-2 -left-2 font-mono font-light leading-none select-none", sizeClasses, color)}>
        +
      </span>
      <span className={cn("absolute -top-2 -right-2 font-mono font-light leading-none select-none", sizeClasses, color)}>
        +
      </span>
      <span className={cn("absolute -bottom-2 -left-2 font-mono font-light leading-none select-none", sizeClasses, color)}>
        +
      </span>
      <span className={cn("absolute -bottom-2 -right-2 font-mono font-light leading-none select-none", sizeClasses, color)}>
        +
      </span>
    </div>
  );
}
