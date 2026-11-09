"use client";

import { Menu, ExternalLink, Terminal, Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SoundToggle } from "@/components/interactive/SoundToggle";
import { CommandPalette } from "@/components/interactive/CommandPalette";
import { profile } from "@/data/profile";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dozo-case-study", label: "DOZO" },
  { id: "projects",        label: "Work" },
  { id: "layer-map",       label: "Layer Map" },
  { id: "principles",      label: "Principles" },
  { id: "education",       label: "Education" },
  { id: "contact",         label: "Contact" },
] as const;

function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If at the very bottom, activate Contact
      if (scrollY + windowHeight >= documentHeight - 80) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 2. If at the top hero section
      if (scrollY < 180) {
        setActiveSection("");
        return;
      }

      // 3. Find current active section
      const targetY = scrollY + windowHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (targetY >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}

export function Nav({
  openTerminal,
}: {
  openTerminal?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <motion.header
      className={cn(
        "fixed left-1/2 top-3 z-40 w-[calc(100%-1.25rem)] max-w-6xl -translate-x-1/2 rounded-full border shadow-2xl backdrop-blur-md transition-all duration-500 overflow-hidden",
        scrolled
          ? "bg-[#0b0c0e]/95 border-border shadow-2xl"
          : "bg-surface/85 border-border/80 shadow-md",
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      {/* Subtle Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/40 via-accent to-accent/40 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="mx-auto flex h-14 w-full items-center justify-between px-3.5 sm:px-6">
        {/* Brand Home Link */}
        <a
          href="#top"
          data-cursor="TOP"
          onClick={() => sound.playClick(900)}
          className="group flex items-center gap-2.5 font-heading text-base sm:text-lg uppercase tracking-[-0.03em] text-foreground transition-all hover:text-accent"
          aria-label="Aayush Raj Home"
        >
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150 shadow-[0_0_8px_var(--accent)]" />
          <span className="font-semibold">Aayush Raj</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => sound.playClick(1100, 0.01)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative rounded-full px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center",
                  isActive
                    ? "font-semibold text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-active"
                    className="absolute inset-0 rounded-full bg-accent/15 border border-accent/40"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Tools: Sound Toggle, Cmd+K, Terminal, Mobile Sheet */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <SoundToggle />

          <CommandPalette openTerminal={openTerminal} />

          {/* Terminal Launcher Button */}
          <button
            type="button"
            data-cursor="TERMINAL"
            onClick={() => {
              sound.playClick(1200);
              openTerminal?.();
            }}
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-border/80 bg-surface/70 px-3 font-mono text-[11px] text-muted-foreground hover:border-accent/40 hover:text-foreground"
            title="Open CLI Terminal (Press `)"
          >
            <Terminal size={12} className="text-accent" />
            <span>CLI</span>
          </button>

          {/* Mobile Sheet Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
              onClick={() => {
                sound.playClick(900);
                setOpen(true);
              }}
            >
              <Menu size={18} className="pointer-events-none" />
            </button>

            <SheetContent
              side="right"
              className="flex w-[min(20rem,85vw)] flex-col bg-surface border-border"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="font-heading text-2xl text-left flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>Navigate</span>
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <SheetClose
                      key={item.id}
                      nativeButton={false}
                      render={
                        <a
                          href={`#${item.id}`}
                          onClick={() => sound.playClick(1000)}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex w-full items-center rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-wider transition-all",
                            isActive
                              ? "bg-accent/15 border border-accent/40 font-semibold text-accent"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        />
                      }
                    >
                      <span>{item.label}</span>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Mobile Actions in Sheet */}
              <div className="mt-auto space-y-3 pb-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-border/80 p-3 font-mono text-xs text-foreground hover:border-accent"
                >
                  <span className="flex items-center gap-2">
                    <Search size={14} className="text-accent" />
                    <span>Search & Quick Jump</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">⌘K</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openTerminal?.();
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-border/80 p-3 font-mono text-xs text-foreground hover:border-accent"
                >
                  <span className="flex items-center gap-2">
                    <Terminal size={14} className="text-accent" />
                    <span>Launch Terminal Shell</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">&gt;_</span>
                </button>

                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-between rounded-xl border border-border/80 p-3 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
