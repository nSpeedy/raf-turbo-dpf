/**
 * Background texture processor.
 *
 *   npm i -D sharp && node scripts/gen-textures.mjs
 *
 * Produces the two decorative layers the landing page paints behind
 * content: `public/images/texture-honeycomb.webp` (#process) and
 * `public/images/texture-filter.webp` (contact panel).
 *
 * These are BACKGROUNDS, not product shots. Both render at a single-digit
 * opacity under live text, so the crop matters far more than the pixel
 * count — detail that survives 7% opacity is detail nobody can see. That
 * is why the honeycomb output is 540px of a 1600px source and still looks
 * right stretched across a 1920px band.
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'

const OUT_DIR = 'public/images'

/* ── Honeycomb ──────────────────────────────────────────────────────────
   Source is a 1600×1200 top-down shot of a cleaned DAF filter face. Two
   things have to go:
     - the steel ring and weld spots around the monolith, which read as a
       recognisable object rather than a texture, and
     - `DPFDAF.co…`, a supplier's address embossed along the right edge at
       roughly x=1230. A supplier's branding has no business on a
       workshop's own page — the same reason gen-hero.mjs crops.
   The monolith disc is centred near (840, 600) with r≈390, and the window
   is a WIDE strip through its centre rather than the largest inscribed
   square. Two reasons, both about the strip the browser actually paints:
     - the FAQ band is roughly 1440×300, and object-fit: cover on a square
       throws away most of its height while magnifying what is left 3.4×.
       The honeycomb then reads as a chunky dot-screen wallpaper instead of
       a material. A 700×300 source is already the band's shape, so the
       scale factor drops to ~2× with no vertical waste.
     - a strip can be wider than an inscribed square and still clear the
       ring: 300px tall about the centre leaves a half-width of
       √(390² − 150²) ≈ 360, so x ∈ [480, 1200] is all honeycomb. The
       window stops at 1180 to keep margin between its right edge and the
       embossed text. */
const HONEYCOMB = {
    source: 'scripts/texture-honeycomb-source.jpg',
    out: `${OUT_DIR}/texture-honeycomb.webp`,
    crop: { left: 480, top: 450, width: 700, height: 300 },
    /* Shipped at native crop size — upscaling a 700px window to "sharpen"
       it would only invent pixels and weight. A dense high-frequency grid
       is the worst case a lossy codec can be handed (the untouched crop at
       q72 weighed 123 KB, more than the hero), so blur first: it removes
       exactly the detail that 9% opacity was going to destroy anyway and
       leaves the encoder far less to describe. */
    resize: null,
    blur: 0.8,
    quality: 38,
}

/* ── Dirty filter ───────────────────────────────────────────────────────
   700×700 shot of a clogged, corroded filter on dark concrete. It backs
   the dark contact panel, where its own dark surround is the point: the
   silhouette ghosts out of the panel instead of sitting on it as a pasted
   rectangle. Kept square — the panel crops it with object-fit. */
const FILTER = {
    source: 'scripts/texture-filter-source.jpg',
    out: `${OUT_DIR}/texture-filter.webp`,
    crop: null,
    resize: 640,
    blur: null,
    quality: 70,
}

for (const spec of [HONEYCOMB, FILTER]) {
    let pipeline = sharp(spec.source)
    if (spec.crop) pipeline = pipeline.extract(spec.crop)
    if (spec.resize) pipeline = pipeline.resize(spec.resize, spec.resize, { fit: 'cover' })
    if (spec.blur) pipeline = pipeline.blur(spec.blur)

    await pipeline.webp({ quality: spec.quality }).toFile(spec.out)

    const kb = (statSync(spec.out).size / 1024).toFixed(1)
    console.log(`${spec.out} — ${kb} KB`)
}
