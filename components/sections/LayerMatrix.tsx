"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { CornerCrosshairs } from "@/components/ui/CornerCrosshairs";
import {
  Layers,
  Laptop,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemLayer {
  id: string;
  number: string;
  name: string;
  subhead: string;
  tech: string[];
  role: string;
  principles: string[];
  codeSnippet: string;
  activeProjects: string[];
}

const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: "interface",
    number: "01",
    name: "Client Runtime & Interface",
    subhead: "Next.js 16 · React 19 · Tailwind v4 · Motion · Lenis",
    tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Motion", "shadcn/ui", "Lenis"],
    role: "Hydration resilience, zero Cumulative Layout Shift (CLS < 0.1), accessible keyboard navigability, and smooth 60fps interaction without blocking the main event thread.",
    principles: [
      "Server Components for static content, Client boundaries only for interactive state",
      "Strict WCAG AAA contrast ratio compliance (> 5.9:1 accent, > 17:1 foreground)",
      "Zero layout-shifting transforms; smooth momentum scrolling with Lenis",
    ],
    codeSnippet: `// Server/Client boundary pattern with zero CLS
export default async function Page() {
  const telemetry = await getSystemTelemetry(); // Server fetched
  return (
    <Suspense fallback={<TelemetrySkeleton />}>
      <InteractiveGraph initialData={telemetry} />
    </Suspense>
  );
}`,
    activeProjects: ["DOZO", "ViewProof", "Swabhimaan", "Portfolio"],
  },
  {
    id: "gateway",
    number: "02",
    name: "API Gateway & Transport",
    subhead: "Express · WebSockets · REST · Zod Validation",
    tech: ["Node.js", "Express", "REST APIs", "WebSockets", "Zod", "HTTP/2"],
    role: "Contract-first API validation, request sanitization, bi-directional telemetry streaming, and rate-limited token bucket dispatching.",
    principles: [
      "Every inbound payload must validate through strict Zod schemas before touching business logic",
      "WebSocket heartbeat ping/pong to prune ghost connections every 30 seconds",
      "Domain-isolated routing controllers with explicit HTTP status semaphores",
    ],
    codeSnippet: `// Strict Zod contract validation middleware
export const validateDispatch = (schema: ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }
    req.validData = result.data;
    next();
  };`,
    activeProjects: ["DOZO", "Authentication Backend"],
  },
  {
    id: "persistence",
    number: "03",
    name: "State, Cache & Persistence",
    subhead: "PostgreSQL · Drizzle ORM · Redis Pub/Sub · MongoDB",
    tech: ["PostgreSQL", "Drizzle ORM", "Redis", "MongoDB", "Firestore", "Prisma"],
    role: "ACID transactional guarantees for billing and scheduling, geohash spatial indexes, and sub-millisecond in-memory message distribution.",
    principles: [
      "Serializable isolation on booking slot reservations to prevent double-booking race conditions",
      "Redis Pub/Sub channels partitioned by geographic quadrant for instant helper dispatch",
      "Drizzle ORM schema migrations tracked in version control with zero runtime overhead",
    ],
    codeSnippet: `// PostgreSQL atomic transaction locking booking row
await db.transaction(async (tx) => {
  const slot = await tx.select().from(bookings)
    .where(eq(bookings.id, bookingId))
    .for("update"); // Explicit row lock

  if (slot.status !== "AVAILABLE") throw new Error("Slot taken");
  await tx.update(bookings).set({ status: "RESERVED" });
});`,
    activeProjects: ["DOZO", "ViewProof", "Swabhimaan"],
  },
  {
    id: "security",
    number: "04",
    name: "Identity & Application Security",
    subhead: "JWT Rotation · OAuth · 2FA · Helmet · Rate Limiting",
    tech: ["JWT", "Refresh-Token Rotation", "Passport.js", "Google OAuth", "2FA (TOTP)", "Helmet", "bcrypt"],
    role: "Zero-trust session authorization, cryptographic token rotation with reuse detection, and hardened HTTP headers.",
    principles: [
      "Short-lived access tokens (15m) paired with rotating refresh tokens stored in HTTP-only cookies",
      "Reuse detection: if a previously spent refresh token is submitted, invalidate the entire token family",
      "Helmet CSP headers with rate-limiting buckets per IP and per user account",
    ],
    codeSnippet: `// Token reuse detection & family invalidation
if (tokenRecord.isRevoked) {
  // Potential token theft replay attack detected!
  await revokeAllTokensForUser(user.id);
  return res.status(403).json({ error: "Security alert: token reuse detected" });
}`,
    activeProjects: ["DOZO", "Authentication Backend"],
  },
  {
    id: "devops",
    number: "05",
    name: "DevOps, Storage & Infrastructure",
    subhead: "Turborepo · Docker · Cloudflare R2 · Vercel",
    tech: ["Docker", "Turborepo", "Cloudflare R2", "Vercel", "Git", "GitHub Actions"],
    role: "Multi-package monorepo orchestration, containerized local services, and global asset edge caching.",
    principles: [
      "Turborepo remote caching for sub-10s CI builds across shared packages",
      "Docker Compose environment replicating PostgreSQL, Redis, and Express locally",
      "Cloudflare R2 S3-compatible object storage for photo uploads with zero egress fees",
    ],
    codeSnippet: `// Turborepo pipeline configuration
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    }
  }
}`,
    activeProjects: ["DOZO", "Swabhimaan", "Portfolio"],
  },
];

