"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggle = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  const nextLanguageLabel = locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia";

  return (
    <button
      onClick={toggle}
      type="button"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      aria-label={`${nextLanguageLabel} (Aktif: ${locale.toUpperCase()})`}
      title={nextLanguageLabel}
    >
      <Globe className="w-3.5 h-3.5 text-cyan-500" />
      <span className="uppercase font-semibold tracking-wider">
        {locale === "id" ? "ID" : "EN"}
      </span>
    </button>
  );
}
