/**
 * Workshop band photo.
 *
 *   npm i -D sharp && node scripts/gen-band.mjs
 *
 * `scripts/hero-source.jpg` (1800×2700, portrait) → `public/images/photo-workshop.webp`
 * (1440×720, 2:1). The band is rendered full container width with
 * `object-fit: cover` at 16:10 on a phone and ~3:1 on desktop, so the
 * subject has to sit in the middle of the frame with room above and
 * below — a 2:1 source gives `cover` something to trim on both axes.
 *
 * CROP is deliberate:
 * - `left: 120, width: 1440` ends at x=1560, which keeps the third-party
 *   brand printed on the intercooler hose at the right edge out of the shot
 *   (same window as gen-hero.mjs).
 * - `top: 1100` centres the 720px-tall window on the compressor wheel
 *   (≈ y 1460 in the source).
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'

const SOURCE = 'scripts/hero-source.jpg'
const OUT = 'public/images/photo-workshop.webp'
const CROP = { left: 120, top: 1100, width: 1440, height: 720 }

const meta = await sharp(SOURCE).metadata()
if (CROP.left + CROP.width > meta.width || CROP.top + CROP.height > meta.height) {
    throw new Error(`Crop window ${JSON.stringify(CROP)} does not fit inside ${meta.width}×${meta.height}.`)
}

await sharp(SOURCE).extract(CROP).resize(1440, 720).webp({ quality: 74 }).toFile(OUT)
console.log(`${OUT} 1440x720 ${(statSync(OUT).size / 1024).toFixed(0)} KB`)
