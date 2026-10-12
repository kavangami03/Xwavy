"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Check, Pause, Play, Send, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";

type HeroStageProps = {
  t: Dictionary["home"]["hero"];
  innovatorHref: string;
  investorHref: string;
};

const SOURCES = {
  webm: "/videos/hero-loop.webm",
  mp4: "/videos/hero-loop.mp4",
  poster: "/videos/hero-loop-poster.webp",
} as const;

/** Desktop with motion: the hero pins and the film window opens on scroll. */
const STAGE_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
/** Desktop without motion: the window stays a still pill inside the headline. */
const STILL_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: reduce)";

/** Seconds into the 9.5s loop when each story card appears (publish, request, accept, connect). */
const CUES = [0.3, 1.7, 3.9, 5.9] as const;
const CLEAR_AT = 8.9;
const stageAt = (s: number) => (s >= CLEAR_AT ? 0 : CUES.filter((cue) => s >= cue).length);

const CARDS = [
  { Icon: BadgeCheck, tone: "bg-cyan text-abyss", position: "top-[16%] inset-s-[5%]" },
  { Icon: Send, tone: "bg-gold text-abyss rtl:[&_svg]:-scale-x-100", position: "top-[36%] inset-e-[5%]" },
  { Icon: Check, tone: "bg-cyan text-abyss", position: "bottom-[26%] inset-s-[7%]" },
  { Icon: Users, tone: "bg-abyss text-cyan", position: "bottom-[9%] inset-x-0 mx-auto" },
] as const;

/**
 * Hero: "the space between ideas and investment".
 *
 * A full-width headline carries the film inside a pill-shaped window between
 * its words ("meet ◖film◗ investment."). On desktop the hero pins while the
 * window opens to fill the panel and the words part to either side; the
 * story cards then narrate the film in sync (double opt-in). Below lg, or
 * with reduced motion, nothing pins: the film sits in a card under the copy.
 *
 * Layout is CSS-first (no layout swap on hydration); JavaScript only measures
 * the window and drives the scroll animation.
 */
