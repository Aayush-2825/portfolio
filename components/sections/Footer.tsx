import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>{profile.name}</p>
        <p>{profile.title}</p>
        <p>{profile.tagline}</p>
        <nav aria-label="Footer links" className="flex gap-4">
          <a className="transition-colors hover:text-foreground" href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="transition-colors hover:text-foreground" href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
