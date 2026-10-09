import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Hero } from "@/components/sections/Hero";

function checkResume() {
  try {
    const resumePath = profile.links.resume?.replace(/^\//, "");
    if (!resumePath) return false;
    return existsSync(path.join(process.cwd(), "public", resumePath));
  } catch {
    return false;
  }
}

export default function Home() {
  const resumeAvailable = checkResume();

  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Page order: Hero → DOZO Case Study → Projects grid → Principles → Stack → Education → Contact */}
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Education />
        <Contact resumeAvailable={resumeAvailable} />
      </main>
      <Footer />
    </>
  );
}
