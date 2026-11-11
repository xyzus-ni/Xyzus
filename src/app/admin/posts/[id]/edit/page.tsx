"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPocketBase, getCategories } from "@/lib/pocketbase";
import { AdminEditor } from "@/components/AdminEditor";
import { PostItem, CategoryItem } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<PostItem | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pb = getPocketBase();
    if (!pb.authStore.isValid || !pb.authStore.isAdmin) {
      router.push("/admin/login");
      return;
    }

    Promise.all([
      pb.collection("posts").getOne<PostItem>(postId),
      getCategories(),
    ])
      .then(([postData, cats]) => {
        setPost(postData);
        setCategories(cats);
      })
      .catch((err) => {
        console.error("Gagal mengambil data post:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, postId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-slate-500 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
        <span>Memuat naskah karya tulis...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p className="text-sm font-mono text-slate-500">Artikel tidak ditemukan.</p>
        <button
          onClick={() => router.push("/admin")}
          className="text-xs font-semibold text-cyan-600 hover:underline"
        >
          &larr; Kembali ke Dasbor
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminEditor initialPost={post} categories={categories} isEdit={true} />
    </div>
  );
}
