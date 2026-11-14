import React from "react";
import { getProjects, getProfile } from "@/lib/pocketbase";
import { ProjectItem } from "@/lib/types";
import { HomeContent } from "./HomeContent";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProjects, allProjects, profile] = await Promise.all([
    getProjects({ featuredOnly: true }),
    getProjects(),
    getProfile(),
  ]);

  const projects: ProjectItem[] = [...featuredProjects];
  for (const project of allProjects) {
    if (projects.length >= 3) break;
    if (!projects.some((item) => item.slug === project.slug)) {
      projects.push(project);
    }
  }

  return <HomeContent projects={projects.slice(0, 3)} profile={profile} />;
}
