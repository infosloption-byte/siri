import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // same-origin via nginx proxy anyway, but harmless
if (process.env.VERCEL) app.set("trust proxy", 1);

// Vercel Services forwards the /api path intact; the existing nginx
// deployment removes the prefix before passing requests to Express.
app.use((req, _res, next) => {
  if (req.url.startsWith("/api/")) req.url = req.url.slice(4);
  next();
});

// ---------- Contact form (existing) ----------

// Basic abuse protection: 5 submissions per 15 min per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/contact", contactLimiter);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD, // Gmail App Password, NOT your normal password
  },
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/contact", async (req, res) => {
  const { name, email, projectType, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address." });
  }

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New enquiry from ${name} — ${projectType || "General"}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType || "N/A"}\n\n${message}`,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Mail send failed:", err.message);
    return res.status(500).json({ ok: false, error: "Failed to send message. Try again shortly." });
  }
});

// ---------- Analytics dashboard auth ----------

const COOKIE_NAME = "dash_session";
const JWT_SECRET = process.env.JWT_SECRET; // required — server refuses to start without it, see bottom

// Slow down brute-force attempts on the login endpoint specifically
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/login", loginLimiter, async (req, res) => {
  const { password } = req.body || {};
  if (!password) {
    return res.status(400).json({ ok: false, error: "Password required." });
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    console.error("ADMIN_PASSWORD_HASH not set");
    return res.status(500).json({ ok: false, error: "Server not configured." });
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    // Deliberately vague — don't reveal whether it's the password specifically that's wrong
    return res.status(401).json({ ok: false, error: "Invalid credentials." });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,      // site is served over https in production
    sameSite: "strict",
    maxAge: 12 * 60 * 60 * 1000,
  });
  return res.json({ ok: true });
});

app.post("/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME);
  return res.json({ ok: true });
});

function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ ok: false, error: "Not authenticated." });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Session expired." });
  }
}

app.get("/session", requireAuth, (_req, res) => res.json({ ok: true }));

// ---------- GA4 analytics summary ----------

// Service account credentials come in as a base64-encoded JSON blob in the env
// (avoids multiline-JSON-in-.env headaches). Decoded once at startup.
let analyticsClient = null;
try {
  if (process.env.GA_SERVICE_ACCOUNT_KEY_BASE64) {
    const credentials = JSON.parse(
      Buffer.from(process.env.GA_SERVICE_ACCOUNT_KEY_BASE64, "base64").toString("utf-8")
    );
    analyticsClient = new BetaAnalyticsDataClient({ credentials });
  }
} catch (err) {
  console.error("Failed to parse GA_SERVICE_ACCOUNT_KEY_BASE64:", err.message);
}

const ALLOWED_RANGES = { "7": "7daysAgo", "28": "28daysAgo", "90": "90daysAgo" };

app.get("/analytics/summary", requireAuth, async (req, res) => {
  if (!analyticsClient || !process.env.GA_PROPERTY_ID) {
    return res.status(500).json({ ok: false, error: "Analytics not configured on the server." });
  }

  const rangeKey = ALLOWED_RANGES[req.query.range] ? req.query.range : "28";
  const startDate = ALLOWED_RANGES[rangeKey];
  const property = `properties/${process.env.GA_PROPERTY_ID}`;
  const dateRanges = [{ startDate, endDate: "today" }];

  try {
    const [
      overview,
      byPage,
      byCountry,
      timeseries,
      byChannel,
      byDevice,
      byNewReturning,
      contactConversions,
    ] = await Promise.all([
      analyticsClient.runReport({
        property,
        dateRanges,
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
      analyticsClient.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      analyticsClient.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 8,
      }),
      analyticsClient.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      // Traffic sources — direct / organic search / social / referral / etc.
      analyticsClient.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      }),
      // Device breakdown — desktop / mobile / tablet
      analyticsClient.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),
      // New vs returning visitors
      analyticsClient.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "newVsReturning" }],
        metrics: [{ name: "activeUsers" }],
      }),
      // Contact form conversions — fired as a custom gtag event on successful submit
      analyticsClient.runReport({
        property,
        dateRanges,
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            stringFilter: { value: "contact_form_submit" },
          },
        },
      }),
    ]);

    const row0 = overview[0]?.rows?.[0]?.metricValues || [];
    const totalUsers = Number(row0[0]?.value || 0);

    res.json({
      ok: true,
      range: rangeKey,
      overview: {
        activeUsers: totalUsers,
        pageViews: Number(row0[1]?.value || 0),
        avgSessionSeconds: Math.round(Number(row0[2]?.value || 0)),
        bounceRate: Number(row0[3]?.value || 0),
      },
      topPages: (byPage[0]?.rows || []).map((r) => ({
        path: r.dimensionValues[0].value,
        views: Number(r.metricValues[0].value),
      })),
      topCountries: (byCountry[0]?.rows || []).map((r) => ({
        country: r.dimensionValues[0].value,
        users: Number(r.metricValues[0].value),
      })),
      timeseries: (timeseries[0]?.rows || []).map((r) => ({
        date: r.dimensionValues[0].value,
        users: Number(r.metricValues[0].value),
      })),
      trafficSources: (byChannel[0]?.rows || []).map((r) => ({
        channel: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      devices: (byDevice[0]?.rows || []).map((r) => ({
        device: r.dimensionValues[0].value,
        users: Number(r.metricValues[0].value),
      })),
      newVsReturning: (byNewReturning[0]?.rows || []).map((r) => ({
        type: r.dimensionValues[0].value, // "new" | "returning"
        users: Number(r.metricValues[0].value),
      })),
      contactConversions: {
        count: Number(contactConversions[0]?.rows?.[0]?.metricValues?.[0]?.value || 0),
        rate: totalUsers > 0
          ? Number(contactConversions[0]?.rows?.[0]?.metricValues?.[0]?.value || 0) / totalUsers
          : 0,
      },
    });
  } catch (err) {
    console.error("GA4 report failed:", err.message);
    res.status(500).json({ ok: false, error: "Failed to fetch analytics data." });
  }
});

if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set. Refusing to start.");
  process.exit(1);
}

const PORT = process.env.PORT || 3001;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
}

export default app;
