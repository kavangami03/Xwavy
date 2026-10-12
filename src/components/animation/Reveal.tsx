"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA, REVEAL } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * Animate direct children one after another instead of the wrapper as a
   * whole. Use for card grids and lists.
   */
  stagger?: boolean;
  /** Seconds to wait before starting. */
  delay?: number;
};

/**
 * Fades and lifts content in once when it scrolls into view.
 *
 * Content is fully visible in the server HTML and without JavaScript; GSAP
 * only hides it after hydration. Use this for content below the fold. Hero
 * content should be animated by its own component on load.
 *
 * Users who prefer reduced motion get static content: the animation is only
 * created inside the `motionOk` media query.
 */
export function Reveal({ children, className, stagger = false, delay = 0 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const targets = stagger ? Array.from(element.children) : element;
        gsap.from(targets, {
          autoAlpha: 0,
          y: REVEAL.y,
          duration: DURATION.reveal,
          ease: EASE.gsapOut,
          delay,
          stagger: stagger ? REVEAL.stagger : 0,
          scrollTrigger: { trigger: element, start: REVEAL.start, once: true },
        });
      });
    },
    { scope: root, dependencies: [stagger, delay] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
