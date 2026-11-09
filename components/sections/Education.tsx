"use client";

import { GraduationCap, Calendar } from "lucide-react";
import { CornerCrosshairs } from "@/components/ui/CornerCrosshairs";
import { profile } from "@/data/profile";

export function Education() {
  const achievements = [
    {
      title: "NIT Hamirpur Pre-Incubation Program",
      description: "Selected for three-month flagship pre-incubation for DOZO (on-demand domestic services platform).",
      badge: "Startup",
    },
    {
      title: "Reliance Foundation Scholar",
      description: "Awarded competitive nationwide undergraduate merit scholarship for leadership and engineering excellence.",
      badge: "Fellowship",
    },
    {
      title: "JEE Advanced Cleared",
      description: "Ranked among top candidate percentile across 1.4 million engineers in India's premier entrance exam.",
      badge: "Top 1%",
    },
    {
      title: "JEE Main Cleared",
      description: "Earned Dual Degree CSE seat at National Institute of Technology, Hamirpur.",
      badge: "Merit",
    },
  ];

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative overflow-hidden border-t border-border bg-[#090a0d] py-24 sm:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            <GraduationCap size={12} />
            <span>Academic Rigor & Credentials</span>
          </div>

          <h2
            id="education-title"
            className="mt-4 font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground"
          >
            Education <span className="text-muted-foreground font-normal">& Honors</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
            The computer science foundations, algorithm coursework, and competitive honors behind the software systems.
          </p>
        </div>

        {/* Institution Highlight Card */}
        <div className="relative mt-14 rounded-2xl border border-border/80 bg-surface/90 shadow-2xl backdrop-blur-md">
          <CornerCrosshairs />
          {/* Top banner */}
          <div className="flex flex-col gap-6 border-b border-border/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 text-accent shadow-sm">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  Institute of National Importance
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mt-0.5">
                  {profile.education.institution}
                </h3>
                <p className="mt-1 text-sm text-foreground/85 font-medium">
                  {profile.education.program}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-2 self-start sm:self-center shrink-0">
              <Calendar size={13} className="text-accent" />
              <span className="font-mono text-xs text-muted-foreground">
                Graduation: <strong className="text-foreground">{profile.education.expectedGraduation}</strong>
              </span>
            </div>
          </div>

          {/* Academic Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60 border-b border-border/60 bg-background/60">
            <div className="p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Undergraduate CGPA
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
                  {profile.education.cgpa}
                </span>
                <span className="font-mono text-xs text-muted-foreground">/ 10.0 scale</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Consistent academic performance in core CS subjects.
              </p>
            </div>

            <div className="p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Class 12 High School
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
                  {profile.education.class12}
                </span>
                <span className="font-mono text-xs text-muted-foreground">CBSE Board</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Distinction in Physics, Chemistry, and Mathematics.
              </p>
            </div>

            <div className="p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Key Coursework Studied
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  "Data Structures & Algorithms",
                  "Operating Systems",
                  "Database Systems (DBMS)",
                  "Computer Networks",
                  "Theory of Computation",
                  "Discrete Math",
                ].map((c) => (
                  <span
                    key={c}
                    className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] text-foreground/80 border border-border/50"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Competitive Achievements */}
          <div className="p-6 sm:p-8 bg-surface/50">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold block mb-4">
              Competitive Honors & Recognition
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className="rounded-xl border border-border/70 bg-background/80 p-4 transition-all hover:border-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {ach.title}
                    </span>
                    <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-accent uppercase">
                      {ach.badge}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
