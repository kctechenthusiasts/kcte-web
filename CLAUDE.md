# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kansas City Tech Enthusiasts (KCTE) community website — Astro 6, Tailwind CSS v4, shadcn/ui, and
TypeScript. Deployed on Netlify. Package manager is **pnpm**.

## Commands

Gates run through a **Taskfile** (go-task); they wrap pnpm.

```bash
pnpm install              # install deps (this dev machine has a global libvips —
                          # if sharp fails to build, run: SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm install)
task dev                  # dev server at http://localhost:4321  (= pnpm dev)
task build                # production build to dist/
task check                # astro check (typecheck)
task lint:design          # static WCAG-AA token-contrast gate (both themes) + off-palette scan
task verify               # check + lint:design + build
task verify:browsers      # Playwright cross-engine x viewport screenshot sweep
npx convex dev            # Convex dev server (required for the Topics feature)
```

## Architecture

**Framework**: Astro 6 (file-based routing, `output: 'static'` + Netlify adapter). React via
`@astrojs/react` for interactive islands (shadcn, Topics, the `/brand` toggle).

**Routes** (`src/pages/`): index, about, events (Meetup iframe embed), `events/[slug]` (sample
event-detail template), projects, blog + `blog/[...slug]`, topics, contact, brand.

**Design system** (see `DESIGN.md` and `decisions/`):
- **`src/styles/globals.css`** is the runtime token source of truth — Tailwind v4 CSS-first `@theme`
  brand ramps (`primary-*`, `secondary-*`, `action`, …) **plus** shadcn semantic roles in OKLCH
  (`:root`/`.dark`/`@theme inline`). Site ships light-only; `.dark` is authored for the gate + `/brand`.
- **`/brand`** is the living, rendered style guide (reads live tokens — can't drift).
- Style **only** with token utilities — never arbitrary hex (`task lint:design` fails on `bg-[#…]`).
- `action` (`#FF4B3C`) is reserved for the large/bold "Meetup" CTA only.

**Components**:
- `src/components/kcte/` — composites (Button, Tag, Avatar/Stack, PersonChip, StatusPill, Alert, Card,
  Hero, SectionHead, CTABand, EventCard, ProjectCard).
- `src/components/ui/` — shadcn primitives (`@/components/ui`, `@/*` → `src/*`).
- `src/components/layout/` — Header.astro, Footer.astro. `src/layouts/BaseLayout.astro` wraps all pages.
- Icons: **Lucide** — `@lucide/astro` in `.astro`, `lucide-react` in islands. Named imports only.

**Content**: Blog uses an Astro **Content Collection** (`src/content.config.ts`, posts in
`src/content/blog/`). Projects/events sample data in `src/data/`.

**Styling palette**: Primary electric blue `#2293D2`, secondary/accent bright pink `#FF1493`, action red
`#FF4B3C`. Fonts: Inter (sans), Poppins (display), Playfair Display (elegant). The 8s pulsing hero
gradient is `.kcte-hero-gradient` (honors `prefers-reduced-motion`).

**Forms**: Contact form uses Netlify Forms (`data-netlify`).

**Topics Feature** (`/topics`):
- Backend: Convex (real-time database) — schema and functions in `convex/`
- Bot protection: Cloudflare Turnstile (verified by `netlify/functions/verify-turnstile.ts`)
- React components in `src/components/topics/`
- Rate limiting via `@convex-dev/rate-limiter`
- Anonymous voting via browser fingerprint (`src/lib/fingerprint.ts`)

**Deployment**: Automatic via Netlify on push to main (config in `netlify.toml`).
