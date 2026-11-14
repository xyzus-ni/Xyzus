import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/pocketbase";
import { BlogPostDetailContent } from "./BlogPostDetailContent";

export const revalidate = 60;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const postsRes = await getPosts({ perPage: 100 });
  return postsRes.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Karya Tulis Tidak Ditemukan" };

  const title = `${post.title} | XYZUS Journal`;
  const description = post.excerpt || post.abstract || post.title;
  const url = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: post.published_at,
      authors: ["Mahesa Tirtha Agung Permana"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Ambil semua artikel untuk Prev/Next dan Artikel Terkait
  const allPostsRes = await getPosts({ perPage: 50 });
  const allPosts = allPostsRes.items;
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex !== -1 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  // Temukan artikel terkait berdasarkan kesamaan tag
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 2);

  // JSON-LD Structured Data untuk ScholarlyArticle / Article SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: post.title,
    description: post.excerpt || post.abstract,
    datePublished: post.published_at,
    dateModified: post.updated || post.published_at,
    author: {
      "@type": "Person",
      name: "Mahesa Tirtha Agung Permana",
      url: "https://github.com/xyzus-ni",
      jobTitle: "Mechatronics & IoT Engineer",
      affiliation: {
        "@type": "EducationalOrganization",
        name: "Politeknik Industri ATMI",
      },
    },
    keywords: post.tags?.join(", "),
    inLanguage: post.lang || "id",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostDetailContent
        post={post}
        prevPost={prevPost}
        nextPost={nextPost}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
