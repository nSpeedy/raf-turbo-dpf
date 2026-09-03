import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

/* Renders scripts/og-default.html into public/og-default.jpg — the default
   Open Graph card BaseLayout puts on every page. Run after re-branding:

       npm i -D sharp && node scripts/gen-og.mjs

   Headless Chrome paints the card, sharp encodes the JPEG. Neither is a
   project dependency (same deal as gen-favicon.mjs — one-off asset tooling,
   not part of the build). Point at another browser with:

       CHROME=/path/to/chrome node scripts/gen-og.mjs

   Why headless Chrome and not an image library: the card is a normal HTML
   document using the project's own fonts and palette, so editing the design
   means editing CSS — no canvas drawing code to keep in sync.             */

const CHROME = process.env.CHROME
    ?? [
        /* Linux / CI */
        '/opt/pw-browsers/chromium',
        '/usr/bin/chromium',
        '/usr/bin/google-chrome',
        /* Windows — the project's dev machines. Edge last: it is Chromium
           too and renders this card identically, so it is a fine fallback
           when Chrome is not installed. */
        /* Forward slashes on purpose: Node accepts them on Windows, and
           they keep this list free of doubled backslashes. */
        'C:/Program Files/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        /* macOS */
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ].find((p) => existsSync(p))

if (!CHROME) throw new Error('Chrome/Chromium not found — set CHROME=/path/to/binary')

const SRC = resolve('scripts/og-default.html')
const OUT = resolve('public/og-default.jpg')
const WIDTH = 1200
const HEIGHT = 630

const tmp = mkdtempSync(join(tmpdir(), 'raf-turbo-dpf-og-'))
const png = join(tmp, 'og.png')

try {
    execFileSync(CHROME, [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        `--window-size=${WIDTH},${HEIGHT}`,
        `--screenshot=${png}`,
        `file://${SRC}`,
    ], { stdio: 'ignore' })

    // Quality 88 — visually lossless for flat vector-ish art at this size,
    // and keeps the card well under the ~300 KB some scrapers refuse to
    // fetch. mozjpeg squeezes another ~15% out at identical quality.
    await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(OUT)

    console.log(`Wrote ${OUT} (${WIDTH}x${HEIGHT})`)
} finally {
    rmSync(tmp, { recursive: true, force: true })
}
