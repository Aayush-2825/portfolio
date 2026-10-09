"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, MoveUpRight } from "lucide-react";
import { projects } from "@/data/projects";

/* ───────────────── HOOKS / HELPERS ───────────────── */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={inView}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ───────────────── DATA ───────────────── */

const features = [
  {
    title: "Instant & scheduled booking",
    desc: "Customers book a helper right now or pick a slot ahead of time.",
  },
  {
    title: "Helper onboarding & KYC",
    desc: "Helpers are verified before they can accept work, building trust.",
  },
  {
    title: "Booking tracking",
    desc: "Live status from request to completion, visible to both sides.",
  },
  {
    title: "Payments architecture",
    desc: "Structured payment flows tied to each booking lifecycle.",
  },
  {
    title: "Admin operations",
    desc: "Tools for the ops team to manage users, bookings and disputes.",
  },
];

const nodes = [
  {
    number: "01",
    title: "Customer",
    items: ["Browse", "Book", "Track"],
    detail:
      "Customers discover helpers, create instant or scheduled bookings and follow progress in real time.",
  },
  {
    number: "02",
    title: "Platform",
    items: ["Next.js", "API", "Auth", "Realtime"],
    detail:
      "The core: Next.js front end, an Express API, authentication and WebSocket-based realtime events.",
    highlighted: true,
  },
  {
    number: "03",
    title: "Data",
    items: ["PostgreSQL", "Redis", "Storage"],
    detail:
      "A PostgreSQL-backed domain model, with Redis planned for realtime infrastructure and storage for documents.",
  },
];

const engineering = [
  ["Frontend", "Next.js + React"],
  ["Backend", "Node.js + Express"],
  ["Database", "PostgreSQL + Drizzle"],
  ["Realtime", "WebSockets + Redis"],
  ["Infrastructure", "Turborepo + Docker"],
];

/* ───────────────── MAIN ───────────────── */

