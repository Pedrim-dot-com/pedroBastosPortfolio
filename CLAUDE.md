# CLAUDE.md

This file gives Claude Code the working context and rules for this repository.

## Project purpose
This repository is Pedro Bastos's personal engineering portfolio, and
deliberately also a long-term learning project for using Claude Code, skills,
and agents effectively as part of senior-level software engineering practice.
Every architectural and process decision made here should be treated as worth
doing well and worth documenting, not just worth shipping.

The site hosts: CV, professional experience, projects, engineering case
studies, and technical writing.

## Development workflow
Claude Code should not implement substantial changes immediately.

For non-trivial work, follow this sequence:

1. Understand the requirement and constraints.
2. Inspect the existing code and relevant documentation.
3. Propose an implementation approach.
4. Explain important trade-offs and alternatives.
5. Wait for approval when the change affects architecture or introduces
   meaningful complexity.
6. Implement the smallest appropriate solution.
7. Run the relevant validation commands.
8. Summarize what changed, why, and any remaining risks.

Do not rewrite working code without a clear reason.
Do not introduce dependencies when the existing stack can reasonably solve
the problem.

## Architecture
See `docs/adr/` for the full decision record. Current baseline (ADR-0001):

- Astro, static-site generation, deployed to Cloudflare Pages via GitHub git
  integration.
- React used only for individual interactive islands, never as the default
  component model.
- TypeScript everywhere.
- Tailwind CSS for styling.
- MDX + Astro Content Collections (Zod-validated) for projects and writing
  content.
- Typed data files under `src/data/` are the single source of truth for
  CV/experience/skills content — do not hardcode this content elsewhere (e.g.
  duplicated into JSX on the home page and again on `/cv`).
- No CMS, no backend, no micro-frontends, no monorepo. Do not introduce any
  of these without first proposing a new ADR and getting explicit approval.

Before proposing any change that contradicts an existing ADR, read
`docs/adr/` first. Significant new architectural decisions (dependencies that
change the shape of the app, hosting changes, adding a backend, etc.) should
be proposed as a new ADR before implementation, not decided inline.

## Engineering requirements (non-negotiable)
- **Accessibility**: semantic HTML by default; every image has meaningful alt
  text (or empty alt for decorative images); full keyboard navigability;
  sufficient color contrast. Treat this as a correctness requirement, not a
  nice-to-have.
- **Performance**: default to zero client-side JavaScript; a component may
  only become a React island if there is a concrete interactivity need that
  cannot reasonably be done with plain HTML/CSS/Astro.
- **Simplicity**: no premature abstraction. Prefer duplicating a few lines
  over introducing a shared helper for two call sites. Do not add
  configuration options, feature flags, or extensibility points for
  hypothetical future needs.
- **Content accuracy**: never fabricate, embellish, or infer CV/experience
  facts (roles, dates, employers, achievements, project outcomes). If
  information is missing, ask rather than filling a plausible-sounding gap.

## Component conventions
- Prefer Astro components for static UI.
- Before introducing React, explain the specific interactivity requirement
  that justifies shipping client-side JavaScript.
- Do not introduce a component abstraction unless it improves readability,
  reuse, or maintainability in the current codebase.

## Conventions
- **Language**: TypeScript for all code, data, and content schemas.
- **Content schemas**: defined once in `src/content/config.ts` (Astro
  Content Collections). Treat that file as the source of truth for
  frontmatter shape — do not restate the schema elsewhere in prose docs
  where it can drift out of sync.
- **CV/experience data**: lives in typed files under `src/data/`; the home
  page, `/cv`, and any export/print view all read from these files rather
  than embedding content directly.
- **Package manager**: pnpm.
- **Linting/formatting**: ESLint + Prettier; accessibility linting
  (jsx-a11y / astro eslint plugin) is part of the standard lint pass, not
  optional.
- **Commits**: concise, imperative, conventional-style messages (e.g.
  `feat: add project detail page`, `chore: ...`), matching the existing repo
  history.

## Commands
To be filled in once the project is scaffolded (Phase 1). Expected standard
scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`.

## Deployment
Cloudflare Pages, connected directly to this GitHub repository. `main`
deploys to production; pull requests get automatic preview deployments. Do
not introduce a separate custom deploy pipeline — GitHub Actions (if used) is
for pre-merge checks only (lint/typecheck/test), not for deployment.

## Explicitly out of scope (do not add without a new ADR)
- CMS or headless content backend
- Micro-frontend architecture
- Monorepo tooling (Nx, Turborepo, etc.)
- Any backend/API beyond an isolated Cloudflare Pages Function for a narrow,
  explicitly-approved need
