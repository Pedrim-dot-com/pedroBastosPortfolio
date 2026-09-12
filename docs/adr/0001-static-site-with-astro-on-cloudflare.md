# ADR-0001: Static-First Portfolio Architecture with Astro on Cloudflare Pages

## Status

Proposed — 2026-09-12. To be marked Accepted once the repository is scaffolded
and the architecture has been validated.

## Context

This repository is a personal engineering portfolio and, deliberately, a long-term
learning project for AI-assisted software engineering practice. It must host CV
and experience content, project write-ups, engineering case studies, and technical
writing, and needs to grow with new content over time.

Constraints and goals driving this decision:

- Single author, no non-technical editors, no independent team boundaries.
- Content (CV, experience, projects, writing) changes infrequently relative to a
  typical web app; there is no need for per-request personalization or
  server-rendered dynamic data in v1.
- The site must be fast, accessible, responsive, and maintainable, and should
  avoid unnecessary complexity or premature abstraction.
- Target hosting is Cloudflare (Pages), with GitHub-based CI/CD.
- The author's professional experience is primarily React/React Native/TypeScript,
  including micro-frontend architectures, but this project intentionally does not
  need to replicate that architecture at this scale.

Two meta-framework paths were considered:

- **Next.js** — familiar to the author, matches the reference site
  (filipeleite.dev), but is optimized for apps with dynamic/server-rendered needs.
  Deploying to Cloudflare Pages requires a compatibility adapter
  (`@cloudflare/next-on-pages` or OpenNext), and it ships more client-side
  JavaScript by default for a content-heavy static site.
- **Astro** — designed for content-driven, mostly-static sites. Ships zero
  JavaScript by default, renders React (or other UI libraries) only as opt-in
  islands, has first-class typed Markdown/MDX content collections, and has
  native Cloudflare Pages support without an adapter layer.

## Decision

Adopt the following architecture:

- **Astro** as the meta-framework and static site generator for the entire site.
- **React**, used only for individual interactive islands where a genuine
  interactivity need exists (e.g. a filterable project list) — not as the
  default component model. Most components are plain Astro components.
- **TypeScript** throughout (components, data files, config, content schemas).
- **Tailwind CSS** for styling.
- **MDX + Astro Content Collections** for project case studies and technical
  writing, with content schemas validated via Zod in `src/content/config.ts`.
- **Typed TypeScript/JSON data files** (e.g. `src/data/experience.ts`,
  `src/data/skills.ts`) as the single source of truth for CV and experience
  content, consumed by both the home page and a dedicated `/cv` page —
  avoiding duplicated or drifting content.
- **Static-site generation (SSG)** for all pages in v1. No server-side
  rendering, no backend, no database.
- **Cloudflare Pages** as the hosting target, deployed via **GitHub-based
  CI/CD**: pushes to `main` deploy to production, pull requests get preview
  deployments, using Cloudflare Pages' native git integration rather than a
  custom deploy pipeline.
- **No CMS** — content is authored as MDX/data files directly in the
  repository and versioned with git.
- **No micro-frontends** — a single-author, single-deploy-unit site has no
  team or independent-release boundary to justify the added operational
  complexity.
- **No monorepo** — one deployable application in one repository; this can be
  revisited if a genuinely separate deployable unit (e.g. a standalone
  Worker) is introduced later.
- **No backend** in v1 — any future dynamic requirement (e.g. a contact form)
  will be handled as an isolated Cloudflare Pages Function, not a general
  backend service.

## Consequences

**Positive:**

- Minimal JavaScript shipped by default → strong performance and
  accessibility posture out of the box.
- No adapter/compatibility layer needed between the framework and Cloudflare
  Pages.
- Content lives in git; every project write-up and blog post has full history
  and goes through the same review discipline as code.
- A single typed data source for CV/experience content eliminates drift
  between the website and any printable/ATS CV export.
- Very low operational overhead: no servers, databases, or CMS to maintain or
  secure.
- CI/CD is effectively free — Cloudflare Pages' git integration handles build
  and deploy; GitHub Actions is only needed for pre-merge checks
  (lint/typecheck/test).

**Negative / trade-offs:**

- Astro is a new framework for the author relative to day-to-day
  Next.js/React experience, so there is a learning curve — accepted
  deliberately, as this repository is also a learning project.
- No SSR or backend means any future requirement for personalization,
  authentication, or server-side dynamic data will require a follow-up
  architectural decision (new ADR).
- Using React only for islands requires ongoing discipline to avoid
  defaulting to client-side components out of habit; this should be treated
  as a code-review concern, not just a starting preference.

## Revisit if

- Content authoring needs expand beyond the author (non-technical
  collaborators) → reconsider a headless CMS.
- A genuine need for server-rendered or per-request dynamic content emerges
  reconsider SSR/backend, likely via a Cloudflare Pages Function first,
  before a full backend service.
- A second, independently deployable unit is introduced (e.g. a standalone
  API/Worker service) → reconsider repository layout (monorepo vs.
  multi-repo).