export function LayerMatrix() {
  const [selectedLayer, setSelectedLayer] = useState<SystemLayer>(SYSTEM_LAYERS[0]);

  return (
    <section
      id="layer-map"
      aria-labelledby="layer-matrix-title"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-32 w-full max-w-full"
    >
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[350px] bg-accent/[0.04] blur-[150px] rounded-full" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 min-w-0">
        {/* Section Heading */}
        <div className="max-w-5xl min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            <Layers size={12} />
            <span>Architecture Layer Map</span>
          </div>

          <h2
            id="layer-matrix-title"
            className="mt-4 font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground break-words"
          >
            <span className="whitespace-nowrap">Full-Stack</span>{" "}
            <span className="whitespace-nowrap text-muted-foreground font-normal">Systems Matrix</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed break-words max-w-3xl">
            How I architect software from client runtime through transport, database concurrency, and distributed identity. Select any layer to inspect production patterns.
          </p>
        </div>

        {/* Interactive Layer Navigation Tabs */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full min-w-0">
          {SYSTEM_LAYERS.map((layer) => {
            const isSelected = selectedLayer.id === layer.id;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  sound.playClick(1100 + Number(layer.number) * 100);
                  setSelectedLayer(layer);
                }}
                className={cn(
                  "flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 active:scale-98 w-full min-w-0",
                  isSelected
                    ? "border-accent bg-accent/15 text-foreground shadow-lg"
                    : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:border-white/[0.16] hover:text-foreground"
                )}
              >
                <div className="min-w-0 w-full">
                  <span className="font-mono text-xs font-bold text-accent">
                    {layer.number}
                  </span>
                  <h3 className="font-heading text-sm font-semibold text-foreground mt-1 leading-snug break-words">
                    {layer.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] font-mono min-w-0 w-full">
                  <span className="text-muted-foreground/80 truncate">{layer.tech.length} Technologies</span>
                  <ArrowRight
                    size={12}
                    className={cn(
                      "transition-transform shrink-0",
                      isSelected ? "text-accent translate-x-1" : "opacity-0"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Detail Inspector with Mouse-Spotlight */}
        <SpotlightCard className="relative mt-8 p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
          <CornerCrosshairs />
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:items-start w-full min-w-0 max-w-full">
            {/* Left: Role, Principles, and Linked Projects */}
            <div className="w-full min-w-0 max-w-full space-y-6 lg:col-span-6">
              <div className="w-full min-w-0 max-w-full">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-mono text-accent">
                  <span className="font-bold shrink-0">LAYER {selectedLayer.number}</span>
                  <span className="opacity-40 shrink-0">/</span>
                  {selectedLayer.subhead.split("·").map((part, i, arr) => (
                    <span key={i} className="text-foreground/90 inline-flex items-center">
                      <span>{part.trim()}</span>
                      {i < arr.length - 1 && <span className="opacity-35 mx-1.5">·</span>}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-semibold text-foreground break-words">
                  {selectedLayer.name}
                </h3>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed break-words">
                  {selectedLayer.role}
                </p>
              </div>

              {/* Verified Architectural Principles */}
              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4 space-y-2.5 w-full min-w-0 max-w-full">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block">
                  Engineering Principles For This Layer
                </span>
                {selectedLayer.principles.map((pr, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90 min-w-0 max-w-full">
                    <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                    <span className="break-words min-w-0 flex-1 leading-relaxed">{pr}</span>
                  </div>
                ))}
              </div>

              {/* Technologies in This Layer */}
              <div className="w-full min-w-0 max-w-full">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                  Verified Technologies
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selectedLayer.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-foreground/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Running This Layer */}
              <div className="pt-2 border-t border-white/[0.08] w-full min-w-0 max-w-full">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                  Shipped Projects Utilizing This Layer
                </span>
                <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                  {selectedLayer.activeProjects.map((proj) => (
                    <span
                      key={proj}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-semibold text-accent"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{proj}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Real Implementation Code Blueprint */}
            <div className="w-full min-w-0 max-w-full lg:col-span-6 overflow-hidden">
              <div className="rounded-xl border border-white/[0.08] bg-[#070709] shadow-inner font-mono text-xs w-full min-w-0 max-w-full overflow-hidden">
                {/* Code Window Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#0c0d12] px-3.5 sm:px-4 py-2.5 text-muted-foreground text-[11px] w-full min-w-0 max-w-full">
                  <div className="flex items-center gap-2 min-w-0 max-w-full">
                    <Code2 size={13} className="text-accent shrink-0" />
                    <span className="truncate min-w-0 max-w-[170px] sm:max-w-none">layer_{selectedLayer.id}_architecture.ts</span>
                  </div>
                  <span className="text-[10px] uppercase text-accent font-semibold shrink-0">Production Pattern</span>
                </div>

                {/* Code Block with dedicated horizontal scroll container */}
                <div className="w-full min-w-0 max-w-full overflow-x-auto">
                  <pre className="p-3.5 sm:p-4 text-foreground/90 leading-relaxed font-mono text-[11px] sm:text-xs min-w-0 inline-block">
                    <code>{selectedLayer.codeSnippet}</code>
                  </pre>
                </div>

                {/* Footer annotation */}
                <div className="border-t border-white/[0.08] bg-[#0c0d12]/50 px-3.5 sm:px-4 py-2 text-[10px] text-muted-foreground flex flex-wrap items-center justify-between gap-2 w-full min-w-0 max-w-full">
                  <span>Type-checked TypeScript</span>
                  <span className="text-emerald-400">Strict mode enabled</span>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
