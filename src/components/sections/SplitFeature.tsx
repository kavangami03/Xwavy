import { Check, EyeOff } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type SplitList = { title: string; items: readonly string[]; tone?: "positive" | "hidden" };

type SplitFeatureProps = {
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  body?: string;
  image: { src: string; alt: string; position?: string };
  /** Photo on the reading end (default) or start. */
  imageSide?: "end" | "start";
  /** Numbered stages, e.g. the three moves of the double opt-in. */
  stages?: readonly { label: string; detail: string }[];
  lists?: readonly SplitList[];
  note?: string;
  action?: { label: string; href: string; variant?: "primary" | "accent" };
  tone?: "white" | "surface";
};

/**
 * A photograph beside a heading, short copy and simple lists. On desktop the
 * photo matches the copy's height, so the section is no taller than its text.
 */
export function SplitFeature({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  body,
  image,
  imageSide = "end",
  stages,
  lists,
  note,
  action,
  tone = "white",
}: SplitFeatureProps) {
  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={cn("flex flex-col justify-center gap-7", imageSide === "start" && "lg:order-2")}>
          <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={body} />

          {stages?.length ? (
            <Reveal as="ol" stagger className="flex flex-col gap-5">
              {stages.map((stage, i) => (
                <li key={stage.label} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-abyss font-mono text-sm text-white" data-numeric>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-h4 text-ink">{stage.label}</h3>
                    <p className="mt-1 text-[0.9375rem] text-body">{stage.detail}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          ) : null}

          {lists?.length ? (
            <Reveal stagger className={cn("grid gap-4", lists.length > 1 && "sm:grid-cols-2")}>
              {lists.map((list) => {
                const hidden = list.tone === "hidden";
                return (
                  <div key={list.title} className={cn("rounded-2xl p-6", hidden ? "surface-abyss" : tone === "white" ? "bg-surface" : "border border-line bg-white")}>
                    <h3 className={cn("font-mono text-eyebrow uppercase", hidden ? "text-gold" : "text-cyan-ink")}>{list.title}</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {list.items.map((item) => (
                        <li key={item} className={cn("flex items-start gap-2.5 text-[0.9375rem]", hidden ? "text-mist" : "text-body")}>
                          {hidden ? (
                            <EyeOff aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
                          ) : (
                            <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan-ink" />
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </Reveal>
          ) : null}

          {note ? (
            <Reveal>
              <p className="border-s-2 border-cyan-ink ps-4 text-body">{note}</p>
            </Reveal>
          ) : null}
          {action ? (
            <Button href={action.href} variant={action.variant ?? "primary"} arrow className="w-fit">
              {action.label}
            </Button>
          ) : null}
        </div>

        <Reveal
          variant="image"
          className={cn("relative aspect-4/3 overflow-hidden rounded-3xl bg-navy lg:aspect-auto lg:min-h-[26rem]", imageSide === "start" && "lg:order-1")}
        >
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className={cn("object-cover", image.position)} />
        </Reveal>
      </div>
    </Section>
  );
}
