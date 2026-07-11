import { ArrowUpRight, Terminal } from "lucide-react";
import {
  Container,
  Eyebrow,
  SectionHeading,
  TerminalFrame,
  PrimaryButton,
  GhostButton,
  TagPill,
} from "../components/ui";
import ProjectCard from "../components/ProjectCard";
import { profile, projects, skillGroups, experience } from "../data/content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle(); // root route — just use the site name
  const liveProjects = projects.slice(0, 4);
  const recentRoles = experience.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-grid bg-grid bg-[length:40px_40px]">
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />
        <Container className="relative py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <Eyebrow>Full-stack engineer / product builder</Eyebrow>
              <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink md:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-3 font-mono text-sm text-phosphor">// aka {profile.alias}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                {profile.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton to="/work">
                  View the work <ArrowUpRight size={16} />
                </PrimaryButton>
                <GhostButton to="/contact">Hire me</GhostButton>
              </div>
            </div>

            <TerminalFrame title="whoami.sh">
              <p className="font-mono text-sm leading-relaxed text-muted">
                <span className="text-phosphor">$</span> whoami
                <br />
                {profile.role}
                <br />
                <span className="text-phosphor">$</span> location
                <br />
                {profile.location}
                <br />
                <span className="text-phosphor">$</span> experience
                <br />
                10+ years, solo-shipped 4 production systems
                <br />
                <span className="text-phosphor">$</span> status
                <br />
                <span className="text-phosphor">{profile.availability.toLowerCase()}</span>
                <span className="cursor-blink" />
              </p>
            </TerminalFrame>
          </div>
        </Container>
      </section>

      {/* Live systems board */}
      <section className="border-b border-border">
        <Container className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Systems monitor"
              title="What's live right now"
              description="Four products I designed, built, and operate — spanning AI infrastructure, developer tools, fintech, and strategic concepts."
            />
            <div className="mb-10 hidden items-center gap-2 font-mono text-xs text-muted md:flex">
              <Terminal size={14} className="text-phosphor" />
              4 monitored services
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {liveProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>

          <div className="mt-8">
            <GhostButton to="/work">See all work, including client projects</GhostButton>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border bg-surface/40">
        <Container className="py-20">
          <SectionHeading
            eyebrow="Capabilities"
            title="What I bring to a build"
            description="End-to-end ownership — not just the parts that are easy to demo."
          />
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
            {skillGroups.slice(0, 8).map((group) => (
              <div key={group.title} className="bg-bg p-6">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-copper">{group.title}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.slice(0, 5).map((item) => (
                    <TagPill key={item}>{item}</TagPill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Career log teaser */}
      <section className="border-b border-border">
        <Container className="py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <SectionHeading
              eyebrow="Career log"
              title="A decade of shipping"
              description="From trainee engineer to solo product builder — the full history is on the About page."
            />
            <div className="space-y-0">
              {recentRoles.map((role, i) => (
                <div key={role.role} className="flex gap-5 border-t border-border py-5 first:border-t-0 md:first:border-t">
                  <span className="mt-1 font-mono text-xs text-mutedDim">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-lg text-ink">{role.role}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {role.company} &middot; {role.period}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-border pt-6">
                <GhostButton to="/about">Read the full timeline</GhostButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-20 text-center md:py-28">
          <Eyebrow>Open a channel</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl text-ink md:text-4xl">
            Have a system to build, fix, or take to production?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            I take on a small number of engagements at a time — architecture reviews, full builds, or getting an
            existing product production-ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PrimaryButton to="/contact">
              Start a conversation <ArrowUpRight size={16} />
            </PrimaryButton>
            <GhostButton href={`mailto:${profile.email}`}>{profile.email}</GhostButton>
          </div>
        </Container>
      </section>
    </>
  );
}
