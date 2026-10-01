import { AboutEngineering } from "@/components/sections/AboutEngineering";
import { Contact } from "@/components/sections/Contact";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { Education } from "@/components/sections/Education";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Skills } from "@/components/sections/Skills";
import { StackStrip } from "@/components/sections/StackStrip";
import { Hero } from "@/components/sections/Hero";
import { ExperienceRecognition } from "@/components/sections/ExperienceRecognition";
import DozoFeature from "@/components/sections/DozoFeature";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackStrip />
        <SelectedWork />
        <DozoFeature />
        <OtherProjects />
        <AboutEngineering />
        <Skills />
        <CurrentlyExploring />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
