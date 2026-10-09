import { existsSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

import { KineticName } from "@/components/v2/KineticName";
import { profile } from "@/data/profile";

const checkResume = cache(() => {
  try {
    const resumePath = profile.links.resume?.replace(/^\//, "");
    if (!resumePath) return false;
    return existsSync(path.join(process.cwd(), "public", resumePath));
  } catch {
    return false;
  }
});

/** Compact architecture sketch: Client → API → Data */
function ArchitectureSketch() {
  const nodes = [
    { id: "client", label: "Client", sub: "Next.js · React" },
    { id: "api",    label: "API",    sub: "Express · JWT" },
    { id: "data",   label: "Data",   sub: "PostgreSQL · Redis" },
  ];

  return (
    <div
      aria-label="DOZO architecture: Client connects to API, API connects to Data layer"
      className="flex items-center gap-0 font-mono text-[10px]"
    >
      {nodes.map((node, i) => (
        <div key={node.id} className="flex items-center">
          {/* Node box */}
          <div className="rounded border border-border/70 bg-surface/80 px-3 py-2 text-center min-w-[5.5rem]">
            <div className="font-semibold text-foreground/90">{node.label}</div>
            <div className="text-[9px] text-muted-foreground mt-0.5">{node.sub}</div>
          </div>
          {/* Connector arrow */}
          {i < nodes.length - 1 && (
            <div className="flex items-center px-1" aria-hidden="true">
              <div className="h-px w-6 bg-accent/50" />
              <div className="h-1.5 w-1.5 rotate-45 border-r border-t border-accent/50 -ml-0.5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const resumeAvailable = checkResume();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden border-b border-border bg-background"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="hero-noise absolute inset-0 opacity-20" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-4 pb-8 pt-28 sm:px-8 lg:px-10">
        {/* Top metadata */}
        <header className="flex items-start justify-between gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Technical Co-founder · DOZO</span>
          </div>

          {/* Specific status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground sm:text-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-semibold text-accent">Open to remote internships, 2026</span>
          </div>
        </header>

        {/* Main hero — two-column at lg: text left, architecture sketch right */}
        <main className="grid flex-1 grid-cols-12 items-center gap-x-6 gap-y-12 py-14 lg:py-20">
          {/* Left: Name + title + proof + CTAs */}
          <div className="col-span-12 lg:col-span-7 z-10">
            <div className="max-w-[900px]">
              <h1
                id="hero-title"
                className="font-heading font-semibold uppercase leading-[0.82] tracking-[-0.045em] text-foreground"
              >
                {/* Dominant: name at max size */}
                <span className="block text-[clamp(4rem,12vw,10.5rem)]">
                  <KineticName name={profile.name} />
                </span>

                {/* Clearly secondary: title smaller, muted */}
                <span className="mt-4 block text-[clamp(1.4rem,3.6vw,3.5rem)] tracking-tight text-muted-foreground font-medium">
                  {profile.title}
                </span>
              </h1>

              {/* Proof line */}
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
                Built DOZO, a real-time local-services marketplace with JWT auth and WebSocket live tracking.
              </p>

              {/* Tagline / hero subtext */}
              <div className="mt-4 flex max-w-2xl gap-4">
                <div className="mt-2 h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {profile.heroSubtext}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#projects"
                  className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Selected Work
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </span>
                </a>

                {/* Resume button */}
                {resumeAvailable ? (
                  <a
                    href={profile.links.resume}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-border/80 bg-surface/50 px-8 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="Download resume (PDF)"
                  >
                    Resume ↓
                  </a>
                ) : (
                  // TODO: add public/resume/Aayush-Raj-Resume.pdf to show the Resume button
                  null
                )}
              </div>

              {/* Social links */}
              <nav aria-label="Social links" className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
                {[
                  { label: "GitHub", url: profile.links.github },
                  { label: "LinkedIn", url: profile.links.linkedin },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${link.label} profile (opens in new tab)`}
                    className="rounded-full border border-border/80 bg-surface/50 px-3.5 py-1.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right: DOZO architecture sketch instead of HUD */}
          <div className="col-span-12 flex flex-col items-start gap-4 lg:col-span-5 lg:justify-center lg:items-end">
            <div className="rounded-xl border border-border/60 bg-surface/60 p-6 backdrop-blur-sm w-full max-w-sm">
              {/* Eyebrow label */}
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                DOZO · System Architecture
              </p>
              <ArchitectureSketch />
              <div className="mt-4 space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <span>WebSocket live booking state machine</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <span>JWT auth + refresh-token rotation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <span>Turborepo monorepo · Docker · PostgreSQL</span>
                </div>
              </div>
              <p className="mt-4 font-mono text-[9px] text-muted-foreground/60 italic">
                Selected for NIT Hamirpur pre-incubation program.
              </p>
            </div>
          </div>
        </main>

        {/* Bottom scroll hint */}
        <div className="flex justify-end">
          <a
            href="#projects"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent"
          >
            <span>Scroll to explore</span>
            <span className="animate-bounce text-accent" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-ping, .animate-bounce { animation: none !important; }
          }
        `
      }} />
    </section>
  );
}
