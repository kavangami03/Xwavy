"use client";

import { useSyncExternalStore } from "react";

import { MEDIA } from "@/lib/motion";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(MEDIA.reducedMotion);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(MEDIA.reducedMotion).matches;
}

/** The server cannot know the preference; animation only starts on the client. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Live `prefers-reduced-motion: reduce` state. Updates if the user changes the
 * OS setting while the page is open.
 *
 * For GSAP, prefer `gsap.matchMedia()` with `MEDIA.motionOk` inside
 * `useGSAP()`, which reverts animations automatically when the preference flips.
 * Framer Motion is already covered globally by `<MotionProvider>`.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
