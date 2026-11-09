"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Terminal,
  FolderGit2,
  Cpu,
  Layers,
  GraduationCap,
  Mail,
  Volume2,
  ExternalLink,
  Copy,
  Check,
  X,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Actions" | "External";
  icon: typeof Search;
  action: () => void;
  shortcut?: string;
  badge?: string;
}

export function CommandPalette({
  openTerminal,
}: {
  openTerminal?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleCopyEmail = useCallback(() => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(profile.links.email || "aayush.ardy@gmail.com");
      setCopied(true);
      sound.playSuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const scrollTo = useCallback((id: string) => {
    sound.playClick(1000);
    close();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [close]);

  const items: CommandItem[] = [
    {
      id: "dozo",
      label: "DOZO Architecture & Live Simulation",
      category: "Navigation",
      icon: Cpu,
      action: () => scrollTo("dozo-case-study"),
      badge: "Flagship",
    },
    {
      id: "work",
      label: "Selected Work & Shipped Projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
      shortcut: "1",
    },
    {
      id: "layer-map",
      label: "Full-Stack System Layer Map",
      category: "Navigation",
      icon: Layers,
      action: () => scrollTo("layer-map"),
      shortcut: "2",
    },
    {
      id: "principles",
      label: "Engineering Principles & Code Lab",
      category: "Navigation",
      icon: Cpu,
      action: () => scrollTo("principles"),
      shortcut: "3",
    },
    {
      id: "skills",
      label: "Technical Stack Matrix",
      category: "Navigation",
      icon: Layers,
      action: () => scrollTo("skills"),
      shortcut: "4",
    },
    {
      id: "education",
      label: "Education & Credentials (NIT Hamirpur)",
      category: "Navigation",
      icon: GraduationCap,
      action: () => scrollTo("education"),
    },
    {
      id: "contact",
      label: "Get in Touch & Direct Mail",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
    },
    {
      id: "terminal",
      label: "Launch Interactive Developer Shell (CLI)",
      category: "Actions",
      icon: Terminal,
      action: () => {
        close();
        openTerminal?.();
      },
      shortcut: "`",
      badge: "CLI",
    },
    {
      id: "copy-email",
      label: copied ? "Copied to Clipboard!" : "Copy Email Address",
      category: "Actions",
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
      badge: profile.links.email || "aayush.ardy@gmail.com",
    },
    {
      id: "toggle-sound",
      label: "Toggle Synthesized Audio Feedback",
      category: "Actions",
      icon: Volume2,
      action: () => {
        sound.toggle();
        sound.playSuccess();
        close();
      },
    },
    {
      id: "github",
      label: "GitHub Profile",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open(profile.links.github, "_blank");
        close();
      },
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open(profile.links.linkedin, "_blank");
        close();
      },
    },
    {
      id: "repo-viewproof",
      label: "GitHub: Aayush-2825/viewproof",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/Aayush-2825/viewproof", "_blank");
        close();
      },
      badge: "ViewProof",
    },
    {
      id: "repo-pjmb",
      label: "GitHub: Aayush-2825/pjmb (Auth Microservice)",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/Aayush-2825/pjmb", "_blank");
        close();
      },
      badge: "Security",
    },
    {
      id: "repo-swabhimaan",
      label: "GitHub: Aayush-2825/Swabhimaan-2 (CMS Platform)",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/Aayush-2825/Swabhimaan-2", "_blank");
        close();
      },
      badge: "CMS",
    },
    {
      id: "repo-blog",
      label: "GitHub: Aayush-2825/blog (Technical Publications)",
      category: "External",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/Aayush-2825/blog", "_blank");
        close();
      },
      badge: "Blog",
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Key listeners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playClick(900);
        setOpen((prev) => !prev);
        return;
      }

      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        sound.playClick(900);
        setOpen(true);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.playClick(1400, 0.01);
        setSelectedIndex((i) => (i + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.playClick(1400, 0.01);
        setSelectedIndex((i) => (i - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, selectedIndex, close]);

  // Global custom event listener
  useEffect(() => {
    const handleOpenEvent = () => setOpen(true);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () => window.removeEventListener("open-command-palette", handleOpenEvent);
  }, []);

  return (
    <>
      {/* Search trigger button in navigation bar */}
      <button
        type="button"
        onClick={() => {
          sound.playClick(900);
          setOpen(true);
        }}
        className="inline-flex size-9 sm:h-9 sm:w-auto items-center justify-center sm:justify-start gap-2 rounded-full border border-border/80 bg-surface/70 px-0 sm:px-3 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:border-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
        aria-label="Open search and command palette"
        title="Search sections & commands (⌘K or /)"
      >
        <Search size={14} className="opacity-80 sm:opacity-70" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-block rounded border border-border/70 bg-background/80 px-1.5 py-0.5 text-[9px] text-muted-foreground font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-24 backdrop-blur-md bg-background/85"
          onClick={close}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0d12] shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <Search size={16} className="text-accent shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search sections, projects, or commands..."
                className="w-full bg-transparent font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground px-1 font-mono"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={close}
                className="rounded-full p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
                aria-label="Close command palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Touch Chips for Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-b border-white/[0.06] bg-[#08080a] text-[11px] select-none scrollbar-none">
              <span className="text-[10px] uppercase font-mono text-muted-foreground/60 shrink-0">Jump:</span>
              {[
                { label: "DOZO", target: "dozo-case-study" },
                { label: "Work", target: "projects" },
                { label: "Layer Map", target: "layer-map" },
                { label: "Principles", target: "principles" },
                { label: "Education", target: "education" },
                { label: "Contact", target: "contact" },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => scrollTo(chip.target)}
                  className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-foreground/80 hover:border-accent hover:text-accent font-mono text-[10px] transition-colors active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Command Results */}
            <div className="max-h-[55vh] sm:max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-muted-foreground">
                  No commands matching &quot;{query}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => item.action()}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors",
                          isSelected
                            ? "bg-accent/15 text-foreground font-medium border border-accent/40"
                            : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <Icon size={14} className={isSelected ? "text-accent" : "text-muted-foreground"} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.badge && (
                            <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-accent uppercase">
                              {item.badge}
                            </span>
                          )}
                          {item.shortcut && (
                            <kbd className="rounded border border-border/70 bg-background/80 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                              {item.shortcut}
                            </kbd>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#08080a] px-4 py-2 text-[10px] font-mono text-muted-foreground">
              <span className="hidden sm:inline">Use ↑↓ to navigate · Enter to select · Esc to close</span>
              <span className="sm:hidden">Tap any command or jump chip</span>
              <span>{filtered.length} actions</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
