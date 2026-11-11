"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PostItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ShieldAlert,
  LogOut,
  FileText,
  Clock,
  Loader2,
  Eye,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
        return;
      }
      loadPosts();
    });
  }, [router]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts((data as any) || []);
    } catch (err) {
      console.error("Gagal memuat daftar tulisan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setShowDeleteModal(null);
    } catch (err: any) {
      alert("Gagal menghapus tulisan: " + (err?.message || "Terjadi kesalahan"));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              CMS Panel
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Supabase Cloud
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Kelola Tulisan &amp; Paper
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tulis, edit, dan publikasikan karya tulis ilmiah, laporan proyek, serta catatan teknik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Baru</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-200 dark:hover:border-red-900 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="text-xs font-mono text-slate-500">Total Tulisan</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {posts.length}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="text-xs font-mono text-emerald-500">Terbit (Published)</div>
          <div className="text-2xl font-bold text-emerald-500 mt-1">
            {posts.filter((p) => p.status === "published").length}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="text-xs font-mono text-amber-500">Draf (Draft)</div>
          <div className="text-2xl font-bold text-amber-500 mt-1">
            {posts.filter((p) => p.status === "draft").length}
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-cyan-500" />
            <span>Daftar Artikel</span>
          </h2>
          <button
            onClick={loadPosts}
            className="text-xs text-slate-500 hover:text-cyan-500 font-mono transition-colors"
          >
            Muat ulang
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
            <span className="text-xs font-mono">Memuat artikel...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <p className="text-sm">Belum ada tulisan yang dibuat.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-500 hover:underline font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tulis artikel pertama Anda</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-xs font-mono text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Judul</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Bahasa</th>
                  <th className="py-3.5 px-4">Tanggal</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6 max-w-md">
                      <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {post.title}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5 line-clamp-1">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {post.status === "published" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs uppercase text-slate-500">
                      {post.lang || "id"}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500 font-mono whitespace-nowrap">
                      {formatDate(post.published_at || post.created || new Date().toISOString(), "id")}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-500 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Lihat Publikasi"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 rounded-lg text-slate-500 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setShowDeleteModal(post.id || null)}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="max-w-sm w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hapus Tulisan Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tindakan ini permanen dan tidak dapat dibatalkan. Artikel akan dihapus dari Supabase.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                disabled={deletingId === showDeleteModal}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-colors disabled:opacity-50"
              >
                {deletingId === showDeleteModal ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
