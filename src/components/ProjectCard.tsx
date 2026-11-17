import { ArrowUpRight, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge, TagPill } from "./ui";
import type { Project } from "../data/content";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group border border-border bg-surface p-6 transition-colors hover:border-phosphor/60 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-mutedDim">{String(index + 1).padStart(2, "0")}</span>
          <Link to={`/work/${project.slug}`} className="font-display text-xl text-ink hover:text-phosphor md:text-2xl">
            {project.name}
          </Link>
        </div>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <TagPill key={s}>{s}</TagPill>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wide">
        <Link to={`/work/${project.slug}`} className="inline-flex items-center gap-1.5 text-copper hover:text-phosphor">
          View case study <ArrowUpRight size={14} />
        </Link>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-phosphor hover:text-copper"
          >
            <Code size={15} />
            {project.sourceNote ? "View related code" : "View code on GitHub"}
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
