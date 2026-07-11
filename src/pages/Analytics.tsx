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
  range: string;
  overview: {
    activeUsers: number;
    pageViews: number;
    avgSessionSeconds: number;
    bounceRate: number;
  };
  topPages: { path: string; views: number }[];
  topCountries: { country: string; users: number }[];
  timeseries: { date: string; users: number }[];
  trafficSources: { channel: string; sessions: number }[];
  devices: { device: string; users: number }[];
  newVsReturning: { type: string; users: number }[];
  contactConversions: { count: number; rate: number };
}

const RANGES = [
  { key: "7", label: "7d" },
  { key: "28", label: "28d" },
  { key: "90", label: "90d" },
];

function formatDate(yyyymmdd: string) {
  const y = yyyymmdd.slice(0, 4);
  const m = yyyymmdd.slice(4, 6);
  const d = yyyymmdd.slice(6, 8);
  return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDeviceLabel(device: string) {
  return device.charAt(0).toUpperCase() + device.slice(1);
}

export default function Analytics() {
  usePageTitle("Analytics");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [range, setRange] = useState("28");
  const [data, setData] = useState<Summary | null>(null);
  const [dataError, setDataError] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoadingData(true);
    setDataError("");
    fetch(`/api/analytics/summary?range=${range}`, { credentials: "include" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load analytics.");
        setData(json);
      })
      .catch((err) => setDataError(err.message))
      .finally(() => setLoadingData(false));
  }, [authed, range]);

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

  const maxSourceSessions = Math.max(1, ...(data?.trafficSources.map((s) => s.sessions) || [1]));
  const maxDeviceUsers = Math.max(1, ...(data?.devices.map((d) => d.users) || [1]));
  const newUsers = data?.newVsReturning.find((r) => r.type === "new")?.users || 0;
  const returningUsers = data?.newVsReturning.find((r) => r.type === "returning")?.users || 0;
  const totalNewReturning = newUsers + returningUsers || 1;

  return (
    <Container className="py-16 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading eyebrow="Private" title="Analytics" />
        <div className="flex items-center gap-3">
          <div className="flex border border-border font-mono text-sm">
            {RANGES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`px-3 py-1.5 transition-colors ${
                  range === r.key ? "bg-copper text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="font-mono text-sm text-muted underline-offset-4 hover:underline"
          >
            Log out
          </button>
        </div>
      </div>

      {dataError && <p className="mt-8 text-sm text-red-500">{dataError}</p>}

      {!data && !dataError && <p className="mt-8 text-sm text-muted">Loading…</p>}

      {data && (
        <div className={`mt-10 flex flex-col gap-10 transition-opacity ${loadingData ? "opacity-50" : ""}`}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Active users" value={data.overview.activeUsers.toLocaleString()} />
            <StatCard label="Page views" value={data.overview.pageViews.toLocaleString()} />
            <StatCard
              label="Avg. session"
              value={`${Math.floor(data.overview.avgSessionSeconds / 60)}m ${data.overview.avgSessionSeconds % 60}s`}
            />
            <StatCard label="Bounce rate" value={`${(data.overview.bounceRate * 100).toFixed(1)}%`} />
          </div>

          <div className="border border-border bg-surface p-6">
            <p className="mb-4 font-mono text-sm text-muted">Active users — last {data.range} days</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data.timeseries.map((d) => ({ ...d, label: formatDate(d.date) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262B33" />
                <XAxis dataKey="label" stroke="#5B6068" fontSize={12} />
                <YAxis stroke="#5B6068" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#14171C", border: "1px solid #262B33", fontSize: 13 }} />
                <Line type="monotone" dataKey="users" stroke="#6FCF97" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-sm text-muted">Contact form conversions</p>
              <div className="flex items-end gap-6">
                <div>
                  <p className="font-mono text-3xl text-ink">{data.contactConversions.count}</p>
                  <p className="mt-1 font-mono text-xs text-muted">submissions</p>
                </div>
                <div>
                  <p className="font-mono text-3xl text-phosphor">
                    {(data.contactConversions.rate * 100).toFixed(2)}%
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">of active users</p>
                </div>
              </div>
            </div>

            <div className="border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-sm text-muted">New vs. returning</p>
              <div className="flex h-3 overflow-hidden border border-border">
                <div className="bg-copper" style={{ width: `${(newUsers / totalNewReturning) * 100}%` }} />
                <div className="bg-phosphor" style={{ width: `${(returningUsers / totalNewReturning) * 100}%` }} />
              </div>
              <div className="mt-3 flex justify-between font-mono text-xs">
                <span className="text-copper">New: {newUsers.toLocaleString()}</span>
                <span className="text-phosphor">Returning: {returningUsers.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-sm text-muted">Traffic sources</p>
              <ul className="flex flex-col gap-3">
                {data.trafficSources.map((s) => (
                  <li key={s.channel}>
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-ink">{s.channel}</span>
                      <span className="text-copper">{s.sessions}</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-bg">
                      <div className="h-full bg-copper" style={{ width: `${(s.sessions / maxSourceSessions) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-sm text-muted">Devices</p>
              <ul className="flex flex-col gap-3">
                {data.devices.map((d) => (
                  <li key={d.device}>
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-ink">{formatDeviceLabel(d.device)}</span>
                      <span className="text-phosphor">{d.users}</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-bg">
                      <div className="h-full bg-phosphor" style={{ width: `${(d.users / maxDeviceUsers) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
