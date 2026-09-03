import { locales, defaultLocale, SITE_URL } from '@/lib/locales'
import type { Locale } from '@/lib/locales'
import { getAbsoluteLocaleUrl } from 'astro:i18n'
export { useTranslations } from '@/lib/content'
export { locales, defaultLocale, ogLocale } from '@/lib/locales'
export type { Locale } from '@/lib/locales'

/**
 * Strip any leading locale prefix from a pathname so getAbsoluteLocaleUrl
 * doesn't double-prefix (e.g. /en/about → /about, / → /).
 */
function stripLocalePrefix(pathname: string): string {
    for (const locale of locales) {
        const prefix = `/${locale}`
        if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
            return pathname.slice(prefix.length) || '/'
        }
    }
    return pathname
}

/**
 * Prefix a locale-less path for the given locale (default locale stays
 * bare). Accepts already-prefixed paths too — the prefix is stripped
 * first, so this is safe to call on Astro.url.pathname. Single source
 * for the logic previously duplicated in Navbar and LanguageSwitcher.
 *
 * A '#fragment' is split off before prefixing and re-attached after, so
 * the one-page anchors in site.config.ts ('/#contact') localize to
 * '/en#contact' rather than '/en/#contact' — the latter reintroduces the
 * trailing slash that canonicalUrl() and the sitemap deliberately strip.
 */
export function localizePath(locale: Locale, path: string): string {
    const hashAt = path.indexOf('#')
    const hash = hashAt === -1 ? '' : path.slice(hashAt)
    const rawPath = hashAt === -1 ? path : path.slice(0, hashAt)

    const bare = stripLocalePrefix(rawPath.replace(/\/+$/, '') || '/')
    if (locale === defaultLocale) return bare + hash
    return (bare === '/' ? `/${locale}` : `/${locale}${bare}`) + hash
}

export function hreflangTags(pathname: string) {
    const path = stripLocalePrefix(pathname)
    return [
        ...locales.map((locale) => ({
            hreflang: locale,
            href: getAbsoluteLocaleUrl(locale, path),
        })),
        { hreflang: 'x-default', href: getAbsoluteLocaleUrl(defaultLocale, path) },
    ]
}

export function canonicalUrl(pathname: string): string {
    const clean = pathname.endsWith('/') && pathname !== '/'
        ? pathname.slice(0, -1)
        : pathname
    return `${SITE_URL}${clean}`
}