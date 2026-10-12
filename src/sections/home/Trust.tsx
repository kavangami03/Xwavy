import { BadgeCheck, CreditCard, Handshake, Languages, LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

type TrustProps = { t: Dictionary["home"]["trust"]; alt: string };

/**
 * Trust as a bento: the people (photo) carry the largest tile, the
 * facilitator statement gets a dark statement tile, and the bilingual promise
 * is set in both scripts. Items map to t.items by index:
 * 0 moderation, 1 sealed contact, 2 verified investors, 3 payments,
 * 4 Arabic and English, 5 facilitator.
 */
export function Trust({ t, alt }: TrustProps) {
  const [moderation, sealed, verified, payments, languages, facilitator] = t.items;

  return (
    <Section tone="white" className="panel" aria-labelledby="trust-title">
      <SectionHeading id="trust-title" eyebrow={t.eyebrow} number="05" title={t.titleLead} accent={t.titleAccent} />

      <Reveal stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(13rem,auto))]">
        {/* People first: human moderation over the team photo. */}
        <article className="relative min-h-88 overflow-hidden rounded-xl bg-navy md:col-span-2 lg:row-span-2">
          <Image src="/images/story/team.webp" alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-4 bottom-4 flex items-start gap-4 rounded-2xl bg-white p-5 shadow-elevated sm:inset-x-auto sm:inset-s-4 sm:max-w-sm">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan text-abyss">
              <ShieldCheck aria-hidden className="size-5" />
            </span>
            <div>
              <h3 className="text-h4 text-ink">{moderation?.title}</h3>
              <p className="mt-1 text-sm text-body">{moderation?.body}</p>
            </div>
          </div>
        </article>

        {/* Statement tile. */}
        <article className="surface-abyss flex flex-col justify-between gap-8 rounded-xl p-7 sm:p-9 md:col-span-2">
          <Handshake aria-hidden className="size-7 text-gold" />
          <div>
            <h3 className="text-h2 text-white">{facilitator?.title}</h3>
            <p className="mt-3 max-w-md text-mist">{facilitator?.body}</p>
          </div>
        </article>

        <TrustTile Icon={LockKeyhole} title={sealed?.title} body={sealed?.body} />
        <TrustTile Icon={BadgeCheck} title={verified?.title} body={verified?.body} />

        <TrustTile Icon={CreditCard} title={payments?.title} body={payments?.body} className="md:col-span-1 lg:col-span-2" />

        {/* Bilingual promise, shown in both scripts. */}
        <article className="flex flex-col justify-between gap-6 rounded-xl bg-surface p-7 md:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <Languages aria-hidden className="size-6 text-cyan-ink" />
            <p aria-hidden className="flex items-baseline gap-3 font-heading text-h2 text-ink">
              <span lang="ar">عربي</span>
              <span className="text-line">/</span>
              <span lang="en">EN</span>
            </p>
          </div>
          <div>
            <h3 className="text-h4 text-ink">{languages?.title}</h3>
            <p className="mt-1 text-sm text-body">{languages?.body}</p>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

function TrustTile({
  Icon,
  title,
  body,
  className,
}: {
  Icon: typeof ShieldCheck;
  title?: string;
  body?: string;
  className?: string;
}) {
  return (
    <article className={cn("flex flex-col justify-between gap-6 rounded-xl border border-line bg-white p-7", className)}>
      <span className="grid size-11 place-items-center rounded-full bg-surface text-cyan-ink">
        <Icon aria-hidden className="size-5" />
      </span>
      <div>
        <h3 className="text-h4 text-ink">{title}</h3>
        <p className="mt-1 text-sm text-body">{body}</p>
      </div>
    </article>
  );
}
