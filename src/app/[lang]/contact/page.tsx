import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/contact";
import { localeHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { ContactHero } from "@/sections/contact/ContactHero";
import { HelpLinks } from "@/sections/contact/HelpLinks";

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/contact", t.meta.title, t.meta.description);
}

/** Contact (SOW §3.3): the topic-routed form up front, then self-serve answers. */
export default async function ContactPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);

  return (
    <>
      <ContactHero t={t} email={siteConfig.email} />
      <HelpLinks t={t.links} hrefs={t.links.cards.map((card) => localeHref(locale, card.href))} />
    </>
  );
}
