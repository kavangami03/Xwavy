import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localeHref, portalHref } from "@/lib/href";
import { HeroSplit } from "@/sections/home/HeroSplit";

type HeroProps = { locale: Locale; dict: Dictionary };

/** Server wrapper: resolves links and labels, then hands the copy to the hero. */
export function Hero({ locale, dict }: HeroProps) {
  const { hero, roles, images } = dict.home;
  return (
    <HeroSplit
      t={hero}
      roles={{ innovator: roles.innovators.label, investor: roles.investors.label }}
      alts={{ innovator: images.innovatorPortrait, investor: images.investorPortrait }}
      innovatorHref={portalHref(locale, "signUpInnovator")}
      investorHref={localeHref(locale, "/for-investors")}
    />
  );
}
