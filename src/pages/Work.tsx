import { Container, SectionHeading, TagPill } from "../components/ui";
import ProjectCard from "../components/ProjectCard";
import { projects, portfolioProjects } from "../data/content";

export default function Work() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Work"
            title="Products I've designed, built, and shipped"
            description="The four below are things I own end to end: architecture, infrastructure, and product decisions. Client and contract work follows further down."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Client &amp; contract work"
            title="Enterprise and client systems"
            description="Delivered for banking, manufacturing, events, property management, and services clients across Sri Lanka and Australia."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group block border border-border bg-surface p-6 transition-colors hover:border-copper/60"
              >
                <h3 className="font-display text-lg text-ink group-hover:text-copper">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <TagPill key={s}>{s}</TagPill>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
