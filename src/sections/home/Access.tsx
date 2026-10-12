"use client";

import { BadgeCheck, Check, Lock, MapPin, MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { Container } from "@/components/layout/Container";
import { MockChip, MockLine } from "@/components/mockups/primitives";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type AccessProps = {
  t: Dictionary["home"]["access"];
  /** The idea copy (title, chips, locked items, request button) shared with the hero mockup. */
  card: Dictionary["home"]["hero"]["mockup"];
  exampleLabel: string;
  lockedLabel: string;
  alt: string;
  pricingHref: string;
};

/**
 * "See the pool before you pay" as a comparison wipe. One idea page, two
 * renderings: the free layer (public summary, gated blocks locked and empty,
 * as the platform withholds them) and the subscriber layer (full detail). A
 * divider, draggable or keyboard-operable, sets how much of each shows; it
 * sweeps across once when the section arrives.
 */
export function Access({ t, card, exampleLabel, lockedLabel, alt, pricingHref }: AccessProps) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  /** Divider position, as % from the reading start. Free shows before it, subscriber after. */
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const proxy = { value: 94 };
        setSplit(94);
        gsap.to(proxy, {
          value: 50,
          duration: 1.8,
          ease: "power3.inOut",
          onUpdate: () => setSplit(proxy.value),
          scrollTrigger: { trigger: frame.current, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const rtl = document.documentElement.dir === "rtl";
    const fromStart = rtl ? box.right - event.clientX : event.clientX - box.left;
    setSplit(gsap.utils.clamp(4, 96, (fromStart / box.width) * 100));
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const rtl = document.documentElement.dir === "rtl";
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    const step = event.shiftKey ? 15 : 5;
    if (event.key === forward) setSplit((s) => Math.min(96, s + step));
    else if (event.key === back) setSplit((s) => Math.max(4, s - step));
    else if (event.key === "Home") setSplit(4);
    else if (event.key === "End") setSplit(96);
    else return;
    event.preventDefault();
  };

  return (
    <section ref={root} aria-labelledby="access-title" className="surface-abyss panel relative isolate overflow-hidden">
      {/* The investor's tablet, quiet behind the comparison (solid dimming, not a gradient). */}
      <Image src="/images/story/investor-unlock.webp" alt={alt} fill sizes="100vw" className="-z-10 object-cover opacity-25" />

      <Container className="py-section">
        <SectionHeading
          id="access-title"
          tone="dark"
          align="center"
          eyebrow={t.eyebrow}
          number="04"
          title={t.titleLead}
          accent={t.titleAccent}
          description={t.body}
        />

        {/* The comparison frame. */}
        <div
          ref={frame}
          className="relative mx-auto mt-14 max-w-5xl touch-pan-y select-none"
          onPointerDown={(event) => {
            dragging.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            fromPointer(event);
          }}
          onPointerMove={(event) => dragging.current && fromPointer(event)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-elevated" aria-hidden>
            <IdeaPage mode="free" card={card} exampleLabel={exampleLabel} lockedLabel={lockedLabel} />
            <div
              className="absolute inset-0 bg-white"
              style={{ clipPath: `inset(0 0 0 ${split}%)` }}
            >
              <div className="size-full rtl:hidden">
                <IdeaPage mode="paid" card={card} exampleLabel={exampleLabel} lockedLabel={lockedLabel} unlockedTitle={t.unlockedTitle} />
              </div>
            </div>
            {/* RTL: the subscriber layer sits at the reading end (left). */}
            <div
              className="absolute inset-0 hidden bg-white rtl:block"
              style={{ clipPath: `inset(0 ${split}% 0 0)` }}
            >
              <IdeaPage mode="paid" card={card} exampleLabel={exampleLabel} lockedLabel={lockedLabel} unlockedTitle={t.unlockedTitle} />
            </div>

            {/* Side labels. */}
            <span className="absolute top-4 inset-s-4 rounded-full bg-abyss px-3 py-1.5 font-mono text-eyebrow text-white uppercase">
              {t.free.label}
            </span>
            <span className="absolute top-4 inset-e-4 rounded-full bg-gold px-3 py-1.5 font-mono text-eyebrow text-abyss uppercase">
              {t.paid.label}
            </span>
          </div>

          {/* Divider and handle. The handle is the accessible control. */}
          <div className="pointer-events-none absolute inset-y-0 w-px bg-abyss" style={{ insetInlineStart: `${split}%` }}>
            <div
              role="slider"
              tabIndex={0}
              aria-label={t.toggleLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(split)}
              aria-valuetext={`${t.free.label} ${Math.round(split)}% · ${t.paid.label} ${Math.round(100 - split)}%`}
              onKeyDown={onKey}
              className="pointer-events-auto absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-4 border-white bg-abyss text-white shadow-elevated"
            >
              <MoveHorizontal aria-hidden className="size-5" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-eyebrow text-mist uppercase">{t.dragHint}</p>

        {/* What each side includes, in words. */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
          {[
            { label: t.free.label, items: t.free.items, tone: "text-cyan" },
            { label: t.paid.label, items: t.paid.items, tone: "text-gold" },
          ].map((tier) => (
            <div key={tier.label} className="rounded-2xl border border-navy-line bg-navy/80 p-7">
              <h3 className={cn("font-mono text-eyebrow uppercase", tier.tone)}>{tier.label}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-white">
                    <Check aria-hidden className={cn("mt-1 size-4 shrink-0", tier.tone)} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 text-center">
          <p className="max-w-lg text-sm text-mist">{t.note}</p>
          <Button href={pricingHref} variant="accent" arrow>
            {t.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}

type IdeaPageProps = {
  mode: "free" | "paid";
  card: AccessProps["card"];
  exampleLabel: string;
  lockedLabel: string;
  unlockedTitle?: string;
};

/** The same idea page in its public or subscriber rendering. Illustrative, labelled "Example". */
function IdeaPage({ mode, card, exampleLabel, lockedLabel, unlockedTitle }: IdeaPageProps) {
  const paid = mode === "paid";
  const [narrative, financials, traction, founder] = card.lockedItems;

  const Locked = ({ label }: { label?: string }) => (
    <div className="flex h-full min-h-28 flex-col justify-between rounded-xl border border-dashed border-field/50 p-4">
      <span className="text-xs text-muted">{label}</span>
      <span className="flex items-center gap-2 text-xs font-medium text-ink">
        <Lock className="size-3.5 text-gold-ink" />
        {lockedLabel}
      </span>
    </div>
  );

  return (
    <div className="grid gap-5 p-6 pt-16 text-start sm:p-8 sm:pt-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MockChip tone="cyan">
          <BadgeCheck className="size-3" />
          {paid ? unlockedTitle : card.status}
        </MockChip>
        <span className="font-mono text-[0.6875rem] text-muted uppercase">{exampleLabel}</span>
      </div>
      <div>
        <p className="font-heading text-h3 text-ink">{card.title}</p>
        <p className="mt-2 max-w-2xl text-sm text-body">{card.pitch}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <MockChip>{card.sector}</MockChip>
          <MockChip>{card.stage}</MockChip>
          <MockChip>
            <MapPin className="size-3" />
            {card.region}
          </MockChip>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {paid ? (
          <>
            <div className="flex min-h-28 flex-col gap-2.5 rounded-xl bg-surface p-4">
              <span className="text-xs text-muted">{narrative}</span>
              <MockLine className="w-full bg-line" />
              <MockLine className="w-11/12 bg-line" />
              <MockLine className="w-4/5 bg-line" />
              <MockLine className="w-2/3 bg-line" />
            </div>
            <div className="flex min-h-28 flex-col justify-between rounded-xl bg-surface p-4">
              <span className="text-xs text-muted">{financials}</span>
              <span className="flex h-14 items-end gap-1.5">
                {[30, 45, 40, 62, 78, 92].map((h, i) => (
                  <span key={i} className="w-full rounded-sm bg-cyan" style={{ height: `${h}%` }} />
                ))}
              </span>
            </div>
            <div className="flex min-h-28 flex-col justify-between gap-2 rounded-xl bg-surface p-4">
              <span className="text-xs text-muted">{traction}</span>
              {[80, 55, 68].map((w, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="h-2 rounded-full bg-gold" style={{ width: `${w}%` }} />
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <Locked label={narrative} />
            <Locked label={financials} />
            <Locked label={traction} />
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <div className="flex items-center gap-3">
          <span className={cn("grid size-10 place-items-center rounded-full", paid ? "bg-abyss text-cyan" : "bg-frost text-muted")}>
            {paid ? <span className="font-heading text-sm">F</span> : <Lock className="size-4" />}
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="text-xs text-muted">{founder}</span>
            <MockLine className={cn("w-28", paid && "bg-line")} />
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-end">
            <span className="block text-xs text-muted">{card.askLabel}</span>
            <span className="font-heading text-h4 text-ink" data-numeric>
              {card.askBand}
            </span>
          </span>
          <span
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium",
              paid ? "bg-gold text-abyss" : "bg-abyss text-white",
            )}
          >
            {paid ? <Check className="size-3.5" /> : <Lock className="size-3.5 text-gold" />}
            {card.requestIntro}
          </span>
        </div>
      </div>
    </div>
  );
}
