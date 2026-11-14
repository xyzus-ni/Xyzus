"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { TechLabel } from "@/components/ui/TechLabel";
import { CONTACT } from "@/lib/contact";

const SOCIAL = CONTACT;

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-stone bg-ivory">
      <div className="mx-auto w-full max-w-shell px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Identitas */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-lg font-semibold text-graphite">
                XYZUS
              </span>
              <TechLabel>Independent Engineering</TechLabel>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-graphite/70">
              {t.footer.bio}
            </p>
            <div className="inline-flex items-center gap-2 rounded-sm border border-stone bg-surface px-3 py-1.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-signal"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-teal-ink">
                {t.footer.freelance_badge}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <nav className="md:col-span-3" aria-label="Tautan cepat">
            <TechLabel as="h3" className="mb-4 block">
              {t.footer.quick_links}
            </TechLabel>
            <ul className="space-y-2 text-sm text-graphite/70">
              {[
                { href: "/projects", label: t.nav.projects },
                { href: "/blog", label: t.nav.blog },
                { href: "/skills", label: t.nav.skills },
                { href: "/contact", label: t.nav.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 transition-colors hover:text-teal-ink"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak profesional */}
          <div className="md:col-span-4">
            <TechLabel as="h3" className="mb-4 block">
              {t.footer.professional_links}
            </TechLabel>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-graphite/70 transition-colors hover:text-teal-ink"
                >
                  <Linkedin className="h-4 w-4 text-teal-ink" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-graphite/70 transition-colors hover:text-teal-ink"
                >
                  <Github className="h-4 w-4 text-teal-ink" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="group inline-flex items-center gap-2 text-graphite/70 transition-colors hover:text-teal-ink"
                >
                  <Mail className="h-4 w-4 text-teal-ink" />
                  {SOCIAL.email}
                </a>
              </li>
              {SOCIAL.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${SOCIAL.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-graphite/70 transition-colors hover:text-teal-ink"
                  >
                    <span className="font-mono text-xs text-teal-ink">WA</span>
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-stone pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/50 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} Mahesa Tirtha Agung Permana.{" "}
            {t.footer.rights}
          </p>
          <p>{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
