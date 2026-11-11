import React from "react";
import { getPosts, getCategories } from "@/lib/pocketbase";
import { BlogClientList } from "./BlogClientList";

export const revalidate = 60;

export const metadata = {
  title: "Karya Tulis & Publikasi Ilmiah",
  description:
    "Kumpulan makalah ilmiah, catatan teknis, laporan rekayasa mekatronika dan IoT, serta publikasi riset oleh Mahesa Tirtha Agung Permana.",
};

export default async function BlogPage() {
  const [categories, postsRes] = await Promise.all([
    getCategories(),
    getPosts({ page: 1, perPage: 20 }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 mb-4">
          <span>RUANG PUBLIKASI &amp; PAPERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Karya Tulis &amp; Catatan Teknis
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Kumpulan naskah ilmiah, riset terapan mekatronika, dokumentasi arsitektur perangkat keras, dan refleksi seputar rekayasa sistem otomasi.
        </p>
      </div>

      <BlogClientList
        initialPosts={postsRes.items}
        categories={categories}
      />
    </div>
  );
}
