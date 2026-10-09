"use client";

import { useState, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, ExternalLink, Info } from "lucide-react";

import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { projectHref, cn, isRenderable } from "@/lib/utils";
import { SectionHeader, TechBadge, BackgroundGrid, StaggerReveal, SpotlightCard } from "@/components/ui/shared";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/* ─── Status badge styling ─── */
const STATUS_DISPLAY: Record<string, { label: string; className: string }> = {
  LIVE:         { label: "Live",        className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" },
  IN_PROGRESS:  { label: "In progress", className: "border-amber-500/40 bg-amber-500/10 text-amber-400" },
  EXPERIMENTAL: { label: "Built",       className: "border-blue-400/40 bg-blue-400/10 text-blue-400" },
  PLANNED:      { label: "Planned",     className: "border-border bg-surface/50 text-muted-foreground" },
  RESEARCH:     { label: "Research",    className: "border-border bg-surface/50 text-muted-foreground" },
};

function StatusBadge({ status }: { status: string }) {
  const { label, className } = STATUS_DISPLAY[status] ?? STATUS_DISPLAY.PLANNED;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider font-semibold",
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ─── Architecture Connector with packet animation ─── */
function ArchitectureConnector({ active }: { active: boolean }) {
  return (
    <div className="hidden items-center justify-center md:flex px-1" aria-hidden="true">
      <div
        className={cn(
          "relative h-px w-12 lg:w-16 transition-colors duration-300",
          active ? "bg-accent" : "bg-border"
        )}
      >
        <span
          className="packet-travel absolute top-1/2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
          style={{ animationDuration: active ? "0.9s" : "2.2s" }}
        />
        <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-accent" />
      </div>
    </div>
  );
}

/* ─── DOZO architecture pipeline nodes ─── */
const dozoNodes = [
  {
    number: "01",
    title: "Customer",
    items: ["Browse", "Book", "Track"],
    detail: "Customers discover verified helpers, create instant or scheduled bookings, and follow progress in real time.",
  },
  {
    number: "02",
    title: "Platform",
    items: ["Next.js", "Express API", "JWT", "WebSockets"],
    detail: "Core platform services: Next.js frontend, an Express API gateway, secure JWT rotation, and persistent WebSocket event streaming.",
  },
  {
    number: "03",
    title: "Data & Infra",
    items: ["PostgreSQL", "Drizzle", "Redis", "Docker"],
    detail: "PostgreSQL domain model managed via Drizzle ORM, with Redis pub/sub for realtime event distribution and Dockerized Turborepo services.",
  },
];

/* ─── DOZO features accordion ─── */
const dozoFeatures = [
  { title: "Instant & scheduled booking", desc: "Customers book a helper on-demand or schedule a slot with transparent upfront pricing." },
  { title: "Helper onboarding & KYC",     desc: "Helpers verify credentials and identity documents before receiving customer requests." },
  { title: "Live booking tracking",        desc: "State machine tracking request dispatch, arrival, execution, and completion via WebSockets." },
  { title: "Payments architecture",        desc: "Escrow milestone payment flows tied to lifecycle verification states." },
  { title: "Admin operations dashboard",  desc: "Internal tooling for dispute resolution, user verification, and operational health." },
];

export function Projects() {
  const dozoProject = projects.find((p) => p.slug === "dozo");

  // Filter backed-up projects for main grid vs exploring
  const mainProjects = projects.filter(
    (p) => p.slug !== "dozo" && (p.status === "LIVE" || p.status === "EXPERIMENTAL" || p.status === "IN_PROGRESS")
  );
  const exploringProjects = projects.filter(
    (p) => p.slug !== "dozo" && (p.status === "PLANNED" || p.status === "RESEARCH")
  );

  const [activeNode, setActiveNode] = useState(1);
  const [openFeature, setOpenFeature] = useState(0);
  const [activeProjectForSheet, setActiveProjectForSheet] = useState<Project | null>(null);

  const tiltRef = useRef<HTMLDivElement>(null);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 5}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 4}deg`);
  };

  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  // DOZO image asset check
  const dozoImage = dozoProject?.images?.[0];

  return (
    <section id="projects" className="relative overflow-x-clip border-t border-border bg-background py-20 sm:py-32">
      <BackgroundGrid opacity={0.3} />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Work"
          title={
            <>
              Featured case study<br />
              <span className="text-muted-foreground">and project grid.</span>
            </>
          }
          description="One featured case study (DOZO) and production-verified systems. No tutorial clones or unverified claims."
        />

        {/* ───────────────── 1. FEATURED CASE STUDY: DOZO ───────────────── */}
        {dozoProject && (
          <StaggerReveal index={0} className="mb-24">
            <div className="relative overflow-hidden rounded-xl border border-border/80 bg-surface/95 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                        Featured Case Study
                      </span>
                      <StatusBadge status={dozoProject.status} />
                    </div>

                    <h3 className="mt-3 font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-foreground">
                      {"DOZO".split("").map((char, i) => (
                        <span
                          key={i}
                          aria-hidden
                          className="dozo-char inline-block transition-transform duration-300 hover:-translate-y-1 hover:text-accent"
                          style={{ "--d": `${i * 80}ms` } as CSSProperties}
                        >
                          {char}
                        </span>
                      ))}
                      <span className="text-accent animate-pulse">.</span>
                    </h3>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/90">
                      An on-demand local services marketplace connecting customers with verified helpers. Selected for a 3-month pre-incubation program at NIT Hamirpur.
                    </p>
                  </div>

                  {dozoProject.links?.live && (
                    <a
                      href={dozoProject.links.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit DOZO live platform (opens in new tab)"
                      className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-primary-foreground hover:shadow-md shrink-0"
                    >
                      <span>Visit Platform</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>

                {/* 
                  DOZO VISUAL SLOT:
                  - If a real screenshot asset exists, render it.
                  - If not, fall back directly to the interactive Architecture Flow Diagram (no empty frames!).
                  TODO: Place screenshot in public/projects/dozo/screenshot.png and add to dozoProject.images in data/projects.ts
                */}
                {dozoImage?.src && (
                  <div
                    ref={tiltRef}
                    onMouseMove={handleTilt}
                    onMouseLeave={resetTilt}
                    style={{
                      position: "relative",
                      transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                      transition: "transform 0.15s ease-out",
                    }}
                    className="group relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
                  >
                    <Image
                      src={dozoImage.src}
                      alt={dozoImage.alt || "DOZO Platform Interface"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent p-4 sm:p-6 flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white font-semibold drop-shadow">
                          DOZO Platform Preview
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-white/70">
                        Production Interface
                      </span>
                    </div>
                  </div>
                )}

                {/* Core Details Grid: Problem, Role & Tech Stack */}
                <div className="mb-8 grid gap-6 rounded-lg border border-border/70 bg-surface/70 p-6 sm:p-8 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      Problem Context
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">
                      {dozoProject.problem || dozoProject.caseStudy?.problem}
                    </p>

                    <div className="mt-5 border-t border-border/50 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        My Role
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {dozoProject.role}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      Key Technical Decision
                    </p>
                    <p className="mt-2 text-sm text-foreground/90">
                      {dozoProject.technicalDecision?.choice}
                    </p>
                    <p className="mt-2 text-xs italic text-muted-foreground border-l-2 border-accent/40 pl-3">
                      Trade-off: {dozoProject.technicalDecision?.tradeoff}
                    </p>

                    <div className="mt-5 border-t border-border/50 pt-4">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {dozoProject.stack.map((item) => (
                          <TechBadge key={item} name={item} interactive />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Showcase: Architecture Flow & Live Pipeline */}
                <div className="rounded-lg border border-border/80 bg-surface/80 p-6 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                        System Architecture
                      </span>
                      <h4 className="mt-1 font-heading text-2xl tracking-tight sm:text-3xl">
                        Request Lifecycle &amp; Data Pipeline
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      Click a node to inspect layer responsibilities
                    </span>
                  </div>

                  {/* Nodes & Traveling Packet Connectors */}
                  <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {dozoNodes.map((node, i) => {
                      const isActive = activeNode === i;
                      return (
                        <div key={node.title} className="flex-1 flex flex-col md:flex-row md:items-center w-full">
                          <button
                            type="button"
                            onClick={() => setActiveNode(i)}
                            aria-pressed={isActive}
                            className={cn(
                              "group relative flex flex-col w-full rounded-md border p-5 text-left transition-all duration-300 cursor-pointer",
                              isActive
                                ? "border-accent bg-accent/[0.08] -translate-y-1 shadow-sm"
                                : "border-border bg-background/60 hover:border-accent/40 hover:bg-surface"
                            )}
                          >
                            <div className="flex w-full items-center justify-between">
                              <span className="font-mono text-[10px] text-muted-foreground font-semibold">{node.number}</span>
                              <span className={cn("h-2 w-2 rounded-full bg-accent transition-all", isActive ? "scale-100 opacity-100 animate-pulse" : "scale-50 opacity-0")} />
                            </div>
                            <span className="mt-4 font-heading text-xl text-foreground group-hover:text-accent transition-colors">{node.title}</span>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {node.items.map((item) => (
                                <span key={item} className={cn("font-mono text-[9px] uppercase px-2 py-0.5 rounded border transition-colors", isActive ? "border-accent/40 bg-accent/10 text-accent font-semibold" : "border-border text-muted-foreground")}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </button>

                          {i < dozoNodes.length - 1 && (
                            <ArchitectureConnector active={activeNode === i || activeNode === i + 1} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Active node detail */}
                  <div className="mt-6 rounded-md border border-accent/40 bg-accent/[0.05] p-5 transition-all">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                      Node {dozoNodes[activeNode].number} · {dozoNodes[activeNode].title} Layer
                    </span>
                    <p className="mt-2 text-sm text-foreground/90 leading-6">{dozoNodes[activeNode].detail}</p>
                  </div>
                </div>

                {/* Features Accordion */}
                <div className="mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      Product Scope
                    </span>
                    <h4 className="mt-3 font-heading text-3xl sm:text-4xl tracking-tight">
                      Built around real marketplace workflows.
                    </h4>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      Structured state models handling helper discovery, on-demand dispatch, milestone payments, and post-service verification.
                    </p>
                  </div>

                  <div className="border-l border-border">
                    {dozoFeatures.map((feature, i) => {
                      const isOpen = openFeature === i;
                      return (
                        <div key={feature.title} className="group relative border-b border-border transition-colors">
                          <span className={cn("absolute left-0 top-0 h-full w-0.5 origin-top bg-accent transition-transform duration-500", isOpen ? "scale-y-100" : "scale-y-0")} />

                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpenFeature(isOpen ? -1 : i)}
                            className="flex w-full items-center justify-between px-5 py-5 text-left transition-colors hover:bg-surface/60 sm:px-7 cursor-pointer"
                          >
                            <span className="flex items-center gap-5">
                              <span className={cn("font-mono text-xs transition-colors", isOpen ? "text-accent font-bold" : "text-muted-foreground")}>
                                0{i + 1}
                              </span>
                              <span className={cn("text-base transition-all duration-300", isOpen ? "translate-x-1.5 text-foreground font-semibold" : "text-foreground/85")}>
                                {feature.title}
                              </span>
                            </span>

                            <span className="flex items-center gap-3">
                              <Check size={15} className={cn("text-accent transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-30")} />
                              <ChevronDown size={16} className={cn("text-muted-foreground transition-transform duration-300", isOpen ? "rotate-180 text-accent" : "")} />
                            </span>
                          </button>

                          <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                            <div className="overflow-hidden">
                              <p className="px-5 pb-5 pl-[3.75rem] sm:px-7 sm:pl-[4.75rem] text-sm leading-6 text-muted-foreground max-w-xl">
                                {feature.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </StaggerReveal>
        )}

        {/* ───────────────── 2. PRODUCTION & CORE PROJECTS GRID ───────────────── */}
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
            Systems &amp; Applications
          </p>
          <h3 className="mt-1 font-heading text-3xl sm:text-4xl tracking-tight text-foreground">
            Production &amp; Core Projects
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Projects with verified implementations across authentication, content management, and client media workflows.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {mainProjects.map((project, index) => {
            const href = projectHref(project);
            const hasCaseStudy = Boolean(project.caseStudy);
            const cardImage = project.images?.[0];

            return (
              <StaggerReveal key={project.slug} index={index}>
                <SpotlightCard className="group h-full rounded-xl flex flex-col hover:border-accent/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                  {/* Top animated sweep line on hover */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-20" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-border/80 px-5 py-3.5 bg-surface/40">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span className="line-clamp-1">{project.category}</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  {/* 
                    OPTIONAL IMAGE SLOT:
                    Renders if a real image is provided.
                    If no image exists, renders clean text-only card variant (never an empty box!).
                  */}
                  {cardImage?.src && (
                    <div
                      style={{ position: "relative" }}
                      className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/80 bg-surface/80"
                    >
                      <Image
                        src={cardImage.src}
                        alt={cardImage.alt || project.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h4 className="font-heading text-2xl tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {project.name}
                    </h4>
                    
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.oneLiner}
                    </p>

                    {/* Problem Statement */}
                    {project.problem && isRenderable(project.problem) && (
                      <div className="mt-4 rounded border-l-2 border-accent/40 bg-surface/40 p-3 text-xs leading-5 text-foreground/85">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">
                          Problem
                        </span>
                        {project.problem}
                      </div>
                    )}

                    {/* Role */}
                    {project.role && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        <span className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground/80">Role:</span>{" "}
                        <span className="text-foreground/90 font-medium">{project.role}</span>
                      </p>
                    )}

                    {/* Technical Decision & Trade-off */}
                    {project.technicalDecision && (
                      <div className="mt-4 text-xs text-muted-foreground">
                        <span className="font-mono uppercase tracking-wider text-[10px] text-accent block mb-1">
                          Key Decision
                        </span>
                        <p className="text-foreground/90 font-medium">
                          {project.technicalDecision.choice}
                        </p>
                        <p className="mt-1 text-[11px] italic text-muted-foreground">
                          Trade-off: {project.technicalDecision.tradeoff}
                        </p>
                      </div>
                    )}

                    {/* Tech stack badges */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-border/80 bg-surface/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-all group-hover:border-accent/30 group-hover:text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar: Links & Case Study Inspection */}
                    <div className="mt-auto pt-6 border-t border-border/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name} (opens in new tab)`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-all hover:border-accent hover:text-accent"
                          >
                            {project.links.live ? "Live" : "Source"}
                            <ArrowUpRight size={11} />
                          </a>
                        )}
                      </div>

                      {hasCaseStudy && (
                        <button
                          type="button"
                          onClick={() => setActiveProjectForSheet(project)}
                          className="group/btn flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                          aria-label={`Inspect case study for ${project.name}`}
                        >
                          <Info size={12} className="text-accent" />
                          <span>Inspect</span>
                          <span className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true">→</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent sweep */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full z-20" />
                </SpotlightCard>
              </StaggerReveal>
            );
          })}
        </div>

        {/* ───────────────── 3. CURRENTLY EXPLORING ROW (IN PROGRESS / PLANNED) ───────────────── */}
        {exploringProjects.length > 0 && (
          <div className="mb-24">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                  Explorations
                </p>
                <h4 className="font-heading text-2xl tracking-tight text-foreground">
                  Currently Exploring / Planned
                </h4>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                In progress &amp; planned concepts — not presented as shipped software
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exploringProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-xl border border-border/60 bg-surface/30 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {project.category}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                    <h5 className="font-heading text-lg text-foreground font-semibold">
                      {project.name}
                    </h5>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {project.oneLiner}
                    </p>
                    {project.technicalDecision && (
                      <p className="mt-3 text-[11px] text-muted-foreground/80 italic border-l border-border pl-2">
                        {project.technicalDecision.choice}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap gap-1">
                    {project.stack.slice(0, 4).map((t) => (
                      <span key={t} className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-border/50 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── 4. CASE STUDY INSPECTION DRAWER ───────────────── */}
        <Sheet open={Boolean(activeProjectForSheet)} onOpenChange={(open) => !open && setActiveProjectForSheet(null)}>
          <SheetContent side="right" className="w-[min(38rem,95vw)] overflow-y-auto p-6 sm:p-8">
            {activeProjectForSheet && (
              <div>
                <SheetHeader className="text-left border-b border-border pb-6">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={activeProjectForSheet.status} />
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                      {activeProjectForSheet.category}
                    </span>
                  </div>
                  <SheetTitle className="mt-2 font-heading text-3xl sm:text-4xl">
                    {activeProjectForSheet.name}
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground mt-2">{activeProjectForSheet.oneLiner}</p>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Action links */}
                  <div className="flex gap-3 flex-wrap">
                    {activeProjectForSheet.links?.live && (
                      <a
                        href={activeProjectForSheet.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90"
                      >
                        Live System <ArrowUpRight size={14} />
                      </a>
                    )}
                    {activeProjectForSheet.links?.repo && (
                      <a
                        href={activeProjectForSheet.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-accent"
                      >
                        Source Code <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  {/* Problem */}
                  {(activeProjectForSheet.problem || activeProjectForSheet.caseStudy?.problem) && (
                    <div>
                      <h5 className="font-mono text-xs uppercase tracking-wider text-accent mb-2 font-semibold">
                        Problem
                      </h5>
                      <p className="text-sm text-foreground/90 leading-6">
                        {activeProjectForSheet.problem || activeProjectForSheet.caseStudy?.problem}
                      </p>
                    </div>
                  )}

                  {/* Role */}
                  {activeProjectForSheet.role && (
                    <div>
                      <h5 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        My Role
                      </h5>
                      <p className="text-sm text-foreground/90 font-medium">
                        {activeProjectForSheet.role}
                      </p>
                    </div>
                  )}

                  {/* Technical Decisions */}
                  {activeProjectForSheet.technicalDecision && (
                    <div>
                      <h5 className="font-mono text-xs uppercase tracking-wider text-accent mb-2 font-semibold">
                        Key Architectural Decision
                      </h5>
                      <div className="rounded border border-border bg-surface p-3.5">
                        <p className="text-xs font-semibold text-foreground">
                          {activeProjectForSheet.technicalDecision.choice}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          Trade-off: {activeProjectForSheet.technicalDecision.tradeoff}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Decisions List from case study */}
                  {activeProjectForSheet.caseStudy?.decisions && activeProjectForSheet.caseStudy.decisions.length > 0 && (
                    <div>
                      <h5 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                        Detailed Trade-offs
                      </h5>
                      <div className="space-y-3">
                        {activeProjectForSheet.caseStudy.decisions.map((d) => (
                          <div key={d.title} className="rounded border border-border/80 bg-surface/60 p-3">
                            <p className="text-xs font-semibold text-foreground">{d.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{d.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Workflow */}
                  {activeProjectForSheet.caseStudy?.workflow && (
                    <div>
                      <h5 className="font-mono text-xs uppercase tracking-wider text-accent mb-3 font-semibold">
                        Workflow &amp; Operations
                      </h5>
                      <div className="space-y-2">
                        {activeProjectForSheet.caseStudy.workflow.filter(isRenderable).map((step, idx) => (
                          <div key={step} className="rounded border border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
                            <span className="font-mono text-accent font-semibold mr-2">{String(idx + 1).padStart(2, "0")}.</span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full Tech Stack */}
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      Technology Stack
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activeProjectForSheet.stack.map((tech) => (
                        <TechBadge key={tech} name={tech} interactive />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
