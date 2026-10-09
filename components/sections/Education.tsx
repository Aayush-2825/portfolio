import { GraduationCap, Calendar, Award } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeader, StaggerReveal, BackgroundGrid } from "@/components/ui/shared";

export function Education() {
  const achievements = profile.achievements.filter(
    (a) => !a.includes("TODO(aayush)")
  );

  const scores = [
    { label: "CGPA", value: profile.education.cgpa, sub: "/ 10.0" },
    { label: "Class 12", value: profile.education.class12, sub: "Science & Maths" },
  ];

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative overflow-x-clip border-t border-border bg-secondary py-20 sm:py-32"
    >
      <BackgroundGrid opacity={0.2} />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Education"
          title="Education."
          description="Academic context behind the systems and product work."
        />

        <StaggerReveal index={0}>
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/90 shadow-lg">

            {/* Top band — institution */}
            <div className="flex flex-col gap-6 border-b border-border/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              {/* Left: name + degree */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-xl leading-snug text-foreground sm:text-2xl">
                    {profile.education.institution}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profile.education.program}
                  </p>
                </div>
              </div>

              {/* Right: graduation year */}
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-4 py-2 self-start sm:self-center shrink-0">
                <Calendar size={13} className="text-accent" />
                <span className="font-mono text-xs text-muted-foreground">
                  Graduating {profile.education.expectedGraduation}
                </span>
              </div>
            </div>

            {/* Middle band — scores */}
            <div className="grid grid-cols-2 divide-x divide-border/60 border-b border-border/60">
              {scores.map(({ label, value, sub }) => (
                <div key={label} className="flex flex-col items-center justify-center gap-1 px-6 py-6 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
                    {value}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>

            {/* Bottom band — recognitions */}
            {achievements.length > 0 && (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={14} className="text-accent" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Recognitions
                  </p>
                </div>
                <ul className="space-y-2">
                  {achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-center gap-3 text-sm text-foreground/90"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                        aria-hidden="true"
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
