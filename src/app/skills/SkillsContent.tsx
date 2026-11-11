"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import {
  Cpu,
  Layers,
  Wrench,
  Boxes,
  Terminal,
  ArrowRight,
} from "lucide-react";

export function SkillsContent() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      category: t.skills.categories.embedded,
      icon: Cpu,
      accent: "text-cyan-500",
      description: t.skills.categories.embedded_desc,
      skills: [
        { name: "Raspberry Pi & Single Board Computers", level: t.skills.levels.advanced, detail: "Linux OS, GPIO interfacing, kamera OpenCV, audio synthesis" },
        { name: "ESP32 & Arduino C++", level: t.skills.levels.advanced, detail: "Firmware sensor, ADC sampling kalibrasi, low-power mode, Wi-Fi/Bluetooth" },
        { name: "IoT Architecture (Sensor → Cloud → Dashboard)", level: t.skills.levels.specialist, detail: "Protokol MQTT, HTTP REST, WebSockets, LoRa telemetry" },
        { name: "Sensor Kalibrasi & Instrumentasi", level: t.skills.levels.competent, detail: "Koreksi drift tanah (kelembaban/pH), load cell strain-gauge, INA219" },
        { name: "Elektronika & Soldering Presisi", level: t.skills.levels.competent, detail: "SMK AMI Deltamas Elektronika, perakitan kabel harness, uji sirkuit" },
      ],
    },
    {
      category: t.skills.categories.software,
      icon: Layers,
      accent: "text-blue-500",
      description: t.skills.categories.software_desc,
      skills: [
        { name: "Python", level: t.skills.levels.advanced, detail: "Flask, script otomasi data, OpenCV citra, OOP logic, integrasi library AI" },
        { name: "Next.js & TypeScript", level: t.skills.levels.competent, detail: "App Router, SSR/SSG/ISR, modern frontend architecture, Tailwind CSS" },
        { name: "Docker & Containerization", level: t.skills.levels.competent, detail: "Multi-stage builds, docker-compose orchestrasi, isolasi service" },
        { name: "PocketBase & Supabase / PostgreSQL", level: t.skills.levels.competent, detail: "Self-hosted BaaS, RLS security policies, realtime subscriptions" },
        { name: "AI Multi-Agent & LLM Orchestration", level: t.skills.levels.exploration, detail: "CrewAI framework, Telegram Bot API automation, tool calling" },
        { name: "Git & GitHub Collaboration", level: t.skills.levels.advanced, detail: "Version control, branching, release workflows, repository management" },
      ],
    },
    {
      category: t.skills.categories.automation,
      icon: Wrench,
      accent: "text-emerald-500",
      description: t.skills.categories.automation_desc,
      skills: [
        { name: "PLC Omron (Sysmac Studio / CX-Programmer)", level: t.skills.levels.competent, detail: "Pemrograman Ladder Logic, timer/counter, interlocking safety logic" },
        { name: "Factory I/O Plant Simulation", level: t.skills.levels.competent, detail: "Virtual sorting conveyor, sensor retroreflektif, diverter pneumatik" },
        { name: "Kalkulasi Metrik OEE Industri", level: t.skills.levels.competent, detail: "Overall Equipment Effectiveness: Availability, Performance, Quality" },
        { name: "Quality Assurance (QA) Manufaktur", level: t.skills.levels.competent, detail: "Pengukuran presisi vernier caliper, micrometer, standar toleransi" },
        { name: "Standar Keselamatan Kerja & Mesin", level: t.skills.levels.understanding, detail: "Prinsip E-Stop fail-safe, regulasi industri, dan dokumentasi ISO" },
      ],
    },
    {
      category: t.skills.categories.design,
      icon: Boxes,
      accent: "text-purple-500",
      description: t.skills.categories.design_desc,
      skills: [
        { name: "SolidWorks 3D CAD", level: t.skills.levels.competent, detail: "Part modeling, assembly modular knockdown, sheet metal, Bill of Materials" },
        { name: "Analisis Elemen Hingga (FEA)", level: t.skills.levels.intermediate, detail: "Simulasi beban statis, defleksi rangka, evaluasi Safety Factor (SF)" },
        { name: "Drafting Gambar Teknik 2D", level: t.skills.levels.competent, detail: "Standar proyeksi ISO, toleransi geometris (GD&T), detail fabrikasi" },
        { name: "Visualisasi & Rendering Berbasis AI", level: t.skills.levels.innovative, detail: "Kombinasi model CAD dengan AI generatif untuk rendering visual produk" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>{t.skills.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.skills.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {t.skills.subtitle}
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
            {t.skills.cta_heading}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg leading-relaxed">
            {t.skills.cta_sub}
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-sm"
        >
          <span>{t.skills.cta_button}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
