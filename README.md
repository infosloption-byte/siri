# Umayanga Sriyarathna — Personal Brand Site

A multi-page personal site built with React + TypeScript + Vite + Tailwind CSS + React Router.

Design direction: an "engineering dashboard" identity — dark graphite background, copper and
phosphor-green accents, monospace labels, terminal-style chrome, and a "systems monitor" framing
for your live products (Voxora, Ubiq Editor, SL Option, OREL Innovation). Deliberately different
from the navy/amber/teal "Night over the Fort" theme on your current ycusriya.online.

## Pages

- `/` — Home: terminal-style hero, live systems board (your 4 flagship products), capabilities grid, career-log teaser, CTA
- `/work` — Full project list: the 4 flagship builds plus your client/contract portfolio
- `/work/:slug` — Case study detail per project (problem, approach, stack, role, highlights)
- `/about` — Full career timeline, education, complete skill set, resume download
- `/contact` — Contact channels, references, and a form that opens a pre-filled email (no backend needed)
- `*` — 404

## Project structure

```
src/
  data/content.ts      <- ALL copy lives here: profile, projects, experience, skills, referees.
                          Edit this file to update site content without touching components.
  components/          <- Nav, Footer, Layout, ProjectCard, ui.tsx (buttons, badges, terminal frame)
  pages/                <- One file per route
public/
  resume.pdf            <- Your uploaded resume, served for the "Download resume" button
```

## Local development

```bash
npm install
npm run dev
```

Opens on http://localhost:5173 with hot reload.

## Build for production

```bash
npm run build
```

Outputs a static site to `dist/`. This is a fully static React SPA — no server-side code, no
database. It only needs a place to serve static files.

## Deploying alongside your existing AWS setup

Since you already run a master nginx container routing to ycusriya, Ubiq Editor, Voxora, and
phpMyAdmin on internal ports off one EC2 instance, this fits the same pattern as a 5th app:

1. On the server: `git clone` this repo (or `scp` the `dist/` folder up after building locally).
2. Build: `npm ci && npm run build` inside the app's container/directory.
3. Serve `dist/` as static files — either:
   - a small nginx container listening on an internal port (matching your existing pattern), or
   - a static file mount if you'd rather not spin up another container.
4. In your master nginx config, add a `server_name` block (or path) pointing at this new
   internal port, same as the others.
5. Because this uses React Router (`BrowserRouter`), your nginx (or the container's nginx) needs
   a fallback so refreshing `/work/voxora` doesn't 404:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## Editing content

Everything text-based — your bio, project write-ups, experience, skills, referees — lives in
`src/data/content.ts`. That's the only file you need to touch for a content update; the page
components just render whatever's in there.

## The contact form

There's no backend. Submitting the form opens the visitor's email client with a pre-filled
message addressed to you (name, email, project type, and their message in the body). If you'd
rather capture submissions server-side later, swap the `handleSubmit` function in
`src/pages/Contact.tsx` for a POST to a form service (e.g. Formspree) or your own API endpoint —
everything else on the page stays the same.

## Notes

- Fonts (Space Grotesk / IBM Plex Sans / IBM Plex Mono) load from Google Fonts via `index.html`.
  If you'd rather self-host them, download the woff2 files and swap the `<link>` tags for local
  `@font-face` rules in `src/index.css`.
- Tailwind theme tokens (colors, fonts) are centralized in `tailwind.config.js` if you want to
  adjust the palette later.
