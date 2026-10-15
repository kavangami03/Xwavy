import { BookOpen, CreditCard, Scale } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/config/site";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/contact";
import { localeHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/sections/contact/ContactForm";

const LINK_ICONS = [BookOpen, CreditCard, Scale] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/contact", t.meta.title, t.meta.description);
}

/** Contact (SOW §3.3): a topic-routed message to the one confirmed inbox, plus self-serve answers. */
export default async function ContactPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);

  return (
    <>
      <PageHero
        id="ct-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[{ label: t.hero.emailCta, href: `mailto:${siteConfig.email}`, variant: "primary" }]}
        image={{ src: "/images/people/contact-desk.webp", alt: t.hero.imageAlt, position: "object-[30%_center]" }}
      />

      <ContactForm t={t.form} email={siteConfig.email} />

      <CardGrid
        id="ct-links"
        eyebrow={t.links.eyebrow}
        titleLead={t.links.titleLead}
        titleAccent={t.links.titleAccent}
        cards={t.links.cards.map((card, i) => ({
          title: card.title,
          body: card.body,
          Icon: LINK_ICONS[i],
          link: { label: card.link, href: localeHref(locale, card.href) },
        }))}
      />
    </>
  );
}
