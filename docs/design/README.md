# Design system docs

The KCTE design system, in three places:

- **`/brand`** — the living, rendered style guide (color, type, spacing, every component & state). Reads
  live tokens, so it can never drift. Linked from the site footer.
- **`/DESIGN.md`** (repo root) — the AI-facing statement of intent (palette, type, voice, the rules
  tokens can't capture).
- **`/src/styles/globals.css`** — the runtime source of truth (Tailwind v4 `@theme` brand ramps + shadcn
  semantic-role tokens in OKLCH, light + authored dark).

Design-system decisions are recorded as DDRs in **`/decisions/`** (see `0001-…`), versioned with SemVer.

## Gates

- `task lint:design` — static WCAG-AA token-contrast check (both themes) + off-palette scan.
- `task verify` — typecheck + design gate + build.
- `task verify:browsers` — Playwright cross-engine (Chromium/Firefox/WebKit) × viewport screenshot sweep
  with a no-horizontal-overflow assertion (`tests/screenshots.spec.ts`).

The original Claude Design handoff bundle lived under `docs/design/handoff-kcte-design-system/` and was
removed after sign-off (the durable records are the merged code, `/brand`, `DESIGN.md`, and the DDR).
