"use client";

import { useEffect, useRef } from "react";
import { useMotionOK } from "@/lib/motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export function ParticleMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionOK = useMotionOK();

  useEffect(() => {
    if (!motionOK) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of particles responsive to screen size
    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 64;
    const maxDistance = isMobile ? 85 : 125;
    const maxDistanceSq = maxDistance * maxDistance;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handlePointerMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handlePointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        render(lastTime);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (!isVisible) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Subtle mouse repulsion/attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 15000 && distSq > 0) {
          const force = (15000 - distSq) / 15000;
          p.x -= (dx / Math.sqrt(distSq)) * force * 1.2;
          p.y -= (dy / Math.sqrt(distSq)) * force * 1.2;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 77, 31, ${p.baseAlpha})`;
        ctx.fill();

        // Connect adjacent particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const distJ_x = p.x - p2.x;
          const distJ_y = p.y - p2.y;
          const dSq = distJ_x * distJ_x + distJ_y * distJ_y;

          if (dSq < maxDistanceSq) {
            const alpha = (1 - Math.sqrt(dSq) / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(242, 240, 234, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [motionOK]);

  if (!motionOK) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-35"
      aria-hidden="true"
    />
  );
}
