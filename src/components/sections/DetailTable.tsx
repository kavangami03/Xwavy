import { Eye, Lock } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type DetailTableProps = {
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  headers: { group: string; detail: string; access: string };
  publicLabel: string;
  paidLabel: string;
  groups: readonly { name: string; fields: readonly { label: string; layer: "public" | "paid" }[] }[];
  tone?: "white" | "surface";
};

/**
 * A plain table of what goes into an idea and who can see each detail.
 * Rows are grouped by form step; on phones each group becomes a short list.
 */
export function DetailTable({ id, eyebrow, titleLead, titleAccent, description, headers, publicLabel, paidLabel, groups, tone = "surface" }: DetailTableProps) {
  const badge = (layer: "public" | "paid") => {
    const paid = layer === "paid";
    return (
      <span
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] whitespace-nowrap",
          paid ? "bg-gold/15 text-gold-ink" : "bg-cyan/10 text-cyan-ink",
        )}
      >
        {paid ? <Lock aria-hidden className="size-3" /> : <Eye aria-hidden className="size-3" />}
        {paid ? paidLabel : publicLabel}
      </span>
    );
  };

  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />

      <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full border-collapse text-start">
          <thead className="hidden bg-abyss text-white sm:table-header-group">
            <tr>
              <th scope="col" className="w-1/4 px-6 py-4 text-start font-mono text-eyebrow uppercase">
                {headers.group}
              </th>
              <th scope="col" className="px-6 py-4 text-start font-mono text-eyebrow uppercase">
                {headers.detail}
              </th>
              <th scope="col" className="w-1/4 px-6 py-4 text-start font-mono text-eyebrow uppercase">
                {headers.access}
              </th>
            </tr>
          </thead>
          {groups.map((group, g) => (
            <tbody key={group.name} className={cn(g > 0 && "border-t border-line")}>
              {group.fields.map((field, i) => (
                <tr key={field.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 sm:table-row sm:p-0">
                  {i === 0 ? (
                    <th
                      scope="rowgroup"
                      rowSpan={group.fields.length}
                      className="w-full pt-2 text-start text-h4 text-ink sm:w-auto sm:border-e sm:border-line sm:px-6 sm:py-4 sm:align-top"
                    >
                      {group.name}
                    </th>
                  ) : null}
                  <td className={cn("text-body sm:px-6 sm:py-4", i > 0 && "sm:border-t sm:border-line")}>{field.label}</td>
                  <td className={cn("sm:px-6 sm:py-4", i > 0 && "sm:border-t sm:border-line")}>{badge(field.layer)}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </Reveal>
    </Section>
  );
}
