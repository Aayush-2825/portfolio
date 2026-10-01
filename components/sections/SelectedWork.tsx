"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import { projects } from "@/data/projects";

const selectedProjects = projects.filter(
  (project) =>
    project.status === "LIVE" ||
    project.status === "IN_PROGRESS" ||
    project.status === "EXPERIMENTAL",
);

function projectHref(project: (typeof selectedProjects)[number]) {
  return project.links.live ?? project.links.repo;
}

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = selectedProjects[activeIndex];
  const activeImage = activeProject?.images[0];
  const activeHref = activeProject
    ? projectHref(activeProject)
    : undefined;

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-title"
      className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 lg:px-10"
    >
      {/* HEADER */}

      <div className="mb-12 flex flex-col gap-6 border-b border-border pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              02
            </span>

            <span className="h-px w-8 bg-border" />

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Selected work
            </span>
          </div>

          <h2
            id="selected-work-title"
            className="
              font-heading
              text-[clamp(3.5rem,8vw,7.5rem)]
              font-semibold
              uppercase
              leading-[0.9]
              tracking-[-0.045em]
              text-foreground
            "
          >
            Selected
            <br />
            <span className="text-muted-foreground">
              Work.
            </span>
          </h2>
        </div>

        <div className="flex items-end justify-between gap-10 sm:pb-1">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Projects
            </p>

            <p className="mt-1 font-mono text-sm text-foreground">
              {String(selectedProjects.length).padStart(2, "0")}
            </p>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Viewing
            </p>

            <p className="mt-1 font-mono text-sm text-accent">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(selectedProjects.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      {/* FEATURED PROJECT */}

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.85fr] lg:gap-10">
        {/* IMAGE */}

        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
            {activeImage ? (
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.025]"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  No preview
                </span>
              </div>
            )}

            {/* image overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute left-5 top-5 flex items-center gap-3">
              <span className="border border-white/20 bg-black/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                Project / {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/60">
                  Currently viewing
                </p>

                <p className="mt-1 font-heading text-2xl uppercase leading-none text-white sm:text-3xl">
                  {activeProject.name}
                </p>
              </div>

              {activeHref && (
                <a
                  href={activeHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${activeProject.name}`}
                  className="group flex size-11 shrink-0 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-accent hover:bg-accent hover:text-primary-foreground"
                >
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>

          {/* technical line */}

          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              {activeProject.status.replace("_", " ")}
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
              {activeProject.stack.slice(0, 4).join(" / ")}
            </span>
          </div>
        </div>

        {/* PROJECT INFORMATION */}

        <div className="flex flex-col border-y border-border lg:border-y-0">
          <div className="flex-1 py-6 lg:border-t lg:border-border lg:py-8">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
              Active project
            </p>

            <h3
              className="
                font-heading
                text-[clamp(2.5rem,5vw,4.5rem)]
                uppercase
                leading-[0.94]
                tracking-[-0.04em]
                text-foreground
              "
            >
              {activeProject.name}
            </h3>

            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {activeProject.oneLiner}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT NAVIGATION */}

          <div className="border-t border-border">
            {selectedProjects.map((project, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`
                    group flex min-h-[64px] w-full items-center gap-4
                    border-b border-border px-2 text-left
                    transition-colors duration-200 last:border-b-0
                    ${
                      selected
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <span
                    className={`
                      font-mono text-[9px]
                      ${
                        selected
                          ? "text-accent"
                          : "text-muted-foreground/50"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1 font-heading text-xl uppercase leading-none sm:text-2xl">
                    {project.name}
                  </span>

                  <ChevronRight
                    aria-hidden="true"
                    className={`
                      size-4 shrink-0 transition-transform duration-300
                      ${
                        selected
                          ? "translate-x-0 text-accent"
                          : "-translate-x-1 opacity-40 group-hover:translate-x-0"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM SIGNAL */}

      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          Hover / select project
        </span>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            Work index
          </span>
        </div>
      </div>
    </section>
  );
}