"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface ProjectVideoHeroProps {
  src: string;
  poster?: string;
  title: string;
}

/**
 * Hero video HTML5 untuk halaman detail proyek.
 * - Autoplay muted saat masuk viewport (IntersectionObserver)
 * - Loop, preload="metadata", hormati prefers-reduced-motion
 * - Kontrol minimal: play/pause + mute (bukan native controls)
 */
export function ProjectVideoHero({ src, poster, title }: ProjectVideoHeroProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!reducedMotion) {
              video.muted = true;
              video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
            }
          } else {
            video.pause();
            setPlaying(false);
          }
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const btnClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-black/40 text-ivory backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal";

  return (
    <div
      ref={wrapRef}
      className="relative aspect-video w-full overflow-hidden rounded-lg border border-stone bg-[#171B1B]"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        className="h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Label teknis overlay */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-sm border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ivory/80 backdrop-blur-sm">
        {t.projects.video_hero_label}
      </div>

      {/* Kontrol minimal */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? t.projects.video_pause : t.projects.video_play}
          title={playing ? t.projects.video_pause : t.projects.video_play}
          className={btnClass}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? t.projects.video_unmute : t.projects.video_mute}
          title={muted ? t.projects.video_unmute : t.projects.video_mute}
          className={btnClass}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
