import { ArrowUpRight, Lightbulb, Mail, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BackToTop } from "@/components/layout/FooterExtras";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import imagesCopy from "@/i18n/pages/images";
import { cn } from "@/lib/cn";
import { localeHref, portalHref } from "@/lib/href";

type SiteFooterProps = { locale: Locale; dict: Dictionary };

/** Copyright year. Fixed at build time; the page is prerendered. */
const YEAR = 2026;

/**
 * Site footer, shared by every page: the closing invitation (a photograph and
 * one large action tile per side of the marketplace), then the brand, contact
 * and link columns, then the legal line.
 */
export async function SiteFooter({ locale, dict }: SiteFooterProps) {
  const alt = await pageCopy(imagesCopy);
  const t = dict.footer;
  const cta = dict.home.finalCta;

  const tiles = [
    {
      key: "innovator",
      href: portalHref(locale, "signUpInnovator"),
      label: cta.innovator.label,
      title: dict.common.postIdea,
      body: cta.innovator.body,
      Icon: Lightbulb,
      tone: "bg-cyan text-abyss",
      chip: "bg-abyss text-cyan",
    },
    {
      key: "investor",
      href: portalHref(locale, "browseIdeas"),
      label: cta.investor.label,
      title: dict.common.nav.browseIdeas,
      body: cta.investor.body,
      Icon: TrendingUp,
      tone: "bg-gold text-abyss",
      chip: "bg-abyss text-gold",
    },
  ] as const;

  return (
    <footer className="surface-abyss panel my-(--panel-inset)">
      <Container className="pt-section-sm">
        {/* The closing invitation: a photograph, and one way in for each side. */}
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl bg-navy p-6 sm:p-8 lg:col-span-6 lg:row-span-2">
            <Image
              src="/images/site/footer-closing.webp"
              alt={alt.footer}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[70%_center]"
            />
            <p className="relative max-w-md rounded-2xl bg-abyss p-6 text-h2 text-white">
              {cta.titleLead} <span className="accent text-cyan">{cta.titleAccent}</span>
            </p>
          </div>
          {tiles.map(({ key, href, label, title, body, Icon, tone, chip }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                "group relative flex min-h-52 flex-col justify-between gap-8 overflow-hidden rounded-3xl p-7 transition-transform duration-500 ease-brand hover:-translate-y-1 sm:p-8 lg:col-span-6",
                tone,
              )}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase">
                  <Icon aria-hidden className="size-4" />
                  {label}
                </span>
                <span
                  className={cn(
                    "grid size-14 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-brand group-hover:scale-110 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45",
                    chip,
                  )}
                >
                  <ArrowUpRight aria-hidden className="size-6" />
                </span>
              </span>
              <span>
                <span className="block text-h2">{title}</span>
                <span className="mt-3 block max-w-md text-[0.9375rem] opacity-80">{body}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Brand, contact and links. */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link href={localeHref(locale, "/")} className="w-fit rounded-md" aria-label={siteConfig.name}>
              <Image src={siteConfig.logo.src} width={siteConfig.logo.width} height={siteConfig.logo.height} alt={siteConfig.logo.alt} className="h-9 w-auto" />
            </Link>
            <p className="max-w-sm text-mist">{t.summary}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 pe-5 transition-colors hover:border-cyan"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-cyan text-abyss">
                <Mail aria-hidden className="size-4" />
              </span>
              <span>
                <span className="block text-xs text-mist">{t.contactLabel}</span>
                <span className="block font-medium text-white">{siteConfig.email}</span>
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            {t.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="border-b border-white/10 pb-4 font-mono text-eyebrow text-white uppercase">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href === "/ideas" ? portalHref(locale, "browseIdeas") : localeHref(locale, link.href)}
                        className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-white"
                      >
                        <span aria-hidden className="h-px w-0 bg-cyan transition-[width] duration-300 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Legal line. */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 py-7 text-sm text-mist lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-2">
            <p className="max-w-2xl">{t.disclaimer}</p>
            <p>
              © {YEAR} {siteConfig.name}. {t.rights} {t.poweredBy}.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <LanguageSwitcher current={locale} label={dict.common.language} />
            <BackToTop label={t.backToTop} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
