import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container, StatusBadge, TagPill, PrimaryButton, GhostButton } from "../components/ui";
import { projects } from "../data/content";
import NotFound from "./NotFound";
import { usePageTitle } from "../hooks/usePageTitle";

export default function WorkDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // Hook must run unconditionally on every render (Rules of Hooks),
  // so this sits above the early NotFound return, using optional chaining.
  usePageTitle(project?.name, project?.tagline);

  if (!project) return <NotFound />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className="border-b border-border bg-grid bg-[length:40px_40px]">
        <div className="bg-gradient-to-b from-bg/40 via-bg/70 to-bg">
          <Container className="py-16 md:py-20">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-muted hover:text-phosphor"
            >
              <ArrowLeft size={14} /> All work
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <h1 className="font-display text-3xl text-ink md:text-5xl">{project.name}</h1>
              <StatusBadge status={project.status} label={project.statusLabel} />
            </div>
            <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <TagPill key={s}>{s}</TagPill>
              ))}
            </div>

            {project.url && (
              <div className="mt-8">
                <PrimaryButton href={project.url}>
                  Visit {project.name} <ArrowUpRight size={16} />
                </PrimaryButton>
              </div>
            )}
          </Container>
        </div>
      </section>

      <section className="border-b border-border">
        <Container className="grid gap-12 py-16 md:grid-cols-3 md:py-20">
          <div className="md:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor">The problem</p>
            <p className="mt-4 text-lg leading-relaxed text-ink">{project.problem}</p>

            <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-phosphor">Approach</p>
            <ul className="mt-4 space-y-4">
              {project.approach.map((step) => (
                <li key={step} className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-copper" />
                  <span className="text-muted leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor">Role</p>
              <p className="mt-2 text-sm text-ink">{project.role}</p>
            </div>
            <div className="border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor">At a glance</p>
              <div className="mt-3 space-y-3">
                {project.highlights.map((h) => (
                  <div key={h.label} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <p className="font-mono text-[11px] uppercase text-muted">{h.label}</p>
                    <p className="mt-1 text-sm text-ink">{h.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next in the log</p>
            <p className="mt-2 font-display text-2xl text-ink">{next.name}</p>
          </div>
          <GhostButton to={`/work/${next.slug}`}>View case study →</GhostButton>
        </Container>
      </section>
    </>
  );
}
