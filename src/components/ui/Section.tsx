import React from "react";
import { TechLabel } from "./TechLabel";

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Label teknis di atas judul, mis. "SEC. 02 — SERVICES" */
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Tambahkan garis grid latar */
  grid?: boolean;
}

export function Section({
  eyebrow,
  title,
  description,
  grid = false,
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`relative border-b border-stone/60 ${grid ? "bg-grid" : ""} ${className}`}
      {...props}
    >
      <div className="mx-auto w-full max-w-shell px-5 py-16 sm:px-8 sm:py-24">
        {(eyebrow || title || description) && (
          <header className="mb-10 max-w-2xl sm:mb-14">
            {eyebrow && <TechLabel className="mb-4 block">{eyebrow}</TechLabel>}
            {title && (
              <h2 className="font-serif text-title-lg text-graphite">{title}</h2>
            )}
            {description && (
              <p className="mt-4 text-lead text-graphite/70">{description}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
