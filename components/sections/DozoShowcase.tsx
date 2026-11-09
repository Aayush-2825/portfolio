"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { CornerCrosshairs } from "@/components/ui/CornerCrosshairs";
import {
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
  Clock,
  Database,
  Radio,
  FileCode2,
  Workflow,
  Activity,
  Check,
  Code2,
  Server,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceType {
  id: string;
  name: string;
  pricing: string;
  estTime: string;
  category: string;
}

const SERVICES: ServiceType[] = [
  { id: "clean", name: "Deep Home Cleaning", pricing: "₹799", estTime: "45 mins dispatch", category: "Cleaning" },
  { id: "plumb", name: "Plumbing Emergency", pricing: "₹349", estTime: "15 mins dispatch", category: "Repair" },
  { id: "cook",  name: "Daily Chef / Meal Prep", pricing: "₹599", estTime: "Scheduled Slot", category: "Cooking" },
];

const DECISIONS = [
  {
    id: "db",
    title: "PostgreSQL (Drizzle) vs MongoDB",
    problem: "Booking concurrency races & financial double-spend ledger integrity.",
    solution:
      "V2 migrated from document stores to PostgreSQL with Drizzle ORM. Booking requests require strict transactional isolation (SERIALIZABLE) so two customers cannot book the same helper for overlapping time windows, and payment ledgers maintain ACID consistency.",
    metrics: "0% double-booking race conditions under high-concurrency k6 stress testing.",
  },
  {
    id: "realtime",
    title: "WebSockets vs Polling",
    problem: "Battery drain and 3–5s latency delays on mobile helper tracking.",
    solution:
      "Engineered an event-driven bi-directional WebSocket protocol with heartbeat pinging and auto-reconnect fallback. Helpers stream geocoordinates via lightweight delta frames, cutting mobile bandwidth by 82% over HTTP polling.",
    metrics: "< 50ms broadcast latency from helper ping to customer UI update.",
  },
  {
    id: "monorepo",
    title: "Turborepo & Docker vs Polyrepo",
    problem: "Type drift between mobile client, admin portal, and backend API contracts.",
    solution:
      "Unified the entire codebase into a Turborepo monorepo sharing end-to-end Zod schemas and TypeScript domain types across packages/api, apps/web, and apps/mobile. Docker Compose mirrors local Redis & Postgres services.",
    metrics: "100% type-sharing eliminates API contract breakage across deployments.",
  },
];

/**
 * Animated SVG Telemetry Data-Flow Pipeline
 */
function DozoDataFlowMap({ activeStep, isSimulating }: { activeStep: number; isSimulating: boolean }) {
  const nodePositions = [40, 120, 200, 280];
  const activeX = activeStep >= 0 && activeStep < 4 ? nodePositions[activeStep] : 40;

  return (
    <div className="relative mb-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080b] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          Live Telemetry Bus
        </span>
        <span className="font-mono text-[9px] text-muted-foreground">
          {isSimulating ? `Active Node: 0${activeStep + 1} / 04` : "Status: READY (IDLE)"}
        </span>
      </div>

      <svg viewBox="0 0 320 64" className="w-full select-none" fill="none">
        {/* Inactive Base Track */}
        <line x1="40" y1="32" x2="280" y2="32" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Active Animated Track */}
        {activeStep >= 0 && (
          <line
            x1="40"
            y1="32"
            x2={activeX}
            y2="32"
            stroke="#ff4d1f"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}

        {/* Animated Traveling Packet Circle */}
        {isSimulating && (
          <circle
            cx={activeX}
            cy="32"
            r="4.5"
            fill="#ff4d1f"
            className="transition-all duration-500 ease-out"
          >
            <animate attributeName="r" values="3.5;6;3.5" dur="0.8s" repeatCount="indefinite" />
          </circle>
        )}

        {/* 4 Infrastructure Nodes */}
        {[
          { x: 40, label: "Client", sub: "HTTP/2", step: 0 },
          { x: 120, label: "Gateway", sub: "Zod+JWT", step: 1 },
          { x: 200, label: "Redis/DB", sub: "GeoLock", step: 2 },
          { x: 280, label: "Helper", sub: "WSS Push", step: 3 },
        ].map((node) => {
          const isActive = activeStep === node.step;
          const isDone = activeStep > node.step;
          return (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy="32"
                r={isActive ? "9" : "7"}
                fill={isActive ? "rgba(255,77,31,0.2)" : isDone ? "rgba(16,185,129,0.15)" : "#0c0d12"}
                stroke={isActive ? "#ff4d1f" : isDone ? "#10b981" : "rgba(255,255,255,0.2)"}
                strokeWidth={isActive ? "2" : "1"}
                className="transition-all duration-300"
              />
              <circle
                cx={node.x}
                cy="32"
                r="3"
                fill={isActive ? "#ff4d1f" : isDone ? "#10b981" : "rgba(255,255,255,0.4)"}
              />
              <text
                x={node.x}
                y="16"
                textAnchor="middle"
                fill={isActive ? "#ff4d1f" : isDone ? "#10b981" : "rgba(255,255,255,0.7)"}
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="600"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="6"
                fontFamily="monospace"
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function DozoShowcase() {
  const [selectedService, setSelectedService] = useState<ServiceType>(SERVICES[0]);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeDecision, setActiveDecision] = useState<string>("db");
  const [showPayload, setShowPayload] = useState(false);

  const steps = [
    {
      label: "1. Request Verification",
      detail: "Zod contract schema validated; JWT user claims decoded",
      time: "+1.2ms",
    },
    {
      label: "2. Geohash Redis Match",
      detail: "Spatial indexing query matched 4 nearby verified helpers",
      time: "+2.8ms",
    },
    {
      label: "3. Concurrency Lock",
      detail: "Postgres SERIALIZABLE row lock prevents double-booking",
      time: "+5.1ms",
    },
    {
      label: "4. Live WSS Dispatch",
      detail: "WebSocket channel broadcasted coordinate stream to customer",
      time: "+8.4ms",
    },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    sound.playPacket(450);

    steps.forEach((_, i) => {
      setTimeout(() => {
        setSimulationStep(i);
        sound.playPacket(550 + i * 110);

        if (i === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            sound.playSuccess();
          }, 800);
        }
      }, (i + 1) * 700);
    });
  };

  return (
    <section
      id="dozo-case-study"
      aria-labelledby="dozo-title"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#070709] py-20 sm:py-32"
    >
      {/* Background Radial Mesh Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,77,31,0.08),transparent_70%)] blur-[90px] rounded-full" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            <Sparkles size={12} />
            <span>Flagship Case Study · Selected for Pre-Incubation</span>
          </div>

          <h2
            id="dozo-title"
            className="mt-4 font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground"
          >
            <span className="whitespace-nowrap">DOZO <span className="text-muted-foreground font-normal">·</span></span>{" "}
            <span className="whitespace-nowrap text-muted-foreground font-normal">Real-Time Platform</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            An on-demand local domestic services marketplace solving pricing uncertainty, helper KYC verification, and live dispatch tracking across 20+ service categories.
          </p>
        </div>

        {/* Startup Credential Banner */}
        <div className="relative mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/[0.1] bg-[#0c0d12]/90 p-4 sm:p-5 backdrop-blur-md">
          <CornerCrosshairs />
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
            <Zap size={22} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <span className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
              <span>NIT Hamirpur Pre-Incubation Program</span>
              <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] text-emerald-400 font-semibold uppercase">
                3-Month Fellowship
              </span>
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Awarded selective pre-incubation backing to advance DOZO from architecture prototype to campus and regional pilot.
            </p>
          </div>
          <a
            href="https://dozo.work"
            target="_blank"
            rel="noreferrer"
            data-cursor="LAUNCH"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-background active:scale-95"
          >
            <span>Visit dozo.work</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Main Grid: Left Simulator / Right Architecture Decisions */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Interactive Real-Time Dispatch Simulator with Mouse-Spotlight */}
          <SpotlightCard data-cursor="SIMULATE" className="col-span-12 lg:col-span-6 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Workflow size={16} className="text-accent" />
                <span className="font-heading text-sm font-semibold text-foreground">
                  Interactive Dispatch Simulator
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                State Machine Lifecycle
              </span>
            </div>

            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Select a service category and trigger the booking state machine to visualize how DOZO routes data across client, gateway, Redis, and PostgreSQL.
            </p>

            {/* Live Telemetry Bus */}
            <div className="mt-4">
              <DozoDataFlowMap activeStep={simulationStep} isSimulating={isSimulating} />
            </div>

            {/* Service Selection Pill Selector */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => {
                    sound.playClick(1100, 0.01);
                    setSelectedService(srv);
                  }}
                  className={cn(
                    "flex flex-col rounded-xl border p-3 text-left transition-all active:scale-98",
                    selectedService.id === srv.id
                      ? "border-accent bg-accent/15 text-foreground shadow-sm"
                      : "border-white/[0.08] bg-[#08080a] text-muted-foreground hover:border-white/[0.15] hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-semibold">
                    {srv.category}
                  </span>
                  <span className="font-heading text-xs font-semibold mt-1 leading-tight text-foreground">
                    {srv.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground mt-1">
                    Est: {srv.pricing}
                  </span>
                </button>
              ))}
            </div>

            {/* Trigger Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs font-semibold uppercase tracking-wider transition-all active:scale-98",
                  isSimulating
                    ? "bg-accent/20 text-accent border border-accent cursor-wait"
                    : "bg-accent text-background hover:bg-accent/90 shadow-[0_0_20px_rgba(255,77,31,0.35)]"
                )}
              >
                {isSimulating ? (
                  <>
                    <Activity size={15} className="animate-spin" />
                    <span>Processing State Machine...</span>
                  </>
                ) : (
                  <>
                    <Zap size={15} />
                    <span>Trigger Live Dispatch Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Execution Pipeline */}
            <div className="mt-6 space-y-2 border-t border-white/[0.08] pt-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>Execution Pipeline</span>
                <button
                  type="button"
                  onClick={() => setShowPayload(!showPayload)}
                  className="text-accent hover:underline lowercase font-mono"
                >
                  {showPayload ? "hide payload" : "view payload"}
                </button>
              </div>

              {/* Optional JSON payload drawer */}
              {showPayload && (
                <div className="rounded-lg border border-white/[0.08] bg-[#07080a] p-3 font-mono text-[10px] text-foreground/80 overflow-x-auto">
                  <pre>{JSON.stringify({
                    serviceId: selectedService.id,
                    serviceName: selectedService.name,
                    category: selectedService.category,
                    pricing: selectedService.pricing,
                    timestamp: new Date().toISOString(),
                    jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    status: isSimulating ? "IN_PROGRESS" : simulationStep === 3 ? "DISPATCHED" : "IDLE",
                  }, null, 2)}</pre>
                </div>
              )}

              {steps.map((st, i) => {
                const isPassed = simulationStep >= i;
                const isCurrent = simulationStep === i;

                return (
                  <div
                    key={st.label}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all duration-300 font-mono text-xs",
                      isCurrent
                        ? "border-accent bg-accent/20 text-foreground shadow-sm"
                        : isPassed
                        ? "border-emerald-500/30 bg-emerald-500/10 text-foreground/90"
                        : "border-white/[0.06] bg-[#08080a] text-muted-foreground/60"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          isCurrent
                            ? "bg-accent text-background animate-pulse"
                            : isPassed
                            ? "bg-emerald-500 text-background"
                            : "bg-white/[0.06] text-muted-foreground"
                        )}
                      >
                        {isPassed ? <Check size={11} /> : i + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{st.label}</div>
                        <div className="text-[10px] text-muted-foreground">{st.detail}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{st.time}</span>
                  </div>
                );
              })}
            </div>
          </SpotlightCard>

          {/* Right: Architectural Trade-Offs & Decisions */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <SpotlightCard className="p-5 sm:p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <FileCode2 size={16} className="text-accent" />
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                    Architectural Decision Records (ADRs)
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-accent">v1 → v2 Evolution</span>
              </div>

              {/* Decision Tabs */}
              <div className="mt-4 flex flex-wrap gap-2">
                {DECISIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      sound.playClick(1000, 0.01);
                      setActiveDecision(d.id);
                    }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all active:scale-95",
                      activeDecision === d.id
                        ? "bg-foreground text-background font-semibold"
                        : "border border-white/[0.08] bg-[#07080a] text-muted-foreground hover:border-white/[0.15] hover:text-foreground"
                    )}
                  >
                    {d.title.split(" vs ")[0]}
                  </button>
                ))}
              </div>

              {/* Active Decision Content with Spring Animation */}
              <AnimatePresence mode="wait">
                {(() => {
                  const dec = DECISIONS.find((d) => d.id === activeDecision) ?? DECISIONS[0];
                  return (
                    <motion.div
                      key={dec.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="mt-5 space-y-4"
                    >
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block">
                          Problem Statement
                        </span>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {dec.problem}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                          Production Architecture Solution
                        </span>
                        <p className="mt-1.5 text-xs text-foreground/90 leading-relaxed font-mono">
                          {dec.solution}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 size={15} className="shrink-0" />
                        <span>{dec.metrics}</span>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </SpotlightCard>

            {/* Tech Stack Chips for DOZO */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0b0f] p-5 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                DOZO Production Stack
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Next.js 16",
                  "React 19",
                  "TypeScript",
                  "Node.js",
                  "Express",
                  "PostgreSQL",
                  "Drizzle ORM",
                  "Redis Pub/Sub",
                  "WebSockets",
                  "Zod Contracts",
                  "Turborepo",
                  "Docker",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
