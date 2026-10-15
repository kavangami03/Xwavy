import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export type RowStep = { name: string; title: string; body: string; image: { src: string; alt: string } };

type StepRowProps = {
  id: string;
  sectionId?: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  steps: readonly RowStep[];
  tone?: "white" | "surface";
};

const columns: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };

/**
 * Numbered steps side by side on desktop (one row), as compact
 * photo-and-text rows on phones. Steps rise in one after another; each photo
 * opens with a soft wipe.
 */
export function StepRow({ id, sectionId, eyebrow, titleLead, titleAccent, description, steps, tone = "white" }: StepRowProps) {
  return (
    <Section id={sectionId} tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />

      <Reveal as="ol" stagger className={cn("mt-10 grid gap-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10", columns[steps.length] ?? "lg:grid-cols-4")}>
        {steps.map((step, i) => (
          <li key={step.name} className="grid grid-cols-[6.5rem_1fr] items-start gap-4 sm:flex sm:flex-col sm:gap-0">
            <Reveal variant="image" className="relative aspect-square overflow-hidden rounded-xl bg-navy sm:aspect-4/3 sm:w-full">
              <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 7rem" className="object-cover" />
            </Reveal>
            <div className="sm:mt-5">
              <p className="flex items-center gap-2 font-mono text-eyebrow text-cyan-ink uppercase">
                <span data-numeric>{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="h-px w-4 bg-line" />
                <span className="text-muted">{step.name}</span>
              </p>
              <h3 className="mt-2 text-h4 text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-body">{step.body}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
