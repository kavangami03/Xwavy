import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type StatementProps = {
  eyebrow?: string;
  parts: readonly { text: string; accent?: boolean }[];
  footnote?: string;
  tone?: "light" | "dark";
};

/** One plain, large statement. No scroll effects; it fades in once. */
export function Statement({ eyebrow, parts, footnote, tone = "light" }: StatementProps) {
  const dark = tone === "dark";
  return (
    <Section tone={dark ? "abyss" : "white"} className="panel" spacing="compact">
      <Reveal className="flex max-w-4xl flex-col gap-6">
        {eyebrow ? <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow> : null}
        <p className={cn("text-h2 text-balance", dark ? "text-white" : "text-ink")}>
          {parts.map((part, i) =>
            part.accent ? (
              <span key={i} className={cn("accent", dark ? "text-cyan" : "text-cyan-ink")}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
        {footnote ? <p className={cn("max-w-xl text-lead", dark ? "text-mist" : "text-muted")}>{footnote}</p> : null}
      </Reveal>
    </Section>
  );
}