export function HeroStage({ t, innovatorHref, investorHref }: HeroStageProps) {
  const pinRoot = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const slot = useRef<HTMLSpanElement>(null);

  const reducedMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [story, setStory] = useState(0);
  const [open, setOpen] = useState(false);

  const shouldPlay = userPaused === null ? !reducedMotion : !userPaused;
  const visibleStory = hasPlayed ? story : t.story.length;

  // Play while visible and wanted; pause off-screen.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    let visible = true;
    const sync = () => (shouldPlay && visible ? void el.play().catch(() => setPlaying(false)) : el.pause());
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    sync();
    return () => observer.disconnect();
  }, [shouldPlay]);

  const togglePlayback = () => {
    setUserPaused(playing);
    if (playing) video.current?.pause();
    else void video.current?.play().catch(() => setPlaying(false));
  };

  useGSAP(
    () => {
      const stage = section.current;
      const win = media.current;
      const hole = slot.current;
      if (!stage || !win || !hole) return;
      const q = gsap.utils.selector(stage);

      /** The pinned scroll timeline, once created (desktop with motion only). */
      let scrollTl: gsap.core.Timeline | null = null;
      /**
       * 0 = film visible only through the pill; 1 = film fills the panel. Read from
       * the timeline itself: ScrollTrigger restores progress on reload/refresh
       * without firing onUpdate, so a copied value would go stale.
       */
      const progressNow = () => scrollTl?.progress() ?? 0;
      const openEase = gsap.parseEase("power2.inOut");

      /**
       * Clips the film to the pill slot in the headline, opening toward the full
       * panel as `progress` grows. Measured live on every call, so it follows the
       * intro motion, font loading and resizes; a value captured once drifts.
       */
      const applyClip = () => {
        const r = hole.getBoundingClientRect();
        const s = stage.getBoundingClientRect();
        const k = 1 - openEase(gsap.utils.clamp(0, 1, (progressNow() - 0.15) / 0.85));
        win.style.clipPath = `inset(${(r.top - s.top) * k}px ${(s.right - r.right) * k}px ${
          (s.bottom - r.bottom) * k
        }px ${(r.left - s.left) * k}px round ${(r.height / 2) * k}px)`;
        // While it is a pill, centre the film on the slot (so the pill shows the
        // people, not a dark corner) and zoom in a little; both ease out as it opens.
        const film = video.current;
        if (film) {
          const dx = r.left + r.width / 2 - (s.left + s.width / 2);
          const dy = r.top + r.height / 2 - (s.top + s.height / 2);
          film.style.transform = `translate(${dx * k}px, ${dy * k}px) scale(${1 + 0.3 * k})`;
        }
      };

      /** Re-clip whenever layout may have moved the slot. Returns a cleanup. */
      const trackLayout = () => {
        const observer = new ResizeObserver(applyClip);
        [stage, hole, hole.closest("h1")].forEach((el) => el && observer.observe(el));
        void document.fonts?.ready.then(applyClip);
        ScrollTrigger.addEventListener("refresh", applyClip);
        return () => {
          observer.disconnect();
          ScrollTrigger.removeEventListener("refresh", applyClip);
        };
      };

      const mm = gsap.matchMedia();

      mm.add(STAGE_QUERY, () => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        applyClip();
        const untrack = trackLayout();

        // Page-load reveal. The headline slides up, so the window re-clips every frame.
        const intro = gsap.timeline({ defaults: { ease: EASE.gsapOut }, onUpdate: applyClip, onComplete: applyClip });
        intro
          .set(q("[data-intro]"), { autoAlpha: 1 })
          .from(q("[data-line]"), { yPercent: 105, duration: 1.1, stagger: 0.1 }, 0.1)
          .fromTo(win, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 0.55)
          .from(q("[data-intro-item]"), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08 }, 0.6);

        /** Window shape and "open" state, both derived from the timeline's progress. */
        const sync = () => {
          applyClip();
          setOpen(progressNow() > 0.92);
        };

        // Scroll: part the words, then open the window (clip driven by the smoothed timeline progress).
        // The margin-free wrapper is pinned (pinning the inset panel itself would widen the page).
        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: pinRoot.current,
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
          onUpdate: sync,
        });
        scrollTl = scroll;
        // Timeline length 1 = the whole pinned scroll. Words part and clear in the
        // first ~40%, so they are gone before the window grows behind them.
        scroll
          .to(q("[data-part=line1]"), { xPercent: -22 * rtl, autoAlpha: 0, ease: "power2.in", duration: 0.4 }, 0)
          .to(q("[data-part=before]"), { xPercent: -70 * rtl, autoAlpha: 0, ease: "power2.in", duration: 0.4 }, 0)
          .to(q("[data-part=after]"), { xPercent: 45 * rtl, autoAlpha: 0, ease: "power2.in", duration: 0.4 }, 0)
          .to(q("[data-hero-foot]"), { y: 40, autoAlpha: 0, ease: "power1.in", duration: 0.3 }, 0)
          // The pill's outline must not linger over the opened film.
          .to(hole, { autoAlpha: 0, duration: 0.15 }, 0.12)
          // Keeps the timeline one unit long; the film itself is positioned by applyClip.
          .set({}, {}, 1);

        // Re-derive after ScrollTrigger restores a scroll position (reload mid-page, resize).
        ScrollTrigger.addEventListener("refresh", sync);
        sync();

        return () => {
          ScrollTrigger.removeEventListener("refresh", sync);
          untrack();
          scrollTl = null;
          setOpen(false);
        };
      });

      mm.add(STILL_QUERY, () => {
        scrollTl = null;
        applyClip();
        gsap.set(win, { autoAlpha: 1 });
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
        return trackLayout();
      });

      // Below lg nothing pins: a simple staggered fade-in, or none with reduced motion.
      mm.add("(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q("[data-intro]"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: EASE.gsapOut, delay: 0.1 },
        );
      });
      mm.add("(max-width: 1023.98px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
    },
    { scope: section },
  );

  const titleSize = "text-[clamp(2.6rem,12vw,4.5rem)] lg:text-[clamp(5rem,8.4vw,10rem)] lg:rtl:text-[clamp(4.25rem,7vw,8.5rem)]";
  const mask = "block [clip-path:inset(-0.6em_-1em_-0.18em_-1em)]";

  return (
    <div ref={pinRoot}>
      <section
        ref={section}
        aria-labelledby="hero-title"
        className="surface-abyss panel relative mt-(--panel-inset) flex flex-col lg:block lg:h-[calc(100svh-2*var(--panel-inset))] lg:min-h-[46rem]"
      >
        {/* The film. Below lg: a card in the flow. On lg: fills the panel, clipped to the window. */}
        <div
          ref={media}
          className="relative order-2 mx-gutter mb-6 aspect-video overflow-hidden rounded-xl lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none lg:opacity-0"
        >
          <video
            ref={video}
            className="size-full object-cover"
            poster={SOURCES.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.video.label}
            onPlay={() => {
              setPlaying(true);
              setHasPlayed(true);
            }}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => setStory(stageAt(event.currentTarget.currentTime))}
          >
            <source src={SOURCES.webm} type="video/webm" />
            <source src={SOURCES.mp4} type="video/mp4" />
          </video>

          {/* Story cards over the opened film (desktop). Decorative; the video has a label. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
            {t.story.map((item, i) => {
              const card = CARDS[i];
              if (!card) return null;
              const { Icon } = card;
              return (
                <AnimatePresence key={item.title}>
                  {open && visibleStory > i ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      className={cn(
                        "absolute flex w-fit items-center gap-3 rounded-2xl border border-line bg-white py-3 ps-3 pe-5 shadow-elevated",
                        card.position,
                      )}
                    >
                      <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", card.tone)}>
                        <Icon className="size-4" />
                      </span>
                      <span className="flex flex-col text-start">
                        <span className="text-sm font-semibold text-ink">{item.title}</span>
                        <span className="text-xs text-muted">{item.detail}</span>
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Pause control on the film: always on mobile, on desktop once open. */}
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? t.video.pause : t.video.play}
            className={cn(
              "absolute bottom-3 inset-e-3 grid size-10 place-items-center rounded-full border border-white/20 bg-abyss/80 text-white lg:bottom-6 lg:inset-e-6",
              // Desktop: shown once the film is open (the bottom-row control has faded out).
              open ? "lg:grid" : "lg:hidden",
            )}
          >
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
        </div>

        <div className="relative order-1 flex flex-col lg:h-full">
          <Container className="flex flex-1 flex-col pt-[calc(var(--panel-inset)+7rem)] pb-8 lg:pt-[calc(var(--panel-inset)+8.5rem)] lg:pb-10">
            {/* Load and scroll animate different elements: [data-intro-item] reveals on
                load, its [data-hero-foot] wrapper fades on scroll. A hidden wrapper hides
                its children, so the scroll state always wins, even after a reload mid-page. */}
            <div data-intro>
              <div data-hero-foot>
                <p
                  data-intro-item
                  className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 ps-2 pe-4 font-mono text-eyebrow text-mist uppercase"
                >
                  <span className="flex gap-1" aria-hidden>
                    <span className="size-2 rounded-full bg-cyan" />
                    <span className="size-2 rounded-full bg-gold" />
                  </span>
                  {t.eyebrow}
                </p>
              </div>
            </div>

            <h1
              id="hero-title"
              data-intro
              className={cn(
                "mt-8 font-heading leading-[0.92] font-bold tracking-[-0.05em] text-white lg:my-auto",
                titleSize,
              )}
            >
              <span className={mask}>
                <span data-line data-part="line1" className="block">
                  {t.title.line1}
                </span>
              </span>
              <span className={mask}>
                <span data-line className="flex flex-wrap items-center gap-x-[0.22em] lg:flex-nowrap lg:justify-end">
                  <span data-part="before">{t.title.before}</span>
                  {/* The film window. Empty and invisible: the video behind shows through it. */}
                  <span
                    ref={slot}
                    aria-hidden
                    className="hidden h-[0.74em] w-[1.85em] shrink-0 rounded-full border border-white/15 lg:inline-block"
                  />
                  <span data-part="after" className="accent text-cyan">
                    {t.title.after}
                  </span>
                </span>
              </span>
            </h1>

            <div data-intro>
              <div data-hero-foot>
                {/* Divider is its own element so it fades with the copy (a border would linger over the film). */}
                <span data-intro-item aria-hidden className="mt-10 block h-px bg-white/10 lg:mt-0" />
                <div className="grid gap-8 pt-8 lg:grid-cols-[1.2fr_auto_1fr] lg:items-end">
                  <div data-intro-item className="flex flex-col gap-5">
                    <p className="max-w-md text-lead text-mist">{t.body}</p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                      {t.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-mist">
                          <Check aria-hidden className="size-4 text-cyan" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div data-intro-item className="hidden items-center gap-3 lg:flex">
                    <button
                      type="button"
                      onClick={togglePlayback}
                      aria-label={playing ? t.video.pause : t.video.play}
                      className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/5"
                    >
                      {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
                    </button>
                    <span className="font-mono text-eyebrow text-mist uppercase">{t.scrollCue}</span>
                  </div>

                  <div data-intro-item className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                    <Button href={innovatorHref} size="lg" arrow>
                      {t.primaryCta}
                    </Button>
                    <Button href={investorHref} size="lg" variant="accent" arrow>
                      {t.secondaryCta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Mobile and tablet: one status line under the film, following the same cues. */}
        <div aria-hidden className="order-3 flex min-h-12 justify-center pb-8 lg:hidden">
          <AnimatePresence mode="wait" initial={false}>
            {visibleStory > 0 ? (
              <motion.p
                key={visibleStory}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DURATION.base, ease: EASE.brand }}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-navy-raised py-2 ps-2 pe-4 text-sm text-white"
              >
                <span className="grid size-7 place-items-center rounded-full bg-cyan text-abyss">
                  <Check className="size-3.5" />
                </span>
                {t.story[visibleStory - 1]?.title}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
