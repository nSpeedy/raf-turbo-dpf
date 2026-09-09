import type { UiKey } from '@/lib/content'

/**
 * Site structure config — the single place that defines WHICH links the
 * Navbar and Footer render. The words themselves stay in content.ts
 * (labelKey is a translation key), paths are locale-less: components run
 * them through localizePath() to add the /en prefix where needed.
 *
 * Re-branding a project = edit this file + content.ts + the tokens in
 * globals.css. Component internals stay untouched.
 */

export interface NavLinkDef {
    /** Translation key for the visible label (resolved per locale). */
    labelKey: UiKey
    /** Locale-less path ('/', '/features', '/#contact', …). */
    path: string
}

export interface SiteConfig {
    /** Main navigation (Navbar desktop + mobile menu). */
    nav: NavLinkDef[]
    /** Footer link column (above the legal links). */
    footerNav: NavLinkDef[]
    /** Legal links, always rendered at the end of the footer column. */
    legalNav: NavLinkDef[]
}

export const siteConfig: SiteConfig = {
    nav: [
        { labelKey: 'nav.services', path: '/#services' },
        { labelKey: 'nav.injectors', path: '/#injectors' },
        { labelKey: 'nav.process', path: '/#process' },
        { labelKey: 'nav.why', path: '/#why' },
        { labelKey: 'nav.faq', path: '/#faq' },
        { labelKey: 'nav.contact', path: '/#contact' },
    ],
    footerNav: [
        { labelKey: 'nav.home', path: '/' },
        { labelKey: 'nav.services', path: '/#services' },
        { labelKey: 'nav.injectors', path: '/#injectors' },
        { labelKey: 'nav.contact', path: '/#contact' },
    ],
    legalNav: [
        { labelKey: 'footer.privacy', path: '/privacy' },
        { labelKey: 'footer.terms', path: '/terms' },
    ],
}

/**
 * Hard business facts — deliberately NOT in content.ts, because a phone
 * number and a street address are the same string in every locale, and
 * because they feed machine-readable output (tel:/mailto: hrefs and the
 * LocalBusiness JSON-LD in the landing page) as well as visible copy.
 * The LABELS next to these values live in content.ts (`home.contact.*`).
 *
 * ⚠ Everything below is placeholder data — replace before deploy.
 */
export interface BusinessInfo {
    /** Display + legal name (also used as the JSON-LD `name`). */
    name: string
    /** E.164, no spaces — this is what goes into `tel:`. */
    phone: string
    /** Human-formatted phone for display. */
    phoneDisplay: string
    email: string
    street: string
    postalCode: string
    city: string
    /** ISO 3166-1 alpha-2. */
    country: string
    /** schema.org `openingHours` syntax — machine-readable form of
        `home.contact.hoursValue`, which is the human one. Keep in sync. */
    openingHours: string[]
    /** JSON-LD `areaServed` — the city/region people actually drive in
        from. This is a walk-in workshop with no courier service, so a
        country-wide value here would tell Google something the business
        does not offer. */
    areaServed: string
}

export const business: BusinessInfo = {
    name: 'RAF Turbo DPF',
    phone: '+48000000000',
    phoneDisplay: '+48 000 000 000',
    email: 'kontakt@example.com',
    street: 'ul. Przykładowa 1',
    postalCode: '00-000',
    city: 'Warszawa',
    country: 'PL',
    openingHours: ['Mo-Fr 08:00-17:00', 'Sa 09:00-13:00'],
    areaServed: 'Warszawa',
}
