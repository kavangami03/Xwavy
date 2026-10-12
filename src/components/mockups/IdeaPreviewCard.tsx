import { BadgeCheck, Lock, MapPin } from "lucide-react";

import { MockCard, MockChip, MockLine } from "@/components/mockups/primitives";
import type { Dictionary } from "@/i18n/get-dictionary";

type IdeaPreviewCardProps = {
  t: Dictionary["home"]["hero"]["mockup"];
  exampleLabel: string;
  lockedLabel: string;
};

/**
 * A published idea as an unpaid visitor sees it: the public summary and ask
 * band, with the paid layer shown as locked placeholders (nothing behind them,
 * as on the real platform).
 */
export function IdeaPreviewCard({ t, exampleLabel, lockedLabel }: IdeaPreviewCardProps) {
  return (
    <MockCard className="relative w-full max-w-md">
      <div className="flex items-center justify-between gap-3">
        <MockChip tone="cyan">
          <BadgeCheck aria-hidden className="size-3" />
          {t.status}
        </MockChip>
        <span className="font-mono text-[0.6875rem] text-muted uppercase">{exampleLabel}</span>
      </div>

      <p className="mt-5 font-heading text-h4 text-ink">{t.title}</p>
      <p className="mt-2 text-sm text-body">{t.pitch}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <MockChip>{t.sector}</MockChip>
        <MockChip>{t.stage}</MockChip>
        <MockChip>
          <MapPin aria-hidden className="size-3" />
          {t.region}
        </MockChip>
      </div>

      <div className="mt-5 flex items-baseline justify-between rounded-lg bg-surface px-4 py-3">
        <span className="text-xs text-muted">{t.askLabel}</span>
        <span className="font-heading text-h4 text-ink" data-numeric>
          {t.askBand}
        </span>
      </div>

      <div className="mt-5 rounded-lg border border-dashed border-field/50 p-4">
        <p className="flex items-center gap-2 text-xs font-medium text-ink">
          <Lock aria-hidden className="size-3.5 text-gold-ink" />
          {t.lockedTitle}
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          {t.lockedItems.map((item) => (
            <li key={item} className="flex flex-col gap-1.5">
              <span className="text-[0.6875rem] text-muted">{item}</span>
              <MockLine className="w-4/5" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-abyss px-4 text-sm font-medium text-white">
          <Lock aria-hidden className="size-3.5 text-gold" />
          {t.requestIntro}
        </span>
        <span className="text-xs text-muted">{lockedLabel}</span>
      </div>
    </MockCard>
  );
}
