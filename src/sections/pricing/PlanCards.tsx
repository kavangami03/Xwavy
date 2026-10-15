import { Check } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/pricing";
import { cn } from "@/lib/cn";

type PlanCardsProps = {
  t: (typeof copy)["en"]["plans"];
  /** One link per card, in card order. */
  hrefs: readonly string[];
};

/**
 * Three plan cards: innovators (free), investor monthly and investor annual.
 * Investor prices are not fixed yet (SOW §5), so they read "announced at
 * launch" instead of a number.
 */
export function PlanCards({ t, hrefs }: PlanCardsProps) {
  return (
    <Section tone="surface" aria-labelledby="plans-title">
      <SectionHeading id="plans-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} />

      <Reveal stagger className="mt-10 grid gap-5 lg:grid-cols-3">
        {t.cards.map((card, i) => {
          const free = i === 0;
          return (
            <article
              key={card.name}
              className={cn("flex flex-col gap-6 rounded-2xl p-7 sm:p-8", free ? "border border-line bg-white" : "surface-abyss")}
            >
              <div className="flex items-center justify-between gap-4">
                <p className={cn("font-mono text-eyebrow uppercase", free ? "text-cyan-ink" : "text-gold")}>{card.audience}</p>
                <p className={cn("text-sm", free ? "text-muted" : "text-mist")}>{card.cadence}</p>
              </div>
              <div>
                <h3 className={cn("text-h3", free ? "text-ink" : "text-white")}>{card.name}</h3>
                <p className={cn("mt-3 font-heading font-bold", free ? "text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-cyan-ink" : "text-h4 text-gold")} data-numeric>
                  {card.price || t.priceSoon}
                </p>
                <p className={cn("mt-3", free ? "text-body" : "text-mist")}>{card.body}</p>
              </div>
              <ul className={cn("flex flex-col gap-3 border-t pt-6", free ? "border-line" : "border-white/10")}>
                {card.points.map((point) => (
                  <li key={point} className={cn("flex items-start gap-2.5 text-sm", free ? "text-body" : "text-mist")}>
                    <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", free ? "text-cyan-ink" : "text-gold")} />
                    {point}
                  </li>
                ))}
              </ul>
              <Button href={hrefs[i] ?? "#"} variant={free ? "primary" : "accent"} arrow className="mt-auto w-fit">
                {card.cta}
              </Button>
            </article>
          );
        })}
      </Reveal>
    </Section>
  );
}
