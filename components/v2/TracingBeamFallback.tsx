"use client";

import type { ReactNode } from "react";

export function TracingBeamFallback({ children }: { children: ReactNode }) {
  return (
    <div className="relative border-l border-accent pl-6">
      <span aria-hidden="true" className="absolute -left-px top-0 h-full w-px bg-accent" />
      {children}
    </div>
  );
}
