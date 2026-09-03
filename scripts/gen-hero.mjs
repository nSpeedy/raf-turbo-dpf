/**
 * Hero photo processor.
 *
 *   npm i -D sharp && node scripts/gen-hero.mjs <source.jpg>
 *
 * Takes a full-size stock photo and produces `public/images/hero-turbo.webp`
 * at the size and crop the hero actually renders.
 *
 * Why a square crop: the hero uses the SAME file at two very different
 * aspect ratios — a portrait-ish column (~0.89) on desktop and a wide
 * banner (~1.5) on mobile. `object-fit: cover` crops whichever axis is
 * surplus, so a square source is the only shape that keeps the subject
 * in frame in both. Shipping the original 1800×2700 would send pixels
 * that are never painted at either breakpoint.
 *
 * CROP is deliberate, not incidental — see the constant below.
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'

const SOURCE = process.argv[2] ?? 'scripts/hero-source.jpg'
const OUT = 'public/images/hero-turbo.webp'

/* Crop window into the 1800×2700 source.
   - `left: 120, width: 1440` stops at x=1560, which cuts the third-party
     brand name that sits along the right edge of the frame out of the
     shot. A supplier's logo has no business on a workshop's own hero.
   - `top: 691` centres the window on the compressor wheel rather than on
     the frame, so the subject survives both crops described above. */
const CROP = { left: 120, top: 691, width: 1440, height: 1440 }

/* The desktop column renders ~573×647 CSS px; at 2× DPR `cover` needs
   ~1294px on the long edge. 1400 gives that with a little headroom and
   still lands well under the original file size. */
const SIZE = 1400

const meta = await sharp(SOURCE).metadata()
if (CROP.left + CROP.width > meta.width || CROP.top + CROP.height > meta.height) {
    throw new Error(
        `Crop window ${JSON.stringify(CROP)} does not fit inside ${meta.width}×${meta.height}. ` +
        `Re-tune CROP for this source before running.`
    )
}

await sharp(SOURCE)
    .extract(CROP)
    .resize(SIZE, SIZE, { fit: 'cover' })
    .webp({ quality: 78 })
    .toFile(OUT)

const before = statSync(SOURCE).size
const after = statSync(OUT).size
const pct = Math.round((1 - after / before) * 100)
console.log(
    `${SOURCE} ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)} KB\n` +
    `${OUT} ${SIZE}x${SIZE} ${(after / 1024).toFixed(0)} KB  (-${pct}%)`
)
