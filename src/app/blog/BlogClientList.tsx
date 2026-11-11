"use client";

import React, { useState, useMemo } from "react";
import { PostItem, CategoryItem } from "@/lib/types";
import { PostCard } from "@/components/PostCard";
import { useLanguage } from "@/lib/i18n/context";
import { Search, Tag, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogClientListProps {
  initialPosts: PostItem[];
  categories: CategoryItem[];
}

const ITEMS_PER_PAGE = 6;

export function BlogClientList({ initialPosts, categories }: BlogClientListProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Kumpulkan seluruh tags unik dari artikel yang ada
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags?.forEach((item) => tagsSet.add(item));
    });
    return Array.from(tagsSet);
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // 1. Kategori
      if (selectedCategory !== "all") {
        if (post.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }
      // 2. Tag
      if (selectedTag !== "all") {
        if (!post.tags?.some((item) => item.toLowerCase() === selectedTag.toLowerCase())) {
          return false;
        }
      }
      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inExcerpt = post.excerpt?.toLowerCase().includes(q);
        const inAbstract = post.abstract?.toLowerCase().includes(q);
        const inContent = post.content?.toLowerCase().includes(q);
        if (!inTitle && !inExcerpt && !inAbstract && !inContent) {
          return false;
        }
      }
      return true;
    });
  }, [initialPosts, selectedCategory, selectedTag, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="space-y-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
        {/* Search input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t.blog.search_placeholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => handleCategoryChange("all")}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-cyan-600 text-white font-semibold shadow-sm"
                : "text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-500"
            }`}
          >
            {t.blog.filter_all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.name)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-cyan-600 text-white font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-500"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tag Filters (if any) */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
            <span className="flex items-center gap-1 font-mono text-slate-400 text-[11px] mr-1">
              <Tag className="w-3 h-3 text-cyan-500" />
              <span>Tag:</span>
            </span>
            <button
              onClick={() => handleTagChange("all")}
              type="button"
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                selectedTag === "all"
                  ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-semibold"
                  : "text-slate-500 hover:text-cyan-500"
              }`}
            >
              {t.blog.all_tags}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                type="button"
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedTag === tag
                    ? "bg-cyan-600 text-white font-semibold"
                    : "text-slate-500 hover:text-cyan-500"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-sm space-y-3">
          <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
            {t.blog.empty}
          </p>
          <p className="text-xs">
            {t.blog.empty_sub}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedTag("all");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            type="button"
            className="inline-block mt-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            {t.blog.reset_filters}
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-mono text-slate-500">
            {t.blog.page_info
              .replace("{current}", String(currentPage))
              .replace("{total}", String(totalPages))
              .replace("{count}", String(filteredPosts.length))}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-500"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{t.blog.pagination_prev}</span>
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-500"
            >
              <span>{t.blog.pagination_next}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
