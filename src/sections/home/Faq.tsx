import { FaqSection } from "@/components/sections/FaqSection";
import type { Dictionary } from "@/i18n/get-dictionary";

type FaqProps = { t: Dictionary["home"]["faq"] };

export function Faq({ t }: FaqProps) {
  return <FaqSection id="faq-title" eyebrow={t.eyebrow} titleLead={t.titleLead} titleAccent={t.titleAccent} items={t.items} />;
}
