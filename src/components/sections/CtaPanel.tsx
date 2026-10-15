"use client";

import { Lightbulb, TrendingUp, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

export type CtaRow = {
  label: string;
  body: string;
  cta: string;
  href: string;
  /** Cyan for innovator actions, gold for investor actions (site colour logic). */
  side: "innovator" | "investor";
};

type CtaPanelProps = {
  id: string;
  titleLead: string;
  titleAccent: string;
  rows: readonly CtaRow[];
  image: { src: string; alt: string; position?: string };
};

const sides: Record<CtaRow["side"], { Icon: LucideIcon; chip: string; variant: "primary" | "accent" }> = {
  innovator: { Icon: Lightbulb, chip: "bg-cyan text-abyss", variant: "primary" },
  investor: { Icon: TrendingUp, chip: "bg-gold text-abyss", variant: "accent" },
};

/**
 * Closing call to action shared by every page: a photograph with role-split
 * actions on a solid card. As it enters, the photo settles from a slight
 * zoom and the card rises in (once each).
 */
export function CtaPanel({ id, titleLead, titleAccent, rows, image }: CtaPanelProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo("[data-cta-photo]", { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
        gsap.from("[data-cta-card]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby={id}
      className="surface-abyss panel relative mb-(--panel-inset) flex flex-col lg:block lg:h-[min(40rem,80vh)]"
    >
      <div className="relative aspect-video overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
        <div data-cta-photo className="absolute inset-0">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className={cn("object-cover", image.position ?? "object-center")} />
        </div>
      </div>

      <div className="relative p-gutter lg:absolute lg:inset-y-0 lg:inset-s-0 lg:flex lg:items-end">
        <div data-cta-card className="surface-abyss flex flex-col gap-8 rounded-[calc(var(--panel-radius)*0.8)] p-7 sm:p-10 lg:max-w-xl">
          <h2 id={id} className="text-display text-white">
            {titleLead} <span className="accent text-cyan">{titleAccent}</span>
          </h2>

          <div className="flex flex-col divide-y divide-navy-line border-y border-navy-line">
            {rows.map((row) => {
              const { Icon, chip, variant } = sides[row.side];
              return (
                <div key={row.label} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", chip)}>
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-h4 text-white">{row.label}</h3>
                      <p className="mt-1 max-w-xs text-sm text-mist">{row.body}</p>
                    </div>
                  </div>
                  <Button href={row.href} size="sm" variant={variant} arrow className="shrink-0">
                    {row.cta}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
