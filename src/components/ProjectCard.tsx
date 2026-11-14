"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { ExternalLink, Github, Video, ArrowRight } from "lucide-react";
import { projectStage, projectStageLabel } from "@/lib/status";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, locale } = useLanguage();

  const stage = projectStage(project);
  const stageStyles: Record<string, string> = {
    field_tested: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/80",
    simulation_validated: "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/80",
    prototype: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    in_development: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/80",
    research: "bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/80",
  };
  const stageDots: Record<string, string> = {
    field_tested: "bg-emerald-500",
    simulation_validated: "bg-teal-500",
    prototype: "bg-slate-400",
    in_development: "bg-amber-500 animate-pulse",
    research: "bg-violet-500",
  };

  const getStatusBadge = () => (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${stageStyles[stage]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${stageDots[stage]}`} />
      {projectStageLabel(t, project)}
    </span>
  );

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827]/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-cyan-500/5 group overflow-hidden">
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {getStatusBadge()}
            <div className="flex items-center gap-1 text-slate-400">
              {project.video_url && (
                <span title={t.projects.video_demo}>
                  <Video className="w-4 h-4 text-cyan-500" />
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech tags */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech?.slice(0, 4).map((techItem, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
              >
                {techItem}
              </span>
            ))}
            {project.tech?.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:underline"
            >
              <span>{t.projects.view_detail}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="flex items-center gap-2">
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors"
                  title="Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
