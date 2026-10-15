import { Check, Lock, Minus } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
};

/**
 * The free-against-paid comparison as one plain table: a row per feature,
 * a Free column and a Subscriber column. Rows rise in one after another.
 */
export function CompareTable({ id, eyebrow, titleLead, titleAccent, description, labels, rows, action, tone = "surface" }: CompareTableProps) {
  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />
        {action ? (
          <Button href={action.href} variant="accent" arrow className="w-fit shrink-0">
            {action.label}
          </Button>
        ) : null}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full border-collapse text-start">
          <thead className="bg-abyss text-white">
            <tr>
              <th scope="col" className="px-4 py-4 text-start font-mono text-eyebrow uppercase sm:px-6">
                {labels.featureLabel}
              </th>
              <th scope="col" className="w-20 px-2 py-4 text-center font-mono text-eyebrow text-mist uppercase sm:w-36">
                {labels.freeLabel}
              </th>
              <th scope="col" className="w-24 px-2 py-4 text-center font-mono text-eyebrow text-gold uppercase sm:w-36">
                {labels.paidLabel}
              </th>
            </tr>
          </thead>
          <Reveal as="tbody" stagger>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
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
                <td className="px-2 py-3.5 text-center">
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
