"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { CornerCrosshairs } from "@/components/ui/CornerCrosshairs";
import { GithubIcon } from "@/components/ui/icons";
import {
  Sparkles,
  Zap,
  Workflow,
  Check,
  CheckCircle2,
  ExternalLink,
  FileCode2,
  Activity,
  RotateCcw,
  ShieldCheck,
  Play,
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
    id: "framework",
    title: "Fastify 5 & Drizzle vs Express & Prisma",
    problem: "Routing overhead and cold-start latency under high-throughput WebSocket handshakes.",
    solution:
      "V2 standardized on Fastify 5 for its high-performance HTTP engine and built-in schema serialization (Ajv), paired with Drizzle ORM for zero-overhead SQL generation with typed prepared statements.",
    metrics: "2.4x higher req/sec throughput and 65% faster cold startup compared to legacy Express.",
  },
  {
    id: "db",
    title: "PostgreSQL (Drizzle) vs MongoDB",
    problem: "Booking concurrency races & financial double-spend ledger integrity.",
    solution:
      "Migrated from document stores to PostgreSQL with Drizzle ORM. Booking requests require strict transactional isolation (SERIALIZABLE) so two customers cannot book the same helper for overlapping time windows, and payment ledgers maintain ACID consistency.",
    metrics: "0% double-booking race conditions under high-concurrency k6 stress testing.",
  },
  {
    id: "realtime",
    title: "WebSockets vs Polling",
    problem: "Battery drain and 3–5s latency delays on mobile helper tracking.",
    solution:
      "Engineered an event-driven bi-directional WebSocket protocol with heartbeat pinging and auto-reconnect fallback. Helpers stream geocoordinates via lightweight delta frames, cutting mobile bandwidth by 82% over HTTP polling.",
    metrics: "< 40ms broadcast latency from helper ping to customer UI update.",
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

type DispatchState = "IDLE" | "DISPATCHING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

interface TelemetryNode {
  x: number;
  label: string;
  sub: string;
  step: number;
}

const TELEMETRY_NODES: TelemetryNode[] = [
  { x: 30,  label: "Client",   sub: "Next.js 16", step: 0 },
  { x: 95,  label: "Fastify 5", sub: "Zod Contract", step: 1 },
  { x: 160, label: "Redis Bus", sub: "OTP & Geo", step: 2 },
  { x: 225, label: "Postgres",  sub: "Serial Lock", step: 3 },
  { x: 290, label: "WebSocket", sub: "Delta Stream", step: 4 },
];

/**
 * 5-Node Animated SVG Telemetry Data-Flow Bus
 */
function DozoDataFlowMap({ activeStep, isSimulating }: { activeStep: number; isSimulating: boolean }) {
  const nodePositions = [30, 95, 160, 225, 290];
  const activeX = activeStep >= 0 && activeStep < 5 ? nodePositions[activeStep] : 30;

  return (
    <div className="relative mb-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080b] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          Fastify 5 Telemetry Bus
        </span>
        <span className="font-mono text-[9px] text-muted-foreground">
          {isSimulating ? `Active Node: 0${activeStep + 1} / 05` : activeStep >= 0 ? `Stage: 0${activeStep + 1} / 05` : "Status: READY (IDLE)"}
        </span>
      </div>

      <svg viewBox="0 0 320 64" className="w-full select-none" fill="none">
        {/* Inactive Base Track */}
        <line x1="30" y1="32" x2="290" y2="32" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Active Animated Track */}
        {activeStep >= 0 && (
          <line
            x1="30"
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

        {/* 5 Infrastructure Nodes */}
        {TELEMETRY_NODES.map((node) => {
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
                fontSize="7"
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
                fontSize="5.5"
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
  const [state, setState] = useState<DispatchState>("IDLE");
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeDecision, setActiveDecision] = useState<string>("framework");
  const [showPayload, setShowPayload] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Dispatch Engine initialized. Waiting for booking trigger...",
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-3), msg]);
  };

  // State Transition Handlers
  const handleAutoSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setState("DISPATCHING");
    setSimulationStep(0);
    sound.playPacket(450);
    setLogs(["[1/5] Fastify 5: Validating Zod booking schema & JWT claims..."]);

    const steps = [
      { step: 1, state: "DISPATCHING" as DispatchState, msg: "[2/5] Redis: Geohash proximity query matched 4 nearby verified helpers in 1.4ms" },
      { step: 2, state: "ACCEPTED" as DispatchState, msg: "[3/5] State Machine: Helper #dz_88291 accepted booking. Emitted ACK" },
      { step: 3, state: "IN_PROGRESS" as DispatchState, msg: "[4/5] PostgreSQL: Acquired SERIALIZABLE lock on helper window. OTP verified" },
      { step: 4, state: "COMPLETED" as DispatchState, msg: "[5/5] WebSocket: Work completed, payment ledger transaction committed (7-layer verified)" },
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setSimulationStep(s.step);
        setState(s.state);
        sound.playPacket(550 + idx * 100);
        addLog(s.msg);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            sound.playSuccess();
          }, 600);
        }
      }, (idx + 1) * 650);
    });
  };

  const handleManualTransition = (nextState: DispatchState) => {
    if (isSimulating) return;
    sound.playClick(1000);
    setState(nextState);

    switch (nextState) {
      case "DISPATCHING":
        setSimulationStep(1);
        addLog(`[Fastify 5] Request received for ${selectedService.name}. Redis geohash clustering...`);
        break;
      case "ACCEPTED":
        setSimulationStep(2);
        addLog("[State Machine: ACCEPT] Helper assigned; Redis OTP token dispatched.");
        break;
      case "IN_PROGRESS":
        setSimulationStep(3);
        addLog("[PostgreSQL] Row-level lock active. Helper arrived; OTP verified on device.");
        break;
      case "COMPLETED":
        setSimulationStep(4);
        sound.playSuccess();
        addLog("[COMPLETE] Service fulfilled. PostgreSQL transaction committed; lock released.");
        break;
      case "CANCELLED":
        setSimulationStep(-1);
        addLog("[CANCELLED] State machine rolled back. Redis OTP purged & Postgres lock released.");
        break;
      case "IDLE":
        setSimulationStep(-1);
        setLogs(["[SYS] Simulator reset to IDLE."]);
        break;
    }
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
            <span>Flagship Case Study · NIT Hamirpur Pre-Incubation</span>
          </div>

          <h2
            id="dozo-title"
            className="mt-4 font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground text-balance"
          >
            <span>DOZO <span className="text-muted-foreground font-normal">·</span></span>{" "}
            <span className="text-muted-foreground font-normal">Real-Time Platform</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            An on-demand local domestic services marketplace solving pricing uncertainty, helper KYC verification, and live dispatch tracking across 20+ service categories with a Fastify 5, Drizzle ORM, and WebSocket backend.
          </p>
        </div>

        {/* Startup Credential Banner with Direct Links */}
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.1] bg-[#0c0d12]/90 p-4 sm:p-5 backdrop-blur-md">
          <CornerCrosshairs />
          <div className="flex items-center gap-3 min-w-[240px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
              <Zap size={22} />
            </div>
            <div>
              <span className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
                <span>NIT Hamirpur Pre-Incubation Program</span>
                <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] text-emerald-400 font-semibold uppercase">
                  3-Month Fellowship
                </span>
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Awarded selective institutional pre-incubation backing to advance DOZO from architecture prototype to campus and regional deployment.
              </p>
            </div>
          </div>

          {/* Direct Verified Links (Website + GitHub Repo) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://dozo.work"
              target="_blank"
              rel="noreferrer"
              data-cursor="LAUNCH"
              onClick={() => sound.playClick(1000)}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/15 px-4 py-2 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-background active:scale-[0.97]"
            >
              <span>Visit dozo.work</span>
              <ExternalLink size={12} />
            </a>

            <a
              href="https://github.com/Aayush-2825/dozo"
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB"
              onClick={() => sound.playClick(1100)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.15] bg-white/[0.05] px-4 py-2 font-mono text-xs font-semibold text-foreground transition-all hover:border-white/30 hover:bg-white/[0.1] active:scale-[0.97]"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>Source Code</span>
            </a>
          </div>
        </div>

        {/* Main Grid: Left Simulator / Right Architecture Decisions */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Interactive Real-Time Dispatch Simulator with State Machine */}
          <SpotlightCard data-cursor="SIMULATE" className="col-span-12 lg:col-span-6 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Workflow size={16} className="text-accent" />
                <span className="font-heading text-sm font-semibold text-foreground">
                  Interactive Dispatch Simulator
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-white/[0.1] bg-[#0c0d12] text-accent font-semibold">
                  State: {state}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Step through the state machine transitions or run an automated dispatch cycle to inspect Fastify route validation, Redis OTP verification, and PostgreSQL row-level locks.
            </p>

            {/* Live 5-Node Telemetry Bus */}
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
                    "flex flex-col rounded-xl border p-3 text-left transition-all active:scale-[0.97]",
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

            {/* State Machine Transition Actions */}
            <div className="mt-5 space-y-2.5">
              {/* Primary Automation Button */}
              <button
                type="button"
                onClick={handleAutoSimulate}
                disabled={isSimulating}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.97]",
                  isSimulating
                    ? "bg-accent/20 text-accent border border-accent cursor-wait"
                    : "bg-accent text-background hover:bg-accent/90 shadow-[0_0_20px_rgba(255,77,31,0.35)]"
                )}
              >
                {isSimulating ? (
                  <>
                    <Activity size={15} className="animate-spin" />
                    <span>Executing 7-Layer Dispatch Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} className="fill-current" />
                    <span>Simulate Complete Round-Trip Dispatch</span>
                  </>
                )}
              </button>

              {/* Individual State Transition Controls */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleManualTransition("ACCEPTED")}
                  disabled={isSimulating || state === "ACCEPTED"}
                  className="rounded-lg border border-white/[0.08] bg-[#0c0d12] px-2 py-2 font-mono text-[10px] text-foreground/80 hover:border-accent hover:text-accent disabled:opacity-30 active:scale-[0.97]"
                >
                  1. Accept Match
                </button>
                <button
                  type="button"
                  onClick={() => handleManualTransition("IN_PROGRESS")}
                  disabled={isSimulating || state === "IN_PROGRESS"}
                  className="rounded-lg border border-white/[0.08] bg-[#0c0d12] px-2 py-2 font-mono text-[10px] text-foreground/80 hover:border-accent hover:text-accent disabled:opacity-30 active:scale-[0.97]"
                >
                  2. Verify OTP & Start
                </button>
                <button
                  type="button"
                  onClick={() => handleManualTransition("COMPLETED")}
                  disabled={isSimulating || state === "COMPLETED"}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-2 font-mono text-[10px] text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-30 active:scale-[0.97]"
                >
                  3. Commit & End
                </button>
                <button
                  type="button"
                  onClick={() => handleManualTransition("CANCELLED")}
                  disabled={isSimulating || state === "CANCELLED" || state === "IDLE"}
                  className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-2 font-mono text-[10px] text-rose-400 hover:bg-rose-500/20 disabled:opacity-30 active:scale-[0.97]"
                >
                  Rollback / Cancel
                </button>
              </div>
            </div>

            {/* Live Telemetry Feed */}
            <div className="mt-5 rounded-xl border border-white/[0.08] bg-[#050608] p-3 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-2 text-muted-foreground uppercase tracking-wider text-[9px]">
                <span className="flex items-center gap-1.5 text-accent font-semibold">
                  <Activity size={11} /> Live System Telemetry
                </span>
                <button
                  type="button"
                  onClick={() => handleManualTransition("IDLE")}
                  className="flex items-center gap-1 hover:text-foreground active:scale-95"
                >
                  <RotateCcw size={10} /> Reset
                </button>
              </div>
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className="text-foreground/80 truncate">
                    <span className="text-accent">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Optional JSON payload drawer */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowPayload(!showPayload)}
                className="text-[10px] font-mono text-muted-foreground hover:text-accent transition-colors underline"
              >
                {showPayload ? "[-] Hide Zod Contract Payload" : "[+] Inspect Fastify Contract Schema & JWT Claims"}
              </button>

              {showPayload && (
                <div className="mt-2 rounded-lg border border-white/[0.08] bg-[#07080a] p-3 font-mono text-[10px] text-foreground/80 overflow-x-auto">
                  <pre>{JSON.stringify({
                    endpoint: "POST /v2/dispatch/match",
                    serviceId: selectedService.id,
                    serviceName: selectedService.name,
                    category: selectedService.category,
                    pricing: selectedService.pricing,
                    stateMachineStatus: state,
                    contractValidation: "Zod.strictObject() PASSED",
                    transactionIsolation: "SERIALIZABLE",
                    timestamp: "2026-11-09T14:00:00.000Z",
                    jwtClaims: {
                      sub: "usr_99214f82",
                      role: "customer",
                      scope: ["dispatch:read", "dispatch:create"],
                      exp: 1773149400,
                    },
                  }, null, 2)}</pre>
                </div>
              )}
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
                      "rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all active:scale-[0.97]",
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

            {/* 7-Layer Verification Pipeline Callout */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0b0f] p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-accent" />
                  7-Layer Production Verification Pipeline
                </span>
                <span className="font-mono text-[9px] text-emerald-400">Strict Invariants</span>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {[
                  "1. Zod Contract Validation",
                  "2. JWT Rotating Refresh Tokens",
                  "3. Redis Geohash & Rate Limits",
                  "4. Postgres SERIALIZABLE Locks",
                  "5. Bi-directional WebSocket WSS",
                  "6. Distributed Transaction Commit",
                  "7. HMAC Immutable Audit Logs",
                ].map((layer) => (
                  <div key={layer} className="flex items-center gap-2 text-foreground/80">
                    <Check size={12} className="text-accent shrink-0" />
                    <span>{layer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips for DOZO */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0b0f] p-5 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                DOZO Production Stack
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Fastify 5",
                  "PostgreSQL",
                  "Drizzle ORM",
                  "Redis Pub/Sub",
                  "WebSockets",
                  "Next.js 16",
                  "React 19",
                  "TypeScript",
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
