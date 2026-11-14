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
      className="flex items-center gap-1.5 rounded-md border border-stone bg-surface px-2.5 py-1.5 font-mono text-xs font-medium text-graphite transition-colors hover:border-teal-ink/50 hover:text-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-ink"
      aria-label={`${nextLanguageLabel} (Aktif: ${locale.toUpperCase()})`}
      title={nextLanguageLabel}
    >
      <Globe className="h-3.5 w-3.5 text-teal-ink" />
      <span className="uppercase font-semibold tracking-wider">
        {locale === "id" ? "ID" : "EN"}
      </span>
    </button>
  );
}
