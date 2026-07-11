import { Link } from "react-router-dom";
import { Container } from "./ui";
import { profile } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg text-ink">
            {profile.shortName} <span className="font-mono text-sm text-muted">({profile.alias})</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">{profile.role}</p>
          <p className="mt-4 font-mono text-xs text-mutedDim">
            root@ycusriya:~$ status --uptime
            <br />
            all systems nominal since 2013
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-muted hover:text-ink" to="/">Home</Link></li>
            <li><Link className="text-muted hover:text-ink" to="/work">Work</Link></li>
            <li><Link className="text-muted hover:text-ink" to="/about">About</Link></li>
            <li><Link className="text-muted hover:text-ink" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor">Reach</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="text-muted hover:text-ink" href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a className="text-muted hover:text-ink" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            </li>
            <li>
              <a className="text-muted hover:text-ink" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                {profile.linkedin}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-mutedDim md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {profile.name}. Built and deployed by hand.</p>
          <p className="font-mono">{profile.website}</p>
        </Container>
      </div>
    </footer>
  );
}
