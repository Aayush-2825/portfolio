"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { sound } from "@/lib/sound";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "success" | "system";
  text: string;
}

export function TerminalDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "Antigravity Engineering Shell [v2.4.0-production]",
    },
    {
      id: "init-2",
      type: "system",
      text: "Connected to aayush@nit-hamirpur (NIT Hamirpur, India · IST)",
    },
    {
      id: "init-3",
      type: "output",
      text: "Type 'help' to inspect available system commands or 'projects' to review shipped work.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      lenis?.stop();

      return () => {
        document.body.style.overflow = originalOverflow;
        lenis?.start();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const lineId = String(Date.now());

      setHistory((prev) => [
        ...prev,
        { id: `in-${lineId}`, type: "input", text: `aayush@portfolio:~$ ${cmd}` },
      ]);

      if (cmd.trim()) {
        setCommandHistory((prev) => [...prev, cmd.trim()]);
        setHistoryIndex(-1);
      }

      sound.playClick(1100, 0.02);

      if (!trimmed) {
        return;
      }

      switch (trimmed) {
        case "help":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "output",
              text: [
                "AVAILABLE SYSTEM COMMANDS:",
                "  whoami       - Display developer summary and role credentials",
                "  projects     - List shipped production platforms and research",
                "  github       - Show verified public repositories under Aayush-2825",
                "  dozo         - Deep-dive into DOZO (on-demand domestic services startup)",
                "  viewproof    - Inspect ViewProof (real-time photo proofing & watermark engine)",
                "  pjmb         - Inspect pjmb Auth Backend (rotating token families & 2FA)",
                "  swabhimaan   - Inspect Swabhimaan-2 (embedded Payload CMS & Cloudflare R2)",
                "  blog         - Inspect Engineering Blog (Prisma 6.6 & PostgreSQL relations)",
                "  stack        - Breakdown of full-stack engineering layers",
                "  simulate     - Jump to live real-time booking dispatch simulator",
                "  contact      - Display contact links and direct mail address",
                "  sudo hire    - Execute hiring sequence for 2026 roles",
                "  clear        - Clear console output history",
                "  exit         - Close developer terminal shell",
              ].join("\n"),
            },
          ]);
          break;

        case "whoami":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "output",
              text: `${profile.name} — ${profile.title}\n${profile.tagline}\nInstitution: ${profile.education.institution}\nProgram: ${profile.education.program} (CGPA: ${profile.education.cgpa})\nSummary: ${profile.summary}`,
            },
          ]);
          break;

        case "projects":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "output",
              text: projects
                .map(
                  (p, i) =>
                    `[0${i + 1}] ${p.name.padEnd(26)} [${p.status.padEnd(11)}] -> ${p.stack.slice(0, 4).join(", ")}`
                )
                .join("\n"),
            },
          ]);
          break;

        case "github":
        case "repos":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "VERIFIED GITHUB REPOSITORIES (https://github.com/Aayush-2825):",
                "  • Aayush-2825/viewproof     - Photographer-client photo proofing & real-time approval platform",
                "  • Aayush-2825/pjmb          - Production authentication engine with rotating refresh tokens & 2FA",
                "  • Aayush-2825/Swabhimaan-2  - High-performance editorial CMS publishing platform on React 19",
                "  • Aayush-2825/blog          - Developer publication & systems engineering notes",
              ].join("\n"),
            },
          ]);
          break;

        case "dozo":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "DOZO · ON-DEMAND LOCAL SERVICES PLATFORM",
                "Role: Technical Co-founder",
                "Incubation: 3-month pre-incubation at NIT Hamirpur",
                "Stack: Fastify 5, Drizzle ORM, PostgreSQL, Redis, WebSockets, Docker, Turborepo",
                "Realtime Architecture: WebSocket bi-directional state machine dispatching verified helpers for domestic services.",
                "Live link: https://dozo.work",
                "GitHub:    https://github.com/Aayush-2825/dozo",
              ].join("\n"),
            },
          ]);
          break;

        case "viewproof":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "VIEWPROOF · REAL-TIME CLIENT PROOFING & WATERMARKING",
                "Stack: React 19, React Router 7, Vite 7, Firebase 12 Firestore, Cloudinary, Tailwind v4",
                "Architecture: Firestore onSnapshot reactive document sync + Cloudinary on-the-fly watermarking pipeline (l_watermark_logo,g_center,opacity_40)",
                "Live App:   https://view-proof.vercel.app",
                "GitHub:     https://github.com/Aayush-2825/ViewProof",
                "DEV.to:     https://dev.to/aayush2825/building-viewproof-real-time-photo-proofing-with-react-19-and-firestore",
              ].join("\n"),
            },
          ]);
          break;

        case "pjmb":
        case "auth":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "PJMB · PRODUCTION AUTH & THREAT MITIGATION BACKEND",
                "Stack: Express 5, MongoDB Mongoose, TypeScript, Passport.js, Speakeasy TOTP, Zod, Helmet, Winston",
                "Key Invariants:",
                "  • Rotating refresh token families with automatic replay attack revocation",
                "  • Speakeasy TOTP 2FA verification + single-use emergency recovery codes",
                "  • 10-minute brute-force lockout after 5 consecutive failed attempts",
                "  • Tiered token-bucket rate limits + Winston daily-rotate audit logging",
                "GitHub: https://github.com/Aayush-2825/pjmb",
              ].join("\n"),
            },
          ]);
          break;

        case "swabhimaan":
        case "cms":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "SWABHIMAAN-2 · EMBEDDED PAYLOAD CMS & ZERO-EGRESS MEDIA",
                "Stack: Next.js 15.5.9 Turbopack, React 19, Payload CMS 3.64, Lexical Editor, MongoDB Atlas, Cloudflare R2",
                "Key Invariants:",
                "  • 13 structured collections (Periodicals, Posts, Media, Forms, Pages, Users, etc.)",
                "  • Zero-egress Cloudflare R2 object storage with server-side Sharp responsive WebP generation",
                "  • Sub-35ms TTFB via Next.js ISR on-demand webhook cache purging",
                "Live Platform: https://swabhimaan-2.vercel.app",
                "GitHub:        https://github.com/Aayush-2825/Swabhimaan-2",
              ].join("\n"),
            },
          ]);
          break;

        case "blog":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "ENGINEERING BLOG · RELATIONAL SYSTEMS ARCHITECTURE",
                "Stack: Next.js 15.3, React 19, Prisma ORM 6.6, PostgreSQL, Kinde Auth OAuth, Tailwind v4",
                "Key Invariants:",
                "  • Relational schema: User -> Post (1:N), Post <-> Tag (M:N), Post -> Telemetry (1:1)",
                "  • PostgreSQL UUID primary keys with single-roundtrip Prisma client relations",
                "  • Kinde Auth OAuth session protection on authoring and publishing endpoints",
                "  • Static site generation delivering sub-20ms TTFB across articles",
                "GitHub: https://github.com/Aayush-2825/blog",
              ].join("\n"),
            },
          ]);
          break;

        case "stack":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "output",
              text: [
                "ENGINEERING LAYERS:",
                "  Client:   Next.js 16, React 19, Tailwind CSS v4, Motion, Lenis",
                "  Backend:  Node.js, Express, REST APIs, WebSockets, Zod validation",
                "  Data:     PostgreSQL, Drizzle ORM, Redis Pub/Sub, MongoDB, Firestore",
                "  Security: JWT rotation, OAuth (Google), 2FA, Helmet, Rate Limiting",
                "  DevOps:   Docker, Turborepo, Cloudflare R2, Vercel",
              ].join("\n"),
            },
          ]);
          break;

        case "simulate":
          onClose();
          const target = document.getElementById("dozo-case-study");
          if (target) target.scrollIntoView({ behavior: "smooth" });
          break;

        case "contact":
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: `Email:    ${profile.links.email}\nGitHub:   ${profile.links.github}\nLinkedIn: ${profile.links.linkedin}\nStatus:   Open to remote internships, 2026`,
            },
          ]);
          break;

        case "sudo hire":
        case "sudo hire aayush":
        case "hire":
          sound.playSuccess();
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "success",
              text: [
                "============================================================",
                "ACCESS GRANTED: HIRING PROTOCOL ENGAGED",
                "Candidate: Aayush Raj (NIT Hamirpur, CS Dual Degree)",
                "Availability: Remote Full-Stack / Backend Internships (2026)",
                "Emailing: aayush.ardy@gmail.com ...",
                "============================================================",
              ].join("\n"),
            },
          ]);
          setTimeout(() => {
            window.location.href = `mailto:${profile.links.email}?subject=Internship%20/%20Engineering%20Role%20Discussion`;
          }, 800);
          break;

        case "clear":
          setHistory([]);
          break;

        case "exit":
        case "quit":
          onClose();
          break;

        default:
          setHistory((prev) => [
            ...prev,
            {
              id: `out-${lineId}`,
              type: "error",
              text: `command not found: "${trimmed}". Type 'help' for valid options.`,
            },
          ]);
          break;
      }
    },
    [onClose]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  const VALID_COMMANDS = [
    "help",
    "whoami",
    "projects",
    "github",
    "repos",
    "dozo",
    "viewproof",
    "pjmb",
    "auth",
    "swabhimaan",
    "cms",
    "blog",
    "stack",
    "simulate",
    "contact",
    "sudo hire",
    "clear",
    "exit",
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      sound.playClick(1400, 0.01);
      const current = input.trim().toLowerCase();
      if (current) {
        const match = VALID_COMMANDS.find((cmd) => cmd.startsWith(current));
        if (match) {
          setInput(match);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Shell Terminal"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-background/80 overscroll-contain"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className={cn(
          "flex flex-col overflow-hidden rounded-xl border border-border/90 bg-[#070709] shadow-2xl font-mono text-xs transition-all duration-300 overscroll-contain",
          isMaximized
            ? "fixed inset-2 sm:inset-6"
            : "w-full max-w-2xl h-[82vh] sm:h-[520px] max-h-[92vh]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Chrome Title Bar */}
        <div className="flex h-10 items-center justify-between border-b border-border/80 bg-surface/90 px-4 shrink-0 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block cursor-pointer hover:opacity-80" onClick={onClose} />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setIsMaximized(!isMaximized)} />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block cursor-pointer" />
            </div>
            <span className="ml-3 font-mono text-[11px] text-muted-foreground truncate">
              aayush@nit-hamirpur: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="inline-flex h-7 w-7 min-h-7 min-w-7 items-center justify-center rounded text-muted-foreground hover:bg-white/10 hover:text-foreground shrink-0 transition-colors"
              aria-label={isMaximized ? "Restore terminal window" : "Maximize terminal window"}
            >
              {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 min-h-7 min-w-7 items-center justify-center rounded text-muted-foreground hover:bg-white/10 hover:text-foreground shrink-0 transition-colors"
              aria-label="Close terminal window"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Console Output Area */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-2 select-text leading-relaxed">
          {history.map((line) => {
            if (line.type === "input") {
              return (
                <div key={line.id} className="text-foreground font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === "system") {
              return (
                <div key={line.id} className="text-muted-foreground/70 text-[11px]">
                  {line.text}
                </div>
              );
            }
            if (line.type === "error") {
              return (
                <div key={line.id} className="text-red-400 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            if (line.type === "success") {
              return (
                <div key={line.id} className="text-emerald-400 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-foreground/80 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Suggestions (Touch-friendly for mobile/tablet) */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-border/50 bg-[#060608] text-[11px] select-none">
          <span className="text-muted-foreground/60 shrink-0 text-[10px] uppercase tracking-wider">Quick:</span>
          {["whoami", "projects", "github", "dozo", "viewproof", "pjmb", "swabhimaan", "blog", "stack", "simulate", "contact", "sudo hire", "clear"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => {
                handleCommand(cmd);
              }}
              className="shrink-0 rounded border border-border/60 bg-surface/80 px-2.5 py-1 text-foreground/80 hover:border-accent hover:text-accent transition-colors active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Prompt */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border/70 bg-surface/50 px-4 py-3 shrink-0"
        >
          <span className="text-accent font-bold">aayush@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              sound.playClick(1500, 0.005);
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or command (Tab to autocomplete)..."
            className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1 text-muted-foreground hover:text-accent"
            aria-label="Send terminal command"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
