"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { supabase } from "@/lib/supabase";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/skills", label: t.nav.skills },
    { href: "/projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Tutup menu mobile saat pindah halaman atau tekan Escape
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const onEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("keydown", onEscape);
      return () => document.removeEventListener("keydown", onEscape);
    }
  }, [mobileMenuOpen, onEscape]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between px-5 sm:px-8">
        {/* Wordmark — serif display + label mono */}
        <Link
          href="/"
          className="group flex items-baseline gap-3 rounded-sm focus-visible:outline-none"
          aria-label="XYZUS — Beranda"
        >
          <span className="font-serif text-xl font-semibold tracking-tight text-graphite group-hover:text-teal-ink transition-colors">
            XYZUS
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-teal-ink sm:inline">
            Independent Engineering
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-sm transition-colors ${
                  active
                    ? "font-medium text-teal-ink"
                    : "text-graphite/70 hover:text-teal-ink"
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-terracotta"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Kontrol kanan */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-md border border-teal-ink/40 px-3 py-1.5 font-mono text-xs text-teal-ink transition-colors hover:border-teal-ink hover:bg-stone/40"
              title="Panel Admin & Editor"
            >
              CMS ✦
            </Link>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            className="rounded-md border border-stone bg-surface p-2 text-graphite transition-colors hover:border-teal-ink/50 hover:text-teal-ink"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Navigasi mobile"
          className="border-t border-stone bg-ivory px-5 pb-5 pt-2 md:hidden"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-stone/50 font-medium text-teal-ink"
                        : "text-graphite/80 hover:bg-stone/30 hover:text-teal-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {isAdmin && (
            <div className="mt-3 border-t border-stone pt-3">
              <Link
                href="/admin"
                className="block rounded-md px-3 py-2 font-mono text-xs text-teal-ink"
              >
                ✦ {t.nav.admin}
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
