"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  const handleCopy = () => {
    const fullUrl = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkedIn = () => {
    const fullUrl = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${getShareUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mr-1">
        <Share2 className="w-3.5 h-3.5 text-cyan-500" />
        <span>{t.blog.share}:</span>
      </span>

      <button
        onClick={handleCopy}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/50 transition-colors"
        title={t.blog.copy_link}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-semibold">{t.blog.link_copied}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{t.blog.copy_link}</span>
          </>
        )}
      </button>

      <button
        onClick={handleLinkedIn}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-colors"
        title="Bagikan ke LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
        <span>LinkedIn</span>
      </button>

      <button
        onClick={handleWhatsApp}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors"
        title="Bagikan ke WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}
