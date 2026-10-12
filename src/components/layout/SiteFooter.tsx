import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localeHref, portalHref } from "@/lib/href";

type SiteFooterProps = { locale: Locale; dict: Dictionary };

/** Copyright year. Fixed at build time; the page is prerendered. */
const YEAR = 2026;

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const t = dict.footer;

  return (
    <footer className="surface-abyss panel mb-(--panel-inset)">
      <Container className="pt-section-sm pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex max-w-sm flex-col gap-6">
            <Link href={localeHref(locale, "/")} className="w-fit rounded-md" aria-label={siteConfig.name}>
              <Image
                src={siteConfig.logo.src}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                alt={siteConfig.logo.alt}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-mist">{t.summary}</p>
            <p className="text-sm text-mist">
              {t.contactLabel}{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-white underline-offset-4 hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {t.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-eyebrow text-white uppercase">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href === "/ideas" ? portalHref(locale, "browseIdeas") : localeHref(locale, link.href)}
                        className="text-sm text-mist transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-16 max-w-3xl border-t border-white/10 pt-8 text-sm text-mist">{t.disclaimer}</p>

        <div className="mt-6 flex flex-col gap-4 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {siteConfig.name}. {t.rights} {t.poweredBy}.
          </p>
          <LanguageSwitcher current={locale} label={dict.common.language} className="-ms-3 w-fit" />
        </div>
      </Container>
    </footer>
  );
}
