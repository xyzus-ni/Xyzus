"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PostItem, CategoryItem } from "@/lib/types";
import { slugify, calculateReadingTime } from "@/lib/utils";
import { MarkdownRenderer } from "./MarkdownRenderer";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Code,
  Table as TableIcon,
  Quote,
  Image as ImageIcon,
  Sigma,
  Save,
  Loader2,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Upload,
} from "lucide-react";

interface AdminEditorProps {
  initialPost?: PostItem;
  categories: CategoryItem[];
  isEdit?: boolean;
}

export function AdminEditor({
  initialPost,
  categories,
  isEdit = false,
}: AdminEditorProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialPost?.slug));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [abstract, setAbstract] = useState(initialPost?.abstract || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [category, setCategory] = useState(
    initialPost?.category || (categories[0]?.name ?? "Karya Tulis Ilmiah")
  );
  const [tagsInput, setTagsInput] = useState(
    initialPost?.tags ? initialPost.tags.join(", ") : ""
  );
  const [lang, setLang] = useState<"id" | "en">(initialPost?.lang || "id");
  const [references, setReferences] = useState(initialPost?.references || "");
  const [status, setStatus] = useState<"draft" | "published">(
    initialPost?.status || "draft"
  );
  const [publishedAt, setPublishedAt] = useState<string>(
    initialPost?.published_at
      ? initialPost.published_at.substring(0, 10)
      : new Date().toISOString().substring(0, 10)
  );

  // File uploads
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  // Status & UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSavedTime, setAutoSavedTime] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title jika belum diedit manual
  useEffect(() => {
    if (!isSlugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, isSlugManual]);

  // Mark unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [title, slug, excerpt, abstract, content, category, tagsInput, references, status]);

  // Autosave draft to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        try {
          const draftData = {
            title,
            slug,
            excerpt,
            abstract,
            content,
            category,
            tagsInput,
            lang,
            references,
            status,
            publishedAt,
            updatedAt: new Date().toISOString(),
          };
          const storageKey = isEdit
            ? `post_draft_${initialPost?.id}`
            : "post_draft_new";
          localStorage.setItem(storageKey, JSON.stringify(draftData));
          setAutoSavedTime(new Date().toLocaleTimeString());
        } catch {
          // Abaikan jika localStorage penuh
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, slug, excerpt, abstract, content, category, tagsInput, lang, references, status, publishedAt, isEdit, initialPost?.id]);

  // Prevent accidental navigation when unsaved
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Toolbar formatting injection helper
  const insertFormatting = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || placeholder;

    const newText =
      textarea.value.substring(0, start) +
      before +
      selectedText +
      after +
      textarea.value.substring(end);

    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  // Image upload handler directly into PocketBase or base64 preview
  const handleImageUpload = (file: File) => {
    // Sisipkan placeholder markdown image
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      insertFormatting(`\n![${file.name}](${dataUrl})\n`);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        handleImageUpload(file);
      }
    }
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMessage("Judul dan isi konten artikel wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const tagsArray = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const readingTime = calculateReadingTime(content);
      const postSlug = slug.trim() || slugify(title);

      // Cari category_id jika ada
      const matchedCategory = categories.find(
        (c) => c.name === category || c.slug === category
      );
      const categoryId = matchedCategory?.id || null;

      const postData: any = {
        title: title.trim(),
        slug: postSlug,
        excerpt: excerpt.trim(),
        abstract: abstract.trim(),
        content: content,
        category_id: categoryId,
        tags: tagsArray,
        lang: lang,
        references: references.trim(),
        status: status,
        reading_time: readingTime,
        published_at:
          status === "published"
            ? new Date(publishedAt).toISOString()
            : null,
        updated_at: new Date().toISOString(),
      };

      if (isEdit && initialPost?.id) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", initialPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert([postData]);
        if (error) throw error;
      }

      setHasUnsavedChanges(false);
      // Bersihkan local draft
      const storageKey = isEdit
        ? `post_draft_${initialPost?.id}`
        : "post_draft_new";
      localStorage.removeItem(storageKey);

      router.push("/admin");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Gagal menyimpan karya tulis ke Supabase database."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] sticky top-20 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            title="Kembali ke Dasbor"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">
              {isEdit ? "Edit Karya Tulis" : "Tulis Karya Baru"}
            </h1>
            {autoSavedTime && (
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Autosave aktif &bull; {autoSavedTime}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono font-medium"
          >
            <option value="draft">Draf Pribadi (Tersembunyi)</option>
            <option value="published">Diterbitkan (Publik)</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs font-mono shadow-sm transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Publikasi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Metadata Inputs */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              Judul Karya Tulis *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Rancang Bangun Katamaran Elektrik Otonom..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugManual(true);
              }}
              placeholder="rancang-bangun-katamaran-elektrik"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              Tag (pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="IoT, Robotika, ATMI, KaTeX"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              Bahasa &amp; Tanggal Terbit
            </label>
            <div className="flex items-center gap-2">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "id" | "en")}
                className="w-24 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono uppercase"
              >
                <option value="id">ID</option>
                <option value="en">EN</option>
              </select>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="flex-1 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
            Ringkasan Singkat (Excerpt untuk Kartu &amp; SEO Meta)
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu..."
            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
          />
        </div>

        {/* Abstract Box */}
        <div>
          <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
            Abstrak / Ringkasan Eksekutif (Opsional untuk Paper Ilmiah)
          </label>
          <textarea
            rows={2}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Abstrak formal makalah ilmiah..."
            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs resize-y"
          />
        </div>
      </div>

      {/* MARKDOWN SPLIT-SCREEN EDITOR */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] overflow-hidden shadow-sm">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**", "teks tebal")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Tebal (Bold)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*", "teks miring")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Miring (Italic)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-300 dark:bg-slate-700 mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("## ", "", "Heading 2")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ", "", "Heading 3")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-300 dark:bg-slate-700 mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting("[", "](https://link.com)", "Nama Tautan")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Sisipkan Tautan (Link)"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n```python\n", "\n```\n", "# Kode program\nprint('Hello ATMI')")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Blok Kode (Code Block)"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n| Parameter | Nilai | Satuan |\n| :--- | :--- | :--- |\n| Voltase | 24 | VDC |\n| Arus | 2.5 | Ampere |\n")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Sisipkan Tabel"
          >
            <TableIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n> ", "\n", "Kutipan / Blockquote ilmiah...")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Kutipan (Quote)"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n$$\n", "\n$$\n", "F_d = \\frac{1}{2} \\rho v^2 C_d A")}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold"
            title="Rumus Matematika KaTeX ($$ formula $$)"
          >
            <Sigma className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-300 dark:bg-slate-700 mx-1" />
          {/* Direct image upload */}
          <label className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer" title="Unggah Gambar ke Konten">
            <ImageIcon className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 min-h-[500px]">
          {/* Left: Raw Markdown Editor */}
          <div className="p-4 flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Editor Markdown (Dukungan KaTeX &amp; Paste Gambar)
            </span>
            <textarea
              ref={textareaRef}
              required
              rows={22}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onPaste={handlePaste}
              placeholder="Tulis artikel ilmiah di sini menggunakan format Markdown...
