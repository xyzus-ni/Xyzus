"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Github, Linkedin, Mail, Instagram, ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";

// Footer graphite — section gelap yang tetap gelap di kedua mode tema.
const c = {
  bg: "bg-[#252B29]",
  text: "text-[#F3F0E8]",
  muted: "text-[#F3F0E8]/60",
  faint: "text-[#F3F0E8]/45",
  border: "border-[#F3F0E8]/15",
  link: "text-[#F3F0E8]/75 hover:text-[#F3F0E8]",
  accent: "text-[#A5B2A0]",
};

export function Footer() {
  const { t } = useLanguage();

  const socials = [
    { href: CONTACT.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: CONTACT.github, label: "GitHub", icon: Github },
    { href: CONTACT.instagram, label: "Instagram", icon: Instagram },
    { href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: Mail },
    ...(CONTACT.whatsapp
      ? [{ href: `https://wa.me/${CONTACT.whatsapp}`, label: "WhatsApp", icon: null }]
      : []),
  ];

  return (
    <footer className={`w-full ${c.bg} ${c.text}`}>
      <div className="mx-auto w-full max-w-shell px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Identitas */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-lg font-semibold">XYZUS</span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${c.accent}`}>
                Independent Engineering Studio
              </span>
            </div>
            <p className={`max-w-md text-sm leading-relaxed ${c.muted}`}>{t.footer.bio}</p>
            <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${c.faint}`}>
              Engineering intelligence. Building independence.
            </p>
          </div>

          {/* Quick links */}
          <nav className="md:col-span-3" aria-label="Tautan cepat">
            <h3 className={`mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${c.muted}`}>
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/projects", label: t.nav.projects },
                { href: "/blog", label: t.nav.blog },
                { href: "/skills", label: t.nav.skills },
                { href: "/contact", label: t.nav.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group inline-flex items-center gap-1 transition-colors ${c.link}`}
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sosial & kontak */}
          <div className="md:col-span-4">
            <h3 className={`mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${c.muted}`}>
              {t.footer.professional_links}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {socials.map((s) => {
                const external = s.href.startsWith("http");
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`group inline-flex items-center gap-2 transition-colors ${c.link}`}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : <span className="font-mono text-xs">WA</span>}
                      <span className="truncate">{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-12 flex flex-col items-start justify-between gap-3 border-t ${c.border} pt-6 font-mono text-[11px] uppercase tracking-[0.14em] ${c.faint} sm:flex-row sm:items-center`}
        >
          <p>
            &copy; {new Date().getFullYear()} XYZUS — Mahesa Tirtha Agung Permana.{" "}
            {t.footer.rights}
          </p>
          <p>{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
