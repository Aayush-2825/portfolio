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
    <section id="experience" aria-labelledby="experience-title" className="border-t">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase text-muted-foreground">Experience and Recognition</p>
          <h2 id="experience-title" className="font-heading text-4xl text-foreground sm:text-5xl">
            Experience and Recognition
          </h2>
        </header>
        <TracingBeamFallback>
          <ol className="grid gap-8">
            {entries.map((entry, index) => (
              <li key={`${entry.label}-${index}`} className="grid gap-2 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-5">
                <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-medium text-foreground">{entry.label}</h3>
                <p className="font-mono text-xs uppercase text-muted">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </TracingBeamFallback>
      </div>
    </section>
  );
}
