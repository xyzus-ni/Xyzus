"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
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
      // Default dark mode bertema teknik
      document.documentElement.classList.add("dark");
      setTheme("dark");
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
      className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
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
