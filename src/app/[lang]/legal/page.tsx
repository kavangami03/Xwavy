import { FileText } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy, { LEGAL_SLUGS } from "@/i18n/pages/legal";
import { localeHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { LegalHeader } from "@/sections/legal/LegalHeader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/legal", t.hub.title, t.hub.description);
}

/** Legal hub (SOW §3.3): the five policies, each marked as a draft pending legal review. */
export default async function LegalHubPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);

  return (
    <>
      <LegalHeader id="lg-title" eyebrow={t.hub.eyebrow} title={t.hub.titleLead} accent={t.hub.titleAccent} body={t.hub.body} draftBadge={t.draftBadge} />

      <CardGrid id="lg-docs" titleLead={t.hub.eyebrow} description={t.draftNote} tone="surface" cards={LEGAL_SLUGS.map((slug) => {
        const doc = t.docs[slug];
        return { title: doc.title, body: doc.summary, Icon: FileText, link: { label: t.readLabel, href: localeHref(locale, `/legal/${slug}`) } };
      })} />
    </>
  );
}
