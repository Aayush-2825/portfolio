"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionOK } from "@/lib/motion";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionMilestone {
  id: string;
  number: string;
  name: string;
  shortLabel: string;
}

const SECTIONS: SectionMilestone[] = [
  { id: "top", number: "01", name: "Executive Telemetry", shortLabel: "HERO" },
  { id: "dozo-case-study", number: "02", name: "DOZO Platform", shortLabel: "DOZO" },
  { id: "projects", number: "03", name: "Selected Works", shortLabel: "WORKS" },
  { id: "layers", number: "04", name: "Systems Matrix", shortLabel: "LAYERS" },
  { id: "principles", number: "05", name: "Code Rigor Lab", shortLabel: "RIGOR" },
  { id: "skills", number: "06", name: "Technical Stack", shortLabel: "STACK" },
  { id: "education", number: "07", name: "NIT Hamirpur", shortLabel: "ACADEMICS" },
  { id: "contact", number: "08", name: "Direct Comms", shortLabel: "CONTACT" },
];

export function PageScrollNarrative() {
  const motionOK = useMotionOK();
  const [activeId, setActiveId] = useState<string>("top");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string) => {
    sound.playClick(1200, 0.015);
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!motionOK) return;

    // 1. Overall Page Scroll Progress Tracker
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScrollProgress(Math.round(self.progress * 100));
      },
    });

    // 2. Section Active Spy & Fluid Scroll Entrance Choreography
    const sectionTriggers = SECTIONS.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      // Active Section Observer
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveId(sec.id),
        onEnterBack: () => setActiveId(sec.id),
      });

      // Smooth Page Scroll Transition: Subtle Staggered Entrance Elevation
      const headerEl = el.querySelector("h2, h1");
      const contentEl = el.querySelector(".grid, main, .max-w-5xl, .max-w-7xl");

      if (headerEl && contentEl && sec.id !== "top") {
        gsap.fromTo(
          [headerEl, contentEl],
          {
            y: 35,
            opacity: 0.25,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            clearProps: "transform",
          }
        );
      }

      return trigger;
    });

    return () => {
      progressTrigger.kill();
      sectionTriggers.forEach((t) => t?.kill());
    };
  }, [motionOK]);

  return (
    <>
      {/* Blueprint Vertical Scroll Progress HUD (Right Viewport Edge) */}
      <aside
        ref={containerRef}
        aria-label="Section Scroll Navigator"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2.5 select-none pointer-events-auto"
      >
        {/* Top Telemetry Chip */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="tabular-nums">{scrollProgress}%</span>
        </div>

        {/* Vertical Rail with Milestone Dots */}
        <div className="relative flex flex-col items-end gap-3.5 py-2">
          {/* Subtle Background Guide Line */}
          <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-white/[0.08]" aria-hidden="true" />

          {/* Active Filled Progress Line */}
          <div
            className="absolute right-[5px] top-0 w-[1px] bg-accent transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress}%` }}
            aria-hidden="true"
          />

          {SECTIONS.map((sec) => {
            const isActive = activeId === sec.id;
            const isHovered = hoveredId === sec.id;

            return (
              <div
                key={sec.id}
                className="group relative flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => {
                  setHoveredId(sec.id);
                  sound.playHover(2000, 0.01);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => scrollToSection(sec.id)}
              >
                {/* Floating Tooltip Label */}
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#090a0d]/90 px-2 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-md transition-all duration-200 pointer-events-none shadow-lg",
                    isActive || isHovered
                      ? "opacity-100 translate-x-0 text-foreground"
                      : "opacity-0 translate-x-2"
                  )}
                >
                  <span className="text-accent font-semibold">{sec.number}</span>
                  <span className="opacity-40">/</span>
                  <span className="uppercase tracking-wider">{sec.shortLabel}</span>
                </div>

                {/* Milestone Node Bead */}
                <button
                  type="button"
                  aria-label={`Jump to ${sec.name}`}
                  className={cn(
                    "relative z-10 flex h-3 w-3 items-center justify-center rounded-full transition-all duration-200",
                    isActive
                      ? "bg-accent shadow-[0_0_12px_rgba(255,77,31,0.8)] scale-125"
                      : "bg-[#18181b] border border-white/[0.2] hover:border-accent hover:scale-110"
                  )}
                >
                  {isActive && (
                    <span className="absolute h-full w-full rounded-full bg-accent animate-ping opacity-60" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Active Status Semaphore */}
        <div className="font-mono text-[9px] uppercase tracking-wider text-accent/80 mt-1 flex items-center gap-1">
          <span>SEC:</span>
          <span className="text-foreground font-semibold">
            {SECTIONS.find((s) => s.id === activeId)?.shortLabel ?? "TOP"}
          </span>
        </div>
      </aside>
    </>
  );
}
