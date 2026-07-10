import { useEffect, useState, type FormEvent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container, SectionHeading, PrimaryButton } from "../components/ui";
import { usePageTitle } from "../hooks/usePageTitle";

interface Summary {
  overview: {
    activeUsers: number;
    pageViews: number;
    avgSessionSeconds: number;
    bounceRate: number;
  };
  topPages: { path: string; views: number }[];
  topCountries: { country: string; users: number }[];
  timeseries: { date: string; users: number }[];
}

function formatDate(yyyymmdd: string) {
  // GA4 returns dates as "20260710" — reformat to "Jul 10"
  const y = yyyymmdd.slice(0, 4);
  const m = yyyymmdd.slice(4, 6);
  const d = yyyymmdd.slice(6, 8);
  return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Analytics() {
  usePageTitle("Analytics");

  // Keep this page out of search engines — it's private, not part of usePageTitle's
  // scope, so set it directly here.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [data, setData] = useState<Summary | null>(null);
  const [dataError, setDataError] = useState("");

  // Check for an existing valid session on mount
  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/analytics/summary", { credentials: "include" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load analytics.");
        setData(json);
      })
      .catch((err) => setDataError(err.message));
  }, [authed]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Login failed.");
      setAuthed(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoggingIn(false);
      setPassword("");
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setData(null);
  }

  // ---------- Not yet authenticated ----------
  if (authed === null) {
    return (
      <Container className="py-24 text-center text-sm text-muted">Checking session…</Container>
    );
  }

  if (!authed) {
    return (
      <Container className="flex min-h-[60vh] max-w-sm flex-col justify-center py-24">
        <SectionHeading eyebrow="Restricted" title="Analytics" />
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="border border-border bg-surface px-4 py-3 font-mono text-sm text-ink outline-none focus:border-copper"
          />
          <PrimaryButton type="submit" disabled={loggingIn}>
            {loggingIn ? "Checking…" : "Enter"}
          </PrimaryButton>
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        </form>
      </Container>
    );
  }

  // ---------- Authenticated ----------
  return (
    <Container className="py-16 md:py-20">
      <div className="flex items-center justify-between">
        <SectionHeading eyebrow="Private" title="Analytics" />
        <button
          onClick={handleLogout}
          className="font-mono text-sm text-muted underline-offset-4 hover:underline"
        >
          Log out
        </button>
      </div>

      {dataError && <p className="mt-8 text-sm text-red-500">{dataError}</p>}

      {!data && !dataError && (
        <p className="mt-8 text-sm text-muted">Loading last 28 days…</p>
      )}

      {data && (
        <div className="mt-10 flex flex-col gap-10">
          {/* Overview cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Active users" value={data.overview.activeUsers.toLocaleString()} />
            <StatCard label="Page views" value={data.overview.pageViews.toLocaleString()} />
            <StatCard
              label="Avg. session"
              value={`${Math.floor(data.overview.avgSessionSeconds / 60)}m ${data.overview.avgSessionSeconds % 60}s`}
            />
            <StatCard label="Bounce rate" value={`${(data.overview.bounceRate * 100).toFixed(1)}%`} />
          </div>

          {/* Trend chart */}
          <div className="border border-border bg-surface p-6">
            <p className="mb-4 font-mono text-sm text-muted">Active users — last 28 days</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data.timeseries.map((d) => ({ ...d, label: formatDate(d.date) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262B33" />
                <XAxis dataKey="label" stroke="#5B6068" fontSize={12} />
                <YAxis stroke="#5B6068" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#14171C", border: "1px solid #262B33", fontSize: 13 }}
                />
                <Line type="monotone" dataKey="users" stroke="#6FCF97" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top pages / countries */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-sm text-muted">Top pages</p>
              <ul className="flex flex-col gap-2">
                {data.topPages.map((p) => (
                  <li key={p.path} className="flex justify-between font-mono text-sm">
                    <span className="truncate text-ink">{p.path}</span>
                    <span className="text-copper">{p.views}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-sm text-muted">Top countries</p>
              <ul className="flex flex-col gap-2">
                {data.topCountries.map((c) => (
                  <li key={c.country} className="flex justify-between font-mono text-sm">
                    <span className="text-ink">{c.country}</span>
                    <span className="text-copper">{c.users}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-surface p-4">
      <p className="font-mono text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl text-ink">{value}</p>
    </div>
  );
}
