import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "./ui";
import { profile } from "../data/content";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="font-mono text-sm font-medium tracking-wide text-ink">
          <span className="text-phosphor">ycu</span>@sriyarathna
          <span className="cursor-blink" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                  isActive ? "text-phosphor" : "text-muted hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <span className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] text-muted">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
            {profile.availability}
          </span>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `py-2.5 font-mono text-sm uppercase tracking-wide ${
                    isActive ? "text-phosphor" : "text-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
