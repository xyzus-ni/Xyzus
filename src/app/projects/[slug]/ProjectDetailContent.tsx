"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/lib/types";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { BlueprintDiagram } from "@/components/BlueprintDiagram";
import { ControlLogicFlow } from "@/components/ControlLogicFlow";
import { ProjectVideoHero } from "@/components/ProjectVideoHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TechLabel } from "@/components/ui/TechLabel";
import { useLanguage } from "@/lib/i18n/context";
import { projectCode } from "@/lib/utils";
import { projectStageLabel } from "@/lib/status";
import { getFileUrl } from "@/lib/pocketbase";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Video,
} from "lucide-react";

interface ProjectDetailContentProps {
  project: ProjectItem;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { t, locale } = useLanguage();

  const narrative =
    t.home.cases[project.slug as keyof typeof t.home.cases];

  const isLocalVideo = !!project.video_url?.startsWith("/");
  const hasLinks = !!(
    project.repo_url ||
    project.demo_url ||
    (project.video_url && !isLocalVideo)
  );

  return (
    <article className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Back */}
      <Link
        href="/projects"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-teal-ink transition-colors hover:text-graphite"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.projects.back_to_projects}
      </Link>

      {/* Header */}
      <header className="border-b border-stone pb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <TechLabel>{projectCode(project.order)}</TechLabel>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/60">
            {projectStageLabel(t, project)}
          </span>
          {locale === "en" && (
            <span className="rounded-sm border border-terracotta/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-terracotta-ink">
              {t.projects.available_in_id_only}
            </span>
          )}
        </div>

        <h1 className="mt-4 font-serif text-display-md text-graphite">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lead text-graphite/70">
          {project.summary}
        </p>

        {project.tech?.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-sm border border-stone bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-graphite/70"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {hasLinks && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.repo_url && (
              <Button href={project.repo_url} external variant="secondary" size="sm">
                <Github className="h-4 w-4" />
                {t.projects.source_code}
              </Button>
            )}
            {project.demo_url && (
              <Button href={project.demo_url} external size="sm">
                <ExternalLink className="h-4 w-4" />
                {t.projects.open_demo}
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Hero video: file lokal /videos/* dirender sebagai pemutar HTML5 sinematik */}
      {isLocalVideo && project.video_url && (
        <div className="py-10">
          <ProjectVideoHero
            src={project.video_url}
            poster={project.video_url.replace(/\.mp4$/, "-poster.jpg")}
            title={project.title}
          />
        </div>
      )}

      {/* Media proyek: hanya dirender bila aset cover tersedia */}
      {project.cover && (
        <figure className="py-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFileUrl("projects", project.id ?? "", project.cover)}
            alt={project.title}
            className="w-full rounded-md border border-stone object-cover"
            loading="lazy"
          />
        </figure>
      )}

      {/* Studi kasus: masalah → solusi → hasil (bila ada narasi di kamus) */}
      {narrative && (
        <section className="py-10">
          <TechLabel as="h2" className="mb-6 block">
            {t.projects.case_title}
          </TechLabel>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {(
              [
                [t.home.case_problem, narrative.problem],
                [t.home.case_solution, narrative.solution],
                [t.home.case_result, narrative.result],
              ] as const
            ).map(([label, body]) => (
              <Card key={label}>
                <TechLabel as="h3" className="mb-3 block">
                  {label}
                </TechLabel>
                <p className="text-sm leading-relaxed text-graphite/75">{body}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Spesifikasi */}
      <section className="py-10">
        <TechLabel as="h2" className="mb-6 block">
          {t.projects.spec_title}
        </TechLabel>
        <Card>
          <dl className="divide-y divide-stone/60">
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/50">
                {t.projects.spec_id}
              </dt>
              <dd className="font-mono text-xs text-teal-ink">
                {projectCode(project.order)}
              </dd>
            </div>
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/50">
                {t.projects.spec_status}
              </dt>
              <dd className="font-mono text-xs text-teal-ink">
                {projectStageLabel(t, project)}
              </dd>
            </div>
            <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/50">
                {t.projects.spec_stack}
              </dt>
              <dd className="text-right font-mono text-xs text-teal-ink">
                {project.tech?.join(" · ") || "—"}
              </dd>
            </div>
            {hasLinks && (
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/50">
                  {t.projects.spec_links}
                </dt>
                <dd className="flex flex-wrap justify-end gap-3 font-mono text-xs">
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-ink underline-offset-4 hover:underline"
                    >
                      repo ↗
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-ink underline-offset-4 hover:underline"
                    >
                      demo ↗
                    </a>
                  )}
                  {project.video_url && !isLocalVideo && (
                    <a
                      href={project.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-ink underline-offset-4 hover:underline"
                    >
                      video ↗
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </Card>
      </section>

      {/* Diagram blueprint */}
      <section className="py-10">
        <TechLabel as="h2" className="mb-6 block">
          {t.projects.arch_title}
        </TechLabel>
        <div className="rounded-md border border-stone bg-surface p-4 sm:p-6">
          {project.slug === "industrial-control-logic" ? (
            <ControlLogicFlow />
          ) : (
            <BlueprintDiagram />
          )}
        </div>
      </section>

      {/* Video demo (embed eksternal; video lokal sudah tampil sebagai hero) */}
      {project.video_url && !isLocalVideo && (
        <section className="py-10">
          <div className="mb-4 flex items-center gap-2">
            <Video className="h-4 w-4 text-teal-ink" />
            <TechLabel as="h2">{t.projects.video_demo}</TechLabel>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-md border border-stone bg-graphite">
            <iframe
              src={project.video_url}
              title={project.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Deskripsi markdown */}
      {project.description && (
        <section className="border-t border-stone py-10">
          <MarkdownRenderer content={project.description} />
        </section>
      )}

      {/* CTA kontak */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-stone pt-8 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-serif text-title-md text-graphite">
            {t.projects.cta_heading}
          </h3>
          <p className="mt-1 text-sm text-graphite/60">{t.projects.cta_sub}</p>
        </div>
        <Button href="/contact" size="sm">
          {t.projects.cta_button}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
