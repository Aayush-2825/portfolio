import { existsSync } from "node:fs";
import path from "node:path";

import { KineticName } from "@/components/v2/KineticName";
import { SystemCore } from "@/components/v2/SystemCore";
import { profile } from "@/data/profile";
import { layers } from "@/lib/layers";

function hasResume() {
  const resumePath = profile.links.resume.replace(/^\//, "");

  return (
    Boolean(resumePath) &&
    existsSync(path.join(process.cwd(), "public", resumePath))
  );
}

export function Hero() {
  const resumeAvailable = hasResume();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden border-b border-border bg-background"
    >
      {/* Technical background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="hero-grid absolute inset-0" />

        {/* Radial glow */}
        <div className="absolute right-[8%] top-[20%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />

        {/* Noise */}
        <div className="hero-noise absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-4 pb-8 pt-28 sm:px-8 lg:px-10">
        {/* Top metadata */}
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            00 / {profile.tagline}
          </p>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>

            Available
          </div>
        </div>

        {/* Main hero */}
        <div className="grid flex-1 grid-cols-12 items-center gap-x-6 gap-y-12 py-14 lg:py-20">
          {/* Left content */}
          <div className="col-span-12 lg:col-span-7">
            <div className="max-w-[900px]">
              <h1
                id="hero-title"
                className="font-heading font-semibold uppercase leading-[0.82] tracking-[-0.045em] text-foreground"
              >
                <span className="block text-[clamp(4rem,12vw,10.5rem)]">
                  <KineticName name={profile.name} />
                </span>

                <span className="mt-5 block max-w-[800px] text-[clamp(2rem,5.8vw,5.8rem)]">
                  {profile.title}
                </span>
              </h1>

              {/* Description */}
              <div className="mt-8 flex max-w-2xl gap-4">
                <div className="mt-2 h-px w-12 shrink-0 bg-accent" />

                <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {profile.heroSubtext}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href="#selected-work"
                  className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    View Selected Work

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>

                  <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 group-hover:translate-y-0" />
                </a>

                {/* Social links */}
                <div className="flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-[0.08em]">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    GitHub
                  </a>

                  <span className="text-muted-foreground/40">/</span>

                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    LinkedIn
                  </a>

                  {resumeAvailable && (
                    <>
                      <span className="text-muted-foreground/40">/</span>

                      <a
                        href={profile.links.resume}
                        className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        Resume
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right — interactive system */}
          <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
            <SystemCore />
          </div>
        </div>

        {/* Bottom technical navigation */}
        <div className="grid grid-cols-1 border-t border-border pt-5 sm:grid-cols-4">
          {layers.slice(0, 3).map((layer, index) => (
            <div
              key={layer.id}
              className="group flex items-center gap-3 border-b border-border py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground sm:border-b-0 sm:border-r sm:px-5 first:sm:pl-0 last:sm:border-r-0"
            >
              <span className="text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-muted-foreground/40">/</span>

              <span>{layer.label}</span>

              <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                ↗
              </span>
            </div>
          ))}

          <div className="mt-3 flex items-center justify-start gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:mt-0 sm:justify-end">
            <span>Scroll to explore</span>

            <span className="animate-bounce text-accent">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
