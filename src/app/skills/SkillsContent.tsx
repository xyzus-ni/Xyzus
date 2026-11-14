"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TechLabel } from "@/components/ui/TechLabel";
import { ArrowRight } from "lucide-react";

const MATURITY_STYLE: Record<string, string> = {
  core: "border-sage/70 text-teal-ink",
  dev: "border-terracotta/60 text-terracotta-ink",
  collab: "border-stone text-graphite/70",
};

// Bukti proyek per kapabilitas — hanya proyek yang benar-benar mendemonstrasikan domain tsb.
const PROOF_SLUGS: (string | null)[] = [
  "soil-sensor-calibration-field-testing", // IoT & Embedded Monitoring
  "industrial-control-logic", // Industrial Automation
  "uav-yolo-palm-pest-early-detection", // Robotics & Prototyping
  "color-blind-assistant-raspberry-pi", // AIoT & Edge Intelligence
  "web-based-oee-industrial-system", // Engineering Dashboards
  "autonomous-weed-harvester-catamaran-cirata", // Hardware–Software Integration
];

export function SkillsContent() {
  const { t } = useLanguage();

  const maturityLabel = (m: string) => {
    switch (m) {
      case "core":
        return t.skills.maturity_core;
      case "dev":
        return t.skills.maturity_dev;
      case "collab":
        return t.skills.maturity_collab;
      default:
        return m;
    }
  };

  return (
    <div className="flex flex-col">
      <Section eyebrow={t.skills.badge} title={t.skills.title} description={t.skills.subtitle}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.skills.capabilities.map((cap, i) => (
            <Card key={cap.title} code={`CAP-00${i + 1}`}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-title-md text-graphite">{cap.title}</h2>
                <span
      className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${MATURITY_STYLE[cap.maturity] ?? MATURITY_STYLE.collab}`}
                >
                  {maturityLabel(cap.maturity)}
                </span>
              </div>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt>
                    <TechLabel as="span">{t.skills.cap_problems}</TechLabel>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-graphite/70">
                    {cap.problems}
                  </dd>
                </div>
                <div>
                  <dt>
                    <TechLabel as="span">{t.skills.cap_solutions}</TechLabel>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-graphite/70">
                    {cap.solutions}
                  </dd>
                </div>
                <div>
                  <dt>
                    <TechLabel as="span">{t.skills.cap_tech}</TechLabel>
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-teal-ink">{cap.tech}</dd>
                </div>
                <div>
                  <dt>
                    <TechLabel as="span">{t.skills.cap_deliverables}</TechLabel>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-graphite/70">
                    {cap.deliverables}
                  </dd>
                </div>
              </dl>
              {PROOF_SLUGS[i] && (
                <Link
                  href={`/projects/${PROOF_SLUGS[i]}`}
                  className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-medium text-teal-ink hover:underline"
                >
                  {t.home.cap_proof} →
                </Link>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="mx-auto w-full max-w-shell px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-md border border-stone bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-serif text-title-md text-graphite">{t.skills.cta_heading}</h3>
            <p className="mt-1 max-w-lg text-sm text-graphite/60">{t.skills.cta_sub}</p>
          </div>
          <Button href="/contact">
            {t.skills.cta_button}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
