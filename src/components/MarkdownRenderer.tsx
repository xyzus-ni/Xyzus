"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { t } = useLanguage();
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-img:rounded-xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-800 prose-table:border-collapse prose-th:bg-slate-100 dark:prose-th:bg-slate-800/80 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeSlug, rehypeKatex, rehypeHighlight]}
        components={{
          pre({ children, ...props }) {
            return (
              <CodeBlock {...props}>
                {children}
              </CodeBlock>
            );
          },
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          img({ src, alt, ...props }) {
            return (
              <figure className="my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || t.blog.image_alt}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 mx-auto max-h-[500px] object-contain shadow-sm"
                  loading="lazy"
                  {...props}
                />
                {alt && (
                  <figcaption className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 px-4 py-3 rounded-r-lg my-4 italic text-slate-700 dark:text-slate-300"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ children, ...props }: any) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      // Dapatkan teks mentah dari children
      const codeElement = React.Children.toArray(children)[0] as any;
      const text = codeElement?.props?.children?.toString() || "";
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative group my-5 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800/80 border-b border-slate-700/60 text-xs font-mono text-slate-400">
        <span>{t.blog.code_snippet}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1 hover:text-white transition-colors focus-visible:outline-none"
          title={t.blog.copy_code}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-semibold">{t.blog.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">{t.blog.copy}</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-slate-100 bg-slate-900" {...props}>
        {children}
      </pre>
    </div>
  );
}
