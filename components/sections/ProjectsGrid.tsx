"use client";

import { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { CornerCrosshairs } from "@/components/ui/CornerCrosshairs";
import {
  FolderGit2,
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  Cpu,
  X,
  BookOpen,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { ProjectSchematic } from "@/components/interactive/ProjectSchematics";
import { ViewProofSimulator } from "@/components/interactive/ViewProofSimulator";
import { PjmbSecuritySimulator } from "@/components/interactive/PjmbSecuritySimulator";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  LIVE: { label: "Live System", className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" },
  IN_PROGRESS: { label: "In Active Dev", className: "border-amber-500/40 bg-amber-500/10 text-amber-400" },
  EXPERIMENTAL: { label: "Hardened Build", className: "border-blue-400/40 bg-blue-400/10 text-blue-400" },
  RESEARCH: { label: "AI Research", className: "border-purple-400/40 bg-purple-400/10 text-purple-400" },
  PLANNED: { label: "Systems Exploration", className: "border-border bg-surface/50 text-muted-foreground" },
};

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedProject]);

  const mainProjects = projects.filter((p) => p.status === "LIVE" || p.status === "EXPERIMENTAL" || p.slug === "dozo");
  const researchProjects = projects.filter((p) => p.status === "RESEARCH" || p.status === "PLANNED");

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            <FolderGit2 size={12} />
            <span>Production & Research Index</span>
          </div>

          <h2
            id="projects-title"
            className="mt-4 font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground text-balance"
          >
            Selected <span className="text-muted-foreground font-normal">Works</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed text-balance">
            Production-oriented platforms, backend engines, and systems exploration. Click any project card to open its architectural inspection dossier.
          </p>
        </div>

        {/* Primary Shipped Systems Grid with Mouse-Spotlight Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainProjects.map((project, idx) => {
            const statusInfo = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.PLANNED;

            return (
              <SpotlightCard
                key={project.slug}
                data-cursor="INSPECT"
                onClick={() => {
                  sound.playClick(1000 + idx * 100);
                  setSelectedProject(project);
                }}
                className="group flex h-full flex-col justify-between p-6 sm:p-8 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.65)] cursor-pointer"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-accent font-semibold">0{idx + 1}</span>
                      <span className="opacity-40">/</span>
                      <span>{project.category.split("/")[0].trim()}</span>
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider font-semibold",
                        statusInfo.className
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Title & One-liner */}
                  <div className="mt-5">
                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                      <span>{project.name}</span>
                      <ArrowUpRight size={18} className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                    </h3>
                    <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Custom Animated Vector Architecture Schematic */}
                  <div className="mt-6">
                    <ProjectSchematic slug={project.slug} />
                  </div>

                  {/* Technical Decision Highlight */}
                  {project.technicalDecision && (
                    <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#07080b] p-4 text-xs">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5 mb-1.5">
                        <Cpu size={12} />
                        Architectural Choice
                      </span>
                      <span className="text-foreground/90 font-mono text-[11px] leading-relaxed block">
                        {project.technicalDecision.choice}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer: Tech Stack Chips & Links */}
                <div className="mt-8 border-t border-white/[0.08] pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-muted-foreground group-hover:border-white/[0.15] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-accent font-semibold group-hover:underline flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Secondary: Research & Systems Exploration with Mobile Snap Carousel */}
        <div className="mt-16">
          <div className="border-b border-border/60 pb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Systems Explorations & AI Research
            </span>
            <div className="flex items-center gap-2 font-mono text-xs text-accent">
              <span className="text-[10px] text-muted-foreground sm:hidden">Swipe →</span>
              <span>{researchProjects.length} Initiatives</span>
            </div>
          </div>

          {/* Responsive Layout: Touch Snap Carousel on Mobile, Grid on Tablet/Desktop */}
          <div className="mt-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {researchProjects.map((rp) => (
              <div
                key={rp.slug}
                onClick={() => {
                  sound.playClick(1300, 0.01);
                  setSelectedProject(rp);
                }}
                className="group min-w-[280px] sm:min-w-0 snap-start flex-1 rounded-xl border border-border/70 bg-surface/60 p-5 transition-all hover:border-accent/50 hover:bg-surface cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-accent font-semibold">
                      {rp.category}
                    </span>
                    <span className="rounded border border-border px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                      {rp.status}
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-semibold text-foreground mt-3 group-hover:text-accent transition-colors">
                    {rp.name}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {rp.summary}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {rp.stack.map((t) => (
                    <span key={t} className="rounded bg-background px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Project Detail Modal / Drawer */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.name}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-background/80"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border/90 bg-surface p-6 sm:p-8 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <CornerCrosshairs />
            {/* Mobile Drag Indicator */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  {selectedProject.category}
                </span>
                <h3 className="font-heading text-3xl font-semibold text-foreground mt-1">
                  {selectedProject.name}
                </h3>
                <span className="font-mono text-xs text-muted-foreground mt-0.5 block">
                  Role: {selectedProject.role}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick(800);
                  setSelectedProject(null);
                }}
                className="rounded-full border border-border/70 p-2 text-muted-foreground hover:bg-background hover:text-foreground"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6">
              {/* Interactive Simulator (if available for project) */}
              {selectedProject.slug === "viewproof" && (
                <div>
                  <ViewProofSimulator />
                </div>
              )}

              {(selectedProject.slug === "auth-backend" || selectedProject.slug === "pjmb") && (
                <div>
                  <PjmbSecuritySimulator />
                </div>
              )}

              {/* Problem */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  The Problem It Solves
                </span>
                <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Technical Decision */}
              {selectedProject.technicalDecision && (
                <div className="rounded-xl border border-border/70 bg-background/80 p-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">
                    Architecture & Trade-off
                  </span>
                  <p className="text-xs text-foreground/90 font-mono leading-relaxed">
                    {selectedProject.technicalDecision.choice}
                  </p>
                  {selectedProject.technicalDecision.tradeoff && (
                    <p className="mt-2.5 text-xs text-muted-foreground font-mono leading-relaxed border-t border-border/50 pt-2">
                      <span className="text-accent font-semibold">Trade-off:</span> {selectedProject.technicalDecision.tradeoff}
                    </p>
                  )}
                </div>
              )}

              {/* Challenges & Hard Truths */}
              {selectedProject.caseStudy?.challenges && selectedProject.caseStudy.challenges.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">
                    Engineering Challenges & Edge Cases
                  </span>
                  <ul className="space-y-1.5">
                    {selectedProject.caseStudy.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed font-mono">
                        <span className="text-accent shrink-0 mt-0.5">›</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stack */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Technologies Used
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border/80 bg-background px-2.5 py-1 font-mono text-xs text-foreground/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions / Links */}
              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
                {selectedProject.links?.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick(1000)}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background hover:bg-foreground/90"
                  >
                    <span>Visit Live System</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {selectedProject.links?.repo && (
                  <a
                    href={selectedProject.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick(1000)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>View Repository</span>
                  </a>
                )}

                {selectedProject.links?.writeup && (
                  <a
                    href={selectedProject.links.writeup}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick(1000)}
                    className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/15 px-5 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/25"
                  >
                    <BookOpen size={13} />
                    <span>DEV.to Case Study</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
