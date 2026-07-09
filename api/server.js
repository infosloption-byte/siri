import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.use(cors()); // same-origin via nginx proxy anyway, but harmless

// Basic abuse protection: 5 submissions per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/contact", limiter);

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
  // very basic email sanity check
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Contact API listening on :${PORT}`));
