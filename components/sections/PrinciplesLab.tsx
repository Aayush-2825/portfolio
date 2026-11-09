"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PrincipleComparison {
  id: string;
  number: string;
  title: string;
  description: string;
  vulnerabilityTag: string;
  productionTag: string;
  tutorialTitle: string;
  tutorialCode: string;
  tutorialFlaw: string;
  productionTitle: string;
  productionCode: string;
  productionAdvantage: string;
}

const COMPARISONS: PrincipleComparison[] = [
  {
    id: "auth",
    number: "01",
    title: "Build from Fundamentals",
    description: "Understand token rotation, session boundaries, and cryptographic reuse detection before trusting framework abstractions.",
    vulnerabilityTag: "CWE-312: Stolen Token Exfiltration via XSS & Stale Sessions",
    productionTag: "Hardened: HttpOnly + Cryptographic Family Revocation (pjmb)",
    tutorialTitle: "Naïve Tutorial Pattern (localStorage JWT)",
    tutorialCode: `// Tutorial: Storing raw JWT in localStorage & bearer header
const token = response.data.token;
localStorage.setItem("authToken", token); // Exposable via XSS

// Attaching token on every fetch with zero reuse detection
fetch("/api/data", {
  headers: { Authorization: \`Bearer \${token}\` }
});`,
    tutorialFlaw: "Vulnerable to malicious script exfiltration (XSS). No refresh token rotation means a compromised token grants indefinite silent access.",
    productionTitle: "Production Systems Pattern (pjmb Security Engine)",
    productionCode: `// Production: HttpOnly Cookies + Speakeasy 2FA + Replay Detection
app.post("/api/auth/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokenRecord = await TokenFamily.findOne({ hash: sha256(refreshToken) });

  // Automatic breach mitigation: if already used, revoke entire family!
  if (tokenRecord?.isRevoked) {
    await TokenFamily.updateMany({ familyId: tokenRecord.familyId }, { isRevoked: true });
    winston.warn(\`[SECURITY BREACH] Token replayed for user \${tokenRecord.userId}\`);
    return res.status(403).json({ error: "Breach detected: session terminated" });
  }

  // Rotate immediately with atomic state persistence
  const newTokens = await rotateTokenFamily(tokenRecord);
  setSecureHttpOnlyCookie(res, newTokens.refreshToken);
  res.json({ accessToken: newTokens.accessToken });
});`,
    productionAdvantage: "Zero XSS exposure via HttpOnly SameSite cookies. Cryptographic replay detection terminates compromised session trees instantly.",
  },
  {
    id: "realtime",
    number: "02",
    title: "Event-Driven Telemetry",
    description: "Replace battery-draining HTTP polling with bi-directional WebSockets and Redis pub/sub backplanes.",
    vulnerabilityTag: "CWE-400: Network Congestion & DB Overload via HTTP Polling",
    productionTag: "Hardened: WebSocket State Machine + Redis Pub/Sub (DOZO)",
    tutorialTitle: "Naïve Tutorial Pattern (HTTP Polling Loop)",
    tutorialCode: `// Tutorial: Blind setInterval polling every 2 seconds
useEffect(() => {
  const timer = setInterval(async () => {
    // Floods the HTTP gateway with redundant roundtrips
    const res = await fetch(\`/api/dispatch/status?id=\${orderId}\`);
    const data = await res.json();
    setStatus(data.status);
  }, 2000);
  return () => clearInterval(timer);
}, [orderId]);`,
    tutorialFlaw: "Floods the gateway with redundant TCP handshakes, causes database query stampedes, and burns client mobile battery.",
    productionTitle: "Production Systems Pattern (DOZO Fastify WebSockets)",
    productionCode: `// Production: Fastify WebSocket state machine + Redis broadcast
fastify.get("/ws/dispatch/:jobId", { websocket: true }, (connection, req) => {
  const { jobId } = req.params;
  const subscriber = redis.duplicate();

  subscriber.subscribe(\`job:\${jobId}:events\`, (err) => {
    if (err) connection.socket.close(1011, "PubSub connection failed");
  });

  subscriber.on("message", (channel, message) => {
    // Sub-10ms event delivery directly to connected worker/client
    connection.socket.send(JSON.stringify({
      event: "DISPATCH_UPDATE",
      payload: JSON.parse(message)
    }));
  });

  connection.socket.on("close", () => subscriber.quit());
});`,
    productionAdvantage: "Zero unnecessary HTTP handshakes. Pushes real-time dispatch state transitions over a persistent bi-directional channel in <10ms.",
  },
  {
    id: "media",
    number: "03",
    title: "Zero-Trust Asset Pipelines",
    description: "Perform dynamic server-side media transformations and access gating rather than client-side cosmetics.",
    vulnerabilityTag: "CWE-200: High-Res Asset Theft via Bypassable Client Watermark",
    productionTag: "Hardened: Serverless Dynamic Watermark Pipeline (ViewProof)",
    tutorialTitle: "Naïve Tutorial Pattern (CSS/Canvas Overlay)",
    tutorialCode: `// Tutorial: Client-side CSS watermark over full-res image
<div className="relative">
  <img src="https://cdn.example.com/raw_photo_50mb.jpg" alt="Proof" />
  {/* Trivial to bypass via DevTools inspector or network tab! */}
  <div className="absolute inset-0 pointer-events-none watermark-overlay">
    <span>© Photographer Preview</span>
  </div>
</div>`,
    tutorialFlaw: "Full-resolution original raw photograph is fetched directly by the browser; client can bypass the overlay in 3 seconds via DevTools.",
    productionTitle: "Production Systems Pattern (Cloudinary Dynamic CDN)",
    productionCode: `// Production: Server-side dynamic on-the-fly watermarking pipeline
export function buildProofUrl(publicId: string, watermarkId: string): string {
  // Transformation is baked into pixel data by edge CDN before delivery
  return cloudinary.url(publicId, {
    transformation: [
      { width: 1600, crop: "limit", quality: "auto:eco" },
      { overlay: watermarkId, opacity: 40, gravity: "center" },
      { flags: "attachment:false", fetch_format: "auto" }
    ],
    secure: true
  });
}`,
    productionAdvantage: "Watermark is permanently rendered into the compressed image buffer at the edge. High-resolution raw assets never reach unapproved clients.",
  },
  {
    id: "concurrency",
    number: "04",
    title: "Ship Resilient Concurrency",
    description: "Enforce strict transactional isolation and pessimistic row locks to prevent double-booking and state corruption.",
    vulnerabilityTag: "CWE-362: Race Condition / Slot Overbooking",
    productionTag: "Hardened: PostgreSQL SERIALIZABLE Row-Level Mutex (DOZO)",
    tutorialTitle: "Naïve Tutorial Pattern (Read-then-Write Race)",
    tutorialCode: `// Tutorial: Read then Write without transaction lock
const booking = await Booking.findById(id);
if (booking.isAvailable) {
  // RACE CONDITION: Concurrent request slips in right here!
  booking.isAvailable = false;
  booking.userId = req.user.id;
  await booking.save();
}`,
    tutorialFlaw: "Under concurrent load, two simultaneous requests read isAvailable=true and both claim the same slot, corrupting inventory.",
    productionTitle: "Production Systems Pattern (Atomic Row Mutex)",
    productionCode: `// Production: PostgreSQL Serializable Transaction with Drizzle ORM
await db.transaction(async (tx) => {
  // Explicit pessimistic lock on the target row prevents race conditions
  const [slot] = await tx
    .select()
    .from(bookingSlots)
    .where(and(eq(bookingSlots.id, slotId), eq(bookingSlots.status, "AVAILABLE")))
    .for("update"); // Row-level mutex lock

  if (!slot) {
    throw new SlotConflictError("Slot was claimed concurrently");
  }

  await tx
    .update(bookingSlots)
    .set({ status: "RESERVED", helperId, lockedAt: new Date() })
    .where(eq(bookingSlots.id, slot.id));
});`,
    productionAdvantage: "Pessimistic row locking guarantees strict serializability: zero double-booking or inventory drift even under concurrent load.",
  },
];

