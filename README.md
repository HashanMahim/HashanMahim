# LinkedIn Brand Builder

Turn your resume/LinkedIn info into a shareable portfolio site, and generate
draft LinkedIn posts about your projects, internships, and coursework wins.

Built for students job/internship hunting who want a lightweight personal
brand tool without wrangling a full CMS.

## Features

- **Profile editor** (`/`) — fill in your basics, links, skills, projects,
  experience, and coursework once.
- **Public portfolio page** (`/portfolio`) — a clean, shareable page
  generated from your profile.
- **Appearance customization** — pick an accent color, font pairing
  (sans/serif/mono), light/dark/system color mode, one of three layout
  templates (classic, modern card-based, or timeline), and which sections
  show and in what order — all from the dashboard, no code required.
- **LinkedIn post generator** — pick a project, internship, or coursework
  entry (or write a custom win) and get an AI-drafted LinkedIn post in your
  chosen tone, ready to copy and paste.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to edit your profile,
and [http://localhost:3000/portfolio](http://localhost:3000/portfolio) to
see the public page.

Post generation calls the Claude API and requires `ANTHROPIC_API_KEY` to be
set. Everything else (editing your profile, viewing the portfolio) works
without it.

## Data storage

This is a single-user tool. Profile and generated post data lives in one of
two places, chosen automatically based on environment:

- **Locally** (`npm run dev` / `npm run start`, no Blob store attached):
  stored in `data/app-data.json` on disk, seeded with sample data.
- **On Vercel with a Blob store attached**: stored in [Vercel
  Blob](https://vercel.com/docs/storage/vercel-blob) instead. This isn't
  optional on Vercel — serverless functions there run on a read-only
  filesystem (only `/tmp` is writable, and it isn't shared or persistent
  across invocations), so writing to a local JSON file silently can't work
  in that environment.

**To enable saving on a Vercel deployment:** in your Vercel project, go to
*Storage → Create Database → Blob* and connect it to the project. Vercel
injects a `BLOB_READ_WRITE_TOKEN` environment variable automatically once
it's connected — the app detects that and switches storage backends with no
further config. Redeploy after attaching the store.

Note: Vercel Blob is CDN-backed, so there's a small window (up to ~1 minute,
the platform's cache floor) after saving before the public portfolio is
guaranteed to reflect the change everywhere — it's usually much faster than
that in practice.

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS + the Anthropic SDK
(`claude-opus-5`).
