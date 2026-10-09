"use client"
import Image from "next/image";
import type { Project } from "@/data/types";
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  ExternalLink,
  FolderGit2,
} from "lucide-react";

import { StatusLabel } from "@/components/case-study/StatusLabel";
import { projects } from "@/data/projects";

const featuredSlugs = ["viewproof", "auth-backend", "swabhimaan"];

const otherProjects = projects.filter((project) =>
  featuredSlugs.includes(project.slug),
);

const researchAndPlanned = projects.filter(
  (project) => project.status === "RESEARCH" || project.status === "PLANNED",
);

function isRenderable(value: string) {
  return value.trim().length > 0 && !value.includes("TODO(aayush)");
}

function projectHref(project: Project) {
  return project.links.live ?? project.links.repo;
}

function EvidenceList({ items }: { items: string[] }) {
  const renderableItems = items.filter(isRenderable);

  if (!renderableItems.length) {
    return null;
  }

  return (
    <ul className="mt-5 grid gap-3">
      {renderableItems.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="group/evidence flex gap-3 text-sm leading-6 text-muted-foreground"
        >
          <span className="mt-[0.65rem] h-px w-5 shrink-0 bg-accent transition-all duration-300 group-hover/evidence:w-8" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectEvidence({ project }: { project: Project }) {
  const caseStudy = project.caseStudy;

  if (!caseStudy) {
    return (
      <p className="text-sm leading-6 text-muted-foreground">
        No case-study notes published yet.
      </p>
    );
  }

  if (project.slug === "viewproof") {
    const dataModel = caseStudy.architecture?.nodes.find(
      (node) => node.id === "fs",
    )?.label;

    return (
      <div className="space-y-7">
        {caseStudy.workflow?.length ? (
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Workflow
            </p>

            <EvidenceList items={caseStudy.workflow} />
          </div>
        ) : null}

        {dataModel && isRenderable(dataModel) ? (
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Data model
            </p>

            <p className="mt-5 border-l border-accent pl-4 text-sm leading-6 text-muted-foreground">
              {dataModel}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  if (project.slug === "auth-backend") {
    const lifecycle =
      caseStudy.focus?.filter((item) =>
        ["Token lifecycle", "Refresh-token design", "Sessions"].includes(item),
      ) ?? [];

    return (
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
          Token lifecycle
        </p>

        <EvidenceList items={lifecycle} />
      </div>
    );
  }

  const structuredContent =
    caseStudy.demonstrates?.filter((item) => item === "Structured content") ??
    [];

  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        Structured content
      </p>

      <EvidenceList items={structuredContent} />
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const href = projectHref(project);
  const image = project.images[0]?.src;

  return (
    <article
      className={[
        "other-project-card group relative overflow-hidden bg-background",
        expanded ? "is-expanded" : "",
      ].join(" ")}
    >
      {/* Card top */}
      <div className="relative z-10 flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] tracking-[0.16em] text-accent">
            0{index + 1}
          </span>

          <span className="h-px w-8 bg-border transition-all duration-500 group-hover:w-12 group-hover:bg-accent" />

          <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
            {project.category}
          </span>
        </div>

        <StatusLabel status={project.status} />
      </div>

      {/* Visual */}
      <div className="project-visual relative aspect-[16/9] overflow-hidden border-b border-border bg-surface">
        {image ? (
          <>
            <Image
              src={image}
              alt={`${project.name} project preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 ease-out group-hover:scale-[1.045] group-hover:opacity-100 group-hover:grayscale-0"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0">
            <div className="project-no-image-grid" />

            <div className="absolute inset-0 flex items-center justify-center">
              <FolderGit2
                strokeWidth={1}
                className="h-16 w-16 text-muted-foreground/30 transition-all duration-500 group-hover:scale-110 group-hover:text-accent/50"
              />
            </div>
          </div>
        )}

        {/* Technical index */}
        <div className="absolute bottom-4 left-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/60 sm:left-7">
          SYSTEM / {project.slug}
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name}`}
            className="project-open absolute right-4 top-4 !min-h-0 !min-w-0 h-11 w-11 justify-center border border-white/15 bg-black/50 text-foreground backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null}
      </div>

      {/* Main content */}
      <div className="relative z-10 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="font-heading text-3xl leading-[0.95] tracking-tight text-foreground sm:text-4xl">
              {project.name}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              {project.oneLiner}
            </p>
          </div>

          <Code2
            className="mt-1 hidden h-5 w-5 shrink-0 text-muted-foreground/40 sm:block"
            strokeWidth={1.5}
          />
        </div>

        {/* Stack */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="border border-border px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-300 group-hover:border-white/20 group-hover:text-foreground"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Expand */}
        <div className="mt-7 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="project-evidence-trigger !min-h-0 !min-w-0 flex w-full cursor-pointer items-center justify-between py-2 text-left"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-foreground">
              {expanded ? "Hide evidence" : "Inspect evidence"}
            </span>

            <span
              className={[
                "flex h-8 w-8 items-center justify-center border border-border transition-all duration-300",
                expanded
                  ? "rotate-180 border-accent text-accent"
                  : "text-muted-foreground group-hover:border-accent group-hover:text-accent",
              ].join(" ")}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </button>

          <div
            className={[
              "project-evidence",
              expanded ? "project-evidence-open" : "",
            ].join(" ")}
          >
            <div className="pt-5">
              <ProjectEvidence project={project} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="project-card-accent absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 ease-out group-hover:w-full" />
    </article>
  );
}

export function OtherProjects() {
  return (
    <section
      id="other-projects"
      aria-labelledby="other-projects-title"
      className="other-projects-section relative overflow-hidden border-t border-border"
    >
      {/* Background grid */}
      <div className="other-projects-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        {/* Header */}
        <header className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-8 bg-accent" />
              04 / Selected systems
            </p>

            <h2
              id="other-projects-title"
              className="max-w-xl font-heading text-4xl leading-[0.95] tracking-tight text-foreground sm:text-6xl"
            >
              Systems with
              <br />
              <span className="text-muted-foreground">different jobs.</span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-7 text-muted-foreground">
              A collection of production-oriented experiments and applications
              across frontend systems, backend architecture, authentication,
              content infrastructure, and product engineering.
            </p>

            <div className="mt-6 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="h-1.5 w-1.5 bg-accent" />
              {otherProjects.length} documented systems
            </div>
          </div>
        </header>

        {/* Project cards */}
        <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Research / planned */}
        {researchAndPlanned.length ? (
          <div className="mt-24">
            <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Project index
                </p>

                <h3 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
                  Research & planned
                </h3>
              </div>

              <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                {researchAndPlanned.length} entries
              </p>
            </div>

            <div className="border-y border-border">
              {researchAndPlanned.map((project, index) => {
                const href = projectHref(project);

                return (
                  <article
                    key={project.slug}
                    className="research-row group relative grid gap-4 px-4 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-center sm:px-5"
                  >
                    {/* Number */}
                    <span className="font-mono text-[0.65rem] text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-heading text-xl text-foreground transition-colors duration-300 group-hover:text-accent">
                          {project.name}
                        </h4>

                        <StatusLabel status={project.status} />
                      </div>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {project.oneLiner}
                      </p>

                      <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground/60">
                        {project.stack.join(" / ")}
                      </p>
                    </div>

                    {/* Link */}
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name}`}
                        className="!min-h-0 !min-w-0 flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="hidden h-10 w-10 sm:block" />
                    )}

                    <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Bottom statement */}
        <div className="mt-20 grid gap-6 border-t border-border pt-7 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The projects above represent different layers of the same interest:
            building software that is understandable, useful, and technically
            deliberate.
          </p>

          <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="h-1.5 w-1.5 bg-accent" />
            End of index
          </div>
        </div>
      </div>
    </section>
  );
}
