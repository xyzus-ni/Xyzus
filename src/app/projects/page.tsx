import React from "react";
import { getProjects } from "@/lib/pocketbase";
import { ProjectsClientList } from "./ProjectsClientList";

export const revalidate = 60;

export const metadata = {
  title: "Portofolio Proyek Rekayasa",
  description:
    "Katalog proyek rekayasa mekatronika, sistem cerdas IoT, simulasi konveyor industri Factory I/O, dan rancang bangun wahana otonom oleh Mahesa Tirtha Agung Permana.",
};

export default async function ProjectsPage() {
  const allProjects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <span>KATALOG KARYA &amp; PROTIK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Portofolio Proyek Rekayasa
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Koleksi proyek perangkat keras, otomasi industri, dan aplikasi sistem cerdas yang telah diselesaikan maupun dalam tahap pengembangan.
        </p>
      </div>

      <ProjectsClientList initialProjects={allProjects} />
    </div>
  );
}
