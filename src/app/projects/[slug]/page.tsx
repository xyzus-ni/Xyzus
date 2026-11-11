import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/pocketbase";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Video,
  Layers,
  Calendar,
} from "lucide-react";

export const revalidate = 60;

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Proyek Tidak Ditemukan" };

  return {
    title: `${project.title} | Proyek Rekayasa`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Proyek</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
            {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech?.map((t, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Lihat Source Code (GitHub)</span>
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka Demo Interaktif</span>
            </a>
          )}
        </div>
      </div>

      {/* Video Demonstration Embed Slot */}
      {project.video_url && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <Video className="w-4 h-4 text-cyan-500" />
            <span>Video Demonstrasi Simulasi &amp; Sistem</span>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-md">
            <iframe
              src={project.video_url}
              title={project.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Markdown Description */}
      {project.description && (
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <MarkdownRenderer content={project.description} />
        </section>
      )}

      {/* Bottom CTA to Contact */}
      <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Ingin Mengembangkan Sistem Serupa?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Hubungi saya untuk mendiskusikan integrasi perangkat keras maupun perangkat lunak.</p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono transition-colors"
        >
          Ajak Kolaborasi Proyek
        </Link>
      </div>
    </article>
  );
}
