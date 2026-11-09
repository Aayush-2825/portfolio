"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useMotionOK } from "@/lib/motion";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function subscribeHover(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getHoverSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function TargetCursorFallback() {
  const hydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const canHover = useSyncExternalStore(subscribeHover, getHoverSnapshot, getServerSnapshot);
  const motionOK = useMotionOK();
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 30, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 450, damping: 30, mass: 0.15 });

  useEffect(() => {
    if (!motionOK || !canHover) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (!isVisible) setIsVisible(true);
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        setCursorText(cursorEl.getAttribute("data-cursor") || "");
        setIsPointer(true);
        return;
      }

      const isInteractive = Boolean(
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-interactive='true'], .cursor-pointer"
        )
      );

      setCursorText("");
      setIsPointer(isInteractive);
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [motionOK, canHover, isVisible, x, y]);

  if (!hydrated || !motionOK || !canHover || !isVisible) {
    return null;
  }

  const hasText = Boolean(cursorText);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none">
      {/* Outer reactive halo / badge */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-accent/80 backdrop-blur-[2px]"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: hasText ? 84 : isPointer ? 44 : 26,
          height: hasText ? 36 : isPointer ? 44 : 26,
          scale: isClicking ? 0.88 : 1,
          backgroundColor: hasText
            ? "rgba(10, 10, 11, 0.85)"
            : isPointer
            ? "rgba(255, 77, 31, 0.15)"
            : "rgba(255, 77, 31, 0.04)",
          borderColor: hasText
            ? "#ff4d1f"
            : isPointer
            ? "rgba(255, 77, 31, 0.9)"
            : "rgba(255, 77, 31, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {hasText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent text-center px-1"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner precise dot (hidden when hovering with text or large pointer) */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{
          x,
          y,
        }}
        animate={{
          scale: isPointer || hasText ? 0 : 1,
          opacity: isPointer || hasText ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
