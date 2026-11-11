"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPocketBase } from "@/lib/pocketbase";
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
    const pb = getPocketBase();
    if (!pb.authStore.isValid || !pb.authStore.isAdmin) {
      router.push("/admin/login");
      return;
    }

    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const pb = getPocketBase();
      const res = await pb.collection("posts").getFullList<PostItem>({
        sort: "-created",
        requestKey: null,
      });
      setPosts(res);
    } catch (err) {
      console.error("Gagal memuat daftar tulisan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const pb = getPocketBase();
    pb.authStore.clear();
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const pb = getPocketBase();
      await pb.collection("posts").delete(id);
      setPosts(posts.filter((p) => p.id !== id));
      setShowDeleteModal(null);
    } catch (err) {
      alert("Gagal menghapus tulisan: " + (err as any)?.message);
    } finally {
      setDeletingId(null);
    }
  };

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ADMINISTRATOR SESSION &bull; AUTHENTICATED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dasbor Publikasi Karya Tulis
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Karya Baru</span>
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-red-500 hover:border-red-500 transition-colors"
            title="Keluar dari sesi admin"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="text-xs font-mono text-slate-500">Total Seluruh Tulisan</div>
          <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white mt-1">
            {posts.length}
          </div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Diterbitkan (Publik)</div>
          <div className="text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {publishedCount}
          </div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <div className="text-xs font-mono text-amber-600 dark:text-amber-400">Draf Pribadi (Tersembunyi)</div>
          <div className="text-3xl font-mono font-bold text-amber-600 dark:text-amber-400 mt-1">
            {draftCount}
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-500" />
            <span>Daftar Karya Tulis &amp; Paper</span>
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
            <span>Memuat data karya tulis...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-3">
            <p>Belum ada karya tulis yang dibuat.</p>
            <Link
              href="/admin/posts/new"
              className="inline-block text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
            >
              Mulai Tulis Artikel Pertama Anda &rarr;
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 font-mono text-slate-500">
                <tr>
                  <th className="py-3 px-4">Judul &amp; Slug</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Waktu Baca</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {post.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 line-clamp-1">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {post.category || "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      {post.status === "published" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                          Terbit
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                          Draf
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {post.reading_time || 1} min
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {formatDate(post.published_at || post.created)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors"
                            title="Buka artikel publik"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors"
                          title="Edit tulisan"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setShowDeleteModal(post.id || null)}
                          type="button"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                          title="Hapus tulisan"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Konfirmasi Hapus Tulisan</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Apakah Anda yakin ingin menghapus karya tulis ini secara permanen dari basis data? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(null)}
                type="button"
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono"
              >
                Batal
              </button>
              <button
                onClick={() => showDeleteModal && handleDelete(showDeleteModal)}
                disabled={Boolean(deletingId)}
                type="button"
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-medium flex items-center gap-1.5"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Hapus Permanen</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
