import { Check, Lock, Minus } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type CompareTableProps = {
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  labels: { featureLabel: string; freeLabel: string; paidLabel: string; includedLabel: string; lockedLabel: string };
  rows: readonly { label: string; free: boolean }[];
  action?: { label: string; href: string };
  tone?: "white" | "surface";
  /** Decorative texture behind the top of the section, shown faintly. */
  texture?: string;
};

/**
 * The free-against-paid comparison as one table: a row per feature, a Free
 * column and a highlighted Subscriber column. Rows rise in one after another.
 */
export function CompareTable({ id, eyebrow, titleLead, titleAccent, description, labels, rows, action, tone = "surface", texture }: CompareTableProps) {
  return (
    <Section tone={tone} className={cn("relative overflow-hidden", tone === "white" && "panel")} aria-labelledby={id}>
      {texture ? (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[28rem]">
          <Image src={texture} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        </span>
      ) : null}
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />
        {action ? (
          <Button href={action.href} variant="accent" arrow className="w-fit shrink-0">
            {action.label}
          </Button>
        ) : null}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full border-collapse text-start">
          <thead className="bg-abyss text-white">
            <tr>
              <th scope="col" className="px-4 py-4 text-start font-mono text-eyebrow uppercase sm:px-6">
                {labels.featureLabel}
              </th>
              <th scope="col" className="w-20 px-2 py-4 text-center font-mono text-eyebrow text-mist uppercase sm:w-36">
                {labels.freeLabel}
              </th>
              <th scope="col" className="w-24 bg-gold px-2 py-4 text-center font-mono text-eyebrow text-abyss uppercase sm:w-36">
                {labels.paidLabel}
              </th>
            </tr>
          </thead>
          <Reveal as="tbody" stagger>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line transition-colors hover:bg-surface">
                <th scope="row" className="px-4 py-3.5 text-start text-sm font-normal text-body sm:px-6 sm:text-[0.9375rem]">
                  {row.label}
                </th>
                <td className="px-2 py-3.5 text-center">
                  {row.free ? (
                    <Check role="img" aria-label={labels.includedLabel} className="mx-auto size-4 text-cyan-ink" />
                  ) : (
                    <Minus role="img" aria-label={labels.lockedLabel} className="mx-auto size-4 text-line" />
                  )}
                </td>
                <td className="bg-gold/10 px-2 py-3.5 text-center">
                  {row.free ? (
                    <Check role="img" aria-label={labels.includedLabel} className="mx-auto size-4 text-gold-ink" />
                  ) : (
                    <Lock role="img" aria-label={labels.includedLabel} className="mx-auto size-4 text-gold-ink" />
                  )}
                </td>
              </tr>
            ))}
          </Reveal>
        </table>
      </div>
    </Section>
  );
}
