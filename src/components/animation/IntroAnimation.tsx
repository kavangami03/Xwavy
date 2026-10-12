"use client";

import { useRef, type ReactNode } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

type IntroAnimationProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Page-load choreography for above-the-fold content.
 *
 * Inside this wrapper:
 *   [data-intro]        elements reveal in DOM order (fade + lift)
 *   [data-intro="split"] headings reveal line by line behind a mask
 *   [data-intro="card"]  product mockups rise in last, slightly slower
 *
 * Those elements are hidden by CSS before hydration (see globals.css), so
 * there is no flash. With reduced motion they are simply shown.
 */
export function IntroAnimation({ children, className }: IntroAnimationProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const targets = gsap.utils.toArray<HTMLElement>("[data-intro]", scope);

      const mm = gsap.matchMedia();
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(targets, { autoAlpha: 1 });
      });
      mm.add(MEDIA.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: EASE.gsapOut } });

        targets.forEach((el, i) => {
          const at = i === 0 ? 0.1 : "<0.12";
          const kind = el.dataset.intro;

          if (kind === "split") {
            gsap.set(el, { autoAlpha: 1 });
            const split = SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true });
            tl.from(split.lines, { yPercent: 110, duration: 1, stagger: 0.09 }, at);
          } else if (kind === "card") {
            tl.fromTo(el, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.2 }, "<0.2");
          } else {
            tl.fromTo(el, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, at);
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
