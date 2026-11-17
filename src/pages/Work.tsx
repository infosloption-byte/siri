import { ArrowUpRight, Code } from "lucide-react";
import { Container, SectionHeading, TagPill } from "../components/ui";
import ProjectCard from "../components/ProjectCard";
import { projects, portfolioProjects, publicRepositories, type RepositoryGroup } from "../data/content";
import { usePageTitle } from "../hooks/usePageTitle";

const repositoryGroups: RepositoryGroup[] = [
  "AI & developer tools",
  "Platforms & products",
  "Client & business sites",
  "Creative & portfolio",
];

export default function Work() {
  usePageTitle("Work", "Selected products, client projects, and public GitHub code repositories.");

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Work"
            title="Products I've designed and built"
            description="Explore the case studies below, or open their source repositories on GitHub. Code links replace unavailable self-hosted project demos."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Client & contract work"
            title="Enterprise and client systems"
            description="Projects delivered across banking, events, property management, and services. Source links appear only where a corresponding public repository is available."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((p) => (
              <div key={p.name} className="border border-border bg-surface p-6">
                <h3 className="font-display text-lg text-ink">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <TagPill key={s}>{s}</TagPill>
                  ))}
                </div>
                {p.sourceNote && <p className="mt-4 text-xs leading-relaxed text-muted">{p.sourceNote}</p>}
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-copper hover:text-phosphor"
                  >
                    <Code size={15} />
                    {p.sourceLabel ?? "View code on GitHub"}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <p className="mt-5 font-mono text-xs text-mutedDim">Public source not available</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="GitHub"
            title="Public code repositories"
            description={`Explore all ${publicRepositories.length} public repositories on my GitHub profile. Links open the code directly; repository availability does not imply a live hosted demo.`}
          />
          {repositoryGroups.map((group) => {
            const matches = publicRepositories.filter((repo) => repo.group === group);
            return (
              <div key={group} className="mb-12 last:mb-0">
                <h3 className="mb-5 border-b border-border pb-3 font-mono text-sm uppercase tracking-[0.15em] text-phosphor">
                  {group} <span className="ml-2 text-mutedDim">({matches.length})</span>
                </h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {matches.map((repo) => (
                    <a
                      key={repo.slug}
                      href={`https://github.com/infosloption-byte/${repo.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${repo.name} code on GitHub`}
                      className="group flex flex-col border border-border bg-surface p-5 transition-colors hover:border-copper/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-lg text-ink group-hover:text-copper">{repo.name}</h4>
                        <ArrowUpRight size={16} className="shrink-0 text-copper" />
                      </div>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{repo.description}</p>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <TagPill>{repo.language}</TagPill>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-phosphor">
                          <Code size={14} /> View code
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
