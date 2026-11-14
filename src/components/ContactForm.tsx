"use client";

import React, { useRef, useState } from "react";
import { submitContactMessage } from "@/lib/pocketbase";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-md border border-stone bg-surface px-3.5 py-2.5 text-sm text-graphite placeholder:text-graphite/40 transition-colors focus:border-teal-ink focus:outline-none focus:ring-1 focus:ring-teal-ink";

const labelClass =
  "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-graphite/60";

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry_type: "project",
    subject: "",
    message: "",
    honeypot: "", // Bot trap
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Time-trap: form yang dikirim <2 detik setelah render dianggap bot
  const mountedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot: field tersembunyi yang hanya diisi bot
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    // 2. Time-trap spam
    if (Date.now() - mountedAt.current < 2000) {
      setStatus("success"); // pura-pura sukses, buang submitan
      return;
    }

    // 3. Validasi
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage(t.contact.validation_required);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage(t.contact.validation_email);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const typeLabel =
        t.contact.inquiry_types[
          formData.inquiry_type as keyof typeof t.contact.inquiry_types
        ] ?? t.contact.inquiry_types.project;
      const subjectValue = [typeLabel, formData.subject.trim()]
        .filter(Boolean)
        .join(" — ");

      const res = await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: subjectValue || "Inquiry Proyek / Kolaborasi",
        message: formData.message.trim(),
      });

      if (res.success) {
        setStatus("success");
        setFormData({ name: "", email: "", inquiry_type: "project", subject: "", message: "", honeypot: "" });
        mountedAt.current = Date.now();
      } else {
        setStatus("error");
        setErrorMessage(res.error || t.contact.error_message);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.network_error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field (hidden from humans, tetap bisa diisi bot) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this</label>
        <input
          type="text"
          id="hp_field"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact_name" className={labelClass}>
            {t.contact.form_name}
          </label>
          <input
            id="contact_name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.contact.form_name_placeholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact_email" className={labelClass}>
            {t.contact.form_email}
          </label>
          <input
            id="contact_email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.contact.form_email_placeholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact_type" className={labelClass}>
          {t.contact.form_type}
        </label>
        <select
          id="contact_type"
          name="inquiry_type"
          value={formData.inquiry_type}
          onChange={handleChange}
          className={inputClass}
        >
          {Object.entries(t.contact.inquiry_types).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact_subject" className={labelClass}>
          {t.contact.form_subject}
        </label>
        <input
          id="contact_subject"
          name="subject"
          type="text"
          autoComplete="off"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t.contact.form_subject_placeholder}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact_message" className={labelClass}>
          {t.contact.form_message}
        </label>
        <textarea
          id="contact_message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder={t.contact.form_message_placeholder}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-md border border-terracotta/60 bg-terracotta/10 p-3 text-xs text-terracotta-ink"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {status === "success" && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md border border-sage bg-sage/20 p-3.5 text-xs text-teal-ink"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-ink" />
          <span>{t.contact.success_message}</span>
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t.contact.sending}</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>{t.contact.send_btn}</span>
          </>
        )}
      </Button>
    </form>
  );
}
