"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
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
    description: "Understand the underlying protocols, crypto tokens, and memory boundaries before reaching for framework abstractions.",
    vulnerabilityTag: "CWE-312: Stolen Token Exfiltration via XSS",
    productionTag: "Hardened: HttpOnly + Cryptographic Family Revocation",
    tutorialTitle: "Naïve Tutorial Pattern (Insecure)",
    tutorialCode: `// Tutorial code: Storing token in localStorage
const token = response.data.token;
localStorage.setItem("authToken", token); // Vulnerable to XSS

// Attaching token on every fetch with no rotation
fetch("/api/data", {
  headers: { Authorization: \`Bearer \${token}\` }
});`,
    tutorialFlaw: "Vulnerable to malicious script exfiltration (XSS). No refresh rotation means a stolen token grants indefinite access.",
    productionTitle: "Production Systems Pattern (Hardened)",
    productionCode: `// Production code: HttpOnly Cookie + Reuse Detection
app.post("/api/auth/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokenRecord = await db.query.tokens.findFirst({
    where: eq(tokens.hash, hash(refreshToken))
  });

  // Reuse detection: if already used, invalidate entire family!
  if (tokenRecord?.isRevoked) {
    await revokeAllUserTokens(tokenRecord.userId);
    return res.status(403).json({ error: "Breach alert: token replayed" });
  }

  // Rotate immediately with atomic update
  const newFamily = await rotateTokenFamily(tokenRecord);
  setSecureHttpOnlyCookie(res, newFamily.refreshToken);
  res.json({ accessToken: newFamily.accessToken });
});`,
    productionAdvantage: "Zero XSS exposure via HttpOnly cookies. Cryptographic reuse detection shuts down hijacked sessions automatically.",
  },
  {
    id: "concurrency",
    number: "02",
    title: "Ship Useful Software",
    description: "Solve real customer problems where race conditions, concurrent requests, and financial states actually occur.",
    vulnerabilityTag: "CWE-362: Race Condition / Slot Overbooking",
    productionTag: "Hardened: PostgreSQL SERIALIZABLE Row-Level Mutex",
    tutorialTitle: "Naïve Tutorial Pattern (Race Conditions)",
    tutorialCode: `// Tutorial code: Read then Write with no transaction
const booking = await Booking.findById(id);
if (booking.isAvailable) {
  // RACE CONDITION: Another client can book right here!
  booking.isAvailable = false;
  booking.userId = req.user.id;
  await booking.save();
}`,
    tutorialFlaw: "Under concurrent load, two simultaneous requests read isAvailable=true and both claim the same slot.",
    productionTitle: "Production Systems Pattern (Atomic Locks)",
    productionCode: `// Production code: PostgreSQL Serializable Transaction
await db.transaction(async (tx) => {
  // Explicit pessimistic lock on the target row
  const [slot] = await tx
    .select()
    .from(bookingSlots)
    .where(and(
      eq(bookingSlots.id, slotId),
      eq(bookingSlots.status, "AVAILABLE")
    ))
    .for("update"); // Row-level mutex lock

  if (!slot) {
    throw new SlotConflictError("Slot was claimed concurrently");
  }

  await tx
    .update(bookingSlots)
    .set({ status: "RESERVED", helperId, lockedAt: new Date() })
    .where(eq(bookingSlots.id, slot.id));
});`,
    productionAdvantage: "Pessimistic row locking guarantees strict serializability: zero double-booking even under thousands of concurrent requests.",
  },
  {
    id: "change",
    number: "03",
    title: "Design for Change",
    description: "Structure modular domain boundaries and typed contracts so new requirements do not break downstream services.",
    vulnerabilityTag: "CWE-20: Unchecked Input & Monolithic Tight Coupling",
    productionTag: "Hardened: Zod Contract -> Domain -> Async Event Bus",
    tutorialTitle: "Naïve Tutorial Pattern (Tight Coupling)",
    tutorialCode: `// Tutorial code: Controller directly queries DB & sends response
app.post("/create-order", async (req, res) => {
  // Unvalidated input directly into database
  const order = await db.collection("orders").insertOne(req.body);
  await sendNotification(req.body.userEmail); // Side effect in route
  res.json(order);
});`,
    tutorialFlaw: "Route handler couples HTTP transport, database schema, and third-party notifications with zero validation.",
    productionTitle: "Production Systems Pattern (Decoupled Domain)",
    productionCode: `// Production code: Zod Contract -> Service Layer -> Event Bus
export async function createOrderController(req: Request, res: Response) {
  // 1. Strict Contract Validation
  const command = CreateOrderSchema.parse(req.body);

  // 2. Pure Domain Execution
  const order = await OrderService.placeOrder(command);

  // 3. Event-Driven Side Effects (decides asynchronously)
  await eventBus.publish(new OrderPlacedEvent(order));

  res.status(201).json({ id: order.id, status: order.status });
}`,
    productionAdvantage: "Clear separation of concerns: transport validation, domain logic, and asynchronous notifications scale independently.",
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
            className="mt-4 font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground"
          >
            <span className="whitespace-nowrap">How I Engineer</span>{" "}
            <span className="whitespace-nowrap text-muted-foreground font-normal">
              <span className="opacity-40 mx-1 hidden sm:inline">·</span>Code Lab
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            The difference between superficial tutorial code and production resilience. Select a principle to compare how I approach architecture, concurrency, and security.
          </p>
        </div>

        {/* Principle Selector Tabs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3">
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
