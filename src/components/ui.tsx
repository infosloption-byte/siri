import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Status } from "../data/content";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-phosphor">
      <span aria-hidden="true">//</span>
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl font-medium text-ink md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted leading-relaxed">{description}</p>}
    </div>
  );
}

const statusStyles: Record<Status, { dot: string; text: string; label: string }> = {
  live: { dot: "bg-phosphor", text: "text-phosphor", label: "text-phosphor" },
  building: { dot: "bg-copper", text: "text-copper", label: "text-copper" },
  concept: { dot: "bg-mutedDim", text: "text-muted", label: "text-muted" },
};

export function StatusBadge({ status, label }: { status: Status; label: string }) {
  const s = statusStyles[status];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide">
      <span className={`status-dot h-2 w-2 rounded-full ${s.dot}`} aria-hidden="true" />
      <span className={s.text}>{label}</span>
    </span>
  );
}

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-border bg-surface2 px-2 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}

export function TerminalFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-copperDim" />
        <span className="h-2.5 w-2.5 rounded-full bg-mutedDim" />
        <span className="h-2.5 w-2.5 rounded-full bg-phosphorDim" />
        <span className="ml-2 font-mono text-[11px] text-muted">{title}</span>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  href,
  to,
  onClick,
  type = "button",
  download,
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  download?: boolean;
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 bg-copper px-5 py-3 font-mono text-sm font-medium text-bg transition-colors hover:bg-[#D68952] focus-visible:outline-phosphor";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} download={download} target={download ? undefined : "_blank"} rel={download ? undefined : "noreferrer"}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function GhostButton({ children, href, to }: { children: ReactNode; href?: string; to?: string }) {
  const cls =
    "inline-flex items-center justify-center gap-2 border border-border px-5 py-3 font-mono text-sm font-medium text-ink transition-colors hover:border-phosphor hover:text-phosphor";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
