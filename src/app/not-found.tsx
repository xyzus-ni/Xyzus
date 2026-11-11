"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <div className="w-14 h-14 mx-auto rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
            {t.notFound.badge}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {t.notFound.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t.notFound.desc}
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.notFound.back_home}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
