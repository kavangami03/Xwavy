"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { Section, type SectionTone } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { refreshScrollTrigger } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";

export type FaqItem = { q: string; a: string };

type FaqSectionProps = {
  id: string;
  eyebrow: string;
  number?: string;
  titleLead: string;
  titleAccent?: string;
  /** Optional line under the heading (e.g. a contact prompt). */
  aside?: ReactNode;
  items: readonly FaqItem[];
  tone?: Extract<SectionTone, "surface" | "white">;
  className?: string;
};

/**
 * Accordion of questions with a sticky heading. One item open at a time; each
 * trigger is a real button with aria-expanded/aria-controls. Height changes
 * shift every scroll trigger below, so positions refresh after each animation.
 */
export function FaqSection({
  id,
  eyebrow,
  number,
  titleLead,
  titleAccent,
  aside,
  items,
  tone = "surface",
  className,
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section tone={tone} aria-labelledby={id} className={className}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id={id} eyebrow={eyebrow} number={number} title={titleLead} accent={titleAccent} />
          {aside ? <div className="text-sm text-muted">{aside}</div> : null}
        </div>

        <ul className="border-t border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-start font-heading text-h4 text-ink"
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-brand",
                        isOpen ? "rotate-45 border-abyss bg-abyss text-white" : "border-line bg-white text-ink",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false} onExitComplete={refreshScrollTrigger}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      onAnimationComplete={refreshScrollTrigger}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-body">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
