"use client";

import { useEffect, useRef, useState } from "react";

interface LottieStatusIndicatorProps {
  size?: number;
  className?: string;
  label?: string;
}

export function LottieStatusIndicator({
  size = 20,
  className = "",
  label = "System telemetry active",
}: LottieStatusIndicatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Guard for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dotLottieInstance: {
      destroy: () => void;
      play: () => void;
      pause: () => void;
      setFrame: (frame: number) => void;
    } | null = null;

    let isDisposed = false;

    // Dynamically import DotLottie to keep initial bundle ultra-light
    import("@lottiefiles/dotlottie-web")
      .then(({ DotLottie }) => {
        if (isDisposed || !canvas) return;

        const dl = new DotLottie({
          canvas,
          src: "/lottie/telemetry-radar.json",
          autoplay: !prefersReducedMotion,
          loop: !prefersReducedMotion,
          renderConfig: {
            autoResize: true,
            devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
            freezeOnOffscreen: true,
          },
        });

        dl.addEventListener("load", () => {
          if (isDisposed) return;
          setIsLoaded(true);
          if (prefersReducedMotion) {
            dl.setFrame(15);
            dl.pause();
          }
        });

        dotLottieInstance = dl;
      })
      .catch((err) => {
        console.warn("DotLottie failed to initialize, using fallback ping:", err);
      });

    // Pause when off-screen to preserve CPU/GPU cycles
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !dotLottieInstance || prefersReducedMotion) return;
        if (entry.isIntersecting) {
          dotLottieInstance.play();
        } else {
          dotLottieInstance.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      isDisposed = true;
      observer.disconnect();
      if (dotLottieInstance) {
        dotLottieInstance.destroy();
      }
    };
  }, []);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      title={label}
      aria-label={label}
      role="img"
    >
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Fallback ping indicator while DotLottie loads or if WASM is unavailable */}
      {!isLoaded && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
    </div>
  );
}
