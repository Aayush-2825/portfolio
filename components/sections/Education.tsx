import { profile } from "@/data/profile";
import { NumberTickerFallback } from "@/components/v2/NumberTickerFallback";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="border-y border-border py-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-3 font-mono text-xs uppercase text-muted-foreground">Education</p>
              <h2 id="education-title" className="font-heading text-4xl text-foreground sm:text-5xl">
                {profile.education.institution}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{profile.education.program}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Expected graduation</dt>
                  <dd className="mt-1 text-foreground">{profile.education.expectedGraduation}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase text-muted-foreground">CGPA</dt>
                  <dd className="mt-1 font-heading text-4xl text-foreground"><NumberTickerFallback value={profile.education.cgpa} /></dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Class 12</dt>
                  <dd className="mt-1 font-heading text-4xl text-foreground"><NumberTickerFallback value={profile.education.class12} /></dd>
                </div>
              </dl>
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">Recognition</p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-foreground">
                  {profile.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
