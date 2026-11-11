"use client";

import React from "react";
import Link from "next/link";
import { PostItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

interface PostCardProps {
  post: PostItem;
}

export function PostCard({ post }: PostCardProps) {
  const { t, locale } = useLanguage();

  return (
    <article className="flex flex-col h-full rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827]/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-cyan-500/5 group overflow-hidden">
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/80">
              {post.category || "Karya Ilmiah"}
            </span>

            <div className="flex items-center gap-3 font-mono text-[11px]">
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
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {post.excerpt || post.abstract || (locale === "en" ? "Read full scientific paper." : "Baca naskah lengkap karya tulis ilmiah ini.")}
          </p>
        </div>

        {/* Footer & Tags */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags?.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.blog.read_more}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
