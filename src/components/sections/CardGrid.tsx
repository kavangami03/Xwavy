import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export type GridCard = {
  kicker?: string;
  title: string;
  body?: string;
  points?: readonly string[];
  /** Numbered sub-steps, e.g. one side's path through the platform. */
  steps?: readonly { title: string; body: string }[];
  Icon?: LucideIcon;
  /** Optional link at the foot of the card. */
  link?: { label: string; href: string };
  /** One card can be dark to mark the paid or private tier. */
  dark?: boolean;
};

type CardGridProps = {
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  cards: readonly GridCard[];
  columns?: 2 | 3 | 4;
  tone?: "white" | "surface";
  /** Optional content under the grid: a note, a button. */
  children?: ReactNode;
};

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** Heading plus equal cards: the workhorse section. Cards fade in once. */
export function CardGrid({ id, eyebrow, titleLead, titleAccent, description, cards, columns = 3, tone = "white", children }: CardGridProps) {
  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />

      <Reveal stagger className={cn("mt-10 grid gap-4 lg:gap-5", columnClasses[columns])}>
        {cards.map(({ kicker, title, body, points, steps, Icon, link, dark }) => (
          <article
            key={title}
            className={cn(
              "flex flex-col gap-4 rounded-2xl p-7",
              dark ? "surface-abyss" : tone === "white" ? "bg-surface" : "border border-line bg-white",
            )}
          >
            {Icon ? (
              <span className={cn("grid size-11 place-items-center rounded-full", dark ? "bg-cyan text-abyss" : "bg-cyan/10 text-cyan-ink")}>
                <Icon aria-hidden className="size-5" />
              </span>
            ) : null}
            {kicker ? <p className={cn("font-mono text-eyebrow uppercase", dark ? "text-gold" : "text-cyan-ink")}>{kicker}</p> : null}
            <h3 className={cn("text-h4", dark ? "text-white" : "text-ink")}>{title}</h3>
            {body ? <p className={cn("text-[0.9375rem]", dark ? "text-mist" : "text-body")}>{body}</p> : null}
            {points?.length ? (
              <ul className={cn("mt-1 flex flex-col gap-2.5 border-t pt-4", dark ? "border-white/10" : "border-line")}>
                {points.map((point) => (
                  <li key={point} className={cn("flex items-start gap-2.5 text-sm", dark ? "text-mist" : "text-body")}>
                    <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-gold" : "text-cyan-ink")} />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
            {steps?.length ? (
              <ol className={cn("mt-1 flex flex-col gap-5 border-t pt-5", dark ? "border-white/10" : "border-line")}>
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className={cn("grid size-8 shrink-0 place-items-center rounded-full font-mono text-sm", dark ? "bg-gold text-abyss" : "bg-cyan text-abyss")}
                      data-numeric
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className={cn("font-medium", dark ? "text-white" : "text-ink")}>{step.title}</p>
                      <p className={cn("mt-1 text-sm", dark ? "text-mist" : "text-body")}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
            {link ? (
              <Link
                href={link.href}
                className={cn("group mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-medium underline-offset-4 hover:underline", dark ? "text-white" : "text-ink")}
              >
                {link.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </Link>
            ) : null}
          </article>
        ))}
      </Reveal>

      {children ? <Reveal className="mt-10">{children}</Reveal> : null}
    </Section>
  );
}
