import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-6 sm:px-8 lg:px-12 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-xs text-muted-foreground">
            {profile.name} · {year}
          </span>
        </div>

        <nav aria-label="Footer links" className="flex items-center gap-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          {profile.links.email && (
            <a
              href={`mailto:${profile.links.email}`}
              aria-label={`Send email to ${profile.links.email}`}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
