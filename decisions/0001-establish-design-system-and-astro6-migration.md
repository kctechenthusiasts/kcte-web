# DDR 0001 — Establish the KCTE design system & migrate to Astro 6 + Tailwind v4 + shadcn

- **Status:** Accepted
- **Version:** design-system **v1.0.0** (establish)
- **Date:** 2026-06-18

## Context

A finished design from Claude Design was handed off (`docs/design/handoff-kcte-design-system/`). The
brand was reverse-engineered from this repo, so the tokens already matched, but the repo had **no formal
design system**: `global.css` held only unused shadcn HSL defaults, there was no component library, no
`/brand`, and no contrast gate. The handoff also asked to modernize the stack and adopt shadcn/ui. We
followed the installed **design-handoff** skill, adapted to this repo.

## Decision

Stand up the canonical design system and migrate the stack, in one change:

1. **Stack migration:** Astro 4 → **6** (`output: 'hybrid'` → `'static'`); Tailwind v3 → **v4**
   (drop `@astrojs/tailwind`, add `@tailwindcss/vite`, delete `tailwind.config.mjs`, CSS-first `@theme`);
   **npm → pnpm**; add **shadcn/ui** (`components.json`, `@/*` alias) and **Lucide**. Gates run through a
   new **Taskfile**.
2. **Token architecture:** dual-layer in `globals.css` — brand **numbered ramps** under `@theme`
   (`bg-primary-600`, …) **plus** the shadcn **semantic-role** three-layer (`:root`/`.dark`/
   `@theme inline`) in **OKLCH**. Roles map onto ramp steps by role.
3. **Additive semantic tokens:** `--success/--warning/--info/--error` (+ `-foreground`) for the Alert
   component — a deliberate, documented extension (they are roles, recur, and appear on `/brand`).
4. **Action-red exception:** `#FF4B3C` stays a brand utility (`bg-action`), **not** a gated role, used
   only for the large/bold Meetup CTA (3:1 large-text basis). Documented in `DESIGN.md`.
5. **Light-only with authored `.dark`:** ship light-only; author `.dark` so the static gate passes in
   both themes and `/brand` can preview it.
6. **Quality gates:** `scripts/check-contrast.mjs` (WCAG-AA static gate, both themes) + an off-palette
   scan via `task lint:design`; Playwright cross-engine/viewport sweep via `task verify:browsers`.

## Consequences

- `src/styles/globals.css` is the runtime token source of truth; `/brand` is the living guide; this DDR +
  `DESIGN.md` carry intent. Any token/brand change updates `globals.css` **and** `/brand` together.
- Contrast forced `--primary`/`--secondary` to the 600 ramp step (4.65:1 / 4.51:1) — slightly darker than
  the mockups' 500s. Accepted for accessibility.
- **Vendor lock-in (flagged, not blocking):** Convex (backend, FSL→Apache, self-hostable) and Cloudflare
  Turnstile remain as-is. Tailwind/shadcn are low lock-in (source is copied into the repo).
- Future system changes get a new DDR + SemVer bump.

## Licensing (commercial-use gate)

Inter / Poppins / Playfair Display = **OFL** ✓. Lucide = **ISC** ✓. Social glyphs (Signal/Discord/GitHub/
LinkedIn) are official marks used nominatively for linking ✓. **Flagged:** the KCTE logo is a hand-drawn/
AI-influenced mark — purely AI output isn't copyrightable in the US (but is trademark-able); recommend a
human-authored refinement + a clearance search before treating it as fully protected. (Not legal advice.)
