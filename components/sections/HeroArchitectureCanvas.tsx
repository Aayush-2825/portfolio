"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { Play, RotateCw, Activity, ShieldCheck, Database, Radio, Server, Laptop, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopologyNode {
  id: string;
  label: string;
  sub: string;
  role: string;
  latency: string;
  protocol: string;
  icon: typeof Laptop;
  x: number;
  y: number;
}

const NODES: TopologyNode[] = [
  {
    id: "client",
    label: "Browser Client",
    sub: "Next.js 16 · React 19",
    role: "User interface hydration & client-side state machine",
    latency: "< 16ms render",
    protocol: "HTTPS / WSS",
    icon: Laptop,
    x: 18,
    y: 25,
  },
  {
    id: "gateway",
    label: "API Gateway",
    sub: "Node.js · Express",
    role: "JWT token verification, Zod contract validation & IP rate-limiting",
    latency: "1.1ms routing",
    protocol: "REST · Port 8080",
    icon: Server,
    x: 50,
    y: 25,
  },
  {
    id: "redis",
    label: "Redis Pub/Sub",
    sub: "In-memory Event Bus",
    role: "Geohash proximity clustering & helper availability matching",
    latency: "0.8ms query",
    protocol: "RESP · Port 6379",
    icon: Activity,
    x: 82,
    y: 25,
  },
  {
    id: "postgres",
    label: "PostgreSQL DB",
    sub: "Drizzle ORM Engine",
    role: "ACID transactions & SERIALIZABLE double-booking locking",
    latency: "3.2ms lock",
    protocol: "TCP · Port 5432",
    icon: Database,
    x: 82,
    y: 75,
  },
  {
    id: "ws",
    label: "WebSocket Engine",
    sub: "Real-time Bi-directional",
    role: "Live helper coordinate streaming & dispatch state broadcast",
    latency: "< 5ms stream",
    protocol: "WSS Frame Protocol",
    icon: Radio,
    x: 50,
    y: 75,
  },
  {
    id: "security",
    label: "Security & 2FA",
    sub: "Zero-Trust Tokens",
    role: "Rotating refresh token families & reuse replay attack detection",
    latency: "0.4ms crypto",
    protocol: "HMAC-SHA256",
    icon: ShieldCheck,
    x: 18,
    y: 75,
  },
];