export default function DozoFeature() {
  const dozo = projects.find((project) => project.slug === "dozo");

  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [activeNode, setActiveNode] = useState<number>(1);
  const [pinned, setPinned] = useState<number | null>(null);
  const [openFeature, setOpenFeature] = useState<number>(0);

  // Cursor spotlight across the whole section
  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  // 3D tilt + spotlight on hero image
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
    el.style.setProperty("--px", `${px * 100}%`);
    el.style.setProperty("--py", `${py * 100}%`);
  };

  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  if (!dozo) return null;

  const current = nodes[activeNode];
  const dozoImage = dozo.images[0];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      className="relative overflow-hidden border-y border-border bg-background"
    >
      {/* Background system grid */}
      <div className="pointer-events-none absolute inset-0 dozo-grid opacity-70" />

      {/* Cursor spotlight */}
      <div className="dozo-spotlight pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* ───────────────── HEADER ───────────────── */}

        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Featured Platform
              </div>
            </Reveal>

            <Reveal>
              <h2
                aria-label="DOZO."
                className="font-heading text-[clamp(5rem,15vw,14rem)] font-semibold leading-[0.72] tracking-[-0.075em] text-foreground"
              >
                {"DOZO".split("").map((char, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="dozo-char"
                    style={{ "--d": `${i * 90}ms` } as CSSProperties}
                  >
                    {char}
                  </span>
                ))}
                <span
                  aria-hidden
                  className="dozo-char text-accent"
                  style={{ "--d": "420ms" } as CSSProperties}
                >
                  .
                </span>
              </h2>
            </Reveal>
          </div>

          <a
            href={dozo.links?.live}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2 border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-foreground sm:flex"
          >
            Live product
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* ───────────────── HERO ───────────────── */}

        <div className="grid gap-6 lg:grid-cols-[1.65fr_0.75fr]">
          <Reveal delay={100}>
            <div
              ref={tiltRef}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="dozo-tilt group relative aspect-[16/9] overflow-hidden border border-border bg-surface"
            >
              {dozoImage && (
                <Image
                  src={dozoImage.src}
                  alt={dozoImage.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}

              {/* hover spotlight + scan line */}
              <div className="dozo-image-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="dozo-scan pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 sm:p-7">
                <div className="transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Product / Platform
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    Local services infrastructure
                  </p>
                </div>
                <span className="font-mono text-[10px] text-white/40">
                  2026
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220} className="h-full">
            <div className="flex h-full flex-col justify-between border border-border bg-surface p-6 sm:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  System focus
                </p>
                <h3 className="mt-5 max-w-sm font-heading text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
                  Turning informal local services into a structured platform.
                </h3>
              </div>

              <div className="mt-12">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {dozo.stack.map((item) => (
                    <span
                      key={item}
                      className="cursor-default border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ───────────────── PROBLEM / PRODUCT ───────────────── */}

        <Reveal className="mt-6">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
            <div className="group bg-background p-7 transition-colors duration-500 hover:bg-accent/[0.04] sm:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                01 / Problem
              </span>
              <p className="mt-6 max-w-xl font-heading text-2xl leading-snug tracking-[-0.03em] text-foreground sm:text-3xl">
                Local service markets often lack predictable quality, pricing,
                availability and trust.
              </p>
            </div>

            <div className="group bg-surface p-7 transition-colors duration-500 hover:bg-accent/[0.04] sm:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent">
                02 / Product
              </span>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                DOZO connects customers with local helpers through booking,
                verification, payments and operational workflows.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ───────────────── ARCHITECTURE ───────────────── */}

        <Reveal className="relative mt-20 overflow-hidden border border-border bg-surface">
          <div className="absolute inset-0 architecture-grid opacity-40" />

          <div className="relative p-7 sm:p-10 lg:p-14">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  03 / Architecture
                </span>
                <h3 className="mt-4 font-heading text-3xl tracking-[-0.04em] sm:text-5xl">
                  Product → platform
                </h3>
              </div>

              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                {pinned !== null
                  ? "Pinned · click again to release"
                  : "Hover or click a node"}
              </span>
            </div>

            <div className="mt-14 grid gap-3 md:grid-cols-[1fr_auto_1.2fr_auto_1fr] md:items-center">
              {nodes.map((node, i) => (
                <FlowItem
                  key={node.title}
                  node={node}
                  index={i}
                  active={activeNode === i}
                  pinned={pinned === i}
                  visible
                  onHover={() => pinned === null && setActiveNode(i)}
                  onClick={() => {
                    setActiveNode(i);
                    setPinned(pinned === i ? null : i);
                  }}
                  showConnector={i < nodes.length - 1}
                  connectorActive={activeNode === i || activeNode === i + 1}
                />
              ))}
            </div>

            {/* Detail panel (swaps with the active node) */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div
                key={`detail-${activeNode}`}
                className="dozo-swap border border-accent/40 bg-accent/[0.05] p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {current.number} / {current.title}
                </p>
                <p className="mt-2 text-sm text-foreground/85">
                  {current.detail}
                </p>
              </div>

              <div className="border border-border bg-background/70 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Realtime
                </p>
                <p className="mt-2 text-sm text-foreground/80">
                  WebSocket-based communication between platform actors.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ───────────────── FEATURES ───────────────── */}

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              04 / Features
            </span>
            <h3 className="mt-4 max-w-xs font-heading text-4xl tracking-[-0.05em] sm:text-5xl">
              Built around the workflow.
            </h3>
          </Reveal>

          <div className="grid border-l border-border">
            {features.map((feature, index) => {
              const open = openFeature === index;
              return (
                <Reveal key={feature.title} delay={index * 80}>
                  <div className="group relative border-b border-border">
                    <span
                      className={`absolute left-0 top-0 h-full w-0.5 origin-top bg-accent transition-transform duration-500 ${
                        open ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFeature(open ? -1 : index)}
                      onMouseEnter={() => setOpenFeature(index)}
                      className="flex w-full items-center justify-between px-5 py-5 text-left transition-colors hover:bg-surface sm:px-7"
                    >
                      <span className="flex items-center gap-5">
                        <span
                          className={`font-mono text-[10px] transition-colors ${
                            open ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <span
                          className={`text-sm transition-all duration-300 sm:text-base ${
                            open
                              ? "translate-x-1 text-foreground"
                              : "text-foreground/85"
                          }`}
                        >
                          {feature.title}
                        </span>
                      </span>

                      <span className="flex items-center gap-3">
                        <Check
                          size={15}
                          className={`text-accent transition-opacity ${open ? "opacity-100" : "opacity-40"}`}
                        />
                        <ChevronDown
                          size={15}
                          className={`text-muted-foreground transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl px-5 pb-5 pl-[3.75rem] text-sm leading-6 text-muted-foreground sm:px-7 sm:pl-[4.75rem]">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ───────────────── ROLE ───────────────── */}

        <div className="mt-20 border-y border-border py-10">
          <div className="grid gap-8 md:grid-cols-[0.5fr_1.5fr] md:items-start">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                05 / My role
              </span>
            </Reveal>

            <div>
              <Reveal delay={100}>
                <h3 className="max-w-3xl font-heading text-2xl leading-snug tracking-[-0.03em] sm:text-4xl">
                  Technical co-founder focused on product engineering and
                  platform architecture.
                </h3>
              </Reveal>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  "Built the web platform",
                  "Designed backend architecture",
                  "Worked across product & engineering",
                ].map((text, i) => (
                  <Reveal key={text} delay={200 + i * 100}>
                    <RoleItem text={text} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────── ENGINEERING ───────────────── */}

        <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              06 / Engineering
            </span>
            <h3 className="mt-4 max-w-lg font-heading text-4xl tracking-[-0.05em] sm:text-5xl">
              Decisions shaped by the product.
            </h3>
          </Reveal>

          <div className="border-t border-border">
            {engineering.map(([label, value], i) => (
              <Reveal key={label} delay={i * 70}>
                <div className="group relative grid cursor-default grid-cols-2 border-b border-border py-4 transition-all duration-300 hover:pl-3">
                  <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-accent">
                    {label}
                  </span>
                  <span className="text-sm text-foreground/80 transition-colors group-hover:text-foreground">
                    {value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ───────────────── FOOTER ───────────────── */}

        <Reveal className="mt-20">
          <div className="flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              A product experiment exploring how software can bring structure to
              fragmented local service markets.
            </p>

            <a
              href={dozo.links?.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground"
            >
              <span className="dozo-underline">Explore DOZO</span>
              <MoveUpRight
                size={14}
                className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────── SUBCOMPONENTS ───────────────── */

type NodeData = (typeof nodes)[number];

function FlowItem({
  node,
  index,
  active,
  pinned,
  visible,
  onHover,
  onClick,
  showConnector,
  connectorActive,
}: {
  node: NodeData;
  index: number;
  active: boolean;
  pinned: boolean;
  visible: boolean;
  onHover: () => void;
  onClick: () => void;
  showConnector: boolean;
  connectorActive: boolean;
}) {
  return (
    <>
      <button
        type="button"
        onMouseEnter={onHover}
        onFocus={onHover}
        onClick={onClick}
        aria-pressed={pinned}
        data-visible={visible}
        style={{ "--d": `${300 + index * 200}ms` } as CSSProperties}
        className={`reveal relative flex w-full flex-col items-stretch border p-5 text-left transition-all duration-300 sm:p-6 ${
          active
            ? "-translate-y-1 border-accent/60 bg-accent/[0.07] shadow-[0_0_40px_rgb(255_77_31/0.08)]"
            : "border-border bg-background/70 hover:border-foreground/30"
        }`}
      >
        <span className="flex w-full items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">
            {node.number}
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full bg-accent transition-opacity ${
              active ? "opacity-100 animate-pulse" : "opacity-0"
            }`}
          />
        </span>

        <span className="mt-8 font-heading text-xl tracking-[-0.03em]">
          {node.title}
        </span>

        <span className="mt-5 flex flex-col gap-2">
          {node.items.map((item, i) => (
            <span
              key={item}
              style={{ transitionDelay: active ? `${i * 40}ms` : "0ms" }}
              className={`font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                active
                  ? "translate-x-1 text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {active && <span className="mr-2 text-accent">›</span>}
              {item}
            </span>
          ))}
        </span>
      </button>

      {showConnector && <Connector active={connectorActive} />}
    </>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="hidden items-center justify-center md:flex">
      <div
        className={`relative h-px w-16 transition-colors duration-300 ${
          active ? "bg-accent" : "bg-border"
        }`}
      >
        <span
          className="packet-travel absolute top-1/2 h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
          style={{ animationDuration: active ? "0.9s" : "2.4s" }}
        />
        <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-accent" />
      </div>
    </div>
  );
}

function RoleItem({ text }: { text: string }) {
  return (
    <div className="group flex gap-3 border-l border-border pl-4 transition-colors duration-300 hover:border-accent">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent transition-transform duration-300 group-hover:rotate-45 group-hover:scale-125" />
      <span className="text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground">
        {text}
      </span>
    </div>
  );
}
