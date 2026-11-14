"use client";

import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { useLanguage } from "@/lib/i18n/context";
import { CONTACT, whatsappUrl, defaultWhatsappMessage } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { TechLabel } from "@/components/ui/TechLabel";
import { Mail, Linkedin, Github, Instagram, MapPin, MessageCircle, ArrowRight } from "lucide-react";

function formatWhatsapp(number: string): string {
  // +62 881-0246-32318 style display
  if (number.startsWith("62") && number.length >= 10) {
    return `+${number.slice(0, 2)} ${number.slice(2, 5)}-${number.slice(5, 8)}-${number.slice(8)}`;
  }
  return `+${number}`;
}

export function ContactContent() {
  const { t, locale } = useLanguage();

  const channels = [
    {
      href: whatsappUrl(defaultWhatsappMessage(locale)),
      external: true,
      icon: MessageCircle,
      label: "WhatsApp",
      value: formatWhatsapp(CONTACT.whatsapp),
    },
    {
      href: CONTACT.linkedin,
      external: true,
      icon: Linkedin,
      label: "LinkedIn",
      value: CONTACT.linkedin.replace("https://www.linkedin.com/in/", "@"),
    },
    {
      href: CONTACT.github,
      external: true,
      icon: Github,
      label: "GitHub",
      value: CONTACT.github.replace("https://github.com/", "@"),
    },
    {
      href: CONTACT.instagram,
      external: true,
      icon: Instagram,
      label: "Instagram",
      value: CONTACT.instagram.replace(/.*instagram\.com\//, "@"),
    },
    {
      href: `mailto:${CONTACT.email}`,
      external: false,
      icon: Mail,
      label: "Email",
      value: CONTACT.email,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-shell px-5 py-14 sm:px-8 sm:py-20">
      {/* Header */}
      <header className="mb-12 max-w-2xl">
        <TechLabel className="mb-4 block">{t.contact.badge}</TechLabel>
        <h1 className="font-serif text-display-md text-graphite">{t.contact.title}</h1>
        <p className="mt-4 text-lead text-graphite/70">{t.contact.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Kolom kiri: kanal langsung */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-md border border-stone bg-surface p-6">
            <TechLabel as="h2" className="mb-5 block">
              {t.contact.direct_channels}
            </TechLabel>
            <ul className="space-y-3">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 rounded-md border border-stone bg-ivory p-3 transition-colors hover:border-teal-ink/50"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone bg-surface text-teal-ink">
                      <ch.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-graphite">
                        {ch.label}
                      </span>
                      <span className="block truncate font-mono text-[11px] text-graphite/60">
                        {ch.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-2 border-t border-stone pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/50">
              <MapPin className="h-3.5 w-3.5" />
              <span>{t.contact.location}</span>
            </div>
          </div>

          {/* Ketersediaan */}
          <div className="rounded-md border border-stone bg-surface p-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <TechLabel as="h2">{t.contact.availability_title}</TechLabel>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-graphite/70">
              {t.contact.availability_desc}
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div className="rounded-md border border-stone bg-surface p-6">
            <p className="text-sm text-graphite/70">{t.contact.whatsapp_hint}</p>
            <Button
              href={whatsappUrl(defaultWhatsappMessage(locale))}
              external
              className="mt-4 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              {t.contact.whatsapp_cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Kolom kanan: form */}
        <div className="rounded-md border border-stone bg-surface p-6 sm:p-8 lg:col-span-7">
          <TechLabel className="mb-2 block">{t.contact.form_title}</TechLabel>
          <p className="mb-6 font-mono text-[11px] text-graphite/50">
            {t.contact.form_subtitle}
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
