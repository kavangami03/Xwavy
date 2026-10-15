import { BadgeCheck, Ban, RotateCcw, Ticket } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CompareTable } from "@/components/sections/CompareTable";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { StepRow } from "@/components/sections/StepRow";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import accessCopy from "@/i18n/pages/access";
import copy from "@/i18n/pages/for-investors";
import { localeHref, portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";

const STEP_PHOTOS = [
  "/images/people/step-3-discover.webp",
  "/images/people/investor-window.webp",
  "/images/people/investor-unlock.webp",
  "/images/people/step-4-request.webp",
] as const;
const RULE_ICONS = [Ticket, RotateCcw, Ban, BadgeCheck] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/for-investors", t.meta.title, t.meta.description);
}

/**
 * For investors (SOW §3.3, §2.3, §4.3, §4.4): browse free, the path to an
 * introduction, an honest free-against-paid comparison, the rules of asking,
 * and what cancelling keeps.
 */
export default async function ForInvestorsPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const access = await pageCopy(accessCopy);
  const browse = portalHref(locale, "browseIdeas");
  const pricing = localeHref(locale, "/pricing");

  return (
    <>
      <PageHero
        id="fv-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: browse, variant: "accent" },
          { label: t.hero.secondary, href: pricing, variant: "outline-inverse" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/people/investor-portrait.webp", alt: t.hero.imageAlt, position: "object-[50%_20%]" }}
      />

      <StepRow
        id="fv-steps"
        eyebrow={t.steps.eyebrow}
        titleLead={t.steps.titleLead}
        titleAccent={t.steps.titleAccent}
        steps={t.steps.items.map((step, i) => ({ ...step, image: { src: STEP_PHOTOS[i] ?? STEP_PHOTOS[0], alt: step.imageAlt } }))}
      />

      <CompareTable
        id="fv-compare"
        eyebrow={t.compare.eyebrow}
        titleLead={t.compare.titleLead}
        titleAccent={t.compare.titleAccent}
        description={t.compare.description}
        labels={access}
        rows={access.rows}
        action={{ label: t.compare.cta, href: pricing }}
      />

      <CardGrid
        id="fv-rules"
        eyebrow={t.rules.eyebrow}
        titleLead={t.rules.titleLead}
        titleAccent={t.rules.titleAccent}
        columns={4}
        cards={t.rules.cards.map((card, i) => ({ ...card, Icon: RULE_ICONS[i] }))}
      />

      <SplitFeature
        id="fv-cancel"
        eyebrow={t.cancel.eyebrow}
        titleLead={t.cancel.titleLead}
        titleAccent={t.cancel.titleAccent}
        body={t.cancel.body}
        tone="surface"
        imageSide="start"
        lists={[
          { title: t.cancel.keepTitle, items: t.cancel.keep },
          { title: t.cancel.lockTitle, items: t.cancel.lock, tone: "hidden" },
        ]}
        image={{ src: "/images/people/together.webp", alt: t.cancel.imageAlt, position: "object-[46%_center]" }}
      />

      <FaqSection id="fv-faq" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} tone="white" />

      <CtaPanel
        id="fv-cta"
        titleLead={t.cta.titleLead}
        titleAccent={t.cta.titleAccent}
        image={{ src: "/images/people/the-meeting.webp", alt: t.cta.imageAlt, position: "object-[70%_center]" }}
        rows={[
          { side: "investor", label: t.cta.browse.label, body: t.cta.browse.body, cta: t.cta.browse.cta, href: browse },
          { side: "innovator", label: t.cta.plans.label, body: t.cta.plans.body, cta: t.cta.plans.cta, href: pricing },
        ]}
      />
    </>
  );
}
