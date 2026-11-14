"use client";

import React from "react";
import { GameEmbed } from "@/components/GameEmbed";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { TechLabel } from "@/components/ui/TechLabel";
import { FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const GAME_URL = "https://nusantara-alchemist.vercel.app/";

export function LabContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <Section eyebrow={t.lab.eyebrow} title={t.lab.title} description={t.lab.subtitle} grid>
        <div className="mx-auto max-w-4xl">
          <GameEmbed src={GAME_URL} title={t.lab.title} />
          <div className="mt-4 flex items-start gap-3">
            <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-teal-ink" />
            <p className="font-mono text-[11px] leading-relaxed text-graphite/60">
              {GAME_URL} — {t.lab.note}
            </p>
          </div>
        </div>
      </Section>

      {/* Area eksperimen */}
      <Section eyebrow="LAB / EXP" title={t.lab.areas_title} description={t.lab.areas_note}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.lab.areas.map((area, i) => (
            <Card key={area.title} code={`EXP-00${i + 1}`}>
              <h3 className="font-serif text-sm font-semibold text-graphite">{area.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-graphite/60">{area.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
