import { Handshake, LockKeyhole, ShieldCheck, Sprout } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { Statement } from "@/components/sections/Statement";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/about";
import { portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";

const PRINCIPLE_ICONS = [LockKeyhole, ShieldCheck, Sprout, Handshake] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/about", t.meta.title, t.meta.description);
}

/** About (SOW §3.3, §1): the story, the mission and model, the principles, and who runs it. */
export default async function AboutPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const signUp = portalHref(locale, "signUpInnovator");
  const browse = portalHref(locale, "browseIdeas");

  return (
    <>
      <PageHero
        id="ab-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: signUp, variant: "primary" },
          { label: t.hero.secondary, href: browse, variant: "accent" },
        ]}
        image={{ src: "/images/people/about-majlis.webp", alt: t.hero.imageAlt, position: "object-[62%_center]" }}
      />

      <Statement eyebrow={t.story.eyebrow} parts={t.story.parts} />

      <SplitFeature
        id="ab-mission"
        eyebrow={t.mission.eyebrow}
        titleLead={t.mission.titleLead}
        titleAccent={t.mission.titleAccent}
        body={t.mission.body}
        tone="surface"
        lists={[
          { title: t.mission.innovatorsTitle, items: t.mission.innovators },
          { title: t.mission.investorsTitle, items: t.mission.investors, tone: "hidden" },
        ]}
        image={{ src: "/images/people/team-night.webp", alt: t.mission.imageAlt }}
      />

      <CardGrid
        id="ab-principles"
        eyebrow={t.principles.eyebrow}
        titleLead={t.principles.titleLead}
        titleAccent={t.principles.titleAccent}
        columns={4}
        cards={t.principles.cards.map((card, i) => ({ ...card, Icon: PRINCIPLE_ICONS[i] }))}
      />

      <Statement eyebrow={t.operator.eyebrow} parts={t.operator.parts} footnote={t.operator.footnote} tone="dark" />

      <CtaPanel
        id="ab-cta"
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
