"use client";

import React, { useState, useMemo } from "react";
import { ProjectItem } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/lib/i18n/context";
import { Search } from "lucide-react";

interface ProjectsClientListProps {
  initialProjects: ProjectItem[];
}

export function ProjectsClientList({ initialProjects }: ProjectsClientListProps) {
  const { t } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Status Filter
      if (selectedStatus !== "all" && project.status !== selectedStatus) {
        return false;
      }
      // 2. Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesSummary = project.summary.toLowerCase().includes(q);
        const matchesTech = project.tech?.some((item) => item.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTech) {
          return false;
        }
      }
      return true;
    });
  }, [initialProjects, selectedStatus, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedStatus("all")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedStatus === "all"
                ? "bg-cyan-600 text-white font-semibold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {t.projects.filter_all} ({initialProjects.length})
          </button>
          <button
            onClick={() => setSelectedStatus("selesai")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedStatus === "selesai"
                ? "bg-emerald-600 text-white font-semibold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {t.projects.status_completed}
          </button>
          <button
            onClick={() => setSelectedStatus("pengembangan")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedStatus === "pengembangan"
                ? "bg-amber-600 text-white font-semibold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {t.projects.status_dev}
          </button>
          <button
            onClick={() => setSelectedStatus("kompetisi/paper")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedStatus === "kompetisi/paper"
                ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {t.projects.status_paper}
          </button>
        </div>

        {/* Search input */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.search_placeholder}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-sm space-y-2">
          <p>{t.projects.empty}</p>
          <button
            onClick={() => {
              setSelectedStatus("all");
              setSearchQuery("");
            }}
            type="button"
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            {t.projects.reset_filter}
          </button>
        </div>
      )}
    </div>
  );
}
