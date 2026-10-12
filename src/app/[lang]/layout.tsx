import type { Metadata, Viewport } from "next";
import {
  Alexandria,
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans_Arabic,
  Instrument_Serif,
} from "next/font/google";

import { MotionProvider } from "@/components/animation/MotionProvider";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

import "../globals.css";

// Latin display face. The optical-size axis tightens letterforms at large sizes.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

// Accent word in two-tone headlines.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Labels and figures only, so it is not preloaded.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Arabic faces. Only the Arabic subset, so they download only when Arabic
// glyphs render; not preloaded to keep English pages light.
const alexandria = Alexandria({
  subsets: ["arabic"],
  variable: "--font-alexandria",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

const fontVariables = [bricolage, instrumentSerif, geist, geistMono, alexandria, plexArabic]
  .map((font) => font.variable)
  .join(" ");

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const siteUrl = process.env.SITE_URL;

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: { default: dict.meta.title, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    applicationName: "Xwavy",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Xwavy",
      locale: localeMeta[locale].ogLocale,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: { card: "summary", title: dict.meta.title, description: dict.meta.description },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050a17",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html lang={locale} dir={localeMeta[locale].dir} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint (see [data-intro] in globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="z-skip-link fixed inset-s-3 top-3 translate-y-[-200%] rounded-full bg-abyss px-5 py-3 text-sm font-semibold text-white focus-visible:translate-y-0"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>
          <SmoothScrollProvider>
            <SiteHeader locale={locale} dict={dict} />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter locale={locale} dict={dict} />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
