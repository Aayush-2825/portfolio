"use client";

import { BackgroundGrid, SectionHeader, StaggerReveal } from "@/components/ui/shared";
import { skillGroups, aiML } from "@/data/skills";
import { cn } from "@/lib/utils";

/* ── Compact grouped display ── */
const compactGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firestore", "Drizzle ORM", "Prisma", "Mongoose"],
  },
  {
    label: "Auth & Security",
    items: ["JWT", "Sessions", "OAuth (Google)", "Refresh-token rotation", "2FA", "Passport.js", "Zod", "Helmet", "Rate limiting"],
  },
  {
    label: "Tooling & Infra",
    items: ["Docker", "Turborepo", "Vercel", "Cloudinary", "Cloudflare R2", "Git", "GitHub"],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-x-clip border-t border-border bg-secondary py-20 sm:py-32"
    >
      <BackgroundGrid opacity={0.25} />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Stack"
          title={
            <>
              Technical stack<br />
              <span className="text-muted-foreground">grouped by layer.</span>
            </>
          }
          description="Technologies I've used in shipped or in-progress projects, grouped by role."
        />

        {/* Compact grouped list */}
        <StaggerReveal index={0} className="mb-12">
          <div className="rounded-xl border border-border/80 bg-background/90 divide-y divide-border/60 overflow-hidden">
            {compactGroups.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-5 sm:grid-cols-[10rem_1fr]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent pt-0.5 shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border/70 bg-surface/60 px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </StaggerReveal>

        {/* AI & ML — single compact row */}
        <StaggerReveal index={1} className="mb-12">
          <div className="rounded-xl border border-border/80 bg-background/90 px-6 py-5">
            <div className="grid grid-cols-[8rem_1fr] gap-4 sm:grid-cols-[10rem_1fr]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent pt-0.5 shrink-0">
                AI / ML
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap gap-2">
                  {aiML.background.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border/70 bg-surface/60 px-2.5 py-1 font-mono text-xs text-foreground/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Completed Machine Learning Specialisation (Coursera / DeepLearning.AI). No shipped ML product yet.
                </p>
              </div>
            </div>
          </div>
        </StaggerReveal>

        {/* Currently learning — single line */}
        <StaggerReveal index={2}>
          <div className="rounded-xl border border-border/60 bg-surface/30 px-6 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Currently learning:
            </span>
            <p className="mt-1.5 text-sm text-foreground/80">
              Redis Pub/Sub, distributed systems patterns, WebRTC, Docker Compose, Better Auth
            </p>
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}