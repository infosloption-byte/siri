import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Phone, ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import { Container, SectionHeading, TerminalFrame, PrimaryButton } from "../components/ui";
import { profile, referees } from "../data/content";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("New build");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New enquiry from ${name || "your website"} — ${projectType}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="border-b border-border">
      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk about what you're building"
          description="Fill in a few details and it'll open a pre-filled email to me directly — no forms disappearing into a database somewhere."
        />

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <TerminalFrame title="contact.env">
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-phosphor" />
                  <a href={`mailto:${profile.email}`} className="text-ink hover:text-phosphor">
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-phosphor" />
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="text-ink hover:text-phosphor">
                    {profile.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <ExternalLink size={16} className="text-phosphor" />
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-ink hover:text-phosphor">
                    {profile.linkedin}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe size={16} className="text-phosphor" />
                  <span className="text-ink">{profile.location}</span>
                </li>
              </ul>
            </TerminalFrame>

            <div className="border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">References</p>
              <div className="mt-4 space-y-4">
                {referees.map((r) => (
                  <div key={r.name} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <p className="text-sm text-ink">{r.name}</p>
                    <p className="text-xs text-muted">{r.title}</p>
                    <p className="mt-1 text-xs text-mutedDim">{r.relationship}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-border bg-surface p-6 md:p-8">
            <div className="grid gap-5">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">Name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-phosphor"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">Email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-phosphor"
                  placeholder="you@company.com"
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">Project type</span>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="mt-2 w-full border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-phosphor"
                >
                  <option>New build</option>
                  <option>Take existing product to production</option>
                  <option>Architecture / code review</option>
                  <option>Ongoing contract work</option>
                  <option>Something else</option>
                </select>
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">What are you building?</span>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="mt-2 w-full resize-none border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-phosphor"
                  placeholder="A short brief helps — stack, timeline, what stage you're at."
                />
              </label>

              <PrimaryButton type="submit">
                Send enquiry <ArrowUpRight size={16} />
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
