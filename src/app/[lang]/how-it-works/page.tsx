import { Check, Clock, X } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/how-it-works";
import { localeHref, portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/how-it-works", t.meta.title, t.meta.description);
}

/**
 * How it works (SOW §3.3): each side's path, the double opt-in and its three
 * outcomes, the idea lifecycle, who sees what, and Xwavy's facilitator role.
 */
export default async function HowItWorksPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const signUp = portalHref(locale, "signUpInnovator");
  const { tracks, simulator, lifecycle, layers } = t;

  return (
    <>
      <PageHero
        id="hiw-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: signUp, variant: "primary" },
          { label: t.hero.secondary, href: localeHref(locale, "/for-investors"), variant: "accent" },
        ]}
        image={{ src: "/images/people/together.webp", alt: t.hero.imageAlt, position: "object-[46%_center]" }}
      />

      <CardGrid
        id="hiw-paths"
        eyebrow={tracks.eyebrow}
        titleLead={tracks.titleLead}
        titleAccent={tracks.titleAccent}
        columns={2}
        tone="surface"
        cards={[
          { title: tracks.innovator.label, steps: tracks.innovator.steps },
          { title: tracks.investor.label, steps: tracks.investor.steps, dark: true },
        ]}
      >
        <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-abyss text-cyan">
            <Check aria-hidden className="size-5" />
          </span>
          <div>
            <h3 className="text-h4 text-ink">{tracks.meeting.title}</h3>
            <p className="mt-1 text-body">{tracks.meeting.body}</p>
          </div>
        </div>
      </CardGrid>

      <CardGrid
        id="hiw-optin"
        eyebrow={simulator.eyebrow}
        titleLead={simulator.titleLead}
        titleAccent={simulator.titleAccent}
        description={simulator.body}
        cards={[
          { kicker: simulator.accept, title: simulator.outcomes.accept.title, body: simulator.outcomes.accept.body, points: [simulator.outcomes.accept.quota], Icon: Check, dark: true },
          { kicker: simulator.decline, title: simulator.outcomes.decline.title, body: simulator.outcomes.decline.body, points: [simulator.outcomes.decline.quota], Icon: X },
          { kicker: simulator.silence, title: simulator.outcomes.silence.title, body: simulator.outcomes.silence.body, points: [simulator.outcomes.silence.quota], Icon: Clock },
        ]}
      />

      <CardGrid
        id="hiw-lifecycle"
        eyebrow={lifecycle.eyebrow}
        titleLead={lifecycle.titleLead}
        titleAccent={lifecycle.titleAccent}
        description={lifecycle.body}
        columns={4}
        tone="surface"
        cards={lifecycle.states.map((state) => ({ title: state.name, body: state.body, kicker: `${lifecycle.whoLabel}: ${state.who}` }))}
      >
        <p className="max-w-2xl border-s-2 border-cyan-ink ps-4 text-body">{lifecycle.editNote}</p>
      </CardGrid>

      <CardGrid
        id="hiw-layers"
        eyebrow={layers.eyebrow}
        titleLead={layers.titleLead}
        titleAccent={layers.titleAccent}
        description={layers.description}
        cards={layers.cards.map((card, i) => ({ ...card, dark: i === 2 }))}
      />

      <Statement eyebrow={t.facilitator.eyebrow} parts={t.facilitator.parts} footnote={t.facilitator.footnote} tone="dark" />

      <FaqSection id="hiw-faq" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} />

      <CtaPanel
        id="hiw-cta"
        titleLead={t.cta.titleLead}
        titleAccent={t.cta.titleAccent}
        image={{ src: "/images/people/the-meeting.webp", alt: t.cta.imageAlt, position: "object-[70%_center]" }}
        rows={[
          { side: "innovator", label: t.cta.innovator.label, body: t.cta.innovator.body, cta: t.cta.innovator.cta, href: signUp },
          { side: "investor", label: t.cta.investor.label, body: t.cta.investor.body, cta: t.cta.investor.cta, href: localeHref(locale, "/pricing") },
        ]}
      />
    </>
  );
}
