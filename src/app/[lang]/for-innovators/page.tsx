import { Activity, CircleCheck, CircleX, Inbox, LayoutDashboard, ListChecks, MessagesSquare, PencilLine, UsersRound } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { DetailTable } from "@/components/sections/DetailTable";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/for-innovators";
import { localeHref, portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";

const REVIEW_ICONS = [CircleCheck, PencilLine, CircleX] as const;
const DASHBOARD_ICONS = [LayoutDashboard, ListChecks, Activity, MessagesSquare, Inbox, UsersRound] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/for-innovators", t.meta.title, t.meta.description);
}

/**
 * For innovators (SOW §3.3, §2.2, §4.2): post free, what's public and what's
 * for subscribers, how review works, how a request reaches you, the dashboard.
 */
export default async function ForInnovatorsPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const signUp = portalHref(locale, "signUpInnovator");
  const { composer, review, decision, dashboard } = t;

  return (
    <>
      <PageHero
        id="fi-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: signUp, variant: "primary" },
          { label: t.hero.secondary, href: localeHref(locale, "/how-it-works"), variant: "outline-inverse" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/people/innovator-portrait.webp", alt: t.hero.imageAlt, position: "object-[60%_center]" }}
      />

      <DetailTable
        id="fi-composer"
        eyebrow={composer.eyebrow}
        titleLead={composer.titleLead}
        titleAccent={composer.titleAccent}
        description={composer.body}
        headers={{ group: composer.stepLabel, detail: composer.detailLabel, access: composer.accessLabel }}
        publicLabel={composer.publicLabel}
        paidLabel={composer.paidLabel}
        groups={composer.steps.map((step) => ({ name: step.name, fields: step.fields.map((f) => ({ label: f.label, layer: f.layer as "public" | "paid" })) }))}
      />

      <CardGrid
        id="fi-review"
        eyebrow={review.eyebrow}
        titleLead={review.titleLead}
        titleAccent={review.titleAccent}
        description={review.description}
        cards={review.cards.map((card, i) => ({ ...card, Icon: REVIEW_ICONS[i] }))}
      />

      <SplitFeature
        id="fi-decision"
        eyebrow={decision.eyebrow}
        titleLead={decision.titleLead}
        titleAccent={decision.titleAccent}
        body={decision.body}
        tone="surface"
        lists={[
          { title: decision.seeTitle, items: decision.see },
          { title: decision.hiddenTitle, items: decision.hidden, tone: "hidden" },
        ]}
        note={decision.promise}
        image={{ src: "/images/people/step-5-connect.webp", alt: decision.imageAlt }}
      />

      <CardGrid
        id="fi-dashboard"
        eyebrow={dashboard.eyebrow}
        titleLead={dashboard.titleLead}
        titleAccent={dashboard.titleAccent}
        cards={dashboard.items.map((item, i) => ({ ...item, Icon: DASHBOARD_ICONS[i] }))}
      />

      <FaqSection id="fi-faq" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} />

      <CtaPanel
        id="fi-cta"
        titleLead={t.cta.titleLead}
        titleAccent={t.cta.titleAccent}
        image={{ src: "/images/people/the-meeting.webp", alt: t.cta.imageAlt, position: "object-[70%_center]" }}
        rows={[
          { side: "innovator", label: t.cta.innovator.label, body: t.cta.innovator.body, cta: t.cta.innovator.cta, href: signUp },
          { side: "investor", label: t.cta.investor.label, body: t.cta.investor.body, cta: t.cta.investor.cta, href: localeHref(locale, "/how-it-works") },
        ]}
      />
    </>
  );
}
