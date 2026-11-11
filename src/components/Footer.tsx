"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#070a12] transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Identity & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 dark:text-white">
                Mahesa Tirtha Agung Permana
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Mechatronics &amp; IoT Engineer. Politeknik Industri ATMI &amp; SMK AMI Deltamas. Berfokus pada integrasi sistem cerdas dari sensor fisik, komputasi tepi, hingga dashboard monitoring.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.footer.freelance_badge}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/projects" className="hover:text-cyan-500 transition-colors flex items-center gap-1">
                  <span>{t.nav.projects}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-500 transition-colors flex items-center gap-1">
                  <span>{t.nav.blog}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-cyan-500 transition-colors flex items-center gap-1">
                  <span>{t.nav.skills}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-500 transition-colors flex items-center gap-1">
                  <span>{t.nav.contact}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Professional Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Koneksi Profesional
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a
                href="https://www.linkedin.com/in/mahesa-tirtha-agung-permana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/xyzus-ni"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors group"
              >
                <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>GitHub (xyzus-ni)</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:mtirtha865@gmail.com"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>mtirtha865@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} Mahesa Tirtha Agung Permana. {t.footer.rights}
          </p>
          <p className="text-center sm:text-right">
            Bekasi
          </p>
        </div>
      </div>
    </footer>
  );
}
