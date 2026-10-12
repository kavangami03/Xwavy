"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type PricingBandProps = { t: Dictionary["home"]["pricing"]; pricingHref: string };

/**
 * "Innovators are always free", stated as a giant zero, with the investor
 * plan teaser beside it and the free-side facts as a band that drifts with
 * scroll (scroll-driven, not autoplay, so it needs no pause control).
 * No plan prices: Wavy Solutions has not fixed them yet.
 */
export function PricingBand({ t, pricingHref }: PricingBandProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        gsap.fromTo(
          "[data-band]",
          { xPercent: 0 },
          {
            xPercent: -33.333 * rtl,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 },
          },
        );
        gsap.from("[data-zero]", {
          yPercent: 30,
          autoAlpha: 0,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: { trigger: "[data-zero]", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Three copies so the drifting band never runs out of content.
  const band = [...t.facts, ...t.facts, ...t.facts];

  return (
    <section ref={root} aria-labelledby="pricing-title" className="panel bg-white py-section-sm">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_minmax(0,24rem)] lg:gap-14">
          <span
            data-zero
            aria-hidden
            className="font-heading text-[clamp(9rem,22vw,20rem)] leading-[0.8] font-bold tracking-[-0.06em] text-cyan-ink"
            data-numeric
          >
            0
          </span>
          <div className="flex flex-col gap-5">
            <Eyebrow number="06">{t.eyebrow}</Eyebrow>
            <h2 id="pricing-title" className="text-h2 text-ink">
              {t.title}
            </h2>
            <p className="max-w-md text-lead text-muted">{t.body}</p>
          </div>
          <div className="surface-abyss flex flex-col items-start gap-5 rounded-xl p-7 sm:p-8">
            <h3 className="text-h3 text-white">{t.investorsTitle}</h3>
            <p className="text-mist">{t.investorsBody}</p>
            <Button href={pricingHref} variant="accent" arrow>
              {t.cta}
            </Button>
          </div>
        </div>
      </Container>

      <div aria-hidden className="mt-section-sm overflow-hidden border-y border-line py-6">
        <div data-band className="flex w-max items-center gap-10 whitespace-nowrap">
          {band.map((fact, i) => (
            <span key={i} className="flex items-center gap-10 font-heading text-h2 text-ink">
              {fact}
              <span className="size-3 rounded-full bg-cyan" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
