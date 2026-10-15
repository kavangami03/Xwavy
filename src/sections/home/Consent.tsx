"use client";

import { Check, Lightbulb, Lock, LockOpen, ShieldCheck, TrendingUp } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type ConsentProps = { t: Dictionary["home"]["consent"] };

/**
 * The double opt-in as a diagram that assembles itself: the investor's
 * request and the innovator's acceptance travel in from opposite sides to a
 * central lock; the lock opens, and only then do the contact details flip from
 * "sealed" to "shared with both". The markup is the final (unlocked) state, so
 * reduced motion and no-JS show the outcome; GSAP plays the story once.
 */
export function Consent({ t }: ConsentProps) {
  const root = useRef<HTMLElement>(null);
  const [asks, decides, introduced] = t.stages;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: q("[data-diagram]")[0], start: "top 70%", once: true } })
          .from(q("[data-side=investor]"), { xPercent: -10 * rtl, autoAlpha: 0, duration: 0.8 }, 0)
          .from(q("[data-side=innovator]"), { xPercent: 10 * rtl, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from(q("[data-lock]"), { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: "back.out(1.8)" }, 0.3)
          .from(q("[data-wire=start]"), { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, 0.6)
          .from(q("[data-wire=end]"), { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, 0.8)
          .from(q("[data-wire=down], [data-wire=mobile]"), { scaleY: 0, duration: 0.5, ease: "power2.inOut" }, 0.6)
          // The second yes arrives: the lock opens.
          .fromTo(q("[data-lock-closed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 1.5)
          .from(q("[data-lock-open]"), { autoAlpha: 0, rotate: -20, duration: 0.4 }, 1.6)
          .fromTo(q("[data-lock-ring]"), { scale: 1, autoAlpha: 0.8 }, { scale: 1.9, autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 1.6)
          .from(q("[data-result]"), { y: 30, autoAlpha: 0, duration: 0.7 }, 1.75)
          // Contact details flip from sealed to shared, one by one.
          .fromTo(q("[data-field-sealed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25, stagger: 0.12 }, 2.1)
          .from(q("[data-field-open]"), { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.12 }, 2.2)
          .from(q("[data-rule]"), { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 2.3);
      });
    },
    { scope: root },
  );

  const side = (role: "investor" | "innovator") => {
    const investor = role === "investor";
    const stage = investor ? asks : decides;
    const Icon = investor ? TrendingUp : Lightbulb;
    return (
      <article
        data-side={role}
        className={cn("relative rounded-2xl border bg-navy p-6", investor ? "border-gold/30" : "border-cyan/30")}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-eyebrow uppercase",
              investor ? "bg-gold/15 text-gold" : "bg-cyan/10 text-cyan",
            )}
          >
            <Icon aria-hidden className="size-3.5" />
            {investor ? t.investorRole : t.innovatorRole}
          </span>
          <span className={cn("grid size-8 place-items-center rounded-full font-mono text-sm text-abyss", investor ? "bg-gold" : "bg-cyan")} data-numeric>
            {investor ? 1 : 2}
          </span>
        </div>
        <h3 className="mt-5 text-h4 text-white">{stage?.label}</h3>
        <p className="mt-2 text-sm text-mist">{stage?.detail}</p>
      </article>
    );
  };

  return (
    <section ref={root} aria-labelledby="consent-title" className="surface-abyss panel py-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <SectionHeading id="consent-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} tone="dark" className="lg:col-span-7" />
          <p className="max-w-xl text-lead text-mist lg:col-span-5">{t.body}</p>
        </div>

        <div data-diagram className="mt-12 lg:mt-16">
          {/* Row 1: investor → lock ← innovator. */}
          <div className="grid items-center gap-0 lg:grid-cols-[1fr_auto_1fr]">
            {side("investor")}

            {/* Desktop wires and the lock. */}
            <div className="relative flex flex-col items-center py-4 lg:w-64 lg:py-0">
              <span aria-hidden data-wire="mobile" className="h-8 w-px origin-top bg-gold/60 lg:hidden" />
              <div className="relative flex w-full items-center">
                <span aria-hidden data-wire="start" className="hidden h-px flex-1 origin-left bg-gold/60 lg:block rtl:origin-right" />
                <div data-lock className="relative grid size-20 shrink-0 place-items-center rounded-full border border-white/15 bg-abyss">
                  <span aria-hidden data-lock-ring className="absolute inset-0 rounded-full border-2 border-cyan opacity-0" />
                  <Lock aria-hidden data-lock-closed className="absolute size-7 text-mist opacity-0" />
                  <LockOpen aria-hidden data-lock-open className="size-7 text-cyan" />
                </div>
                <span aria-hidden data-wire="end" className="hidden h-px flex-1 origin-right bg-cyan/60 lg:block rtl:origin-left" />
              </div>
              <p className="mt-3 font-mono text-eyebrow text-mist uppercase">{t.lockLabel}</p>
              <span aria-hidden data-wire="mobile" className="mt-3 h-8 w-px origin-top bg-cyan/60 lg:hidden" />
            </div>

            {side("innovator")}
          </div>

          {/* Row 2: the outcome. */}
          <div className="flex flex-col items-center">
            <span aria-hidden data-wire="down" className="hidden h-12 w-px origin-top bg-white/25 lg:block" />
            <span aria-hidden data-wire="mobile" className="h-8 w-px origin-top bg-white/25 lg:hidden" />
            <article data-result className="w-full max-w-3xl rounded-2xl bg-white p-6 text-ink sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="flex items-center gap-3 text-h4">
                  <span className="grid size-8 place-items-center rounded-full bg-abyss font-mono text-sm text-white" data-numeric>
                    3
                  </span>
                  {introduced?.label}
                </h3>
                <p className="text-sm text-body sm:max-w-xs sm:text-end">{introduced?.detail}</p>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {t.fields.map((field) => (
                  <li key={field} className="relative rounded-xl border border-line px-3 py-3">
                    <p className="text-xs text-muted">{field}</p>
                    <p className="relative mt-1.5 h-5 text-xs font-medium">
                      <span data-field-sealed className="absolute inset-0 flex items-center gap-1.5 text-muted opacity-0">
                        <Lock aria-hidden className="size-3.5" />
                        {t.sealed}
                      </span>
                      <span data-field-open className="absolute inset-0 flex items-center gap-1.5 text-cyan-ink">
                        <Check aria-hidden className="size-3.5" />
                        {t.revealed}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* The rules that protect both sides. */}
          <ul className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {t.rules.map((rule) => (
              <li key={rule} data-rule className="flex items-start gap-3 text-sm text-mist">
                <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-cyan" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
