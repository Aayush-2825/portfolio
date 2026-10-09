"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

import { profile } from "@/data/profile";
import { BackgroundGrid, SectionHeader, StaggerReveal, SpotlightCard } from "@/components/ui/shared";
import { cn } from "@/lib/utils";
import { useMotionOK } from "@/lib/motion";
import { BlurFade } from "@/components/ui/blur-fade";

/* Principles with evidence links to real projects */
const principles = [
  {
    number: "01",
    title: "Build from fundamentals",
    description: "Understand the underlying system before reaching for abstractions.",
    takeaway: "Prefer writing raw SQL schemas and core protocols before wrapping them in heavy frameworks — reduces debugging time significantly.",
    // TODO: confirm best project link for this principle (Authentication Backend is a good candidate)
    evidence: "See: Authentication Backend.",
    evidenceHref: "#projects",
  },
  {
    number: "02",
    title: "Ship useful software",
    description: "Prefer working product decisions over unnecessary technical complexity.",
    takeaway: "Solve the customer bottleneck first with the cleanest working system. Premature optimisation delays value.",
    evidence: "See: ViewProof.",
    evidenceHref: "#projects",
  },
  {
    number: "03",
    title: "Design for change",
    description: "Structure systems so new requirements do not require rewriting everything.",
    takeaway: "Modular domain boundaries, decoupled contracts, and clear data types allow rapid iteration without breaking downstream services.",
    evidence: "See: DOZO.",
    evidenceHref: "#projects",
  },
];

export function About() {
  const motionOK = useMotionOK();
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(0);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-x-clip border-t border-border bg-background py-20 sm:py-32"
    >
      <BackgroundGrid className="opacity-30" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Principles"
          title={
            <>
              Engineering<br />
              <span className="text-muted-foreground">principles.</span>
            </>
          }
          description="How I approach software architecture, systems thinking, and delivering deliberate products."
        />

        <div className="mb-24 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Left: Profile summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BlurFade delay={0.1} inView>
              <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
                {profile.summary}
              </p>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="mt-6 rounded-lg border-l-2 border-accent bg-accent/[0.04] p-4 text-sm text-foreground/80">
                {profile.tagline}
              </div>
            </BlurFade>

            {/* Quick info */}
            <div className="mt-8 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="rounded border border-border bg-surface/50 p-3">
                <span className="text-[10px] text-muted-foreground uppercase block">Education</span>
                <span className="text-foreground font-semibold mt-1 block">NIT Hamirpur</span>
              </div>
              <div className="rounded border border-border bg-surface/50 p-3">
                <span className="text-[10px] text-muted-foreground uppercase block">Location</span>
                <span className="text-foreground font-semibold mt-1 block">India (IST)</span>
              </div>
            </div>
          </div>

          {/* Right: Principles */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                Engineering Principles
              </p>
              <span className="font-mono text-[10px] text-muted-foreground">Click to expand rationale</span>
            </div>

            <div className="space-y-4">
              {principles.map((principle, index) => {
                const isExpanded = expandedPrinciple === index;
                return (
                  <StaggerReveal key={principle.number} index={index}>
                    <SpotlightCard
                      onClick={() => setExpandedPrinciple(isExpanded ? null : index)}
                      className={cn(
                        "group relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                        isExpanded
                          ? "border-accent/60 bg-surface/80 shadow-md"
                          : "border-border/80 bg-surface/40 hover:border-accent/40 hover:bg-surface/60"
                      )}
                    >
                      {/* Left vertical accent bar */}
                      <span
                        className={cn(
                          "absolute left-0 top-0 h-full w-1 origin-top bg-accent transition-transform duration-500",
                          isExpanded ? "scale-y-100" : "scale-y-0"
                        )}
                      />

                      <div
                        onMouseEnter={() => setExpandedPrinciple(index)}
                        className="p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-[10px] text-accent font-semibold mt-1">{principle.number}</span>
                            <div>
                              <h4 className="text-base font-medium text-foreground transition-colors group-hover:text-accent">
                                {principle.title}
                              </h4>
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {principle.description}
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            size={18}
                            className={cn(
                              "text-muted-foreground transition-transform duration-300 shrink-0 mt-1",
                              isExpanded ? "rotate-180 text-accent" : ""
                            )}
                          />
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-border/80 pl-8">
                                <div className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed bg-accent/[0.04] p-3 rounded border border-accent/20">
                                  <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                  <span>
                                    <strong>Practical application:</strong> {principle.takeaway}
                                  </span>
                                </div>
                                {/* Evidence link */}
                                <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                                  {principle.evidence}{" "}
                                  <a
                                    href={principle.evidenceHref}
                                    className="text-accent hover:underline"
                                    aria-label={`View project evidence for principle ${principle.number}`}
                                  >
                                    ↑ scroll up
                                  </a>
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </SpotlightCard>
                  </StaggerReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
