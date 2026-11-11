"use client";

import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { useLanguage } from "@/lib/i18n/context";
import { Mail, Linkedin, Github, MapPin, CheckCircle, MessageCircle } from "lucide-react";

export function ContactContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <span>{t.contact.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.contact.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 space-y-4">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              {t.contact.direct_channels}
            </h2>

            <div className="space-y-4 text-sm">
              <a
                href="https://wa.me/62881024632318"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-500 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-xs">
                    WhatsApp
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    +62 881-0246-32318
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/mahesa-tirtha-agung-permana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-cyan-500 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-[#0a66c2] flex items-center justify-center shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-xs">
                    LinkedIn
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    mahesa-tirtha-agung-permana
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/xyzus-ni"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-cyan-500 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-xs">
                    GitHub
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    @xyzus-ni
                  </div>
                </div>
              </a>

              <a
                href="mailto:mtirtha865@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-cyan-500 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-xs">
                    Email
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    mtirtha865@gmail.com
                  </div>
                </div>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{t.contact.location}</span>
            </div>
          </div>

          {/* Availability Card */}
          <div className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>{t.contact.availability_title}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.contact.availability_desc}
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            {t.contact.form_title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
            {t.contact.form_subtitle}
          </p>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
