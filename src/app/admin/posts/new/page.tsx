"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPocketBase, getCategories } from "@/lib/pocketbase";
import { AdminEditor } from "@/components/AdminEditor";
import { CategoryItem } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pb = getPocketBase();
    if (!pb.authStore.isValid || !pb.authStore.isAdmin) {
      router.push("/admin/login");
      return;
    }

    getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-slate-500 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
        <span>Menyiapkan editor...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminEditor categories={categories} />
    </div>
  );
}
