"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

/** Scrolls back to the top through Lenis (instant when motion is reduced). */
export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
      className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-mist transition-colors hover:border-white hover:text-white"
    >
      {label}
      <ArrowUp aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
