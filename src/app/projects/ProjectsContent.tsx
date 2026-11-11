"use client";

import React from "react";
import { ProjectItem } from "@/lib/types";
import { ProjectsClientList } from "./ProjectsClientList";
import { useLanguage } from "@/lib/i18n/context";

interface ProjectsContentProps {
  initialProjects: ProjectItem[];
}

export function ProjectsContent({ initialProjects }: ProjectsContentProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <span>{t.projects.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.projects.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t.projects.subtitle}
        </p>
      </div>

      <ProjectsClientList initialProjects={initialProjects} />
    </div>
  );
}
