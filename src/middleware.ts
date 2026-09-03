import { defineMiddleware } from 'astro:middleware'
import { promisify } from 'node:util'
import { gzip, brotliCompress, constants } from 'node:zlib'

/**
 * HTTP compression middleware.
 *
 * Why a middleware (CLAUDE.md normally prohibits them):
 *   With `output: 'server'` + @astrojs/node, no layer in the chain compresses
 *   responses. Lighthouse audit `uses-text-compression` scores 0 and shaves
 *   ~5–8 Performance points. Compressing at the edge would be better but we
 *   can't assume a CDN in front. This middleware is the minimum-viable
 *   in-process fix — NO redirects, NO locale logic, NO crawler-sniffing.
 *   Just transforms an already-generated Response body when the client
 *   advertises a compatible Accept-Encoding.
 *
 * Why not static assets too:
 *   @astrojs/node's built-in static file server doesn't go through this
 *   middleware. It only covers SSR responses (HTML). That's fine — we use
 *   `build.inlineStylesheets: 'always'` so CSS is inlined in the HTML,
 *   fonts are woff2 (already compressed), favicons are tiny. The only
 *   thing worth compressing is HTML, and this covers it.
 */

const gzipAsync = promisify(gzip)
const brotliAsync = promisify(brotliCompress)

// Compress text-ish content types only. woff2/images/pdf already compressed.
const COMPRESSIBLE = /^(text\/|application\/(json|javascript|xml|rss|ld\+json|xhtml\+xml|manifest\+json)|image\/svg)/i

// Below this size the TCP/TLS overhead outweighs compression gains.
const MIN_SIZE = 1024

export const onRequest = defineMiddleware(async (context, next) => {
    /* Skip prerendered routes. A page that opts out of SSR with
       `export const prerender = true` is rendered at build time, where the
       response is written to disk verbatim (Astro discards any transform)
       and `request.headers` is a synthetic build-time stub Astro warns
       about reading. Compression of prerendered output is the hosting
       edge's job. Without this guard you get a warning per prerendered
       page plus a dead compression pass on every build. */
    if (context.isPrerendered) return next()

    const response = await next()

    // Already compressed, or opaque / streaming — leave it alone.
    if (response.headers.get('content-encoding')) return response
    if (!response.body) return response

    const contentType = response.headers.get('content-type') ?? ''
    if (!COMPRESSIBLE.test(contentType)) return response

    // Only compress if client signals support.
    const accept = context.request.headers.get('accept-encoding') ?? ''
    const useBr = /\bbr\b/.test(accept)
    const useGz = /\bgzip\b/.test(accept)
    if (!useBr && !useGz) return response

    // Buffer the body. For tiny responses, skip compression.
    const raw = Buffer.from(await response.arrayBuffer())
    if (raw.byteLength < MIN_SIZE) {
        return new Response(raw, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        })
    }

    const encoding = useBr ? 'br' : 'gzip'
    const compressed = useBr
        ? await brotliAsync(raw, {
              params: {
                  /* Quality 4 — SSR-friendly sweet spot.
                     vs quality 5: ~40% faster on 80kB HTML, ~3% worse ratio.
                     vs quality 11 (default): ~20× faster, ~8% worse ratio.
                     Matches what nginx/CDN edges use for dynamic content. */
                  [constants.BROTLI_PARAM_QUALITY]: 4,
                  [constants.BROTLI_PARAM_SIZE_HINT]: raw.byteLength,
              },
          })
        : await gzipAsync(raw, { level: 6 })

    const headers = new Headers(response.headers)
    headers.set('content-encoding', encoding)
    headers.set('content-length', String(compressed.byteLength))
    // Tell caches the response varies by Accept-Encoding.
    const vary = headers.get('vary')
    if (!vary) headers.set('vary', 'Accept-Encoding')
    else if (!/accept-encoding/i.test(vary)) headers.set('vary', `${vary}, Accept-Encoding`)
    // ETag (if any) was computed for the uncompressed body — invalidate.
    headers.delete('etag')

    return new Response(compressed, {
        status: response.status,
        statusText: response.statusText,
        headers,
    })
})
