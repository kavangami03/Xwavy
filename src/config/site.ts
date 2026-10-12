/**
 * Locale-independent constants. All visible copy lives in src/i18n/dictionaries.
 *
 * No canonical domain is configured yet. Set `url` (and `metadataBase` in the
 * root layout) once the production domain is confirmed by Wavy Solutions.
 */
/**
 * Where the website hands visitors over to the platform (portal). The portal
 * is a separate product, not part of this website build. Set PORTAL_URL to its
 * origin (e.g. https://app.xwavy.com) once known; until then these resolve to
 * paths on this site and will 404.
 */
const portal = process.env.PORTAL_URL ?? "";

export const portalLinks = {
  signIn: `${portal}/signin`,
  signUpInnovator: `${portal}/signup/innovator`,
  signUpInvestor: `${portal}/signup/investor`,
  browseIdeas: `${portal}/ideas`,
} as const;

/** True when a portal link points at a separate origin (no locale prefix needed). */
export const portalIsExternal = portal.length > 0;

export const siteConfig = {
  name: "Xwavy",
  /** Contact address published on the current xwavy.com. */
  email: "info@xwavy.com",
  logo: {
    /** Cyan wordmark on transparent background. Designed for dark surfaces. */
    src: "/brand/xwavy-logo.png",
    width: 993,
    height: 241,
    alt: "Xwavy",
  },
} as const;
