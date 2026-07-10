import { Container, SectionHeading, TagPill, PrimaryButton } from "../components/ui";
import { experience, education, skillGroups, profile } from "../data/content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function About() {
  usePageTitle("About", profile.summary);
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="About" title="From trainee engineer to solo product builder" />
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{profile.summary}</p>
          <div className="mt-8">
            <PrimaryButton href="/resume.pdf" download>Download resume (PDF)</PrimaryButton>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Career log"
            title="Experience, in order"
            description="Ten years, seven roles, one throughline: own the system, not just the ticket."
          />

          <div className="relative border-l border-border pl-8 md:pl-10">
            {experience.map((role, i) => (
              <div key={role.role + role.period} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-phosphor bg-bg font-mono text-[10px] text-phosphor md:-left-[45px]">
                  {experience.length - i}
                </span>
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  {role.period} &middot; {role.duration}
                </p>
                <h3 className="mt-1.5 font-display text-xl text-ink md:text-2xl">{role.role}</h3>
                <p className="mt-0.5 text-sm text-copper">{role.company}</p>
                <ul className="mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mutedDim" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface/40">
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="Education" title="Education &amp; certifications" />
          <div className="grid gap-4 md:grid-cols-3">
            {education.map((e) => (
              <div key={e.title} className="border border-border bg-bg p-6">
                <p className="font-mono text-xs text-muted">{e.period}</p>
                <p className="mt-2 font-display text-lg text-ink">{e.title}</p>
                <p className="mt-1 text-sm text-muted">{e.org}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="Toolbox" title="Full skill set" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-copper">{group.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <TagPill key={item}>{item}</TagPill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
