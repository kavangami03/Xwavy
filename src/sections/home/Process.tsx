import { BadgeCheck, Handshake, PenLine, Search, Send } from "lucide-react";

import { StepStory } from "@/components/sections/StepStory";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProcessProps = { t: Dictionary["home"]["process"]; alts: Dictionary["home"]["images"] };

/** One photograph and icon per step, in story order (public/images/people). */
const STEPS = [
  { src: "/images/people/step-1-post.webp", alt: "step1", Icon: PenLine },
  { src: "/images/people/step-2-review.webp", alt: "step2", Icon: BadgeCheck },
  { src: "/images/people/step-3-discover.webp", alt: "step3", Icon: Search },
  { src: "/images/people/step-4-request.webp", alt: "step4", Icon: Send },
  { src: "/images/people/step-5-connect.webp", alt: "step5", Icon: Handshake },
] as const;

/** "From first draft to first conversation": the five steps as a playing story. */
export function Process({ t, alts }: ProcessProps) {
  return (
    <StepStory
      id="process-title"
      sectionId="how-it-works"
      eyebrow={t.eyebrow}
      titleLead={t.titleLead}
      titleAccent={t.titleAccent}
      labels={{ step: t.stepLabel, of: t.of, play: t.play, pause: t.pause }}
      steps={t.steps.map((step, i) => {
        const media = STEPS[i] ?? STEPS[0];
        return {
          ...step,
          image: { src: media.src, alt: alts[media.alt] },
          icon: <media.Icon aria-hidden className="size-5" />,
          status: t.statuses[i] ?? step.name,
        };
      })}
    />
  );
}
