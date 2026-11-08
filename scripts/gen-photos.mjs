/**
 * Content photo processor.
 *
 *   npm i -D sharp && node scripts/gen-photos.mjs
 *
 * Turns the workshop's studio shots into the cut-out parts the landing
 * page floats against its background, with a real alpha channel.
 *
 * Why alpha and not "it is white already". The first version of this
 * script only pulled the backdrop up to pure white and shipped an opaque
 * image. It drew a visible rectangle on the page, because the backdrops
 * are not flat: the turbo shot measures 249 in the corners but carries a
 * soft contact shadow that reaches 240 at the frame edge, and a 6-level
 * ramp against #ffffff is perfectly visible across a 400px box. Pulling
 * the white point harder only moves the problem — the shadow lifts with
 * everything else, and clipping hard enough to kill it bleaches the
 * aluminium.
 *
 * So the backdrop is removed instead:
 *
 *   1. `linear` lifts the measured backdrop to 255, which flattens the
 *      sensor noise so one threshold works for the whole frame.
 *   2. `trim` crops to the object's bounding box, so "half the image"
 *      in the markup means half a part, not half a margin.
 *   3. a 2px white border is added, then the alpha mask is flood-filled
 *      inward from it. Flood fill, not a global threshold: the parts
 *      have specular highlights brighter than the backdrop, and a
 *      global test punches holes straight through the chrome. Only
 *      background connected to the frame edge is removed. The border is
 *      what makes this safe where a part touches the edge of the crop —
 *      the fill starts outside it and stops at the first dark pixel.
 *   4. the mask is blurred by a pixel before it is joined, which is the
 *      whole anti-aliasing story; a binary mask gives stair-stepped
 *      edges on every diagonal, and these parts are all diagonals.
 *
 * The shadow goes with the backdrop. That is the intended trade: the
 * page places these as floating objects, and a cast shadow from someone
 * else's lighting setup would point a different way in each one.
 *
 * `whitePoint` must be measured from the actual file, not guessed —
 * read the four corners first. `threshold` is the luminance above which
 * a border-connected pixel counts as backdrop; raise it if a pale part
 * is being eaten, lower it if a grey fringe survives.
 *
 * Sources live in scripts/ rather than public/ — same reason as
 * hero-source.jpg: the originals are not meant to ship.
 */
import sharp from 'sharp'
import { statSync } from 'node:fs'

const OUT_DIR = 'public/images'

const PHOTOS = [
    {
        /* Cleaned particulate filter — bleeds off the left of the hero. */
        source: 'scripts/photo-dpf-clean-source.jpg',
        out: `${OUT_DIR}/photo-dpf-hero.webp`,
        whitePoint: 255,
        threshold: 244,
        size: 620,
        quality: 80,
    },
    {
        /* Turbocharger with its exhaust manifold — the hero's main
           image, opposite the filter. Corners measure 249. */
        source: 'scripts/photo-turbo-source.jpg',
        out: `${OUT_DIR}/photo-turbo-hero.webp`,
        whitePoint: 249,
        threshold: 240,
        size: 900,
        quality: 82,
    },
    {
        /* Injection pump — stands beside the #services heading. */
        source: 'scripts/photo-pump-source.jpg',
        out: `${OUT_DIR}/photo-pump.webp`,
        whitePoint: 255,
        threshold: 244,
        size: 560,
        quality: 80,
    },
    {
        /* Four injectors in a row — fills the empty left column of
           #why. Tall, which is why that column suits it. */
        source: 'scripts/photo-injectors-source.jpg',
        out: `${OUT_DIR}/photo-injectors.webp`,
        whitePoint: 255,
        threshold: 244,
        size: 560,
        quality: 80,
    },
]

/**
 * Build an 8-bit alpha mask: 0 for backdrop reachable from the frame
 * edge, 255 everywhere else. Iterative stack, not recursion — these are
 * ~900k-pixel images and a recursive fill blows the call stack.
 */
function backdropMask(rgb, width, height, channels, threshold) {
    const alpha = Buffer.alloc(width * height, 255)
    const seen = new Uint8Array(width * height)
    const stack = []

    const isBackdrop = (i) => {
        const p = i * channels
        return rgb[p] >= threshold && rgb[p + 1] >= threshold && rgb[p + 2] >= threshold
    }
    const push = (i) => {
        if (!seen[i] && isBackdrop(i)) {
            seen[i] = 1
            stack.push(i)
        }
    }

    for (let x = 0; x < width; x++) {
        push(x)
        push((height - 1) * width + x)
    }
    for (let y = 0; y < height; y++) {
        push(y * width)
        push(y * width + width - 1)
    }

    while (stack.length) {
        const i = stack.pop()
        alpha[i] = 0
        const x = i % width
        const y = (i - x) / width
        if (x > 0) push(i - 1)
        if (x < width - 1) push(i + 1)
        if (y > 0) push(i - width)
        if (y < height - 1) push(i + width)
    }

    return alpha
}

for (const spec of PHOTOS) {
    let pipeline = sharp(spec.source)
    if (spec.whitePoint < 255) {
        pipeline = pipeline.linear(255 / spec.whitePoint, 0)
    }

    const flat = await pipeline
        .trim({ threshold: 12 })
        .extend({ top: 2, bottom: 2, left: 2, right: 2, background: '#ffffff' })
        .resize(spec.size, spec.size, { fit: 'inside', withoutEnlargement: true })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

    const { width, height, channels } = flat.info
    const mask = backdropMask(flat.data, width, height, channels, spec.threshold)

    const softMask = await sharp(mask, { raw: { width, height, channels: 1 } })
        .blur(1)
        /* Both of these are load-bearing. `blur` on a one-channel raw
           buffer hands back THREE channels — sharp promotes greyscale
           to sRGB on the way out — so without `toColourspace('b-w')`
           the mask is 3× too long, joinChannel reads it at the wrong
           stride, and the alpha comes out as horizontal stripes. `raw`
           stops sharp picking an encoded format for a raw input, which
           breaks the stride the same way. */
        .toColourspace('b-w')
        .raw()
        .toBuffer()

    await sharp(flat.data, { raw: { width, height, channels } })
        .joinChannel(softMask, { raw: { width, height, channels: 1 } })
        .webp({ quality: spec.quality, alphaQuality: 90 })
        .toFile(spec.out)

    const kb = (statSync(spec.out).size / 1024).toFixed(1)
    console.log(`${spec.out} — ${width}×${height}, ${kb} KB`)
}
