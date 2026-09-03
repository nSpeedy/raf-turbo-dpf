import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'

/* Renders public/favicon.svg into a multi-resolution favicon.ico
   (16/32/48 px PNGs in an ICO container). Run after editing the SVG:

       npm i -D sharp && node scripts/gen-favicon.mjs

   sharp is intentionally NOT a project dependency — this is a one-off
   asset task, not part of the build, and the starter ships with zero
   devDependencies.                                                      */

const SVG_PATH = 'public/favicon.svg'
const ICO_PATH = 'public/favicon.ico'
const SIZES = [16, 32, 48]

const svg = await readFile(SVG_PATH)
const pngs = await Promise.all(
    SIZES.map((s) => sharp(svg).resize(s, s).png().toBuffer())
)

/* ICO container: 6-byte header, then one 16-byte directory entry per
   image, then the PNG payloads back to back. */
const HEADER = 6
const ENTRY = 16
const dataStart = HEADER + SIZES.length * ENTRY
const total = dataStart + pngs.reduce((a, p) => a + p.length, 0)
const buf = Buffer.alloc(total)

buf.writeUInt16LE(0, 0)                 // reserved
buf.writeUInt16LE(1, 2)                 // type: 1 = icon
buf.writeUInt16LE(SIZES.length, 4)      // image count

let entryAt = HEADER
let imageAt = dataStart
for (let i = 0; i < SIZES.length; i++) {
    const size = SIZES[i]
    const png = pngs[i]
    // 256 is encoded as 0 in a single byte — the format's max dimension.
    buf.writeUInt8(size === 256 ? 0 : size, entryAt)
    buf.writeUInt8(size === 256 ? 0 : size, entryAt + 1)
    buf.writeUInt8(0, entryAt + 2)      // palette colours (0 = truecolor)
    buf.writeUInt8(0, entryAt + 3)      // reserved
    buf.writeUInt16LE(1, entryAt + 4)   // colour planes
    buf.writeUInt16LE(32, entryAt + 6)  // bits per pixel
    buf.writeUInt32LE(png.length, entryAt + 8)
    buf.writeUInt32LE(imageAt, entryAt + 12)
    entryAt += ENTRY
    imageAt += png.length
}

let writeAt = dataStart
for (const png of pngs) {
    png.copy(buf, writeAt)
    writeAt += png.length
}

await writeFile(ICO_PATH, buf)
console.log(`Wrote ${ICO_PATH} (${buf.length} bytes, ${SIZES.join('/')})`)
