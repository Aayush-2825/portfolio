"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { DozoShowcase } from "@/components/sections/DozoShowcase";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { LayerMatrix } from "@/components/sections/LayerMatrix";
import { PrinciplesLab } from "@/components/sections/PrinciplesLab";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { TerminalDrawer } from "@/components/interactive/TerminalDrawer";
import { Preloader } from "@/components/interactive/Preloader";
import { InfiniteMarquee } from "@/components/interactive/InfiniteMarquee";
import { ConsoleEasterEgg } from "@/components/interactive/ConsoleEasterEgg";
import { PageScrollNarrative } from "@/components/interactive/PageScrollNarrative";
import { sound } from "@/lib/sound";

export function PortfolioShell({
  resumeAvailable = false,
}: {
  resumeAvailable?: boolean;
}) {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global key listener for terminal toggle (` key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        sound.playClick(1300);
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* 0. Cinematic System Boot Sequence */}
      <Preloader />

      {/* 0. Developer Console Easter Egg */}
      <ConsoleEasterEgg openTerminal={() => setTerminalOpen(true)} />

      {/* Top Navigation */}
      <Nav openTerminal={() => setTerminalOpen(true)} />

      {/* Blueprint Dynamic Page Scroll Narrative & Progress Rail */}
      <PageScrollNarrative />

      <main id="main-content" className="relative z-10">
        {/* 1. Hero with Live Telemetry & Interactive Architecture Canvas */}
        <Hero openTerminal={() => setTerminalOpen(true)} />

        {/* Dynamic Velocity Ticker */}
        <InfiniteMarquee speed={32} />

        {/* 2. Flagship DOZO Case Study & Dispatch Simulator */}
        <DozoShowcase />

        {/* 3. Selected Work & Research Index with Detail Inspector */}
        <ProjectsGrid />

        {/* 4. Full-Stack Systems Layer Map */}
        <LayerMatrix />

        {/* 5. Engineering Principles & Code Comparison Lab */}
        <PrinciplesLab />

        {/* 6. Technical Stack Matrix */}
        <Skills />

        {/* 7. Academic Rigor, NIT Hamirpur & Honors */}
        <Education />

        {/* Secondary Ticker */}
        <InfiniteMarquee
          speed={36}
          direction="right"
          items={[
            "OPEN FOR 2026 INTERNSHIPS",
            "REMOTE / HYBRID ROLES",
            "BACKEND & FULL-STACK ENGINEERING",
            "DISTRIBUTED SYSTEMS",
            "RELIANCE FOUNDATION SCHOLAR",
            "HIGH-SCALE SYSTEM DESIGN",
          ]}
        />

        {/* 8. Contact & Direct Message Composer */}
        <Contact resumeAvailable={resumeAvailable} />
      </main>

      {/* 9. Utility Footer with System Telemetry */}
      <Footer openTerminal={() => setTerminalOpen(true)} />

      {/* 10. Developer Terminal Shell */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => {
          sound.playClick(800);
          setTerminalOpen(false);
        }}
      />
    </>
  );
}
