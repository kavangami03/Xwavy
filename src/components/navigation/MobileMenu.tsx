"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import { DURATION, EASE } from "@/lib/motion";

type MobileMenuProps = {
  items: { label: string; href: string }[];
  locale: Locale;
  labels: { open: string; close: string; signIn: string; postIdea: string; language: string };
  signInHref: string;
  postIdeaHref: string;
};

/**
 * Disclosure menu below the header pill on screens narrower than lg.
 * Pauses smooth scrolling while open, closes on Escape or navigation, and
 * returns focus to the toggle.
 */
export function MobileMenu({ items, locale, labels, signInHref, postIdeaHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lenis?.start();
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="grid size-12 place-items-center rounded-full text-white transition-colors hover:bg-white/5"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.base, ease: EASE.brand }}
            className="absolute inset-x-0 top-full mt-2 rounded-[1.75rem] border border-white/10 bg-abyss p-3 shadow-elevated"
            data-lenis-prevent
          >
            <nav aria-label={labels.open}>
              <ul className="flex flex-col">
                {items.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={close}
                      className="flex min-h-12 items-center rounded-2xl px-4 font-heading text-h4 text-white transition-colors hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Button href={postIdeaHref} arrow onClick={close} className="w-full justify-between">
                {labels.postIdea}
              </Button>
              <div className="flex items-center justify-between">
                <Link
                  href={signInHref}
                  onClick={close}
                  className="inline-flex min-h-10 items-center rounded-full px-4 text-sm text-white hover:bg-white/5"
                >
                  {labels.signIn}
                </Link>
                <LanguageSwitcher current={locale} label={labels.language} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
