import { portalIsExternal, portalLinks } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** Prefixes an in-app path with the locale: ("ar", "/pricing") → "/ar/pricing". */
export function localeHref(locale: Locale, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Link into the portal (sign in, sign up, idea directory). The portal is a
 * separate product; when PORTAL_URL is set the language is passed as ?lang=.
 */
export function portalHref(locale: Locale, key: keyof typeof portalLinks): string {
  const target = portalLinks[key];
  return portalIsExternal ? `${target}?lang=${locale}` : localeHref(locale, target);
}