export function PrinciplesLab() {
  const [activePrinciple, setActivePrinciple] = useState<PrincipleComparison>(COMPARISONS[0]);
  const [viewMode, setViewMode] = useState<"production" | "comparison">("comparison");
  const [mobileTab, setMobileTab] = useState<"tutorial" | "production">("production");

  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="relative overflow-hidden border-t border-border bg-[#090a0d] py-24 sm:py-32"
    >
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-emerald-500/[0.03] blur-[140px] rounded-full" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            <Cpu size={12} />
            <span>Engineering Principles & Code Rigor</span>
          </div>

          <h2
            id="principles-title"
            className="mt-4 font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground text-balance"
          >
            <span>How I Engineer</span>{" "}
            <span className="text-muted-foreground font-normal">
              <span className="opacity-40 mx-1 hidden sm:inline">·</span>Code Lab
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            The difference between superficial tutorial code and production resilience. Select a principle to compare how I approach architecture, concurrency, and security.
          </p>
        </div>

        {/* Principle Selector Tabs */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COMPARISONS.map((comp) => {
            const isSelected = activePrinciple.id === comp.id;

            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => {
                  sound.playClick(1000 + Number(comp.number) * 100);
                  setActivePrinciple(comp);
                }}
                className={cn(
                  "flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 active:scale-98",
                  isSelected
                    ? "border-accent bg-accent/15 text-foreground shadow-lg"
                    : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:border-white/[0.16] hover:text-foreground"
                )}
              >
                <div>
                  <span className="font-mono text-xs font-bold text-accent">
                    PRINCIPLE {comp.number}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-foreground mt-1 leading-snug">
                    {comp.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-accent font-semibold">Inspect Code Comparison</span>
                  <ArrowRight
                    size={12}
                    className={cn(
                      "transition-transform",
                      isSelected ? "text-accent translate-x-1" : "opacity-0"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Window with Mouse-Spotlight */}
        <SpotlightCard className="mt-8 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <span className="font-mono text-xs text-accent font-semibold">
                PRINCIPLE {activePrinciple.number} · {activePrinciple.title}
              </span>
              <p className="text-sm text-foreground/80 mt-1">
                {activePrinciple.description}
              </p>
            </div>

            {/* Desktop Mode Switcher */}
            <div className="hidden sm:flex items-center rounded-lg border border-border/80 bg-background/80 p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  sound.playClick(1200, 0.01);
                  setViewMode("comparison");
                }}
                className={cn(
                  "rounded-md px-3 py-1 font-medium transition-all",
                  viewMode === "comparison"
                    ? "bg-accent/20 text-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Side-by-Side View
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick(1200, 0.01);
                  setViewMode("production");
                }}
                className={cn(
                  "rounded-md px-3 py-1 font-medium transition-all",
                  viewMode === "production"
                    ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Production Solution Only
              </button>
            </div>

            {/* Mobile Touch Segmented Tab Selector (prevents vertical scroll sprawl) */}
            <div className="flex sm:hidden w-full items-center rounded-lg border border-border/80 bg-background/80 p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  sound.playClick(900, 0.01);
                  setMobileTab("tutorial");
                }}
                className={cn(
                  "flex-1 py-1.5 text-center font-medium rounded-md transition-all",
                  mobileTab === "tutorial"
                    ? "bg-red-500/20 text-red-400 font-semibold"
                    : "text-muted-foreground"
                )}
              >
                Anti-Pattern
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick(1200, 0.01);
                  setMobileTab("production");
                }}
                className={cn(
                  "flex-1 py-1.5 text-center font-medium rounded-md transition-all",
                  mobileTab === "production"
                    ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                    : "text-muted-foreground"
                )}
              >
                Production Code
              </button>
            </div>
          </div>

          {/* Code Panels with Spring Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePrinciple.id}-${viewMode}-${mobileTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className={cn(
                "mt-6 grid gap-6",
                viewMode === "comparison" ? "lg:grid-cols-2" : "grid-cols-1"
              )}
            >
              {/* Tutorial Naive Panel (Visible on Desktop if comparison; on Mobile if mobileTab === "tutorial") */}
              {(viewMode === "comparison" || mobileTab === "tutorial") && (
                <div
                  className={cn(
                    "overflow-hidden rounded-xl border border-red-500/30 bg-[#070607] flex flex-col justify-between",
                    mobileTab !== "tutorial" && "hidden sm:flex"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-red-500/20 bg-red-500/10 px-4 py-2 text-[11px] font-mono text-red-400">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <AlertTriangle size={13} />
                        <span>{activePrinciple.tutorialTitle}</span>
                      </div>
                      <span className="text-[10px] text-red-300/70">Anti-pattern</span>
                    </div>

                    <div className="px-4 py-2 bg-red-950/20 border-b border-red-500/10 font-mono text-[10px] text-red-300">
                      {activePrinciple.vulnerabilityTag}
                    </div>

                    <pre className="overflow-x-auto p-4 text-[11px] sm:text-xs font-mono text-red-200/80 leading-relaxed">
                      <code>{activePrinciple.tutorialCode}</code>
                    </pre>
                  </div>

                  <div className="border-t border-red-500/20 bg-red-950/20 p-3.5 text-xs text-red-300/90 flex items-start gap-2">
                    <ShieldAlert size={15} className="text-red-400 shrink-0 mt-0.5" />
                    <span>{activePrinciple.tutorialFlaw}</span>
                  </div>
                </div>
              )}

              {/* Production Hardened Panel (Visible on Desktop always in comparison/production; on Mobile if mobileTab === "production") */}
              {(viewMode === "production" || viewMode === "comparison" || mobileTab === "production") && (
                <div
                  className={cn(
                    "overflow-hidden rounded-xl border border-emerald-500/30 bg-[#050806] flex flex-col justify-between shadow-xl",
                    viewMode === "comparison" && mobileTab === "tutorial" && "hidden sm:flex"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-mono text-emerald-400">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <CheckCircle2 size={13} />
                        <span>{activePrinciple.productionTitle}</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 font-semibold">Production Standard</span>
                    </div>

                    <div className="px-4 py-2 bg-emerald-950/20 border-b border-emerald-500/10 font-mono text-[10px] text-emerald-300">
                      {activePrinciple.productionTag}
                    </div>

                    <pre className="overflow-x-auto p-4 text-[11px] sm:text-xs font-mono text-emerald-100/90 leading-relaxed">
                      <code>{activePrinciple.productionCode}</code>
                    </pre>
                  </div>

                  <div className="border-t border-emerald-500/20 bg-emerald-950/20 p-3.5 text-xs text-emerald-300 flex items-start gap-2">
                    <Sparkles size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{activePrinciple.productionAdvantage}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  );
}
