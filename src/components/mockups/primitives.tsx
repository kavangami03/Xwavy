import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Building blocks for product mockups: interface fragments drawn in HTML
 * rather than screenshots, so they stay sharp, translate, and mirror in RTL.
 * Mockups are illustrations: render them inside an aria-hidden container or
 * give them a text alternative.
 */

export function MockCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-line bg-white p-5 text-start shadow-card sm:p-6", className)}>
      {children}
    </div>
  );
}

export function MockChip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "cyan" | "gold" | "dark";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-surface text-body",
    cyan: "border-cyan-ink/20 bg-cyan/10 text-cyan-ink",
    gold: "border-gold-ink/20 bg-gold/15 text-gold-ink",
    dark: "border-abyss bg-abyss text-white",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A grey bar standing in for text that is withheld or not yet written. */
export function MockLine({ className }: { className?: string }) {
  return <span className={cn("block h-2 rounded-full bg-frost", className)} />;
}
