import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Phone, ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import { Container, SectionHeading, TerminalFrame, PrimaryButton } from "../components/ui";
import { profile, referees } from "../data/content";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("New build");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, message }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setProjectType("New build");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="border-b border-border">
      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk about what you're building"
          description="Fill in a few details and it'll land straight in my inbox — no forms disappearing into a database somewhere."
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

              <PrimaryButton type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send enquiry"} <ArrowUpRight size={16} />
              </PrimaryButton>

              {status === "sent" && (
                <p className="text-sm text-phosphor">Thanks — your message is in my inbox. I'll reply soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500">{errorMsg}</p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
