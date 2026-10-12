# Xwavy website

Public marketing website for Xwavy, "Where ideas meet investment": a
marketplace where innovators post ideas free and investors subscribe to see the
full picture and request introductions (double opt-in).

**Scope: website only.** The portal (sign-up, dashboards, admin, payments) is a
separate product. This site links into it through `PORTAL_URL` (see below).

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP +
ScrollTrigger + SplitText, Lenis and Framer Motion. Arabic and English with
full RTL.

## Commands

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Development server on http://localhost:3000         |
| `npm run build`     | Production build                                    |
| `npm start`         | Serve the production build                          |
| `npm run lint`      | ESLint (flat config; `next lint` no longer exists)  |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`           |

## Environment

| Variable     | Purpose                                                                    |
| ------------ | -------------------------------------------------------------------------- |
| `SITE_URL`   | Production origin; enables absolute canonical/hreflang URLs (`metadataBase`). |
| `PORTAL_URL` | Portal origin, e.g. `https://app.xwavy.com`. Sign in / sign up / browse ideas link there. Unset = local paths (404 until the portal exists). |

## Languages

- Every page lives under `src/app/[lang]/` and is served at `/en/...` and `/ar/...`.
- `src/proxy.ts` redirects un-prefixed URLs: saved choice (cookie) → Saudi
  visitors to Arabic (hosting geo header) → browser language → English.
- Copy lives in `src/i18n/dictionaries/en.ts` (source of truth) and `ar.ts`.
  `ar.ts` is typed against English, so a missing key fails the type check.
  **The Arabic is a draft** pending Wavy Solutions' approval.
- Server components read the locale with `getLocale()` / `getDictionary()`
  (`next/root-params`); no prop drilling needed below the page.
- Use logical utilities (`ps-`, `pe-`, `ms-`, `inset-s-`, `border-s`, `text-start`)
  and add `rtl:-scale-x-100` to directional icons.

## Where things live

```
src/
  app/[lang]/        root layout (fonts, metadata, providers, header/footer), pages
  app/globals.css    design tokens and base styles
  proxy.ts           locale redirect
  i18n/              locale config, dictionaries (en, ar), getDictionary
  components/
    animation/       SmoothScrollProvider (Lenis), MotionProvider, Reveal, IntroAnimation
    layout/          Container (1920px cap), Section, SiteFooter
    navigation/      SiteHeader, MobileMenu, LanguageSwitcher
    mockups/         product UI fragments drawn in HTML (decorative)
    ui/              Button, Eyebrow, SectionHeading
  sections/home/     homepage sections
  config/site.ts     name, email, logo, portal links
  lib/               gsap (single import point), motion constants, href helpers, cn
public/videos/      hero loop (WebM + MP4, muted, seamless 9.5s) and its poster
docs/
  client/                  Scope of Work (text) and clarifications letter
  old-site-dummy-content/  text of the old xwavy.com; confirmed dummy, do not reuse
```

## Design system ("Deep Current")

- **Colours (solid only, no gradients):** abyss/navy dark surfaces, wave cyan
  (matches the logo), capital gold (investor actions), electric blue. Use
  `cyan-ink` / `gold-ink` for text on light backgrounds.
- **Type:** Bricolage Grotesque headlines with an Instrument Serif italic
  accent word (`.accent`), Geist text, Geist Mono labels. Arabic falls through
  to Alexandria and IBM Plex Sans Arabic automatically.
- **House style:** soft tinted page, dark sections as inset rounded panels
  (`.panel`), eyebrows with a leading rule (`Eyebrow`), pill buttons with an
  arrow chip (`<Button arrow>`), floating dark header.
- **Container:** content max 1920px with fluid 16–64px gutters.

## Animation

- GSAP owns scroll choreography; Framer Motion owns local UI state (menu,
  accordion). Never both on one property of one element.
- Import from `@/lib/gsap`; animate in `useGSAP({ scope })`; gate motion with
  `gsap.matchMedia()` and `MEDIA.motionOk`.
- Load reveals: mark elements `data-intro` inside `IntroAnimation`; CSS hides
  them before hydration (no flash) with a 2.5s safety fallback.
- Lenis runs on the GSAP ticker; `useLenis()` to stop/start (the mobile menu does).
- Reduced motion: no pinning, no reveals, native-feel scrolling, CSS
  transitions neutralised.

## Content rules

- Copy comes from the client documents in `docs/client/`. The old site's
  content is dummy data (clarifications §6.1): no figures, people,
  testimonials or listings from it.
- Do not invent statistics, prices, testimonials or category names. Plan
  prices and the twelve categories are pending from Wavy Solutions; live
  counters and featured ideas need real platform data.
