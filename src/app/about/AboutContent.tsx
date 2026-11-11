"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import {
  GraduationCap,
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* HEADER SECTION */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <span>{t.about.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.about.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* STORY SECTION */}
      <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>{t.about.story_title}</span>
        </h2>
        <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>{t.about.story_p1}</p>
          <p>{t.about.story_p2}</p>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.about.education_title}</h2>
            <p className="text-xs text-slate-500 font-mono">{t.about.education_subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span className="font-semibold">{t.about.higher_education}</span>
              <span>{t.about.higher_period}</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.about.atmi_title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.about.atmi_major}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              {t.about.atmi_desc}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
              <span className="font-semibold">{t.about.vocational_education}</span>
              <span>{t.about.vocational_period}</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.about.smk_title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.about.smk_major}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              {t.about.smk_desc}
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & ORGANIZATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.about.organization_title}</h2>
            <p className="text-xs text-slate-500 font-mono">{t.about.organization_subtitle}</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-2 gap-1">
            <span className="font-semibold uppercase">{t.about.senat_badge}</span>
            <span>{t.about.senat_period}</span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {t.about.senat_role}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {t.about.senat_desc}
          </p>
        </div>
      </section>

      {/* PKL INTERNSHIP TIMELINE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.about.internship_title}
            </h2>
            <p className="text-xs text-slate-500 font-mono">{t.about.internship_subtitle}</p>
          </div>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-8">
          {/* QA Role */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-[#0b0f19]" />
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-1">
              <span className="font-semibold">{t.about.roles.qa_badge}</span>
              <span>&bull; {t.about.roles.qa_sub}</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.about.roles.qa_title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {t.about.roles.qa_desc}
            </p>
          </div>

          {/* IT Support / Networking */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#0b0f19]" />
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">
              <span className="font-semibold">{t.about.roles.it_badge}</span>
              <span>&bull; {t.about.roles.it_sub}</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.about.roles.it_title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {t.about.roles.it_desc}
            </p>
          </div>

          {/* Purchasing */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white dark:ring-[#0b0f19]" />
            <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 mb-1">
              <span className="font-semibold">{t.about.roles.purchasing_badge}</span>
              <span>&bull; {t.about.roles.purchasing_sub}</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.about.roles.purchasing_title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {t.about.roles.purchasing_desc}
            </p>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{t.about.cta_heading}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.about.cta_sub}</p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-sm"
        >
          <span>{t.about.cta_button}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
