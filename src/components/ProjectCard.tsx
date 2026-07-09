import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge, TagPill } from "./ui";
import type { Project } from "../data/content";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block border border-border bg-surface p-6 transition-colors hover:border-phosphor/60 md:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-mutedDim">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="font-display text-xl text-ink group-hover:text-phosphor md:text-2xl">
            {project.name}
          </h3>
        </div>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <TagPill key={s}>{s}</TagPill>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-copper">
        View case study
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
