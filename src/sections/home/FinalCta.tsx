import { CtaPanel } from "@/components/sections/CtaPanel";
import type { Dictionary } from "@/i18n/get-dictionary";

type FinalCtaProps = {
  t: Dictionary["home"]["finalCta"];
  alt: string;
  innovatorHref: string;
  investorHref: string;
};

/** The story's last frame: the founder and the investor in conversation. */
export function FinalCta({ t, alt, innovatorHref, investorHref }: FinalCtaProps) {
  return (
    <CtaPanel
      id="final-cta-title"
      titleLead={t.titleLead}
      titleAccent={t.titleAccent}
      image={{ src: "/images/people/the-meeting.webp", alt, position: "object-[70%_center]" }}
      rows={[
        { side: "innovator", label: t.innovator.label, body: t.innovator.body, cta: t.innovator.cta, href: innovatorHref },
        { side: "investor", label: t.investor.label, body: t.investor.body, cta: t.investor.cta, href: investorHref },
      ]}
    />
  );
}
