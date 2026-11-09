"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import { profile } from "@/data/profile";
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  FileDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { CornerCrosshairs } from "@/components/ui/CornerCrosshairs";
import { Magnetic } from "@/components/interactive/Magnetic";

export function Contact({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const email = profile.links.email || "aayush.ardy@gmail.com";

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      sound.playSuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick(1200);
    const sub = encodeURIComponent(subject || "Full-Stack Internship Opportunity 2026");
    const body = encodeURIComponent(message || `Hi Aayush,\n\nI reviewed your portfolio and would like to connect regarding an engineering role.`);
    window.location.href = `mailto:${email}?subject=${sub}&body=${body}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-border bg-background py-24 sm:py-32"
    >
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-accent/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl border border-border/80 bg-surface/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          <CornerCrosshairs />
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left: Pitch & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  Get in Touch
                </span>
                <span className="h-px w-8 bg-border" />
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for 2026 Remote Internships</span>
                </span>
              </div>

              <h2
                id="contact-title"
                className="font-heading text-4xl sm:text-6xl font-semibold uppercase tracking-[-0.03em] text-foreground leading-[1.05]"
              >
                Let&apos;s build something <span className="text-accent underline decoration-accent/30 underline-offset-8">deliberate</span>.
              </h2>

              <p className="text-base text-foreground/80 leading-relaxed max-w-lg">
                I am actively interviewing for 2026 remote full-stack, backend, and product engineering internships. Open to discussing startup ventures, distributed systems challenges, and contract work.
              </p>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                <div className="rounded-xl border border-border/70 bg-background/80 p-3.5">
                  <span className="text-[10px] text-muted-foreground uppercase block">Location / Zone</span>
                  <span className="text-foreground font-semibold mt-1 block">India (IST / UTC+5:30)</span>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/80 p-3.5">
                  <span className="text-[10px] text-muted-foreground uppercase block">Response Time</span>
                  <span className="text-emerald-400 font-semibold mt-1 block">&lt; 24 hours</span>
                </div>
              </div>

              {/* Direct Copy Email Box */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    data-cursor="COPY"
                    onClick={handleCopyEmail}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-accent/50 bg-accent/10 px-5 py-2.5 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-background active:scale-95"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied to Clipboard!" : email}</span>
                  </button>
                </Magnetic>

                <a
                  href={`mailto:${email}`}
                  data-cursor="MAIL"
                  onClick={() => sound.playClick(1200)}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-5 py-2.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={14} />
                  <span>Open Email Client</span>
                  <ArrowUpRight size={12} className="opacity-70" />
                </a>

                {resumeAvailable && (
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="RESUME"
                    onClick={() => sound.playClick(1100)}
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-5 py-2.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <FileDown size={14} />
                    <span>View Resume</span>
                    <ArrowUpRight size={12} className="opacity-70" />
                  </a>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-4">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick(1000)}
                  className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                  <ArrowUpRight size={11} className="opacity-60" />
                </a>

                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick(1000)}
                  className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} className="opacity-60" />
                </a>
              </div>
            </div>

            {/* Right: Quick Direct Composer */}
            <div className="lg:col-span-6 rounded-2xl border border-border/80 bg-background/90 p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  Quick Message Composer
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">Direct Dispatch</span>
              </div>

              <form onSubmit={handleSendMail} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="msg-subject" className="font-mono text-[11px] uppercase text-muted-foreground block mb-1.5">
                    Subject / Project
                  </label>
                  <input
                    id="msg-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Software Engineering Internship Opportunity"
                    className="w-full rounded-xl border border-border/80 bg-surface/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="msg-content" className="font-mono text-[11px] uppercase text-muted-foreground block mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    id="msg-content"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, team role, or collaboration idea..."
                    className="w-full rounded-xl border border-border/80 bg-surface/80 p-4 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-sans leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-mono text-xs font-semibold text-background transition-all hover:bg-accent/90 shadow-[0_0_20px_rgba(255,77,31,0.25)] hover:shadow-[0_0_25px_rgba(255,77,31,0.4)]"
                >
                  <Send size={14} />
                  <span>Send Message via Email</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
