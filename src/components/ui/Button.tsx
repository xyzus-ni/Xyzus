import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // teal-ink (#3F6566) di atas ivory = 5.65:1 — aman untuk teks tombol
  primary:
    "bg-teal-ink text-ivory hover:brightness-95 active:translate-y-px shadow-sm",
  secondary:
    "border border-stone bg-surface text-graphite hover:border-teal-ink/60 hover:text-teal-ink",
  ghost: "text-teal-ink hover:bg-stone/40",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} className={classes} {...externalProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
