"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { MagnetFallback } from "@/components/v2/MagnetFallback";

export function Contact({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const email = profile.links.email || "aayush.ardy@gmail.com";

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-x-clip border-t border-border bg-surface/40 py-12 sm:py-16"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 z-10">
        <div className="rounded-2xl border border-border/80 bg-background/80 p-6 sm:p-10 shadow-xl backdrop-blur-md">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* Left: Heading + pitch */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Connect
                </span>
                <span className="h-px w-6 bg-border" />
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open to remote internships, 2026
                </span>
              </div>

              <h2
                id="contact-title"
                className="mt-3 font-heading text-3xl sm:text-5xl tracking-tight text-foreground"
              >
                Let&apos;s build something{" "}
                <span className="text-accent underline decoration-accent/30 decoration-wavy underline-offset-4">
                  deliberate
                </span>
                .
              </h2>

              {/* What I'm looking for */}
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg">
                Looking for remote internships and technical collaboration opportunities in 2026.
                Open to full-stack, backend, or product-engineering roles.
              </p>

              {/* Direct email */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {/* Mailto link */}
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground transition-all hover:border-accent hover:bg-accent hover:text-primary-foreground"
                  aria-label={`Send email to ${email}`}
                >
                  <Mail size={13} className="text-accent group-hover:text-primary-foreground transition-colors" />
                  <span>{email}</span>
                </a>

                {/* Copy button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all hover:border-accent hover:text-accent active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="font-bold text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Links */}
            <div className="flex flex-col gap-4 lg:items-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Profiles
              </span>

              <div className="flex flex-wrap gap-2.5 lg:justify-end">
                <MagnetFallback>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile (opens in new tab)"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground/90 transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:-translate-y-0.5"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </MagnetFallback>

                <MagnetFallback>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile (opens in new tab)"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground/90 transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:-translate-y-0.5"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </MagnetFallback>

                {resumeAvailable && (
                  <MagnetFallback>
                    <a
                      href={profile.links.resume}
                      aria-label="Download resume (PDF)"
                      className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground/90 transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:-translate-y-0.5"
                    >
                      <span>Resume</span>
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </MagnetFallback>
                )}
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>Based in India · UTC+5:30 (IST)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
