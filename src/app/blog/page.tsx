import React from "react";
import { getPosts, getCategories } from "@/lib/pocketbase";
import { BlogContent } from "./BlogContent";

export const revalidate = 60;

export const metadata = {
  title: "Karya Tulis & Publikasi Ilmiah | Publications",
  description:
    "Kumpulan makalah ilmiah, catatan teknis, laporan rekayasa mekatronika dan IoT, serta publikasi riset oleh Mahesa Tirtha Agung Permana.",
};

export default async function BlogPage() {
  const [categories, postsRes] = await Promise.all([
    getCategories(),
    getPosts({ page: 1, perPage: 20 }),
  ]);

  return (
    <BlogContent
      initialPosts={postsRes.items}
      categories={categories}
    />
  );
}
