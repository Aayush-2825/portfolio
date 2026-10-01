import { exploring } from "@/data/exploring";
import { ScrollVelocityFallback } from "@/components/v2/ScrollVelocityFallback";

export function CurrentlyExploring() {
  return (
    <section id="exploring" aria-labelledby="exploring-title" className="border-t bg-secondary">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-muted-foreground">Currently Exploring</p>
            <h2 id="exploring-title" className="font-heading text-4xl text-foreground sm:text-5xl">
              Currently Exploring
            </h2>
          </div>
          <ScrollVelocityFallback items={exploring} />
        </div>
      </div>
    </section>
  );
}
