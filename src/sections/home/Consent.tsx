"use client";

import { LockOpen, Send, ShieldX, UserCheck, Users } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";

type ConsentProps = { t: Dictionary["home"]["consent"]; alt: string };

/** Pinned "doors" only with room and motion; otherwise a static layout. */
const DOORS_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * The double opt-in as a pair of sealed doors. Each door is one side's
 * consent: the investor asks (gold), the innovator decides (cyan). Scrolling
 * lights each in turn, then the doors part to reveal the two of them
 * together: contact released both ways at once.
 */
export function Consent({ t, alt }: ConsentProps) {
  const stage = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(3); // 0 none, 1 investor, 2 innovator, 3 opened
  const [ask, decide, introduced] = t.stages;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DOORS_QUERY, () => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        setBeat(0);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage.current,
            start: "center center",
            end: "+=140%",
            pin: true,
            scrub: 0.6,
          },
          onUpdate: () => {
            const p = tl.progress();
            setBeat(p < 0.12 ? 0 : p < 0.38 ? 1 : p < 0.62 ? 2 : 3);
          },
        });
        tl.to("[data-door=start]", { xPercent: -101 * rtl, ease: "power3.inOut", duration: 0.34 }, 0.64)
          .to("[data-door=end]", { xPercent: 101 * rtl, ease: "power3.inOut", duration: 0.34 }, 0.64)
          .fromTo("[data-reveal-photo]", { scale: 1.15 }, { scale: 1, ease: "power2.out", duration: 0.36 }, 0.64)
          .fromTo("[data-reveal-card]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.86)
          .set({}, {}, 1);
        return () => setBeat(3);
      });
    },
    { scope: stage },
  );

  const doors = [
    { side: "start", stage: ask, Icon: Send, n: "01", lit: beat >= 1, accent: "gold" },
    { side: "end", stage: decide, Icon: UserCheck, n: "02", lit: beat >= 2, accent: "cyan" },
  ] as const;

  return (
    <section aria-labelledby="consent-title" className="surface-navy panel">
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading id="consent-title" tone="dark" eyebrow={t.eyebrow} number="03" title={t.titleLead} accent={t.titleAccent} />
          <p className="max-w-md text-lead text-mist">{t.body}</p>
        </div>

        <div ref={stage} className="mt-14 lg:mt-20">
          {/* Overlay layout only when the doors can animate (lg + motion); otherwise a stacked
              story in reading order: the two sides, then the photo and its caption. */}
          <div className="relative flex flex-col overflow-hidden rounded-[calc(var(--panel-radius)*0.8)] lg:motion-safe:block lg:motion-safe:h-[min(46rem,78vh)]">
            {/* The reward behind the doors. */}
            <div data-reveal-photo className="relative order-2 aspect-3/2 lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:aspect-auto">
              <Image src="/images/story/together.webp" alt={alt} fill sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover" />
            </div>

            <div
              data-reveal-card
              className="relative order-3 flex items-center gap-4 bg-white p-5 lg:motion-safe:absolute lg:motion-safe:bottom-6 lg:motion-safe:inset-s-6 lg:motion-safe:max-w-md lg:motion-safe:rounded-2xl lg:motion-safe:shadow-elevated"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-abyss text-cyan">
                <Users aria-hidden className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-xs text-cyan-ink">03</span>
                <span className="font-heading text-h4 text-ink">{introduced?.label}</span>
                <span className="text-sm text-body">{introduced?.detail}</span>
              </span>
              <span className="ms-auto hidden items-center gap-1.5 rounded-full bg-cyan/15 px-3 py-1 font-mono text-xs text-cyan-ink sm:inline-flex">
                <LockOpen aria-hidden className="size-3.5" />
                {t.revealed}
              </span>
            </div>

            {/* The two sealed doors. They part on scroll (lg + motion). */}
            <div className="order-1 grid lg:grid-cols-2 lg:motion-safe:absolute lg:motion-safe:inset-0">
              {doors.map(({ side, stage: item, Icon, n, lit, accent }) => (
                <div
                  key={side}
                  data-door={side}
                  className={cn(
                    "relative flex flex-col justify-end gap-4 p-7 sm:p-10",
                    side === "start" ? "bg-abyss" : "bg-navy-raised",
                    side === "start" && "lg:border-e lg:border-navy-line",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-8 inset-s-8 font-heading text-[clamp(5rem,10vw,9rem)] leading-none font-bold transition-colors duration-700",
                      lit ? (accent === "gold" ? "text-gold/20" : "text-cyan/20") : "text-white/5",
                    )}
                  >
                    {n}
                  </span>
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-full border transition-colors duration-500",
                      lit
                        ? accent === "gold"
                          ? "border-gold bg-gold text-abyss"
                          : "border-cyan bg-cyan text-abyss"
                        : "border-navy-line text-mist",
                    )}
                  >
                    <Icon aria-hidden className="size-5 rtl:-scale-x-100" />
                  </span>
                  <h3 className={cn("text-h3 transition-colors duration-500", lit ? "text-white" : "text-mist")}>{item?.label}</h3>
                  <p className="max-w-sm text-mist">{item?.detail}</p>
                  {/* The seam: a lock on each door, released when both sides have said yes. */}
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-500",
                      lit ? "border-white/20 text-white" : "border-navy-line text-mist",
                    )}
                  >
                    {t.sealed}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 border-t border-navy-line pt-10 md:grid-cols-3">
          {t.rules.map((rule) => (
            <li key={rule} className="flex items-start gap-3 text-sm text-mist">
              <ShieldX aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
              {rule}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
