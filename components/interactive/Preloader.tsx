"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sound";

interface BootStep {
  text: string;
  subtext: string;
  status: string;
}

const BOOT_STEPS: BootStep[] = [
  {
    text: "NIT-HMR KERNEL v6.8.0-RELEASE (x86_64)",
    subtext: "NIT Hamirpur CSE Dual Degree Runtime",
    status: "BOOTED",
  },
  {
    text: "ALLOCATING RUNTIME HEAP: 64MB",
    subtext: "Next.js 16 · React 19 Client Hydration",
    status: "OK",
  },
  {
    text: "MOUNTING DISTRIBUTED TOPOLOGY: DOZO V2",
    subtext: "On-demand domestic services platform",
    status: "MOUNTED",
  },
  {
    text: "SYNCHRONIZING POSTGRES ACID & REDIS STREAM",
    subtext: "Serializable isolation & Geohash matching",
    status: "SYNCED",
  },
  {
    text: "CONNECTING WEBSOCKET DISPATCH ENGINE",
    subtext: "Bidirectional live state synchronization",
    status: "CONNECTED",
  },
  {
    text: "READY: ALL SYSTEMS OPERATIONAL (60 FPS)",
    subtext: "Antigravity Engineering Portfolio active",
    status: "ACTIVE",
  },
];

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleFinish = useCallback(() => {
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Total animation runtime: ~2.4 seconds with non-linear pacing
    const startTime = performance.now();
    const duration = 2400; // ms

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Non-linear easing: fast start, brief pause at 70%, then accelerates to 100%
      let curvedProgress = 0;
      if (t < 0.3) {
        curvedProgress = (t / 0.3) * 40;
      } else if (t < 0.7) {
        curvedProgress = 40 + ((t - 0.3) / 0.4) * 35;
      } else {
        curvedProgress = 75 + ((t - 0.7) / 0.3) * 25;
      }

      const intProgress = Math.min(Math.round(curvedProgress), 100);
      setProgress(intProgress);

      // Calculate corresponding step index
      const stepIdx = Math.min(
        Math.floor((intProgress / 100) * BOOT_STEPS.length),
        BOOT_STEPS.length - 1
      );
      setCurrentStepIndex(stepIdx);

      if (t < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        sound.playSuccess();
        setTimeout(handleFinish, 400);
      }
    };

    animId = requestAnimationFrame(tick);

    // Escape or Enter skips instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        cancelAnimationFrame(animId);
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#070709] p-6 sm:p-12 font-mono text-foreground select-none cursor-pointer"
        >
          {/* Top Telemetry */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-foreground font-semibold tracking-wider">AAYUSH RAJ</span>
              <span className="opacity-40">/</span>
              <span className="text-accent">KERNEL BOOT</span>
            </div>
            <div className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] text-muted-foreground/80 hover:border-accent hover:text-accent transition-colors">
              ESC / Click anywhere to skip
            </div>
          </div>

          {/* Center Diagnostic Display */}
          <div className="max-w-xl mx-auto w-full my-auto space-y-7">
            <div className="flex items-baseline justify-between">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <span className="inline-block h-1 w-4 bg-accent" />
                  System Initialization
                </span>
                <p className="text-sm text-foreground/75">
                  Mounting architecture topology & interactive simulations
                </p>
              </div>
              <div className="font-heading text-6xl sm:text-8xl font-bold tracking-tighter text-foreground tabular-nums">
                {String(progress).padStart(2, "0")}
                <span className="text-2xl sm:text-3xl text-accent font-normal">%</span>
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-accent shadow-[0_0_16px_rgba(255,77,31,0.9)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Diagnostic Boot Log Sequence */}
            <div className="space-y-2 rounded-xl border border-white/[0.08] bg-[#0c0d12]/90 p-4 sm:p-5 text-xs shadow-inner">
              {BOOT_STEPS.slice(0, currentStepIndex + 1).map((step, i) => {
                const isLatest = i === currentStepIndex;
                return (
                  <div key={i} className="flex items-center justify-between gap-3 font-mono">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className={isLatest ? "text-accent animate-pulse" : "text-muted-foreground/50"}>
                        ›
                      </span>
                      <span className={isLatest ? "text-foreground font-semibold truncate" : "text-muted-foreground/70 truncate"}>
                        {step.text}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] shrink-0 font-semibold px-2 py-0.5 rounded ${
                        isLatest
                          ? "bg-accent/20 text-accent border border-accent/40"
                          : "bg-white/[0.04] text-muted-foreground/60"
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground/60 border-t border-white/[0.08] pt-4">
            <span>NIT Hamirpur · Computer Science Dual Degree</span>
            <span>DOZO Technical Co-founder · 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
