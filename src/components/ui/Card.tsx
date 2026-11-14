import React from "react";
import { TechLabel } from "./TechLabel";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label teknis di pojok kiri atas kartu, mis. "PRJ-001" */
  code?: string;
  /** Label teknis kanan atas, mis. "v0.2 · STATUS: PROTOTYPE" */
  meta?: string;
}

export function Card({ code, meta, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-md border border-stone bg-surface ${className}`}
      {...props}
    >
      {(code || meta) && (
        <div className="flex items-center justify-between gap-3 border-b border-stone/70 px-4 py-2.5">
          {code ? <TechLabel>{code}</TechLabel> : <span />}
          {meta ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/60">
              {meta}
            </span>
          ) : null}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
