"use client";

import React from "react";
import { Download } from "lucide-react";

export function PrintDownloadButton() {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      type="button"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500 transition-colors"
      title="Cetak atau Unduh Versi Dokumen / PDF"
    >
      <Download className="w-3.5 h-3.5 text-cyan-500" />
      <span>Unduh / Cetak Dokumen (PDF)</span>
    </button>
  );
}
