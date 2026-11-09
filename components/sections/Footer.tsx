"use client";

import { profile } from "@/data/profile";
import { sound } from "@/lib/sound";
import { ArrowUp, Terminal } from "lucide-react";

export function Footer({
  openTerminal,
}: {
  openTerminal?: () => void;
}) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    sound.playClick(1400);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-[#060608] py-8 text-xs font-mono text-muted-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-foreground font-semibold">
              {profile.name}
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>{profile.title}</span>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-accent">{profile.tagline}</span>
          </div>

          <button
            type="button"
            data-cursor="TOP"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/80 px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-accent hover:text-accent"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground/70">
            <span>© {year} Aayush Raj. All rights reserved.</span>
            <span>·</span>
            <span>NIT Hamirpur, India</span>
            <span>·</span>
            <button
              type="button"
              data-cursor="TERMINAL"
              onClick={() => {
                sound.playClick(1100);
                openTerminal?.();
              }}
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              <Terminal size={11} />
              <span>Developer CLI</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB"
              onClick={() => sound.playClick(1000)}
              className="text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="LINKEDIN"
              onClick={() => sound.playClick(1000)}
              className="text-muted-foreground hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              data-cursor="MAIL"
              onClick={() => sound.playClick(1000)}
              className="text-muted-foreground hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
