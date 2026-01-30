# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kansas City Tech Enthusiasts (KCTE) community website built with Astro, Tailwind CSS, and TypeScript. Deployed on Netlify.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npx convex dev   # Start Convex dev server (required for topics feature)
```

No test or lint commands are configured.

## Architecture

**Framework**: Astro 4.x static site generator with file-based routing

**Key directories**:
- `src/pages/` - Routes (index, about, events, contact, topics)
- `src/components/layout/` - Header.astro, Footer.astro
- `src/components/ui/` - Reusable components (Button, Card, Input, Textarea)
- `src/layouts/BaseLayout.astro` - Master layout wrapper for all pages
- `src/config/site.ts` - Site name, description, social links
- `public/` - Static assets

**Styling**: Tailwind CSS with custom color palette defined in `tailwind.config.mjs`:
- Primary: Electric blue (#2293D2)
- Secondary/Accent: Bright pink (#FF1493)
- Fonts: Inter (sans), Poppins (display), Playfair Display (elegant)

**Forms**: Contact form uses Netlify Forms integration

**Topics Feature** (`/topics`):
- Backend: Convex (real-time database) - schema and functions in `convex/`
- Bot protection: Cloudflare Turnstile
- React components in `src/components/topics/`
- Rate limiting via `@convex-dev/rate-limiter`
- Anonymous voting via browser fingerprint (`src/lib/fingerprint.ts`)

**Deployment**: Automatic via Netlify on push to main (config in `netlify.toml`)
