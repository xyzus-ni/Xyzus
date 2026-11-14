"use client";

import React from "react";
import { GameEmbed } from "@/components/GameEmbed";
import { Section } from "@/components/ui/Section";
import { FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const GAME_URL = "https://nusantara-alchemist.vercel.app/";

export function LabContent() {
  const { t } = useLanguage();

  return (
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
  );
}
