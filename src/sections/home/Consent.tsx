import { ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

type ConsentProps = { t: Dictionary["home"]["consent"] };

/** Stage colours follow the site logic: investor gold, innovator cyan, both white. */
const STAGE_DOTS = ["bg-gold text-abyss", "bg-cyan text-abyss", "bg-white text-abyss"] as const;

/** The double opt-in as one dark band: three moves in order, then the rules. */
export function Consent({ t }: ConsentProps) {
  return (
    <Section tone="abyss" className="panel" aria-labelledby="consent-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <SectionHeading id="consent-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} tone="dark" className="lg:col-span-5" />

        <div className="flex flex-col justify-center gap-5 lg:col-span-7">
          <Reveal as="ol" stagger className="grid gap-4 sm:grid-cols-3">
            {t.stages.map((stage, i) => (
              <li key={stage.label} className="flex flex-col gap-3 rounded-2xl border border-navy-line bg-navy p-5">
                <span className={cn("grid size-9 place-items-center rounded-full font-mono text-sm", STAGE_DOTS[i])} data-numeric>
                  {i + 1}
                </span>
                <h3 className="text-h4 text-white">{stage.label}</h3>
                <p className="text-sm text-mist">{stage.detail}</p>
              </li>
            ))}
          </Reveal>
          <Reveal as="ul" stagger className="grid gap-3 sm:grid-cols-3">
            {t.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2.5 text-sm text-mist">
                <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
                {rule}
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
