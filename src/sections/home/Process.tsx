"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { ProcessVisual } from "@/components/mockups/ProcessVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";

type ProcessProps = { t: Dictionary["home"]["process"]; alts: Dictionary["home"]["images"] };

/** One photograph per step, in story order (public/images/story). */
const PHOTOS = [
  { src: "/images/story/step-1-post.webp", alt: "step1" },
  { src: "/images/story/step-2-review.webp", alt: "step2" },
  { src: "/images/story/step-3-discover.webp", alt: "step3" },
  { src: "/images/story/step-4-request.webp", alt: "step4" },
  { src: "/images/story/step-5-connect.webp", alt: "step5" },
] as const;

/** The reel runs only with room and motion; otherwise the frames stack. */
const REEL_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "From first draft to first conversation" as a film reel. The section pins
 * and the five steps travel horizontally, one cinematic frame each: the
 * photograph, an outlined step number, a solid story card and the matching
 * interface fragment. A counter and rail track the reel. Without motion (or
 * below lg) the frames stack vertically.
 */
export function Process({ t, alts }: ProcessProps) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const count = t.steps.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REEL_QUERY, () => {
        const strip = track.current;
        if (!strip) return;
        // Content travels toward the reading start: left in LTR, right in RTL.
        const dir = document.documentElement.dir === "rtl" ? 1 : -1;
        /** How far the strip must travel so its last frame ends in view. */
        const distance = () => Math.max(0, strip.scrollWidth - (strip.parentElement?.clientWidth ?? 0));

        const reel = gsap.to(strip, {
          x: () => dir * distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(rail.current, { scaleX: self.progress });
              setActive(Math.min(count - 1, Math.round(self.progress * (count - 1))));
            },
          },
        });

        // Parallax inside each frame: the photo drifts against the reel.
        gsap.utils.toArray<HTMLElement>("[data-frame-photo]", strip).forEach((photo) => {
          gsap.fromTo(
            photo,
            { xPercent: -8 * dir },
            {
              xPercent: 8 * dir,
              ease: "none",
              scrollTrigger: {
                trigger: photo.parentElement,
                containerAnimation: reel,
                start: dir < 0 ? "left right" : "right left",
                end: dir < 0 ? "right left" : "left right",
                scrub: true,
              },
            },
          );
        });

        return () => setActive(0);
      });
    },
    { scope: root, dependencies: [count] },
  );

  return (
    <section ref={root} aria-labelledby="process-title" id="how-it-works" className="panel bg-white">
      <div className="flex flex-col lg:motion-safe:h-dvh">
        <Container className="pt-section lg:motion-safe:pt-[calc(var(--spacing-header)+3rem)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="process-title" eyebrow={t.eyebrow} number="02" title={t.titleLead} accent={t.titleAccent} />

            {/* Reel counter and rail (decorative; every step is in the list below). */}
            <div aria-hidden className="hidden w-72 shrink-0 flex-col gap-3 lg:motion-safe:flex">
              <p className="flex items-baseline justify-between font-mono text-eyebrow text-muted uppercase">
                <span>
                  {t.stepLabel} <span className="text-ink">{pad(active + 1)}</span> {t.of} {pad(count)}
                </span>
                <span className="text-ink">{t.steps[active]?.name}</span>
              </p>
              <span className="relative block h-px bg-line">
                <span ref={rail} className="absolute inset-0 origin-left scale-x-0 bg-cyan-ink rtl:origin-right" />
              </span>
            </div>
          </div>
        </Container>

        <div className="overflow-hidden pt-12 pb-section lg:motion-safe:flex lg:motion-safe:flex-1 lg:motion-safe:items-center lg:motion-safe:pt-8 lg:motion-safe:pb-10">
          <ol
            ref={track}
            className="flex flex-col gap-10 px-gutter lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:gap-6"
          >
            {t.steps.map((step, i) => {
              const photo = PHOTOS[i] ?? PHOTOS[0];
              return (
                <li
                  key={step.name}
                  className="relative flex flex-col lg:motion-safe:h-[min(40rem,64vh)] lg:motion-safe:w-[min(68rem,72vw)]"
                >
                  {/* Photo frame. */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-[calc(var(--panel-radius)*0.8)] bg-navy lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:aspect-auto">
                    <div data-frame-photo className="absolute inset-y-0 inset-x-[-10%]">
                      <Image src={photo.src} alt={alts[photo.alt]} fill sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover" />
                    </div>
                    <span
                      aria-hidden
                      className="absolute top-5 inset-s-6 font-heading text-[clamp(4.5rem,10vw,9rem)] leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.9)]"
                    >
                      {pad(i + 1)}
                    </span>
                  </div>

                  {/* Story card: solid, bottom-start. */}
                  <div className="relative mx-4 -mt-10 rounded-2xl bg-white p-6 shadow-elevated sm:p-8 lg:motion-safe:absolute lg:motion-safe:bottom-6 lg:motion-safe:inset-s-6 lg:motion-safe:m-0 lg:motion-safe:max-w-md">
                    <p className="font-mono text-eyebrow text-cyan-ink uppercase">
                      {t.stepLabel} {pad(i + 1)} · {step.name}
                    </p>
                    <h3 className="mt-3 text-h3 text-ink">{step.title}</h3>
                    <p className="mt-3 text-[0.9375rem] text-body">{step.body}</p>
                  </div>

                  {/* Interface fragment, top-end (desktop reel only). */}
                  <div
                    aria-hidden
                    className="hidden lg:motion-safe:absolute lg:motion-safe:top-6 lg:motion-safe:inset-e-6 lg:motion-safe:block lg:motion-safe:w-[min(21rem,34%)]"
                  >
                    <ProcessVisual steps={t.steps} index={i} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
