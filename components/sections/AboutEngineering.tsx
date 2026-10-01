"use client"
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Layers3,
  Terminal,
} from "lucide-react";

import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { ScrollRevealFallback } from "@/components/v2/ScrollRevealFallback";

const realWork = projects.filter(
  (project) =>
    project.status === "LIVE" ||
    project.status === "IN_PROGRESS" ||
    project.status === "EXPERIMENTAL",
);

const principles = [
  {
    number: "01",
    title: "Build from fundamentals",
    description:
      "Understand the underlying system before reaching for abstractions.",
  },
  {
    number: "02",
    title: "Ship useful software",
    description:
      "Prefer working product decisions over unnecessary technical complexity.",
  },
  {
    number: "03",
    title: "Design for change",
    description:
      "Structure systems so new requirements do not require rewriting everything.",
  },
];

export function AboutEngineering() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="about-engineering-section relative overflow-hidden border-t border-border"
    >
      {/* Background technical grid */}
      <div className="about-engineering-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        {/* Section heading */}
        <header className="mb-16 flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-8 bg-accent" />
              03 / Profile
            </p>

            <h2
              id="about-title"
              className="font-heading text-4xl leading-[0.95] tracking-tight text-foreground sm:text-6xl"
            >
              About /
              <br />
              <span className="text-muted-foreground">Engineering.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="h-1.5 w-1.5 bg-accent" />
            Developer profile
          </div>
        </header>

        {/* Main split */}
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* About */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="about-intro">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-surface">
                  <Terminal
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Profile
                  </p>

                  <p className="mt-1 font-mono text-[0.62rem] text-foreground">
                    AAYUSH / ENGINEERING
                  </p>
                </div>
              </div>

              <ScrollRevealFallback>
                <p className="max-w-xl text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
                  {profile.summary}
                </p>

                <p className="mt-7 border-l border-accent pl-4 font-mono text-xs uppercase leading-6 tracking-[0.08em] text-accent">
                  {profile.tagline}
                </p>
              </ScrollRevealFallback>
            </div>

            {/* Philosophy */}
            <div className="mt-14 border-t border-border pt-6">
              <p className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                Engineering principles
              </p>

              <div className="grid gap-0 border-y border-border">
                {principles.map((principle) => (
                  <div
                    key={principle.number}
                    className="principle-row group grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border py-5 last:border-b-0"
                  >
                    <span className="font-mono text-[0.62rem] text-accent">
                      {principle.number}
                    </span>

                    <div>
                      <h3 className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-accent">
                        {principle.title}
                      </h3>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real work */}
          <div>
            <div className="mb-7 flex items-end justify-between gap-5">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Selected work
                </p>

                <h3 className="mt-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
                  Real work.
                </h3>
              </div>

              <span className="font-mono text-[0.62rem] text-muted-foreground">
                {String(realWork.length).padStart(2, "0")} systems
              </span>
            </div>

            {/* Timeline */}
            <div className="relative border-y border-border">
              {realWork.map((project, index) => {
                const isActive = activeProject === project.slug;
                const href = project.links.live ?? project.links.repo;

                return (
                  <article
                    key={project.slug}
                    className={[
                      "about-project group relative border-b border-border last:border-b-0",
                      isActive ? "about-project-active" : "",
                    ].join(" ")}
                  >
                    {/* Timeline indicator */}
                    <div className="absolute left-0 top-0 hidden h-full w-px bg-border sm:block">
                      <div
                        className={[
                          "about-timeline-marker absolute left-0 top-0 h-0 w-px bg-accent transition-all duration-500",
                          isActive ? "h-full" : "group-hover:h-full",
                        ].join(" ")}
                      />
                    </div>

                    {/* Project row */}
                    <div className="grid gap-5 p-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 sm:p-7">
                      <div className="flex items-start justify-between sm:block">
                        <span className="font-mono text-[0.65rem] text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="font-mono text-[0.6rem] uppercase text-muted-foreground sm:hidden">
                          {project.status}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-start gap-4">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-heading text-2xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                              {project.name}
                            </h4>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                              {project.oneLiner}
                            </p>
                          </div>

                          <Code2
                            className="mt-1 hidden h-5 w-5 shrink-0 text-muted-foreground/30 transition-colors duration-300 group-hover:text-accent/60 sm:block"
                            strokeWidth={1.5}
                          />
                        </div>

                        {/* Stack */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.stack.slice(0, 5).map((technology) => (
                            <span
                              key={technology}
                              className="border border-border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.06em] text-muted-foreground transition-colors duration-300 group-hover:border-white/20 group-hover:text-foreground"
                            >
                              {technology}
                            </span>
                          ))}

                          {project.stack.length > 5 ? (
                            <span className="px-1 py-1 font-mono text-[0.58rem] text-muted-foreground/50">
                              +{project.stack.length - 5}
                            </span>
                          ) : null}
                        </div>

                        {/* Expandable project information */}
                        <div
                          className={[
                            "about-project-details",
                            isActive ? "about-project-details-open" : "",
                          ].join(" ")}
                        >
                          <div className="overflow-hidden pt-5">
                            <div className="border-t border-border pt-5">
                              <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                                    Project type
                                  </p>

                                  <p className="mt-2 text-sm text-foreground">
                                    {project.category}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                                    Status
                                  </p>

                                  <p className="mt-2 font-mono text-xs text-accent">
                                    {project.status}
                                  </p>
                                </div>
                              </div>

                              {project.caseStudy?.focus?.length ? (
                                <div className="mt-5">
                                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                                    Engineering focus
                                  </p>

                                  <ul className="mt-3 grid gap-2">
                                    {project.caseStudy.focus
                                      .filter(isRenderable)
                                      .slice(0, 4)
                                      .map((item) => (
                                        <li
                                          key={item}
                                          className="flex gap-3 text-sm leading-6 text-muted-foreground"
                                        >
                                          <span className="mt-[0.7rem] h-px w-4 shrink-0 bg-accent" />
                                          {item}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop metadata / action */}
                      <div className="hidden min-w-[90px] flex-col items-end justify-between sm:flex">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                          {project.status}
                        </span>

                        <div className="flex items-center gap-2">
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${project.name}`}
                              className="!min-h-0 !min-w-0 flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          ) : null}

                          <button
                            type="button"
                            aria-label={
                              isActive
                                ? `Collapse ${project.name}`
                                : `Inspect ${project.name}`
                            }
                            aria-expanded={isActive}
                            onClick={() =>
                              setActiveProject(
                                isActive ? null : project.slug,
                              )
                            }
                            className="!min-h-0 !min-w-0 flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-accent hover:text-accent"
                          >
                            <ChevronDown
                              className={[
                                "h-3.5 w-3.5 transition-transform duration-300",
                                isActive ? "rotate-180" : "",
                              ].join(" ")}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Mobile action */}
                      <div className="flex items-center gap-3 sm:hidden">
                        <button
                          type="button"
                          aria-expanded={isActive}
                          onClick={() =>
                            setActiveProject(
                              isActive ? null : project.slug,
                            )
                          }
                          className="!min-h-0 !min-w-0 flex h-10 flex-1 items-center justify-between border border-border px-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          <span>
                            {isActive ? "Close details" : "Inspect project"}
                          </span>

                          <ChevronDown
                            className={[
                              "h-3.5 w-3.5 transition-transform duration-300",
                              isActive ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>

                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name}`}
                            className="!min-h-0 !min-w-0 flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:border-accent hover:bg-accent hover:text-background"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {/* Hover line */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Engineering stack strip */}
        <div className="mt-20 border-y border-border">
          <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <Code2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">
                  Build
                </span>
              </div>

              <p className="text-sm leading-6 text-foreground">
                Interfaces, APIs, product systems and full-stack applications.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <Layers3 className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">
                  Structure
                </span>
              </div>

              <p className="text-sm leading-6 text-foreground">
                Databases, authentication, realtime systems and backend
                architecture.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <Terminal className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">
                  Explore
                </span>
              </div>

              <p className="text-sm leading-6 text-foreground">
                AI systems, developer tooling, distributed systems and new
                product ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer marker */}
        <div className="mt-8 flex items-center justify-between gap-5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
            Profile / 03
          </span>

          <span className="h-px flex-1 bg-border" />

          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
            Engineering first
          </span>
        </div>
      </div>
    </section>
  );
}

function isRenderable(value: string) {
  return value.trim().length > 0 && !value.includes("TODO(aayush)");
}