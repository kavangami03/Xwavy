"use client";

import { ArrowRight, Check, Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type RolesProps = {
  t: Dictionary["home"]["roles"];
  alts: Dictionary["home"]["images"];
  innovatorHref: string;
  investorHref: string;
};

/**
 * "Two sides": the innovator and the investor as a diptych. On scroll the two
 * panels slide in from opposite edges and meet; on desktop the hovered (or
 * focused) side widens. Each panel carries its own copy card.
 */
export function Roles({ t, alts, innovatorHref, investorHref }: RolesProps) {
  const root = useRef<HTMLDivElement>(null);

  const sides = [
    {
      key: "innovators",
      data: t.innovators,
      href: innovatorHref,
      Icon: Lightbulb,
      image: { src: "/images/story/innovator-portrait.webp", alt: alts.innovatorPortrait, position: "object-[30%_center]" },
      dark: false,
    },
    {
      key: "investors",
      data: t.investors,
      href: investorHref,
      Icon: TrendingUp,
      image: { src: "/images/story/investor-portrait.webp", alt: alts.investorPortrait, position: "object-[50%_25%]" },
      dark: true,
    },
  ] as const;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MEDIA.motionOk}`, () => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        const [first, second] = gsap.utils.toArray<HTMLElement>("[data-side]", root.current);
        const scrub = { trigger: root.current, start: "top 95%", end: "top 35%", scrub: 0.8 };
        gsap.fromTo(first, { xPercent: -14 * rtl, rotate: -2 * rtl }, { xPercent: 0, rotate: 0, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(second, { xPercent: 14 * rtl, rotate: 2 * rtl }, { xPercent: 0, rotate: 0, ease: "none", scrollTrigger: scrub });
      });
    },
    { scope: root },
  );

  return (
    <Section tone="surface" aria-labelledby="roles-title" className="overflow-x-clip">
      <SectionHeading id="roles-title" eyebrow={t.eyebrow} number="01" title={t.titleLead} accent={t.titleAccent} />

      <div ref={root} className="mt-14 flex flex-col gap-4 lg:h-[min(52rem,86vh)] lg:flex-row lg:gap-5">
        {sides.map(({ key, data, href, Icon, image, dark }) => (
          <article
            key={key}
            data-side
            className="group relative flex flex-col overflow-hidden rounded-[var(--panel-radius)] bg-navy transition-[flex-grow] duration-700 ease-brand lg:flex-1 lg:hover:grow-[1.35] lg:focus-within:grow-[1.35]"
          >
            <div className="relative aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={cn("object-cover transition-transform duration-[1.2s] ease-brand group-hover:scale-[1.04]", image.position)}
              />
            </div>

            {/* Copy card: solid, never a gradient over the photo. */}
            <div
              className={cn(
                "relative flex flex-col p-6 sm:p-8 lg:absolute lg:inset-x-5 lg:bottom-5 lg:max-w-xl lg:rounded-2xl",
                dark ? "surface-abyss" : "bg-white",
              )}
            >
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-eyebrow uppercase",
                  dark ? "bg-gold/15 text-gold" : "bg-cyan/10 text-cyan-ink",
                )}
              >
                <Icon aria-hidden className="size-3.5" />
                {data.label}
              </span>
              <h3 className={cn("mt-5 text-h3", dark ? "text-white" : "text-ink")}>{data.title}</h3>
              <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {data.points.map((point) => (
                  <li key={point} className={cn("flex items-start gap-2.5 text-sm", dark ? "text-mist" : "text-body")}>
                    <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-gold" : "text-cyan-ink")} />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={cn(
                  "mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium underline-offset-4 hover:underline",
                  dark ? "text-white" : "text-ink",
                )}
              >
                {data.cta}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
