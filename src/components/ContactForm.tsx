"use client";

import React, { useState } from "react";
import { submitContactMessage } from "@/lib/pocketbase";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Bot trap
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check: jika diisi, anggap spam bot dan abaikan diam-diam
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    // 2. Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Mohon lengkapi nama, email, dan pesan Anda.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Format email tidak valid.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || "Inquiry Proyek / Kolaborasi",
        message: formData.message.trim(),
      });

      if (res.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Gagal mengirimkan pesan. Silakan coba lagi.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Terjadi gangguan jaringan saat menghubungi server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact_name"
            className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Nama Lengkap *
          </label>
          <input
            id="contact_name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ir. Budi Santoso"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="contact_email"
            className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Alamat Email *
          </label>
          <input
            id="contact_email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="budi@perusahaan.co.id"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact_subject"
          className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Subjek / Topik Proyek
        </label>
        <input
          id="contact_subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Proyek IoT Monitoring / Otomasi PLC / Dashboard Web"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="contact_message"
          className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Detail Pesan atau Rencana Kolaborasi *
        </label>
        <textarea
          id="contact_message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Jelaskan kebutuhan teknis, timeline, atau lingkup pekerjaan yang ingin dikerjasamakan..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-y"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>Terima kasih! Pesan Anda telah terkirim dan tersimpan di database.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mengirimkan Pesan...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim Pesan Sekarang</span>
          </>
        )}
      </button>
    </form>
  );
}
