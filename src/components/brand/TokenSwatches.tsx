import { useEffect, useState } from "react";

/**
 * Live token swatch grid for /brand.
 *
 * The cardinal rule of the style guide: NEVER hardcode hex. Every chip below
 * reads the LIVE value of a CSS custom property off <html> via
 * getComputedStyle, so the page can never drift from globals.css. A
 * MutationObserver re-reads when the `dark` class flips, so the toggle
 * previews the authored dark tokens with zero duplicated values.
 */

// Semantic role tokens (the shadcn role layer). Pairs are grouped so the
// foreground sits next to its surface.
const SEMANTIC_TOKENS = [
  "background",
  "foreground",
  "card",
  "popover",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
  "error",
  "error-foreground",
] as const;

// One-line "use for…" notes (prose only — never a source of color values).
const USE_NOTES: Record<string, string> = {
  background: "Page canvas",
  foreground: "Default body text",
  card: "Raised surface / card fill",
  popover: "Floating surface (menus, popovers)",
  primary: "Primary action — Electric Blue",
  "primary-foreground": "Text/icon on primary",
  secondary: "Secondary action — Bright Pink",
  "secondary-foreground": "Text/icon on secondary",
  muted: "Subtle fill / hover surface",
  "muted-foreground": "Secondary / supporting text",
  accent: "Neutral hover / accent surface",
  "accent-foreground": "Text on accent",
  destructive: "Destructive action (delete)",
  border: "Hairline borders & dividers",
  input: "Form control borders",
  ring: "Focus-visible ring",
  success: "Success alert surface",
  "success-foreground": "Text on success",
  warning: "Warning alert surface",
  "warning-foreground": "Text on warning",
  info: "Info alert surface",
  "info-foreground": "Text on info",
  error: "Error alert surface",
  "error-foreground": "Text on error",
};

const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function read(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

interface Resolved {
  semantic: Record<string, string>;
  primaryRamp: Record<number, string>;
  secondaryRamp: Record<number, string>;
}

function readAll(): Resolved {
  const semantic: Record<string, string> = {};
  for (const t of SEMANTIC_TOKENS) semantic[t] = read(`--${t}`);
  const primaryRamp: Record<number, string> = {};
  const secondaryRamp: Record<number, string> = {};
  for (const s of RAMP_STEPS) {
    primaryRamp[s] = read(`--color-primary-${s}`);
    secondaryRamp[s] = read(`--color-secondary-${s}`);
  }
  return { semantic, primaryRamp, secondaryRamp };
}

function Swatch({
  token,
  value,
  note,
}: {
  token: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      data-brand-token={`--${token}`}
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
    >
      <div
        className="h-16 w-full border-b border-border"
        style={{ background: value || "transparent" }}
      />
      <div className="flex flex-col gap-0.5 p-3">
        <code className="font-mono text-xs font-semibold text-foreground">
          --{token}
        </code>
        <span className="font-mono text-[11px] text-muted-foreground break-all">
          {value || "—"}
        </span>
        {note ? (
          <span className="mt-0.5 text-xs text-muted-foreground">{note}</span>
        ) : null}
      </div>
    </div>
  );
}

function RampRow({
  name,
  ramp,
}: {
  name: string;
  ramp: Record<number, string>;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-muted px-3 py-2">
        <code className="font-mono text-xs font-semibold text-foreground">
          --color-{name}-50 … 900
        </code>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10">
        {RAMP_STEPS.map((step) => (
          <div
            key={step}
            data-brand-token={`--color-${name}-${step}`}
            className="flex flex-col"
          >
            <div className="h-12 w-full" style={{ background: ramp[step] }} />
            <div className="flex flex-col items-center gap-0.5 px-1 py-1.5 text-center">
              <span className="font-mono text-[11px] font-semibold text-foreground">
                {step}
              </span>
              <span className="font-mono text-[9px] leading-tight text-muted-foreground">
                {ramp[step]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TokenSwatches() {
  const [resolved, setResolved] = useState<Resolved | null>(null);

  useEffect(() => {
    // Read on mount, then re-read whenever the `dark` class on <html> changes.
    setResolved(readAll());
    const observer = new MutationObserver(() => setResolved(readAll()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Pre-paint placeholder keeps layout stable before the effect runs (SSR).
  if (!resolved) {
    return (
      <div
        className="h-40 animate-pulse rounded-lg border border-border bg-muted"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-foreground">
          Semantic roles
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SEMANTIC_TOKENS.map((t) => (
            <Swatch
              key={t}
              token={t}
              value={resolved.semantic[t]}
              note={USE_NOTES[t]}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-foreground">
          Brand ramps
        </h3>
        <div className="flex flex-col gap-4">
          <RampRow name="primary" ramp={resolved.primaryRamp} />
          <RampRow name="secondary" ramp={resolved.secondaryRamp} />
        </div>
      </div>
    </div>
  );
}
