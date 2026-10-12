import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localeHref, portalHref } from "@/lib/href";
import { HeroStage } from "@/sections/home/HeroStage";

type HeroProps = { locale: Locale; dict: Dictionary };

/** Server wrapper: resolves links, then hands the copy to the interactive stage. */
export function Hero({ locale, dict }: HeroProps) {
  return (
    <HeroStage
      t={dict.home.hero}
      innovatorHref={portalHref(locale, "signUpInnovator")}
      investorHref={localeHref(locale, "/for-investors")}
    />
  );
}
