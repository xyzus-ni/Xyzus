import React from "react";
import { getProjects } from "@/lib/pocketbase";
import { ProjectsContent } from "./ProjectsContent";

export const revalidate = 60;

export const metadata = {
  title: "Portofolio Proyek Rekayasa | Engineering Projects",
  description:
    "Katalog proyek rekayasa mekatronika, sistem cerdas IoT, simulasi konveyor industri Factory I/O, dan rancang bangun wahana otonom oleh Mahesa Tirtha Agung Permana.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Proyek Rekayasa | Projects",
    description: "Katalog proyek engineering XYZUS — embedded, IoT, otomasi industri, dan sistem cerdas.",
    url: "/projects",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const allProjects = await getProjects();

  return <ProjectsContent initialProjects={allProjects} />;
}