export function HeroArchitectureCanvas() {
  const [activeNode, setActiveNode] = useState<TopologyNode>(NODES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([
    "DOZO Topology initialized: 6 distributed nodes connected",
    "WebSocket transport ready for bidirectional booking stream",
  ]);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    sound.playPacket(440);
    setLogs((prev) => [...prev.slice(-3), "[INIT] User triggered booking dispatch sequence"]);

    const steps = [
      { node: 0, text: "[Client -> Gateway] POST /api/v2/dispatch (Payload signed with JWT)" },
      { node: 1, text: "[Gateway] Zod schema validated; Rate limiter token granted (1.1ms)" },
      { node: 2, text: "[Redis Pub/Sub] Geohash query matched nearby verified helpers (0.8ms)" },
      { node: 3, text: "[PostgreSQL] Transaction locked row: booking_id=dz_88291f (3.2ms)" },
      { node: 4, text: "[WebSocket] Live telemetry handshake established; broadcast ACK" },
      { node: 5, text: "[Security] Audit event recorded; refresh-token rotation verified" },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulationStep(index);
        setActiveNode(NODES[step.node]);
        sound.playPacket(500 + index * 90);
        setLogs((prev) => [...prev.slice(-3), step.text]);

        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimulationStep(-1);
            sound.playSuccess();
            setLogs((prev) => [...prev.slice(-3), "[COMPLETE] Full round-trip dispatch verified (9.8ms total)"]);
          }, 700);
        }
      }, (index + 1) * 650);
    });
  };

  return (
    <SpotlightCard className="w-full max-w-lg p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Topology Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent font-semibold">
            DOZO · System Topology
          </span>
        </div>

        <button
          type="button"
          onClick={runSimulation}
          disabled={isSimulating}
          className={cn(
            "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all active:scale-95",
            isSimulating
              ? "border-accent bg-accent/20 text-accent cursor-wait"
              : "border-white/[0.12] bg-white/[0.04] text-foreground hover:border-accent hover:text-accent"
          )}
        >
          {isSimulating ? (
            <>
              <RotateCw size={11} className="animate-spin text-accent" />
              <span>In transit...</span>
            </>
          ) : (
            <>
              <Play size={11} className="fill-current" />
              <span>Simulate Dispatch</span>
            </>
          )}
        </button>
      </div>

      {/* SVG Interactive Architecture Graph */}
      <div className="relative my-3 aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080a] p-2">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Connecting bus lines */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal lines */}
          <line x1="18%" y1="25%" x2="50%" y2="25%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="25%" x2="82%" y2="25%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="18%" y1="75%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="75%" x2="82%" y2="75%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Vertical lines */}
          <line x1="18%" y1="25%" x2="18%" y2="75%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="82%" y1="25%" x2="82%" y2="75%" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Active simulated packet */}
          {simulationStep >= 0 && (
            <circle
              cx={`${NODES[simulationStep]?.x ?? 18}%`}
              cy={`${NODES[simulationStep]?.y ?? 25}%`}
              r="7"
              fill="var(--accent)"
              className="animate-ping"
            />
          )}
        </svg>

        {/* Nodes */}
        {NODES.map((node, index) => {
          const isActive = activeNode.id === node.id;
          const isCurrentStep = simulationStep === index;
          const Icon = node.icon;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                sound.playClick(1000 + index * 100);
                setActiveNode(node);
              }}
              onMouseEnter={() => {
                sound.playClick(1300, 0.008);
                setActiveNode(node);
              }}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={cn(
                "group absolute flex flex-col items-center justify-center rounded-xl p-1.5 sm:p-2.5 transition-all duration-200 min-w-[4.4rem] sm:min-w-[5.2rem] text-center select-none active:scale-95",
                isActive
                  ? "border border-accent bg-accent/20 shadow-[0_0_20px_rgba(255,77,31,0.35)] scale-105 z-20"
                  : "border border-white/[0.08] bg-[#0f1015]/90 hover:border-accent/50 hover:bg-[#14161d] scale-100 z-10",
                isCurrentStep && "ring-2 ring-accent ring-offset-2 ring-offset-background"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg mb-0.5 sm:mb-1 transition-colors",
                  isActive ? "bg-accent text-background" : "bg-black/50 text-muted-foreground group-hover:text-foreground"
                )}
              >
                <Icon size={13} />
              </div>
              <span className="font-heading text-[9px] sm:text-[10px] font-semibold text-foreground leading-tight">
                {node.label}
              </span>
              <span className="font-mono text-[7px] sm:text-[8px] text-muted-foreground/80 mt-0.5">
                {node.sub.split("·")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Node Inspector Detail Drawer */}
      <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-3 text-xs">
        <div className="flex items-center justify-between font-mono text-[11px] border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent">{activeNode.label}</span>
            <span className="text-[10px] text-muted-foreground">({activeNode.protocol})</span>
          </div>
          <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 font-semibold">
            {activeNode.latency}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-foreground/85 leading-relaxed">
          {activeNode.role}
        </p>
      </div>

      {/* Real-time Telemetry Log Window */}
      <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-[#050608] p-2.5 font-mono text-[10px]">
        <div className="flex items-center justify-between text-muted-foreground/60 border-b border-white/[0.05] pb-1.5 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Terminal size={11} className="text-accent" />
            <span className="uppercase tracking-wider">Live System Telemetry</span>
          </div>
          <span className="text-[9px] text-accent">Active Stream</span>
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-1.5 text-foreground/75 leading-tight truncate">
              <span className="text-accent shrink-0">›</span>
              <span className="truncate">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
