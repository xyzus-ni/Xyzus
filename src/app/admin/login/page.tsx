"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPocketBase } from "@/lib/pocketbase";
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cek apakah sudah login sebagai admin
    const pb = getPocketBase();
    if (pb.authStore.isValid && pb.authStore.isAdmin) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const pb = getPocketBase();
      await pb.admins.authWithPassword(email.trim(), password);
      router.push("/admin");
    } catch (err: any) {
      setError(
        err?.message || "Kredensial tidak valid. Pastikan email dan password admin benar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin Publication CMS
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Hanya untuk pemilik portofolio &bull; Mahesa Tirtha A. P.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin_email"
              className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Email Administrator
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="admin_email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mahesa.local"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin_password"
              className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="admin_password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <span>Masuk ke Dashboard</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-slate-400">
          Akun default: <code className="text-cyan-500">admin@mahesa.local</code>
        </div>
      </div>
    </div>
  );
}
