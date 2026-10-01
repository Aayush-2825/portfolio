"use client";

import { Menu, ExternalLink } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

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
  { id: "selected-work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = ["top", ...sectionIds]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.1, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

export function Nav() {
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="fixed left-1/2 top-3 z-40 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-full border border-border bg-surface/90 shadow-lg backdrop-blur-sm transition-all duration-300">
      <div className="mx-auto flex h-14 w-full items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="font-heading text-lg uppercase tracking-[-0.03em] text-foreground transition-opacity hover:opacity-80"
          aria-label="Aayush Raj home"
        >
          Aayush Raj
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
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
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
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
                            "flex w-full items-center rounded-lg px-4 py-3 text-lg transition-all",
                            isActive
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Added GitHub link inside the mobile sheet for better mobile UX */}
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
    </header>
  );
}
