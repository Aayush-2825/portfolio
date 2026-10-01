"use client";

import { useMemo, useState } from "react";
import {
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  Code2,
  Database,
  Globe2,
  Layers3,
  LockKeyhole,
  Network,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";

import { aiML, skillGroups } from "@/data/skills";

type LayerId =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "auth-security"
  | "infrastructure"
  | "tooling"
  | "ai";

type IconType = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const groupIcons: Record<string, IconType> = {
  languages: Code2,
  frontend: Globe2,
  backend: Server,
  databases: Database,
  "auth-security": LockKeyhole,
  infrastructure: Network,
  tooling: Wrench,
};

const layerDescriptions: Record<LayerId, string> = {
  languages:
    "The programming foundations used across frontend, backend and AI work.",
  frontend:
    "Interfaces and application architecture built around React, Next.js and modern UI systems.",
  backend:
    "APIs, application logic, realtime communication and server-side architecture.",
  databases:
    "Data modelling and persistence across relational, document and realtime systems.",
  "auth-security":
    "Authentication, sessions, tokens, OAuth and defensive application security.",
  infrastructure:
    "Deployment, storage, containers and the infrastructure supporting applications.",
  tooling:
    "Development workflows, source control, editors and AI-assisted engineering tools.",
  ai: "Machine learning foundations, intelligent agents, LLM applications and AI-powered software.",
};

const visualLayers: {
  id: LayerId;
  label: string;
  shortLabel: string;
}[] = [
  {
    id: "languages",
    label: "Languages",
    shortLabel: "Code",
  },
  {
    id: "frontend",
    label: "Frontend",
    shortLabel: "UI",
  },
  {
    id: "backend",
    label: "Backend",
    shortLabel: "API",
  },
  {
    id: "databases",
    label: "Databases",
    shortLabel: "Data",
  },
  {
    id: "auth-security",
    label: "Auth & Security",
    shortLabel: "Security",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    shortLabel: "Infra",
  },
  {
    id: "tooling",
    label: "Development",
    shortLabel: "Tools",
  },
];

function getGroup(id: LayerId) {
  return skillGroups.find((group) => group.id === id);
}

function getItems(id: LayerId) {
  if (id === "ai") {
    return [
      ...aiML.background,
      ...aiML.topicsStudied,
      ...aiML.interests,
    ];
  }

  return getGroup(id)?.items.map((item) => item.name) ?? [];
}

export function Skills() {
  const [activeLayer, setActiveLayer] =
    useState<LayerId>("frontend");

  const totalSkills = useMemo(
    () =>
      new Set(
        skillGroups.flatMap((group) =>
          group.items.map((item) => item.name),
        ),
      ).size,
    [],
  );

  const activeItems = getItems(activeLayer);

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="skills-section relative overflow-hidden border-t border-border bg-secondary"
    >
      <div className="skills-background-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        {/* HEADER */}

        <header className="mb-14 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-8 bg-accent" />
              05 / Engineering system
            </p>

            <h2
              id="skills-title"
              className="font-heading text-5xl leading-[0.9] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Tools are
              <br />
              <span className="text-muted-foreground">
                the layers.
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-7 text-muted-foreground">
              The technologies and concepts I use to move from
              interface design to backend systems, infrastructure
              and AI.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
              <span>
                <strong className="text-foreground">
                  {totalSkills}
                </strong>{" "}
                technologies
              </span>

              <span>
                <strong className="text-foreground">
                  {skillGroups.length}
                </strong>{" "}
                technical layers
              </span>
            </div>
          </div>
        </header>

        {/* SYSTEM PANEL */}

        <div className="skills-panel border border-border bg-background">
          {/* Terminal bar */}

          <div className="skills-terminal-bar flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex shrink-0 gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
              </div>

              <span className="truncate font-mono text-[0.58rem] uppercase tracking-[0.13em] text-muted-foreground">
                engineering.stack
              </span>
            </div>

            <span className="shrink-0 font-mono text-[0.55rem] text-muted-foreground">
              SYS_05 / ONLINE
            </span>
          </div>

          {/* CORE */}

          <div className="skills-core-area px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-4xl">
              <div className="skills-core-box relative mx-auto max-w-xl border border-border bg-surface">
                {/* Accent top */}

                <div className="absolute left-0 right-0 top-0 h-px bg-accent" />

                <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center border border-accent/40 bg-background">
                    <Terminal
                      className="h-5 w-5 text-accent"
                      strokeWidth={1.3}
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.17em] text-muted-foreground">
                      System core
                    </p>

                    <h3 className="mt-1 font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
                      Engineering Stack
                    </h3>

                    <p className="mt-2 max-w-lg text-xs leading-5 text-muted-foreground">
                      Select a layer below to inspect the technologies
                      behind the system.
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted-foreground">
                      Active
                    </p>

                    <p className="mt-1 font-mono text-[0.6rem] uppercase text-accent">
                      {activeLayer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector */}

              <div className="skills-core-connector mx-auto h-10 w-px bg-gradient-to-b from-accent/50 to-border" />

              {/* Layers */}

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visualLayers.map((layer, index) => {
                  const group = getGroup(layer.id);
                  const Icon =
                    groupIcons[layer.id] ?? Layers3;

                  const items = getItems(layer.id);
                  const isActive = activeLayer === layer.id;

                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setActiveLayer(layer.id)}
                      className={[
                        "skills-layer-card group relative !min-h-0 !min-w-0 cursor-pointer border p-4 text-left",
                        isActive
                          ? "skills-layer-card-active border-accent bg-surface"
                          : "border-border bg-background hover:border-white/25 hover:bg-surface",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300",
                            isActive
                              ? "border-accent text-accent"
                              : "border-border text-muted-foreground group-hover:border-accent/50 group-hover:text-accent",
                          ].join(" ")}
                        >
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.4}
                          />
                        </div>

                        <span className="font-mono text-[0.55rem] text-muted-foreground/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-foreground">
                          {layer.label}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {layer.shortLabel}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="font-mono text-[0.53rem] uppercase text-muted-foreground">
                          {items.length} items
                        </span>

                        <ChevronRight
                          className={[
                            "h-3.5 w-3.5 transition-all duration-300",
                            isActive
                              ? "translate-x-1 text-accent"
                              : "text-muted-foreground",
                          ].join(" ")}
                        />
                      </div>

                      <span
                        className={[
                          "absolute bottom-0 left-0 h-px bg-accent transition-all duration-500",
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE DETAILS */}

              <div className="skills-active-panel mt-3 border border-border bg-surface">
                <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:gap-10">
                  <div className="shrink-0 lg:w-52">
                    <div className="flex items-center gap-2">
                      <Zap
                        className="h-3.5 w-3.5 text-accent"
                        fill="currentColor"
                      />

                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-accent">
                        Active layer
                      </span>
                    </div>

                    <h3 className="mt-2 font-heading text-2xl text-foreground">
                      {getGroup(activeLayer)?.label ??
                        "AI / ML"}
                    </h3>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="max-w-2xl text-xs leading-6 text-muted-foreground">
                      {layerDescriptions[activeLayer]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeItems.map((item) => (
                        <span
                          key={item}
                          className="skills-active-tag border border-border px-2.5 py-1.5 font-mono text-[0.56rem] text-muted-foreground transition-all duration-300 hover:border-accent hover:text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI SECTION INSIDE SYSTEM */}

          <div className="border-t border-border">
            <div className="flex flex-col gap-2 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent">
                  <BrainCircuit className="h-3.5 w-3.5" />
                  Intelligence layer
                </p>

                <h3 className="mt-2 font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
                  AI / Machine Learning
                </h3>
              </div>

              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted-foreground">
                foundation → study → exploration
              </span>
            </div>

            <div className="grid gap-px bg-border lg:grid-cols-3">
              <AIBlock
                number="01"
                title="Foundation"
                icon={<Code2 className="h-4 w-4" />}
                items={aiML.background}
              />

              <AIBlock
                number="02"
                title="Studied"
                icon={<BrainCircuit className="h-4 w-4" />}
                items={aiML.topicsStudied}
              />

              <AIBlock
                number="03"
                title="Exploring"
                icon={<Sparkles className="h-4 w-4" />}
                items={aiML.interests}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-muted-foreground">
            Skills / 05
          </span>

          <span className="h-px flex-1 bg-border" />

          <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-accent">
            expandable system
          </span>
        </div>
      </div>
    </section>
  );
}

function AIBlock({
  number,
  title,
  icon,
  items,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  items: readonly string[];
}) {
  return (
    <section className="skills-ai-card group relative min-w-0 bg-background p-5 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center border border-border text-accent transition-colors duration-300 group-hover:border-accent">
            {icon}
          </span>

          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
            {title}
          </span>
        </div>

        <span className="font-mono text-[0.55rem] text-muted-foreground/40">
          {number}
        </span>
      </div>

      <ul className="mt-6 grid gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-6 text-foreground"
          >
            <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-border transition-all duration-300 group-hover:w-5 group-hover:bg-accent" />
            <span className="transition-colors duration-300 group-hover:text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </section>
  );
}