"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { refreshScrollTrigger } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";

type FaqProps = { t: Dictionary["home"]["faq"] };

/**
 * Accordion of common questions. One item open at a time; each trigger is a
 * real button with aria-expanded/aria-controls. Height changes shift every
 * scroll trigger below, so positions are refreshed after each animation.
 */
export function Faq({ t }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section tone="surface" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow={t.eyebrow}
          number="07"
          title={t.titleLead}
          accent={t.titleAccent}
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <ul className="border-t border-line">
          {t.items.map((item, i) => {
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
