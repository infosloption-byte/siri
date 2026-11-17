import { ArrowRight, ArrowUpRight, Code, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Container, Eyebrow, TagPill } from "../components/ui";
import {
  portfolioCategories,
  portfolioProjectCount,
  type PortfolioEntry,
} from "../data/portfolio";
import { usePageTitle } from "../hooks/usePageTitle";

function PortfolioCard({
  project,
  number,
  spotlight = false,
}: {
  project: PortfolioEntry;
  number: number;
  spotlight?: boolean;
}) {
  return (
    <article
      className={`group flex h-full flex-col border border-border bg-surface transition-colors hover:border-copper/60 ${spotlight ? "p-7 md:p-9" : "p-6 md:p-7"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mutedDim">
          // project_{String(number).padStart(2, "0")}
        </span>
        <span className="font-mono text-[11px] text-muted">{project.repo}</span>
      </div>
      <h3 className={`mt-5 font-display text-2xl text-ink transition-colors group-hover:text-phosphor ${spotlight ? "md:text-3xl" : ""}`}>
        {project.title}
      </h3>
      <p className={`mt-3 max-w-2xl leading-relaxed text-muted ${spotlight ? "text-base" : "text-sm"}`}>
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <TagPill key={item}>{item}</TagPill>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-5 text-xs font-mono uppercase tracking-wide [margin-top:1.75rem]">
        <a
          href={`https://github.com/infosloption-byte/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
          className="inline-flex items-center gap-1.5 text-copper transition-colors hover:text-phosphor"
        >
          <Code size={15} aria-hidden="true" /> View source <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} website (availability depends on hosting)`}
            className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-phosphor"
          >
            <Globe size={15} aria-hidden="true" /> Website <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        {project.caseStudy && (
          <Link
            to={`/work/${project.caseStudy}`}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
          >
            Case study <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  usePageTitle(
    "Projects",
    "Explore personal SaaS products, SL Options startup work, client websites, concepts, and earlier projects."
  );

  let projectNumber = 0;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-grid bg-[length:40px_40px]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/75 to-bg" />
        <Container className="relative py-16 md:py-24">
          <Eyebrow>Selected work / Portfolio index</Eyebrow>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-display text-4xl leading-tight text-ink md:text-5xl">
                Products, platforms, and ideas built from the ground up.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                A structured look at my personal SaaS products, startup, client websites, experiments,
                and earlier engineering work. Explore the source code behind each build.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
              <div className="bg-surface p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">Projects</p>
                <p className="mt-2 font-display text-4xl text-phosphor">{portfolioProjectCount}</p>
              </div>
              <div className="bg-surface p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">Collections</p>
                <p className="mt-2 font-display text-4xl text-copper">{portfolioCategories.length}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <nav aria-label="Project categories" className="sticky top-16 z-30 border-b border-border bg-bg/95 backdrop-blur">
        <Container className="flex items-center gap-2 overflow-x-auto py-3">
          <span className="mr-3 hidden shrink-0 font-mono text-[11px] uppercase tracking-widest text-mutedDim lg:block">
            Browse /
          </span>
          {portfolioCategories.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex shrink-0 items-center gap-2 border border-border bg-surface px-3 py-2 font-mono text-[11px] text-muted transition-colors hover:border-phosphor hover:text-ink md:px-4"
            >
              <span className="text-phosphor">{String(index + 1).padStart(2, "0")}</span>
              {section.shortLabel}
            </a>
          ))}
        </Container>
      </nav>

      {portfolioCategories.map((section, index) => {
        const initialNumber = projectNumber;
        projectNumber += section.items.length;

        return (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`heading-${section.id}`}
            className={`scroll-mt-36 border-b border-border ${index % 2 === 1 ? "bg-surface/30" : ""}`}
          >
            <Container className="py-16 md:py-20">
              <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-phosphor">{section.eyebrow}</p>
                  <h2 id={`heading-${section.id}`} className="mt-3 font-display text-3xl text-ink md:text-4xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{section.description}</p>
                </div>
                <span className="border border-border px-3 py-2 font-mono text-xs text-muted">
                  {String(section.items.length).padStart(2, "0")} projects
                </span>
              </div>

              <div className={`grid gap-4 ${section.id === "startup" ? "" : section.id === "legacy" ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"}`}>
                {section.items.map((project, projectIndex) => (
                  <PortfolioCard
                    key={project.repo}
                    project={project}
                    number={initialNumber + projectIndex + 1}
                    spotlight={section.id === "startup"}
                  />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section>
        <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-ink">More in the repository archive</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              These are curated highlights, not the complete GitHub account. Some website links may
              be unavailable while their hosting is offline; the repository links open independently.
            </p>
          </div>
          <a
            href="https://github.com/infosloption-byte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 border border-border px-5 py-3 font-mono text-sm text-ink transition-colors hover:border-phosphor hover:text-phosphor"
          >
            Explore all repositories <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Container>
      </section>
    </>
  );
}
