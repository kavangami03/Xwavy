"use client";

import { Mail, ShieldAlert } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/contact";

type ContactFormProps = { t: (typeof copy)["en"]["form"]; email: string };

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-cyan-ink focus:outline-2 focus:outline-cyan/40";

/**
 * Contact form with a topic selector. There is one confirmed inbox, so the
 * form routes by subject line: submitting opens the visitor's email app with
 * the topic, their details and the message filled in. Nothing is sent from
 * the website itself.
 */
export function ContactForm({ t, email }: ContactFormProps) {
  const id = useId();
  const [topic, setTopic] = useState(t.topics[0] ?? "");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `[${topic}] ${name}`.trim();
    const body = `${message}\n\n${name}${from ? ` <${from}>` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Section tone="surface" aria-labelledby="contact-form-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeading id="contact-form-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} />
          <Reveal className="flex flex-col gap-4">
            <p className="text-sm text-muted">{t.directLabel}</p>
            <a
              href={`mailto:${email}`}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-line bg-white px-5 py-3 font-medium text-ink transition-colors hover:border-cyan-ink"
            >
              <Mail aria-hidden className="size-5 text-cyan-ink" />
              {email}
            </a>
            <p className="flex items-start gap-2.5 text-sm text-body">
              <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
              {t.privacyNote}
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:p-8">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-sm font-medium text-ink">{t.topicLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {t.topics.map((option) => (
                  <label
                    key={option}
                    className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm text-body transition-colors has-checked:border-abyss has-checked:bg-abyss has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-cyan"
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={option}
                      checked={topic === option}
                      onChange={() => setTopic(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink">
                  {t.nameLabel}
                </label>
                <input id={`${id}-name`} name="name" type="text" autoComplete="name" required className={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink">
                  {t.emailLabel}
                </label>
                <input id={`${id}-email`} name="email" type="email" autoComplete="email" required dir="ltr" className={field} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink">
                {t.messageLabel}
              </label>
              <textarea id={`${id}-message`} name="message" rows={6} required placeholder={t.messagePlaceholder} className={field} />
            </div>

            <Button type="submit" variant="primary" arrow className="w-fit">
              {t.submit}
            </Button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
