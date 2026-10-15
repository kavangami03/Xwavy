"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Lock, RotateCcw, Ticket, X } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type OutcomeSwitchProps = { t: (typeof copy)["en"]["simulator"]; photo: { src: string; alt: string } };

type Outcome = "accept" | "decline" | "silence";

/**
 * The three ways a request can end, as a switch: choose what the innovator
 * does and see exactly what happens to contact details and to the investor's
 * quota. A real control (tabs), not decoration.
 */
export function OutcomeSwitch({ t, photo }: OutcomeSwitchProps) {
  const [outcome, setOutcome] = useState<Outcome>("accept");
  const tabsId = useId();

  const options = [
    { key: "accept", label: t.accept, Icon: Check, on: "bg-cyan text-abyss" },
    { key: "decline", label: t.decline, Icon: X, on: "bg-white text-abyss" },
    { key: "silence", label: t.silence, Icon: Clock, on: "bg-gold text-abyss" },
  ] as const;

  const result = t.outcomes[outcome];
  const shared = outcome === "accept";
  const QuotaIcon = outcome === "silence" ? RotateCcw : Ticket;

  return (
    <section aria-labelledby="hiw-optin" className="surface-abyss panel py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionHeading id="hiw-optin" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} tone="dark" />
            <div className="relative hidden aspect-4/3 overflow-hidden rounded-3xl bg-navy lg:block">
              <Image src={photo.src} alt={photo.alt} fill sizes="35vw" className="object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7">
            <p className="font-mono text-eyebrow text-mist uppercase">{t.choose}</p>
            <div role="tablist" aria-label={t.choose} className="grid grid-cols-1 gap-1.5 rounded-2xl border border-white/10 bg-navy p-1.5 sm:grid-cols-3">
              {options.map(({ key, label, Icon, on }) => {
                const selected = outcome === key;
                return (
                  <button
                    key={key}
                    id={`${tabsId}-${key}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${tabsId}-panel`}
                    onClick={() => setOutcome(key)}
                    className={cn(
                      "relative flex min-h-12 items-center justify-start gap-3 rounded-xl px-4 text-sm font-medium whitespace-nowrap transition-colors sm:justify-center sm:gap-2 sm:px-2",
                      selected ? "text-abyss" : "text-mist hover:text-white",
                    )}
                  >
                    {selected ? (
                      <motion.span layoutId={`${tabsId}-thumb`} transition={{ duration: DURATION.slow, ease: EASE.brand }} className={cn("absolute inset-0 rounded-xl", on)} />
                    ) : null}
                    <Icon aria-hidden className="relative size-4" />
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>

            <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${outcome}`} aria-live="polite" className="min-h-[19rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={outcome}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: DURATION.slow, ease: EASE.brand }}
                  className="rounded-3xl bg-white p-6 text-ink sm:p-8"
                >
                  <h3 className="text-h3">{result.title}</h3>
                  <p className="mt-3 text-body">{result.body}</p>

                  {/* What happens to each side's contact details. */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[0, 1].map((side) => (
                      <div
                        key={side}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border p-4 transition-colors",
                          shared ? "border-cyan/40 bg-cyan/10" : "border-line bg-surface",
                        )}
                      >
                        <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", shared ? "bg-cyan text-abyss" : "bg-line text-muted")}>
                          {shared ? <Check aria-hidden className="size-4" /> : <Lock aria-hidden className="size-4" />}
                        </span>
                        <span className="h-2 flex-1 rounded-full bg-current opacity-15" />
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 flex items-start gap-3 rounded-2xl bg-gold/10 p-4 text-sm text-ink">
                    <QuotaIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                    {result.quota}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
