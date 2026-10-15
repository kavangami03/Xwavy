import { Archive, CreditCard, RefreshCw, Settings2 } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CompareTable } from "@/components/sections/CompareTable";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import accessCopy from "@/i18n/pages/access";
import copy from "@/i18n/pages/pricing";
import { portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { PlanCards } from "@/sections/pricing/PlanCards";

const BILLING_ICONS = [CreditCard, Settings2, RefreshCw, Archive] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/pricing", t.meta.title, t.meta.description);
}

/**
 * Pricing (SOW §3.3, §1.1, §2.4): the plans (prices announced at launch), the
 * feature comparison, how billing works, the "innovators are always free"
 * band and a billing FAQ.
 */
export default async function PricingPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const access = await pageCopy(accessCopy);
  const signUp = portalHref(locale, "signUpInnovator");
  const browse = portalHref(locale, "browseIdeas");

  return (
    <>
      <PageHero
        id="pr-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: signUp, variant: "primary" },
          { label: t.hero.secondary, href: browse, variant: "accent" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/people/together.webp", alt: t.hero.imageAlt, position: "object-[46%_center]" }}
      />

      <PlanCards t={t.plans} hrefs={[signUp, browse, browse]} />

      <CompareTable
        id="pr-compare"
        eyebrow={t.compare.eyebrow}
        titleLead={t.compare.titleLead}
        titleAccent={t.compare.titleAccent}
        description={t.compare.description}
        labels={access}
        rows={access.rows}
        tone="white"
      />

      <CardGrid
        id="pr-billing"
        eyebrow={t.billing.eyebrow}
        titleLead={t.billing.titleLead}
        titleAccent={t.billing.titleAccent}
        columns={4}
        tone="surface"
        cards={t.billing.cards.map((card, i) => ({ ...card, Icon: BILLING_ICONS[i] }))}
      />

      <Statement eyebrow={t.band.eyebrow} parts={t.band.parts} tone="dark" />

      <FaqSection id="pr-faq" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} />

      <CtaPanel
        id="pr-cta"
        titleLead={t.cta.titleLead}
        titleAccent={t.cta.titleAccent}
        image={{ src: "/images/people/the-meeting.webp", alt: t.cta.imageAlt, position: "object-[70%_center]" }}
        rows={[
          { side: "innovator", label: t.cta.innovator.label, body: t.cta.innovator.body, cta: t.cta.innovator.cta, href: signUp },
          { side: "investor", label: t.cta.investor.label, body: t.cta.investor.body, cta: t.cta.investor.cta, href: browse },
        ]}
      />
    </>
  );
}
