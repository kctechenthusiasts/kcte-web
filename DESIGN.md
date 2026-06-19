# KCTE Design System — intent

The AI-facing statement of design intent for the Kansas City Tech Enthusiasts site. The **runtime
source of truth is `src/styles/globals.css`**; the **living, rendered guide is `/brand`**. When this doc
and `globals.css` disagree, `globals.css` wins — update both together.

## Brand in one line

Bright, bold, energetic, **inclusive**, friendly. A community meetup group — warm and low-pressure, not
corporate. Voice is "we → you", one emoji max, genuine exclamation points.

## Stack

Astro 6 (static output, Netlify adapter) · Tailwind CSS v4 (CSS-first `@theme` in `globals.css`) ·
shadcn/ui (React islands) · Lucide icons (`@lucide/astro` in `.astro`, `lucide-react` in islands) ·
Convex + Cloudflare Turnstile for the Topics feature. Package manager **pnpm**; gates run via
**Taskfile** (`task lint:design`, `task check`, `task verify`, `task verify:browsers`).

## Color

Two token layers coexist (Tailwind v4):

1. **Brand ramps** (`@theme`, used directly by components): `primary-50..900` (Electric Blue `#2293D2`),
   `secondary-50..900` / `accent-*` (Bright Pink `#FF1493`), plus `action`/`action-hover`
   (`#FF4B3C`/`#e6432f`), `brand-red` (`#F4402E`), `ink` (`#151718`). Utilities: `bg-primary-600`,
   `text-secondary-700`, `bg-action`, …
2. **Semantic roles** (`:root`/`.dark`, OKLCH, shadcn three-layer): `--primary` = primary-600,
   `--secondary` = secondary-600, `--foreground` = gray-900, `--muted-foreground` = gray-600, `--ring` =
   primary-500, `--destructive` = `#dc2626`, plus additive **status** roles `--success/--warning/--info/
   --error` (+ `-foreground`) for alerts.

**AA contrast nudges (deliberate):** white-on-`primary-500` and white-on-`secondary-500` fail WCAG AA, so
the `--primary`/`--secondary` *roles* and the Button `primary`/`secondary` variants use the **600** step
(4.65:1 / 4.51:1). The vibrant 500s remain available as ramp utilities for decorative/large use.

**Action red is a brand-locked exception.** `#FF4B3C` with white text is 3.32:1 — meets AA for **large/
bold** text (3:1) only. It is **reserved for the single "Meetup / act now" CTA**, always rendered as a
large bold button, and is **never** used for normal-size body text. It is a brand utility (`bg-action`),
intentionally outside the gated semantic-role set.

**Dark mode:** the site ships **light-only**. A `.dark` theme is authored (brand hue held, neutrals
inverted) so the contrast gate passes in both themes and `/brand` has a working preview toggle — but no
site-wide theme switch is shipped.

## Type

- **Inter** — body/UI (`font-sans`). **Poppins** — headings + nav wordmark (`font-display`, bold,
  uppercase wordmark). **Playfair Display** — rare editorial accent (`font-elegant`). Mono stack for code
  (`font-mono`).
- Headings are bold, tight leading, slightly negative tracking. Long-form prose uses `@tailwindcss/
  typography` with `--tw-prose-*` mapped to the semantic tokens (so prose tracks the theme and passes the
  rendered-contrast check).

## Surfaces, shape, motion

- **Cards**: `bg-white rounded-xl shadow-lg border border-gray-100`, hover → `shadow-xl`.
- **Radius**: base `0.5rem` (buttons/inputs), `rounded-xl` cards, `rounded-full` pills/avatars.
- **Hero/CTA bands**: the animated **8s pulsing blue→pink gradient** (`.kcte-hero-gradient` +
  `bg-gradient-to-br from-primary-700 via-primary-400 to-secondary-400`), gated behind
  `prefers-reduced-motion`. Alternate white / `bg-gradient-to-br from-gray-50 to-white` sections.
- **Header**: solid white, sticky, `z-index` above third-party (Meetup) iframes — *not* translucent/
  blurred (the bundle mockup's blur was not adopted; the repo/brand rule wins).

## Components

Reusable KCTE composites live in `src/components/kcte/` (Button, Tag, Avatar, AvatarStack, PersonChip,
StatusPill, Alert, Card, Hero, SectionHead, CTABand, EventCard, ProjectCard). shadcn primitives live in
`src/components/ui/`. Every component is specimened on `/brand`. Style **only** with token utilities —
never arbitrary hex (`task lint:design` fails the build on `bg-[#…]` etc.).

## Pages

Home, About, Events (Meetup iframe embed — the live calendar), Projects, Blog (Astro Content Collection),
Topics (Convex), Contact (Netlify form), plus `/events/[slug]` event-detail and `/brand`.
**Events note:** real events live on Meetup; `/events/[slug]` is a **representative sample template**
(`src/data/events.ts`) until a live event source is wired — it links to Meetup for RSVP.
