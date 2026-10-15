import { Eye, Lock, LockKeyhole, SlidersHorizontal, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/ideas";
import { localeHref, portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";

const LAYER_ICONS = [Eye, Lock, LockKeyhole] as const;
const FILTER_ICONS = [SlidersHorizontal, Sparkles] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/ideas", t.meta.title, t.meta.description);
}

/**
 * Ideas (SOW §3.4): what the directory shows at each tier and how to search
 * it, linking to the live directory. No example listings: the launch
 * database starts empty (clarifications §6).
 */
export default async function IdeasPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const browse = portalHref(locale, "browseIdeas");
  const signUp = portalHref(locale, "signUpInnovator");

  return (
    <>
      <PageHero
        id="id-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: browse, variant: "accent" },
          { label: t.hero.secondary, href: localeHref(locale, "/how-it-works"), variant: "outline-inverse" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/people/step-3-discover.webp", alt: t.hero.imageAlt }}
      />

      <CardGrid
        id="id-layers"
        eyebrow={t.layers.eyebrow}
        titleLead={t.layers.titleLead}
        titleAccent={t.layers.titleAccent}
        description={t.layers.description}
        cards={t.layers.cards.map((card, i) => ({ ...card, Icon: LAYER_ICONS[i], dark: i === 2 }))}
      />

      <CardGrid
        id="id-filters"
        eyebrow={t.filters.eyebrow}
        titleLead={t.filters.titleLead}
        titleAccent={t.filters.titleAccent}
        columns={2}
        tone="surface"
        cards={t.filters.cards.map((card, i) => ({ ...card, Icon: FILTER_ICONS[i], dark: i === 1 }))}
      />

      <Statement eyebrow={t.review.eyebrow} parts={t.review.parts} footnote={t.review.footnote} />

      <CtaPanel
        id="id-cta"
        titleLead={t.cta.titleLead}
        titleAccent={t.cta.titleAccent}
        image={{ src: "/images/people/the-meeting.webp", alt: t.cta.imageAlt, position: "object-[70%_center]" }}
        rows={[
          { side: "investor", label: t.cta.browse.label, body: t.cta.browse.body, cta: t.cta.browse.cta, href: browse },
          { side: "innovator", label: t.cta.post.label, body: t.cta.post.body, cta: t.cta.post.cta, href: signUp },
        ]}
      />
    </>
  );
}
