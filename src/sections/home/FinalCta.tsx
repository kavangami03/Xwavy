"use client";

import { Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type FinalCtaProps = {
  t: Dictionary["home"]["finalCta"];
  alt: string;
  innovatorHref: string;
  investorHref: string;
};

/**
 * The story's last frame: the founder and the investor in conversation, the
 * outcome of an introduction. A cinematic panel that settles (zooms out) as
 * it scrolls in, with the role-split call to action on a solid card.
 */
export function FinalCta({ t, alt, innovatorHref, investorHref }: FinalCtaProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(
          "[data-meeting]",
          { scale: 1.18 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="final-cta-title"
      className="surface-abyss panel relative mb-(--panel-inset) flex flex-col lg:block lg:h-[min(56rem,92vh)]"
    >
      <div className="relative aspect-21/10 overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
        <div data-meeting className="absolute inset-0">
          <Image src="/images/story/the-meeting.webp" alt={alt} fill sizes="100vw" className="object-cover object-[70%_center]" />
        </div>
      </div>

      <div className="relative p-gutter lg:absolute lg:inset-y-0 lg:inset-s-0 lg:flex lg:items-end">
        <div className="surface-abyss flex flex-col gap-8 rounded-[calc(var(--panel-radius)*0.8)] p-7 sm:p-10 lg:max-w-xl">
          <h2 id="final-cta-title" className="text-display text-white">
            {t.titleLead} <span className="accent text-cyan">{t.titleAccent}</span>
          </h2>

          <div className="flex flex-col divide-y divide-navy-line border-y border-navy-line">
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan text-abyss">
                  <Lightbulb aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-h4 text-white">{t.innovator.label}</h3>
                  <p className="mt-1 max-w-xs text-sm text-mist">{t.innovator.body}</p>
                </div>
              </div>
              <Button href={innovatorHref} size="sm" arrow className="shrink-0">
                {t.innovator.cta}
              </Button>
            </div>
            <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-abyss">
                  <TrendingUp aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-h4 text-white">{t.investor.label}</h3>
                  <p className="mt-1 max-w-xs text-sm text-mist">{t.investor.body}</p>
                </div>
              </div>
              <Button href={investorHref} size="sm" variant="accent" arrow className="shrink-0">
                {t.investor.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
