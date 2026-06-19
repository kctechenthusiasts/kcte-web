import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Brand-page theme toggle. Flips the `dark` class on <html> so every
 * specimen on /brand can be previewed in both the light (shipped) and the
 * authored dark token sets. KCTE ships light-only; this is a preview control.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync initial state with whatever class is already on <html>.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      data-brand-theme-toggle
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{isDark ? "Light" : "Dark"} preview</span>
    </button>
  );
}
