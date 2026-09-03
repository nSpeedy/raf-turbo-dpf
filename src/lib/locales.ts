export const SITE_URL = import.meta.env.SITE ?? 'http://localhost:4321'

export const locales = ['pl', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'pl'

/* Last-update date for the legal pages (privacy / terms). ISO format —
   formatted per-locale at render time via Intl.DateTimeFormat, so the date
   lives in ONE place instead of being hardcoded in each page and locale.
   Bump it whenever the legal copy in content.ts changes. */
export const LEGAL_LAST_UPDATED = '2026-04-09'

export const localeLabels: Record<Locale, string> = {
    pl: 'Polski',
    en: 'English',
}

export const localeFlags: Record<Locale, string> = {
    pl: '🇵🇱',
    en: '🇬🇧',
}

export const ogLocale: Record<Locale, string> = {
    pl: 'pl_PL',
    en: 'en_US',
}
