import React from "react";

/**
 * Label teknis bergaya dokumentasi lab.
 * Contoh: "FIG. 001", "SYS-003 · v0.2 · STATUS: PROTOTYPE".
 * Selalu mono + uppercase + tracking lebar, warna teal-ink (bukan sage/terracotta).
 */
export function TechLabel({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "h2" | "h3" | "h4";
}) {
  return (
    <Tag
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-teal-ink ${className}`}
    >
      {children}
    </Tag>
  );
}
