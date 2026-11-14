import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/pocketbase";
import { ProjectDetailContent } from "./ProjectDetailContent";

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

  const url = `/projects/${project.slug}`;
  return {
    title: `${project.title} | XYZUS Projects`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
