import { aiML } from "@/data/skills";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { TracingBeamFallback } from "@/components/v2/TracingBeamFallback";

const dozo = projects.find((project) => project.slug === "dozo");
const preIncubation = dozo?.highlights?.find((item) => !item.includes("TODO(aayush)"));
const machineLearningSpecialization = aiML.completed.find(
  (item) => !item.name.includes("TODO(aayush)"),
);

export function ExperienceRecognition() {
  const entries = [
    dozo?.role && { label: dozo.role, detail: dozo.name },
    preIncubation && { label: preIncubation, detail: "NIT Hamirpur" },
    profile.achievements.find((item) => item.includes("Reliance Foundation")) && {
      label: profile.achievements.find((item) => item.includes("Reliance Foundation")),
      detail: "Recognition",
    },
    machineLearningSpecialization && {
      label: machineLearningSpecialization.name,
      detail: machineLearningSpecialization.provider,
    },
  ].filter((entry): entry is { label: string; detail: string } => Boolean(entry));

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 border-b border-border pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-accent">10</span>
              <span className="h-px w-8 bg-border" />
              Experience and recognition
            </p>
            <h2 id="experience-title" className="max-w-3xl font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.045em] text-foreground">
              Evidence <span className="text-muted-foreground">over claims.</span>
            </h2>
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
            {String(entries.length).padStart(2, "0")} records
          </span>
        </header>
        <TracingBeamFallback>
          <ol className="grid border-y border-border">
            {entries.map((entry, index) => (
              <li key={`${entry.label}-${index}`} className="grid gap-3 border-b border-border py-6 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6 sm:py-7">
                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-medium text-foreground sm:text-lg">{entry.label}</h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </TracingBeamFallback>
      </div>
    </section>
  );
}
