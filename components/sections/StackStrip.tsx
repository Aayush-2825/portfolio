export function StackStrip() {
  return (
    <section
      aria-label="Portfolio transition"
      className="relative border-y border-border bg-background"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-[1400px] items-center px-5 sm:px-8 lg:px-10">
        {/* Left index */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
            01
          </span>

          <span className="font-mono text-[9px] text-muted-foreground/40">
            /
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Systems
          </span>
        </div>

        {/* Main divider */}
        <div className="mx-5 h-px flex-1 bg-border sm:mx-8">
          <div className="h-px w-16 bg-accent" />
        </div>

        {/* Right metadata */}
        <div className="hidden shrink-0 items-center gap-5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:flex">
          <span>AI</span>
          <span className="text-border">×</span>
          <span>WEB</span>
          <span className="text-border">×</span>
          <span>SYSTEMS</span>
        </div>

        {/* Mobile indicator */}
        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            2026
          </span>
        </div>
      </div>
    </section>
  );
}