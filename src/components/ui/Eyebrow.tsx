import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Optional section number, e.g. "01". */
  number?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Small label above a heading: a short rule, an optional number, then the text. */
export function Eyebrow({ children, number, tone = "light", className }: EyebrowProps) {
  const dark = tone === "dark";
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-eyebrow uppercase",
        dark ? "text-mist" : "text-muted",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-8", dark ? "bg-cyan" : "bg-cyan-ink")} />
      {number ? <span className={dark ? "text-cyan" : "text-cyan-ink"}>{number}</span> : null}
      <span>{children}</span>
    </p>
  );
}
