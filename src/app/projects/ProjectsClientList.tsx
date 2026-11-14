"use client";

import React, { useState, useMemo } from "react";
import { ProjectItem } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/lib/i18n/context";
import { projectStage, type ProjectStage } from "@/lib/status";
import { Search } from "lucide-react";

interface ProjectsClientListProps {
  initialProjects: ProjectItem[];
}

const STAGES: ProjectStage[] = [
  "field_tested",
  "simulation_validated",
  "prototype",
  "in_development",
  "research",
];

const STAGE_LABEL_KEYS: Record<ProjectStage, string> = {
  field_tested: "status_field_tested",
  simulation_validated: "status_simulation",
  prototype: "status_prototype",
  in_development: "status_dev",
  research: "status_research",
};

export function ProjectsClientList({ initialProjects }: ProjectsClientListProps) {
  const { t } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const stageLabel = (stage: ProjectStage) =>
    t.projects[STAGE_LABEL_KEYS[stage] as keyof typeof t.projects] as string;

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      if (selectedStage !== "all" && projectStage(project) !== selectedStage) {
        return false;
      }
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
  }, [initialProjects, selectedStage, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-stone bg-surface">
        {/* Stage Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedStage("all")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedStage === "all"
                ? "bg-teal-ink text-ivory font-semibold"
                : "text-graphite/70 hover:bg-stone/50"
            }`}
          >
            {t.projects.filter_all} ({initialProjects.length})
          </button>
          {STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                selectedStage === stage
                  ? "bg-teal-ink text-ivory font-semibold"
                  : "text-graphite/70 hover:bg-stone/50"
              }`}
            >
              {stageLabel(stage)}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-graphite/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.search_placeholder}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-stone bg-surface text-graphite placeholder-graphite/40 text-xs focus:border-teal-ink focus:ring-1 focus:ring-teal-ink"
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
        <div className="p-12 text-center rounded-xl border border-dashed border-stone text-graphite/60 font-mono text-sm space-y-2">
          <p>{t.projects.empty}</p>
          <button
            onClick={() => {
              setSelectedStage("all");
              setSearchQuery("");
            }}
            type="button"
            className="text-xs text-teal-ink hover:underline"
          >
            {t.projects.reset_filter}
          </button>
        </div>
      )}
    </div>
  );
}
