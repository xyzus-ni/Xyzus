"use client";

import React, { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TechLabel } from "@/components/ui/TechLabel";
import { useLanguage } from "@/lib/i18n/context";

interface GameEmbedProps {
  src: string;
  title: string;
}

/**
 * Embed game dengan pola click-to-play:
 * iframe baru dimuat SETELAH pengunjung menekan tombol Mainkan,
 * sehingga halaman /lab ringan dan tidak membebani iframe pihak ketiga.
 */
export function GameEmbed({ src, title }: GameEmbedProps) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const host = src.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const toggleFullscreen = async () => {
    const el = frameRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen?.();
      }
    } catch {
      // Browser menolak fullscreen — biarkan embed tetap inline
    }
  };

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-md border border-stone bg-graphite"
    >
      {/* Area embed 16:9 */}
      <div className="relative aspect-video w-full bg-ivory">
        {playing ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="fullscreen; autoplay; gamepad; clipboard-write"
            allowFullScreen
            loading="eager"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-grid bg-ivory p-6 text-center transition-colors hover:bg-stone/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-ink"
            aria-label={`${t.lab.play} — ${title}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-teal-ink/40 bg-surface text-teal-ink transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
              <Play className="ml-1 h-6 w-6" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-ink">
              {t.lab.click_to_play}
            </span>
            <span className="max-w-md text-sm text-graphite/70">{title}</span>
          </button>
        )}
      </div>

      {/* Kontrol embed */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone bg-surface px-4 py-3">
        <TechLabel as="span">{host}</TechLabel>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            aria-label={t.lab.fullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{t.lab.fullscreen}</span>
          </Button>
          <Button variant="secondary" size="sm" href={src} external>
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.lab.open_tab}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
