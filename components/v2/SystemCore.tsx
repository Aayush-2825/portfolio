"use client";

import { useEffect, useRef } from "react";

export function SystemCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 14;
      const rotateY = (x - 0.5) * 14;

      container.style.setProperty(
        "--rotate-x",
        `${rotateX.toFixed(2)}deg`,
      );

      container.style.setProperty(
        "--rotate-y",
        `${rotateY.toFixed(2)}deg`,
      );
    };

    const handleLeave = () => {
      container.style.setProperty("--rotate-x", "0deg");
      container.style.setProperty("--rotate-y", "0deg");
    };

    window.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="system-core relative aspect-square w-full max-w-130"
    >
      {/* Corner labels */}
      <div className="absolute left-0 top-0 z-20 font-mono text-[9px] uppercase tracking-[0.15em] ">
        SYS / 01
      </div>

      <div className="absolute right-0 top-0 z-20 font-mono text-[9px] uppercase tracking-[0.15em] ">
        ONLINE
      </div>

      <div className="absolute bottom-0 left-0 z-20 font-mono text-[9px] uppercase tracking-[0.15em] ">
        AI × WEB × SYSTEMS
      </div>

      <div className="absolute bottom-0 right-0 z-20 font-mono text-[9px] uppercase tracking-[0.15em] ">
        2026
      </div>

      {/* Outer frame */}
      <div className="absolute inset-[8%] rounded-full border border-border/70" />

      <div className="absolute inset-[16%] rounded-full border border-accent/20" />

      <div className="absolute inset-[27%] rounded-full border border-border/60" />

      {/* Rotating orbit */}
      <div className="system-orbit absolute inset-[12%]">
        <div className="system-orbit-dot" />
      </div>

      {/* Second orbit */}
      <div className="system-orbit system-orbit-reverse absolute inset-[22%]">
        <div className="system-orbit-dot" />
      </div>

      {/* Main 3D object */}
      <div className="system-object absolute left-1/2 top-1/2">
        <div className="system-object-inner">
          <div className="system-object-face face-front" />
          <div className="system-object-face face-back" />
          <div className="system-object-face face-left" />
          <div className="system-object-face face-right" />
          <div className="system-object-face face-top" />
          <div className="system-object-face face-bottom" />
        </div>
      </div>

      {/* Central core */}
      <div className="system-core-center absolute left-1/2 top-1/2">
        <div className="system-core-glow" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 bg-background/80 backdrop-blur-md">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        </div>
      </div>

      {/* Connection nodes */}
      <div className="system-node node-1" />
      <div className="system-node node-2" />
      <div className="system-node node-3" />
      <div className="system-node node-4" />

      {/* Data lines */}
      <div className="data-line data-line-1" />
      <div className="data-line data-line-2" />
      <div className="data-line data-line-3" />

      {/* Technical info */}
      <div className="absolute left-[12%] top-[34%] font-mono text-[8px] uppercase leading-5 text-muted-foreground">
        <div>React</div>
        <div>Next.js</div>
        <div>Node</div>
      </div>

      <div className="absolute bottom-[30%] right-[10%] text-right font-mono text-[8px] uppercase leading-5 text-muted-foreground">
        <div>AI</div>
        <div>Redis</div>
        <div>Postgres</div>
      </div>
    </div>
  );
}