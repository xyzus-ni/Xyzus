import React from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Wrench,
  Boxes,
  CheckCircle2,
  Terminal,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Keahlian & Kompetensi Teknis",
  description:
    "Keahlian teknis Mahesa Tirtha Agung Permana dalam bidang Embedded Systems, IoT, Software Web, Otomasi PLC Omron, dan Desain CAD SolidWorks.",
};

export default function SkillsPage() {
  const skillGroups = [
    {
      category: "Embedded Systems & IoT",
      icon: Cpu,
      accent: "text-cyan-500",
      description: "Perancangan arsitektur mikrokontroler, akuisisi sensor, dan komunikasi data awan.",
      skills: [
        { name: "Raspberry Pi & Single Board Computers", level: "Lanjutan", detail: "Linux OS, GPIO interfacing, kamera OpenCV, audio synthesis" },
        { name: "ESP32 & Arduino C++", level: "Lanjutan", detail: "Firmware sensor, ADC sampling kalibrasi, low-power mode, Wi-Fi/Bluetooth" },
        { name: "IoT Architecture (Sensor → Cloud → Dashboard)", level: "Spesialis", detail: "Protokol MQTT, HTTP REST, WebSockets, LoRa telemetry" },
        { name: "Sensor Kalibrasi & Instrumentasi", level: "Kompeten", detail: "Koreksi drift tanah (kelembaban/pH), load cell strain-gauge, INA219" },
        { name: "Elektronika & Soldering Presisi", level: "Kompeten", detail: "SMK AMI Deltamas Elektronika, perakitan kabel harness, uji sirkuit" },
      ],
    },
    {
      category: "Software & Web Engineering",
      icon: Layers,
      accent: "text-blue-500",
      description: "Pemrograman sistem, backend API, dan antarmuka web dashboard interaktif.",
      skills: [
        { name: "Python", level: "Lanjutan", detail: "Flask, script otomasi data, OpenCV citra, OOP logic, integrasi library AI" },
        { name: "Next.js & TypeScript", level: "Kompeten", detail: "App Router, SSR/SSG/ISR, modern frontend architecture, Tailwind CSS" },
        { name: "Docker & Containerization", level: "Kompeten", detail: "Multi-stage builds, docker-compose orchestrasi, isolasi service" },
        { name: "PocketBase & SQLite", level: "Kompeten", detail: "Self-hosted BaaS, API rules security, file storage, realtime subscriptions" },
        { name: "AI Multi-Agent & LLM Orchestration", level: "Eksplorasi", detail: "CrewAI framework, Telegram Bot API automation, tool calling" },
        { name: "Git & GitHub Collaboration", level: "Lanjutan", detail: "Version control, branching, release workflows, repository management" },
      ],
    },
    {
      category: "Otomasi & Sistem Industri",
      icon: Wrench,
      accent: "text-emerald-500",
      description: "Kontrol logika industri, simulasi virtual plant, dan metrik manufaktur.",
      skills: [
        { name: "PLC Omron (Sysmac Studio / CX-Programmer)", level: "Kompeten", detail: "Pemrograman Ladder Logic, timer/counter, interlocking safety logic" },
        { name: "Factory I/O Plant Simulation", level: "Kompeten", detail: "Virtual sorting conveyor, sensor retroreflektif, diverter pneumatik" },
        { name: "Kalkulasi Metrik OEE Industri", level: "Kompeten", detail: "Overall Equipment Effectiveness: Availability, Performance, Quality" },
        { name: "Quality Assurance (QA) Manufaktur", level: "Kompeten", detail: "Pengukuran presisi vernier caliper, micrometer, standar toleransi" },
        { name: "Standar Keselamatan Kerja & Mesin", level: "Pemahaman", detail: "Prinsip E-Stop fail-safe, regulasi industri, dan dokumentasi ISO" },
      ],
    },
    {
      category: "Desain CAD & Visualisasi AI",
      icon: Boxes,
      accent: "text-purple-500",
      description: "Pemodelan 3D mekanik, analisis tegangan elemen hingga, dan visualisasi produk.",
      skills: [
        { name: "SolidWorks 3D CAD", level: "Kompeten", detail: "Part modeling, assembly modular knockdown, sheet metal, Bill of Materials" },
        { name: "Analisis Elemen Hingga (FEA)", level: "Dasar-Menengah", detail: "Simulasi beban statis, defleksi rangka, evaluasi Safety Factor (SF)" },
        { name: "Drafting Gambar Teknik 2D", level: "Kompeten", detail: "Standar proyeksi ISO, toleransi geometris (GD&T), detail fabrikasi" },
        { name: "Visualisasi & Rendering Berbasis AI", level: "Inovatif", detail: "Kombinasi model CAD dengan AI generatif untuk rendering suasana interior" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>TAKSONOMI KEMAMPUAN TEKNIS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Keahlian &amp; Disiplin Rekayasa
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Kombinasi interdisipliner mekatronika yang menghubungkan perangkat keras elektronika dan mekanik dengan rekayasa perangkat lunak modern.
        </p>
      </div>

      {/* SKILL GROUPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-cyan-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${group.accent}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {group.category}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3.5">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/40"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA FOOTER */}
      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Punya Kebutuhan Sistem Khusus?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg leading-relaxed">
            Mulai dari pembuatan instrumen sensor khusus, integrasi PLC Omron pabrik, hingga dashboard visualisasi data web.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-sm"
        >
          <span>Diskusikan Proyek</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
