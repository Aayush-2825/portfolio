import { existsSync } from "node:fs";
import path from "node:path";

import { profile } from "@/data/profile";
import { MagnetFallback } from "@/components/v2/MagnetFallback";
import { TextHoverFallback } from "@/components/v2/TextHoverFallback";

function hasResume() {
  const resumePath = profile.links.resume.replace(/^\//, "");
  return Boolean(resumePath) && existsSync(path.join(process.cwd(), "public", resumePath));
}

export function Contact() {
  const resumeAvailable = hasResume();

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="mb-3 font-mono text-xs uppercase text-primary-foreground/70">Contact</p>
          <h2 id="contact-title" className="font-heading text-5xl sm:text-7xl">
            <TextHoverFallback>{profile.name}</TextHoverFallback>
          </h2>
        </div>
        <nav aria-label="Contact links" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <MagnetFallback><a className="underline underline-offset-4 transition-colors hover:text-primary-foreground" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></MagnetFallback>
          <MagnetFallback><a className="underline underline-offset-4 transition-colors hover:text-primary-foreground" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></MagnetFallback>
          {resumeAvailable ? (
            <MagnetFallback><a className="underline underline-offset-4 transition-colors hover:text-primary-foreground" href={profile.links.resume}>Resume</a></MagnetFallback>
          ) : null}
          {profile.links.email ? (
            <MagnetFallback><a className="underline underline-offset-4 transition-colors hover:text-primary-foreground" href={`mailto:${profile.links.email}`}>Email</a></MagnetFallback>
          ) : null}
        </nav>
      </div>
    </section>
  );
}
