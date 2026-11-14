"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem, ProfileData, ProjectStatus } from "@/lib/types";
import { projectCode } from "@/lib/utils";
import { projectStageLabel } from "@/lib/status";
import { whatsappUrl, defaultWhatsappMessage } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n/context";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TechLabel } from "@/components/ui/TechLabel";
import { ArrowRight, ArrowUpRight, FlaskConical, Radio, Cpu, LayoutDashboard, Bot } from "lucide-react";

interface HomeContentProps {
  projects: ProjectItem[];
  profile: ProfileData;
}

const SERVICE_ICONS = [Radio, LayoutDashboard, Bot] as const;

const STATUS_DOT: Record<ProjectStatus, string> = {
  selesai: "bg-sage",
  "pengembangan": "bg-terracotta",
  "kompetisi/paper": "bg-stone",
  aktif: "bg-signal",
};



export function HomeContent({ projects, profile }: HomeContentProps) {
  const { t, locale } = useLanguage();

  const whatsappHref = whatsappUrl(defaultWhatsappMessage(locale));

  const statusLabel = (project: ProjectItem) =>
    projectStageLabel(t, project);

  return (
    <div className="flex flex-col">
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-stone bg-grid">
        <div className="mx-auto w-full max-w-shell px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <TechLabel className="mb-6 block">
                {t.home.eyebrow}
              </TechLabel>

              <h1 className="font-serif text-display-xl text-graphite">
                {t.home.headline}
              </h1>

              <p className="mt-6 max-w-xl text-lead text-graphite/70">
                {t.home.subheadline}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappHref} external size="lg">
                  {t.home.cta_whatsapp}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="#works" variant="secondary" size="lg">
                  {t.home.cta_projects}
                </Button>
              </div>
            </div>

            {/* Spec plate — label teknis ala dokumentasi lab */}
            <aside className="lg:col-span-4">
              <Card code="SYS-001" meta={t.home.hero_system} className="h-full">
                <dl className="space-y-4 font-mono text-xs">
                  <div className="flex items-baseline justify-between gap-3 border-b border-stone/60 pb-3">
                    <dt className="uppercase tracking-[0.14em] text-graphite/50">
                      Stack
                    </dt>
                    <dd className="text-right text-teal-ink">
                      Embedded · Cloud · Web
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-b border-stone/60 pb-3">
                    <dt className="uppercase tracking-[0.14em] text-graphite/50">
                      Output
                    </dt>
                    <dd className="text-right text-teal-ink">
                      Sensor → Dashboard
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="uppercase tracking-[0.14em] text-graphite/50">
                      Mode
                    </dt>
                    <dd className="flex items-center gap-2 text-teal-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      {t.home.hero_availability}
                    </dd>
                  </div>
                </dl>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 2. LAYANAN ──────────────────────────────────────── */}
      <Section eyebrow={t.home.services_eyebrow} title={t.home.services_title} description={t.home.services_subtitle}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.home.services.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Cpu;
            return (
              <Card key={service.title} code={`SVC-00${index + 1}`}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-stone bg-ivory text-teal-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-title-md text-graphite">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/70">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ── 2b. KEPEMILIKAN PENUH (handover promises) ────────── */}
      <Section eyebrow={t.home.handover_eyebrow} title={t.home.handover_title} description={t.home.handover_subtitle}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.handover_items.map((item, i) => (
            <Card key={item.title} code={`HND-00${i + 1}`} className="h-full">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">
                {item.description}
              </p>
            </Card>
          ))}
          <Card code="HND-006" className="flex h-full flex-col justify-center border-dashed">
            <p className="font-mono text-xs leading-relaxed text-graphite/60">
              {t.home.hero_availability}
            </p>
          </Card>
        </div>
      </Section>

      {/* ── 3. SELECTED WORKS ───────────────────────────────── */}
      <Section
        id="works"
        eyebrow={t.home.works_eyebrow}
        title={t.home.works_title}
        description={t.home.works_subtitle}
        grid
      >
        {projects.length === 0 ? (
          <p className="font-mono text-sm text-graphite/60">{t.home.works_empty}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const narrative =
                  t.home.cases[project.slug as keyof typeof t.home.cases];
                return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-ink"
                >
                  <Card
                    code={projectCode(project.order)}
                    meta={statusLabel(project)}
                    className="h-full transition-colors group-hover:border-teal-ink/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-title-md leading-snug text-graphite transition-colors group-hover:text-teal-ink">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-graphite/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-ink" />
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite/70">
                      {project.summary}
                    </p>
                    {project.tech?.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((tech) => (
                          <li
                            key={tech}
                            className="rounded-sm border border-stone bg-ivory px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-graphite/60"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                    {narrative?.result && (
                      <p className="mt-4 border-l-2 border-terracotta/60 pl-3 text-sm leading-relaxed text-graphite/70">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-ink">
                          {t.home.case_result} —{" "}
                        </span>
                        {narrative.result}
                      </p>
                    )}
                    <div className="mt-5 flex items-center gap-2 border-t border-stone/60 pt-4">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status] ?? "bg-stone"}`}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/60">
                        {t.home.works_detail} →
                      </span>
                    </div>
                  </Card>
                </Link>
                );
              })}
            </div>
            <div className="mt-8">
              <Button href="/projects" variant="secondary">
                {t.home.works_view_all}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </Section>

      {/* ── 3b. FILOSOFI ENGINEERING ────────────────────────── */}
      <Section eyebrow={t.home.philosophy_eyebrow} title={t.home.philosophy_title}>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.philosophy_principles.map((p, i) => (
            <li key={p.title} className="border-l-2 border-terracotta/60 pl-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal-ink">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-serif text-title-md text-graphite">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                {p.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 4. LAB ──────────────────────────────────────────── */}
      <Section eyebrow={t.home.lab_eyebrow} title={t.home.lab_title} description={t.home.lab_subtitle}>
        <Card code="LAB-001" meta={t.home.lab_status} className="max-w-2xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-stone bg-ivory text-teal-ink">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <TechLabel className="mt-1 block">
                  nusantara-alchemist.vercel.app
                </TechLabel>
              </div>
            </div>
            <Button href="/lab" className="shrink-0">
              {t.home.lab_cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </Section>

      {/* ── 5. CARA KERJA ───────────────────────────────────── */}
      <Section eyebrow={t.home.work_eyebrow} title={t.home.work_title} description={t.home.work_subtitle}>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.work_steps.map((step, i) => (
            <li key={step.title}>
              <Card code={`WRK-00${i + 1}`} className="h-full">
                <h3 className="font-serif text-title-md text-graphite">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/70">
                  {step.description}
                </p>
                <p className="mt-3 border-t border-stone/60 pt-3 font-mono text-[11px] leading-relaxed text-teal-ink">
                  {t.home.work_handoffs[i]}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 6. TENTANG ───────────────────────────────────────── */}
      <Section eyebrow={t.home.about_eyebrow} title={t.home.about_title}>
        <div className="max-w-3xl">
          <p className="text-lead leading-relaxed text-graphite/80">{profile.bio}</p>
          <div className="mt-6">
            <Button href="/about" variant="ghost" size="sm">
              {t.home.about_link}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* ── 6. KONTAK ────────────────────────────────────────── */}
      <Section eyebrow={t.home.contact_eyebrow} title={t.home.contact_title} description={t.home.contact_subtitle}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={whatsappHref} external size="lg">
            {t.home.cta_whatsapp}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            {t.contact.form_title}
          </Button>
        </div>
        <p className="mt-5 font-mono text-xs text-graphite/50">{t.home.whatsapp_note}</p>
      </Section>
    </div>
  );
}
