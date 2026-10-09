"use client";

import { Menu, ExternalLink } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "projects",  label: "Work" },
  { id: "about",     label: "Principles" },
  { id: "skills",    label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact",   label: "Contact" },
] as const;

function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If user is at or near the very bottom, activate Contact
      if (scrollY + windowHeight >= documentHeight - 80) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 2. If at the top hero section
      if (scrollY < 180) {
        setActiveSection("");
        return;
      }

      // 3. Find current active section based on viewport reading position (35% down)
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

export function Nav() {
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
        "fixed left-1/2 top-3 z-40 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-full border border-border shadow-lg backdrop-blur-md transition-all duration-500 overflow-hidden",
        scrolled
          ? "bg-surface/95 border-border shadow-xl"
          : "bg-surface/80 border-transparent shadow-none",
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      {/* Subtle Scroll Progress Track at bottom of Nav Pill */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/40 via-accent to-accent/40 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="mx-auto flex h-14 w-full items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2 font-heading text-lg uppercase tracking-[-0.03em] text-foreground transition-all hover:text-accent"
          aria-label="Aayush Raj home"
        >
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
          <span>Aayush Raj</span>
        </a>

        {/* Desktop / Tablet Navigation (active from md up) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative rounded-full px-4 py-1.5 text-xs sm:text-sm transition-all duration-300 flex items-center",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent/10 border border-accent/25"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions & Mobile Menu */}
        <div className="flex items-center gap-4">
          <a
            href={profile.links.github}
            className="hidden h-10 items-center justify-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface md:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={20} className="pointer-events-none" />
            </button>

            <SheetContent
              side="right"
              className="flex w-[min(20rem,85vw)] flex-col"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="font-heading text-2xl text-left">
                  Navigate
                </SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <SheetClose
                      key={item.id}
                      nativeButton={false}
                      render={
                        <a
                          href={`#${item.id}`}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex w-full items-center rounded-lg px-4 py-3 text-base transition-all",
                            isActive
                              ? "bg-accent/15 border border-accent/30 font-medium text-accent"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        />
                      }
                    >
                      <span className="font-medium">{item.label}</span>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* GitHub link inside the mobile sheet */}
              <div className="mt-auto pb-4">
                <SheetClose
                  nativeButton={false}
                  render={
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    />
                  }
                >
                  <span className="flex items-center gap-2">GitHub</span>
                  <ExternalLink size={18} className="opacity-50" />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
