"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import "lenis/dist/lenis.css";

import { useMotionOK } from "@/lib/motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: false, // Keep native touch scrolling on mobile/tablets so height is never capped
    });

    // Continuously sync scroll bounds whenever dynamic DOM nodes expand/render
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }
    if (document.documentElement) {
      resizeObserver.observe(document.documentElement);
    }

    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize, { passive: true });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => lenis.resize()).catch(() => undefined);
    }

    // Safety syncs for hydration and late-rendering motion components
    const t1 = setTimeout(() => lenis.resize(), 100);
    const t2 = setTimeout(() => lenis.resize(), 500);
    const t3 = setTimeout(() => lenis.resize(), 1200);

    // Smoothly handle in-page anchor clicks (Nav links, CTA buttons) to prevent hash jump desync
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "#top") {
        if (href === "#top") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1 });
        }
        return;
      }

      const targetEl = document.querySelector<HTMLElement>(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -60, duration: 1.1 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      document.removeEventListener("click", handleAnchorClick);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      lenis.destroy();
    };
  }, [motionOK]);

  return children;
}
