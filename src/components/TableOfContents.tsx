"use client";

import React, { useEffect, useState } from "react";
import { HeadingItem } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { List } from "lucide-react";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -75% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
        <List className="w-4 h-4 text-cyan-500" />
        <span>{t.blog.toc}</span>
      </div>
      <ul className="space-y-1.5 text-xs">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${
                item.level === 3 ? "ml-3.5" : ""
              }`}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors leading-relaxed ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
