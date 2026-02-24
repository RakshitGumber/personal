import { useEffect, useState } from "react";

type ThemeMode = "dark" | "midnight";

const storageKey = "portfolio-theme";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as ThemeMode | null;
    const nextMode = stored === "midnight" ? "midnight" : "dark";
    setMode(nextMode);
    document.documentElement.dataset.theme = nextMode;
  }, []);

  const toggle = () => {
    const nextMode: ThemeMode = mode === "dark" ? "midnight" : "dark";
    setMode(nextMode);
    localStorage.setItem(storageKey, nextMode);
    document.documentElement.dataset.theme = nextMode;
  };

  return (
    <button type="button" className="border border-line px-2 py-1 text-xs text-muted hover:text-text" onClick={toggle}>
      theme: {mode}
    </button>
  );
}
