"use client";

import { useSyncExternalStore } from "react";
import { KineticName } from "@/components/v2/KineticName";
import { HeroArchitectureCanvas } from "@/components/sections/HeroArchitectureCanvas";
import { Magnetic } from "@/components/interactive/Magnetic";
import { profile } from "@/data/profile";
import { sound } from "@/lib/sound";
import { ArrowUpRight, Terminal, Sparkles, Clock, MapPin, GraduationCap, Award } from "lucide-react";

const subscribeTime = (callback: () => void) => {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
};

const getISTTimeSnapshot = () => {
  const now = new Date();
  return (
    now.toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " IST"
  );
};

const getISTTimeServerSnapshot = () => "IST (UTC+5:30)";

export function Hero({
  openTerminal,
}: {
  openTerminal?: () => void;
}) {
  const time = useSyncExternalStore(subscribeTime, getISTTimeSnapshot, getISTTimeServerSnapshot);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden border-b border-border bg-background"
    >
      {/* Background Grids & Vignette */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="hero-noise absolute inset-0 opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-between px-4 pb-10 pt-28 sm:px-8 lg:px-10">
        {/* Top Telemetry Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Location & IST Time with Pulsing Green Semaphore */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <MapPin size={11} className="text-accent" />
              <span>NIT Hamirpur, India</span>
              <span className="opacity-40">·</span>
              <Clock size={11} className="text-muted-foreground" />
              <span className="font-semibold text-foreground/90 tabular-nums">{time}</span>
            </div>

            {/* DOZO Role */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Co-founder · DOZO</span>
            </div>

            {/* Academic Credential Tag */}
            <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/70 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur-md">
              <GraduationCap size={11} className="text-accent" />
              <span className="text-foreground/90">NIT Hamirpur CSE</span>
              <span className="text-accent font-semibold">(CGPA 8.49)</span>
            </div>

            {/* Reliance Foundation Scholar Tag */}
            <div className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] text-amber-300 backdrop-blur-md">
              <Award size={11} className="text-amber-400" />
              <span className="font-semibold">Reliance Foundation Scholar</span>
            </div>
          </div>

          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold">Open to remote internships, 2026</span>
          </div>
        </header>

        {/* Main Hero Grid */}
        <main className="grid flex-1 grid-cols-12 items-center gap-x-8 gap-y-12 py-12 lg:py-16">
          {/* Left Column: Huge Kinetic Headline + Narrative + Actions */}
          <div className="col-span-12 lg:col-span-8 z-10 min-w-0">
            <div className="max-w-3xl min-w-0">
              {/* Engineering Tag */}
              <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs text-accent">
                <Sparkles size={13} />
                <span className="uppercase tracking-[0.2em] font-semibold">Systems & Full-Stack Engineer</span>
              </div>

              {/* Large Kinetic Name - Fluid Clamp with Bricolage Grotesque */}
              <h1
                id="hero-title"
                className="font-heading font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-foreground text-balance"
              >
                <span className="block text-[clamp(2.4rem,7.2vw,7.6rem)] text-foreground">
                  <KineticName name={profile.name} />
                </span>
                <span className="mt-3 block text-[clamp(1.15rem,2.5vw,2.5rem)] tracking-tight text-muted-foreground font-medium text-balance">
                  {profile.title}
                </span>
              </h1>

              {/* Verified Credential Badges Row */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-surface/80 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                  <GraduationCap size={12} className="text-accent" />
                  <span>NIT Hamirpur · CSE Dual Degree</span>
                  <span className="font-semibold text-foreground">CGPA 8.49</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-xs text-amber-300">
                  <Award size={12} className="text-amber-400" />
                  <span className="font-semibold">Reliance Foundation Scholar</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>DOZO Co-founder · NIT Pre-incubation</span>
                </div>
              </div>

              {/* Concrete Proof Line */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                Building <strong className="text-foreground font-semibold">DOZO</strong>, an on-demand real-time local services marketplace with WebSocket state dispatch and distributed relational transactions.
              </p>

              {/* Tagline Subtext */}
              <div className="mt-4 flex max-w-xl items-start gap-3">
                <div className="mt-2.5 h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
                <p className="font-mono text-xs leading-normal text-muted-foreground sm:text-sm">
                  Computer Science at NIT Hamirpur (CGPA 8.49) · Pre-incubation recipient · Focus on architecture, real-time data, and high-reliability systems.
                </p>
              </div>

              {/* CTAs & Interactive Buttons with scale(0.97) Active Feedback */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.25}>
                  <a
                    href="#projects"
                    data-cursor="EXPLORE"
                    onClick={() => sound.playClick(900)}
                    className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span>Explore Selected Work</span>
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    data-cursor="TERMINAL"
                    onClick={() => {
                      sound.playClick(1200);
                      openTerminal?.();
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border/80 bg-surface/70 px-6 py-3 font-mono text-xs font-semibold text-foreground transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Terminal size={14} className="text-accent" />
                    <span>Launch CLI Shell</span>
                  </button>
                </Magnetic>
              </div>

              {/* Quick links & Socials */}
              <nav aria-label="Social links" className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
                {[
                  { label: "GitHub", url: profile.links.github },
                  { label: "LinkedIn", url: profile.links.linkedin },
                  { label: "Email", url: `mailto:${profile.links.email}` },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick(1400, 0.01)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/40 px-3.5 py-1.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-[0.97]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={11} className="opacity-70" />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Hero Architecture Topology Explorer */}
          <div id="architecture-topology" className="col-span-12 flex justify-center lg:col-span-4 lg:justify-end w-full">
            <HeroArchitectureCanvas />
          </div>
        </main>

        {/* Footer Ribbon of Hero: Quick Jump Shortcuts */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-4 text-xs font-mono text-muted-foreground">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
            <span className="hidden sm:inline">Shortcuts:</span>
            <span className="rounded border border-border/60 bg-surface/60 px-1.5 py-0.5 text-[10px]">1 Work</span>
            <span className="rounded border border-border/60 bg-surface/60 px-1.5 py-0.5 text-[10px]">2 Layers</span>
            <span className="rounded border border-border/60 bg-surface/60 px-1.5 py-0.5 text-[10px]">3 Principles</span>
            <span className="rounded border border-border/60 bg-surface/60 px-1.5 py-0.5 text-[10px]">4 Stack</span>
            <span className="rounded border border-border/60 bg-surface/60 px-1.5 py-0.5 text-[10px]">⌘K Commands</span>
          </div>

          <a
            href="#projects"
            onClick={() => sound.playClick(800)}
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-accent"
          >
            <span>Scroll down</span>
            <span className="text-accent animate-bounce">↓</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
