"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("site_theme") as "light" | "dark";
    if (stored) {
      setTheme(stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default light — "Sovereign Minimalism" light-first
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("site_theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="rounded-md border border-stone bg-surface p-2 text-graphite transition-colors hover:border-teal-ink/50 hover:text-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-ink"
      aria-label={theme === "dark" ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
}
