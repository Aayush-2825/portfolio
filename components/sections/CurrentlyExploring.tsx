import { exploring } from "@/data/exploring";
import { ScrollVelocityFallback } from "@/components/v2/ScrollVelocityFallback";

export function CurrentlyExploring() {
  return (
    <section id="exploring" aria-labelledby="exploring-title" className="border-t border-border bg-secondary">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 border-b border-border pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-accent">09</span>
              <span className="h-px w-8 bg-border" />
              Currently exploring
            </p>
            <h2 id="exploring-title" className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.045em] text-foreground">
              Still <span className="text-muted-foreground">learning.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground sm:text-right">
            The questions and tools currently shaping the next layer of the work.
          </p>
        </header>
        <div className="border-y border-border py-6 sm:py-8">
          <ScrollVelocityFallback items={exploring} />
        </div>
      </div>
    </section>
  );
}
