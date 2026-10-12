import { Check, CheckCircle2, Lock, MessageSquareText, Save, Search, Unlock, X } from "lucide-react";

import { MockCard, MockChip, MockLine } from "@/components/mockups/primitives";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

type Steps = Dictionary["home"]["process"]["steps"];

/** Interface fragment illustrating one step of the platform flow. Decorative. */
export function ProcessVisual({ steps, index }: { steps: Steps; index: number }) {
  switch (index) {
    case 0:
      return <ComposerVisual v={steps[0].visual} />;
    case 1:
      return <ReviewVisual v={steps[1].visual} />;
    case 2:
      return <DiscoverVisual v={steps[2].visual} />;
    case 3:
      return <RequestVisual v={steps[3].visual} actions={steps[4].visual} />;
    default:
      return <ConnectVisual v={steps[4].visual} />;
  }
}

function ComposerVisual({ v }: { v: Steps[0]["visual"] }) {
  return (
    <MockCard>
      <div className="flex items-center justify-between">
        <p className="font-heading text-h4 text-ink">{v.heading}</p>
        <MockChip tone="cyan">
          <Save aria-hidden className="size-3" />
          {v.saved}
        </MockChip>
      </div>
      <ol className="mt-5 flex flex-col gap-2">
        {v.items.map((item, i) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm",
              i < 3 ? "border-line bg-white text-ink" : "border-dashed border-line text-muted",
              i === 2 && "border-cyan-ink/40 ring-2 ring-cyan/20",
            )}
          >
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full font-mono text-[0.6875rem]",
                i < 2 ? "bg-abyss text-cyan" : "bg-surface text-muted",
              )}
            >
              {i < 2 ? <Check aria-hidden className="size-3.5" /> : i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
      <div className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-surface p-1 text-center text-xs">
        <span className="rounded-full bg-white py-2 font-medium text-ink shadow-xs">{v.previewPublic}</span>
        <span className="py-2 text-muted">{v.previewPaid}</span>
      </div>
    </MockCard>
  );
}

function ReviewVisual({ v }: { v: Steps[1]["visual"] }) {
  return (
    <MockCard>
      <p className="font-heading text-h4 text-ink">{v.heading}</p>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
        {v.outcomes.map((outcome, i) => (
          <span
            key={outcome}
            className={cn(
              "rounded-lg border px-2 py-3",
              i === 1 ? "border-gold-ink/40 bg-gold/15 font-medium text-gold-ink" : "border-line text-muted",
            )}
          >
            {outcome}
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-lg bg-surface p-4">
        <p className="flex items-center gap-2 text-xs font-medium text-ink">
          <MessageSquareText aria-hidden className="size-3.5 text-cyan-ink" />
          {v.feedbackLabel}
        </p>
        <p className="mt-2 text-sm text-body">{v.feedback}</p>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <MockLine className="w-full" />
        <MockLine className="w-3/4" />
      </div>
    </MockCard>
  );
}

function DiscoverVisual({ v }: { v: Steps[2]["visual"] }) {
  return (
    <MockCard>
      <div className="flex items-center gap-3 rounded-full border border-line px-4 py-2.5 text-sm text-muted">
        <Search aria-hidden className="size-4" />
        {v.heading}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {v.filters.map((filter, i) => (
          <MockChip key={filter} tone={i === 0 ? "dark" : "neutral"}>
            {filter}
          </MockChip>
        ))}
      </div>
      <p className="mt-5 font-mono text-[0.6875rem] text-muted uppercase">{v.results}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {[0, 1, 2].map((row) => (
          <li key={row} className="flex items-center gap-4 rounded-lg border border-line p-3">
            <span className="size-9 shrink-0 rounded-md bg-frost" />
            <span className="flex flex-1 flex-col gap-2">
              <MockLine className={row === 1 ? "w-2/3 bg-line" : "w-3/4 bg-line"} />
              <MockLine className="w-1/2" />
            </span>
            <Lock aria-hidden className="size-4 text-gold-ink" />
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

function RequestVisual({ v, actions }: { v: Steps[3]["visual"]; actions: Steps[4]["visual"] }) {
  return (
    <MockCard>
      <p className="font-mono text-[0.6875rem] text-cyan-ink uppercase">{v.heading}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-abyss font-heading text-sm text-gold">IF</span>
        <span className="flex flex-col">
          <span className="font-heading text-h4 text-ink">{v.firm}</span>
          <span className="text-xs text-muted">{v.mandate}</span>
        </span>
      </div>
      <p className="mt-4 rounded-lg bg-surface px-4 py-3 font-mono text-xs text-body">{v.cheque}</p>
      <blockquote className="mt-4 border-s-2 border-gold ps-4 text-sm text-body">{v.note}</blockquote>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <span className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-abyss text-sm text-white">
          <Check aria-hidden className="size-4 text-cyan" />
          {actions.accept}
        </span>
        <span className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-line text-sm text-muted">
          <X aria-hidden className="size-4" />
          {actions.decline}
        </span>
      </div>
    </MockCard>
  );
}

function ConnectVisual({ v }: { v: Steps[4]["visual"] }) {
  return (
    <MockCard>
      <div className="flex items-center justify-between">
        <p className="font-heading text-h4 text-ink">{v.heading}</p>
        <CheckCircle2 aria-hidden className="size-5 text-cyan-ink" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          { role: "IN", tone: "bg-cyan/15 text-cyan-ink", email: "founder@example.com" },
          { role: "IF", tone: "bg-gold/15 text-gold-ink", email: "partner@example.com" },
        ].map((side) => (
          <div key={side.role} className="rounded-lg border border-line p-4">
            <span className={cn("grid size-9 place-items-center rounded-full font-heading text-xs", side.tone)}>
              {side.role}
            </span>
            <p className="mt-3 flex items-center gap-1.5 font-mono text-xs text-ink" dir="ltr">
              <Unlock aria-hidden className="size-3.5 text-cyan-ink" />
              {side.email}
            </p>
            <MockLine className="mt-2 w-2/3" />
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
        <span className="flex min-h-10 items-center justify-center rounded-full bg-cyan font-medium text-abyss">
          {v.accept}
        </span>
        <span className="flex min-h-10 items-center justify-center rounded-full border border-line text-muted">
          {v.decline}
        </span>
      </div>
      <p className="mt-4 text-center text-xs text-muted">{v.revealed}</p>
    </MockCard>
  );
}
