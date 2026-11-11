import React from "react";
import Link from "next/link";
import { getProjects, getPosts } from "@/lib/pocketbase";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import {
  ArrowRight,
  Cpu,
  Layers,
  Wrench,
  Boxes,
  Sparkles,
  CheckCircle,
  Briefcase,
  Terminal,
} from "lucide-react";

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [featuredProjects, latestPostsRes] = await Promise.all([
    getProjects({ featuredOnly: true }),
    getPosts({ page: 1, perPage: 3 }),
  ]);

  const projects = featuredProjects.slice(0, 3);
  const posts = latestPostsRes.items.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 tech-grid-bg border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>D4 MEKATRONIKA &bull; POLITEKNIK INDUSTRI ATMI</span>
            </div>

            {/* Main Greeting & Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Mahesa Tirtha <br />
              <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
                Agung Permana
              </span>
            </h1>

            {/* Headline Subtitle */}
            <p className="mt-4 text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
              Mechatronics &amp; IoT Engineer
            </p>

            {/* Value Proposition */}
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Membangun sistem cerdas end-to-end dari perancangan mikrokontroler fisik (<span className="text-cyan-600 dark:text-cyan-400 font-mono font-medium">sensor</span>) menuju infrastruktur cloud (<span className="text-cyan-600 dark:text-cyan-400 font-mono font-medium">cloud</span>) hingga visualisasi interaktif (<span className="text-cyan-600 dark:text-cyan-400 font-mono font-medium">dashboard</span>).
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Lihat Proyek Rekayasa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 font-medium text-sm hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Hubungi Saya</span>
              </Link>
            </div>

            {/* Quick Metrics Cards */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm">
                <div className="text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-400">8</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proyek Rekayasa</div>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm">
                <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">Open</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Freelance / Kolaborasi</div>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">ATMI</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">D4 Mekatronika &amp; Robotika</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Kompetensi Teknis</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Keahlian Rekayasa &amp; Teknologi
            </h3>
          </div>
          <Link
            href="/skills"
            className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua Keahlian</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/70">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Embedded &amp; IoT</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Raspberry Pi, ESP32, arsitektur sensor-to-cloud, kalibrasi analog ADC, komunikasi serial MQTT/Modbus.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/70">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Software &amp; Web</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Python, Flask, Next.js, Docker, PocketBase, sistem dashboard analitik, dan integrasi API multi-agen.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/70">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Otomasi &amp; Industri</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              PLC Omron (Ladder Logic), simulasi Factory I/O, kalkulasi OEE pabrik, solder elektronik presisi, QC manufaktur.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/70">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Desain &amp; CAD</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pemodelan 3D SolidWorks, analisis tegangan struktur, drafting toleransi mekanik, dan rendering berbasis AI.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Unggulan Portofolio</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              3 Proyek Pilihan Terbaru
            </h3>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua 8 Proyek →</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} />
          ))}
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publikasi &amp; Paper</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Karya Tulis &amp; Catatan Teknis Terbaru
            </h3>
          </div>
          <Link
            href="/blog"
            className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Kunjungi Ruang Publikasi Blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 font-mono text-sm">
            Belum ada artikel publikasi yang diterbitkan.
          </div>
        )}
      </section>

      {/* HIRE ME / COLLABORATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-[#0b172a] to-cyan-950/40 p-8 sm:p-12 text-white overflow-hidden shadow-xl shadow-cyan-500/5">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <Cpu className="w-96 h-96 text-cyan-400" />
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Siap Berkolaborasi</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Membutuhkan Solusi IoT, Otomasi Mesin, atau Dashboard Industri?
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya terbuka untuk proyek berbayar, freelance, pembuatan prototipe embedded, integrasi PLC Omron, maupun pengembangan dashboard monitoring real-time berbasis web. Mari diskusikan ide Anda!
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Ajak Kolaborasi Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
