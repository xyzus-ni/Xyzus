"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { PostItem } from "@/lib/types";
import { extractHeadings, formatDate } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { PrintDownloadButton } from "@/components/PrintDownloadButton";
import { useLanguage } from "@/lib/i18n/context";
import { getTranslatedPost } from "@/lib/i18n/postTranslations";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  Bookmark,
  FileText,
  Sparkles,
} from "lucide-react";

interface BlogPostDetailContentProps {
  post: PostItem;
  prevPost: PostItem | null;
  nextPost: PostItem | null;
  relatedPosts: PostItem[];
}

export function BlogPostDetailContent({
  post,
  prevPost,
  nextPost,
  relatedPosts,
}: BlogPostDetailContentProps) {
  const { t, locale } = useLanguage();

  // Dynamic translated post content according to selected locale
  const translated = useMemo(() => {
    return getTranslatedPost(
      post.slug,
      {
        title: post.title,
        excerpt: post.excerpt,
        abstract: post.abstract,
        content: post.content,
        references: post.references,
      },
      locale
    );
  }, [post, locale]);

  const headings = useMemo(() => {
    return extractHeadings(translated.content);
  }, [translated.content]);

  return (
    <>
      <ReadingProgressBar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        {/* Top Back Navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.blog.back_to_blog}</span>
          </Link>
        </div>

        {/* Article Header & Metadata */}
        <header className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
              {post.category}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {locale.toUpperCase()}
            </span>
            {locale === "en" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>{t.blog.auto_translated_notice}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            {translated.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
            <span>
              {t.blog.author_by}{" "}
              <strong className="text-slate-900 dark:text-slate-200 font-semibold">
                Mahesa Tirtha A. P.
              </strong>
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at, locale)}
                </time>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.reading_time || 5} {t.blog.min_read}</span>
            </span>
          </div>

          {/* Social Share & Attachment Download Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80">
            <ShareButtons title={translated.title} />
            <PrintDownloadButton />
          </div>
        </header>

        {/* Optional Abstract Box */}
        {translated.abstract && (
          <section className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-50/40 dark:bg-cyan-950/20 backdrop-blur-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              <FileText className="w-4 h-4" />
              <span>{t.blog.abstract}</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              {translated.abstract}
            </p>
          </section>
        )}

        {/* Table of Contents */}
        {headings.length > 1 && (
          <div className="my-6">
            <TableOfContents headings={headings} />
          </div>
        )}

        {/* Main Content Rendered */}
        <div className="py-2">
          <MarkdownRenderer content={translated.content} />
        </div>

        {/* Formatted References / Bibliography */}
        {translated.references && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-cyan-500" />
              <span>{t.blog.references}</span>
            </h3>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-mono text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <MarkdownRenderer content={translated.references} />
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          {post.tags?.map((tItem, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
            >
              #{tItem}
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
                <span>{t.blog.prev_post}</span>
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
                <span>{t.blog.next_post}</span>
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
              <span>{t.blog.related_posts}</span>
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
