import { StepRow } from "@/components/sections/StepRow";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProcessProps = { t: Dictionary["home"]["process"]; alts: Dictionary["home"]["images"] };

/** One photograph per step, in story order (public/images/people). */
const PHOTOS = [
  { src: "/images/people/step-1-post.webp", alt: "step1" },
  { src: "/images/people/step-2-review.webp", alt: "step2" },
  { src: "/images/people/step-3-discover.webp", alt: "step3" },
  { src: "/images/people/step-4-request.webp", alt: "step4" },
  { src: "/images/people/step-5-connect.webp", alt: "step5" },
] as const;

/** "From first draft to first conversation": the five steps in one row. */
export function Process({ t, alts }: ProcessProps) {
  return (
    <StepRow
      id="process-title"
      sectionId="how-it-works"
      eyebrow={t.eyebrow}
      titleLead={t.titleLead}
      titleAccent={t.titleAccent}
      steps={t.steps.map((step, i) => {
        const photo = PHOTOS[i] ?? PHOTOS[0];
        return { name: step.name, title: step.title, body: step.body, image: { src: photo.src, alt: alts[photo.alt] } };
      })}
    />
  );
}