Gunakan $$ rumus $$ untuk formula matematika KaTeX.
Contoh:
$$ R_T = R_F (1 + k) + R_W $$"
              className="w-full flex-1 p-3 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-cyan-500 resize-y leading-relaxed"
            />
          </div>

          {/* Right: Live Preview */}
          <div className="p-4 overflow-y-auto max-h-[600px] flex flex-col">
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
              Pratinjau Langsung (Live Preview)
            </span>
            <div className="p-4 rounded-lg bg-slate-50/30 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800/60 flex-1">
              {content.trim() ? (
                <MarkdownRenderer content={content} />
              ) : (
                <div className="text-slate-400 text-xs font-mono italic">
                  Pratinjau artikel akan otomatis muncul di sini saat Anda mengetik...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* References & Attachments Box */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-4 shadow-sm">
        <div>
          <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
            Daftar Pustaka / Referensi Terformat
          </label>
          <textarea
            rows={3}
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            placeholder="1. Newman, J. N. (2018). Marine Hydrodynamics. MIT Press.
2. ATMI Press. (2024). Panduan Sistem Otomasi Terapan."
            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Cover image upload */}
          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              Cover Image Karya Tulis
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              className="w-full text-xs font-mono text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-cyan-50 dark:file:bg-cyan-950 file:text-cyan-600 dark:file:text-cyan-400 hover:file:bg-cyan-100 cursor-pointer"
            />
          </div>

          {/* PDF attachment upload */}
          <div>
            <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
              Lampiran PDF Naskah Lengkap
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
              className="w-full text-xs font-mono text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-cyan-50 dark:file:bg-cyan-950 file:text-cyan-600 dark:file:text-cyan-400 hover:file:bg-cyan-100 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
