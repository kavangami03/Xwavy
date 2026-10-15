import { BadgeCheck, CreditCard, Handshake, Languages, LockKeyhole, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

type TrustProps = { t: Dictionary["home"]["trust"] };

/**
 * Trust and safety as six short items (icon, title, one line), no card
 * chrome, so the section stays compact. Icons map to t.items by index:
 * 0 moderation, 1 sealed contact, 2 investor verification, 3 payments,
 * 4 Arabic and English, 5 facilitator.
 */
const ICONS = [ShieldCheck, LockKeyhole, BadgeCheck, CreditCard, Languages, Handshake] as const;

export function Trust({ t }: TrustProps) {
  return (
    <Section tone="white" className="panel" aria-labelledby="trust-title">
      <SectionHeading id="trust-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />

      <Reveal as="ul" stagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item, i) => {
          const Icon = ICONS[i] ?? ShieldCheck;
          return (
            <li key={item.title} className="flex gap-4 border-t border-line pt-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan-ink">
                <Icon aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="text-h4 text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-body">{item.body}</p>
              </div>
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
