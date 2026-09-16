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

This is a single-user, local-first tool: profile and generated post data is
stored in `data/app-data.json` on disk (seeded with sample data). That's
fine for local use or a single personal deployment, but on serverless hosts
(e.g. Vercel) the filesystem isn't persistent across deployments — swap in a
real database (e.g. Postgres via Prisma) before using this for more than one
person or a production deployment you care about not resetting.

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS + the Anthropic SDK
(`claude-opus-5`).
