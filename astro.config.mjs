import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
    output: 'server',
    adapter: node({ mode: 'standalone' }),
    site: process.env.SITE_URL || 'http://localhost:4321',
    /* Inline stylesheets directly into the HTML — removes render-blocking
       CSS requests on initial paint. Our bundle is small enough that
       inlining wins vs external request + caching tradeoff. */
    build: {
        inlineStylesheets: 'always',
    },
    integrations: [
        sitemap({
            i18n: { defaultLocale: 'pl', locales: { pl: 'pl', en: 'en' } },
            /* Strip trailing slashes so sitemap URLs match the canonicals
               emitted by canonicalUrl() (src/lib/i18n.ts). Without this the
               sitemap advertises `/features/` while <link rel=canonical>
               points at `/features` — conflicting signals for crawlers.
               The bare origin keeps its root slash. */
            serialize(item) {
                const strip = (href) => {
                    const url = new URL(href)
                    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '')
                    return url.href
                }
                item.url = strip(item.url)
                if (item.links) item.links = item.links.map((l) => ({ ...l, url: strip(l.url) }))
                return item
            },
        }),
    ],
    i18n: {
        locales: ['pl', 'en'],
        defaultLocale: 'pl',
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: false,
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
})