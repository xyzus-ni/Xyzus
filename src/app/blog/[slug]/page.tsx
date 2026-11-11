import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/pocketbase";
import { extractHeadings, formatDate } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { PrintDownloadButton } from "@/components/PrintDownloadButton";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  Bookmark,
  FileText,
} from "lucide-react";

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

  const title = `${post.title} | Karya Tulis Mahesa`;
  const description = post.excerpt || post.abstract || post.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
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

  const headings = extractHeadings(post.content);

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
      <ReadingProgressBar />

      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        {/* Top Back Navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Karya Tulis</span>
          </Link>
        </div>

        {/* Article Header & Metadata */}
        <header className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
              {post.category}
            </span>
            {post.lang && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {post.lang}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
            <span>Oleh <strong className="text-slate-900 dark:text-slate-200 font-semibold">Mahesa Tirtha A. P.</strong></span>
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at, post.lang || "id")}
                </time>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.reading_time || 5} menit baca</span>
            </span>
          </div>

          {/* Social Share & Attachment Download Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80">
            <ShareButtons title={post.title} />

            {/* Optional PDF download */}
            <PrintDownloadButton />
          </div>
        </header>

        {/* Optional Abstract Box (Penting untuk Karya Ilmiah) */}
        {post.abstract && (
          <section className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-50/40 dark:bg-cyan-950/20 backdrop-blur-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              <FileText className="w-4 h-4" />
              <span>Abstrak / Ringkasan Eksekutif</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              {post.abstract}
            </p>
          </section>
        )}

        {/* Table of Contents (Auto-generated from Headings) */}
        {headings.length > 1 && (
          <div className="my-6">
            <TableOfContents headings={headings} />
          </div>
        )}

        {/* Main Content Rendered */}
        <div className="py-2">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Formatted References / Bibliography */}
        {post.references && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-cyan-500" />
              <span>Daftar Pustaka &amp; Referensi Terkait</span>
            </h3>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-mono text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <MarkdownRenderer content={post.references} />
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          {post.tags?.map((t, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Prev / Next Navigation */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-colors group"
            >
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                <span>Tulisan Sebelumnya</span>
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                {prevPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-colors group text-right sm:text-right"
            >
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-end gap-1 mb-1">
                <span>Tulisan Berikutnya</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                {nextPost.title}
              </div>
            </Link>
          )}
        </nav>

        {/* Related Posts by Tag */}
        {relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>Karya Tulis Ilmiah Terkait</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-colors bg-white dark:bg-[#111827]/60"
                >
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {rel.excerpt || rel.abstract}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
