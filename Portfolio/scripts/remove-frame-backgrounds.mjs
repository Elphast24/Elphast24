// Makes the white backdrop around the laptop transparent in every scroll frame.
//
//   node scripts/remove-frame-backgrounds.mjs
//
// Reads public/after-loader/*.jpg and writes public/after-loader-alpha/*.webp (needs ffmpeg
// on the PATH). Only white connected to the image border is removed, so the white logo glow
// on the laptop screen is untouched. Frames with no white at the corner (the all-black
// close-up) are written unchanged. Re-run it if the source frames change.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SOURCE = 'public/after-loader'
const OUTPUT = 'public/after-loader-alpha'
const WEBP_QUALITY = '92'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const probe = (file) => {
  const out = execFileSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file,
  ]).toString().trim()
  const [width, height] = out.split(',').map(Number)
  return { width, height }
}

const decode = (file) => execFileSync('ffmpeg', [
  '-v', 'error', '-i', file, '-f', 'rawvideo', '-pix_fmt', 'rgba', '-',
], { maxBuffer: 1 << 28 })

const encode = (data, width, height, file) => {
  execFileSync('ffmpeg', [
    '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${width}x${height}`, '-i', '-',
    '-c:v', 'libwebp', '-lossless', '0', '-q:v', WEBP_QUALITY, '-compression_level', '6', file,
  ], { input: data, maxBuffer: 1 << 28 })
}

// Returns the number of pixels made transparent.
function keyOutBackdrop(data, width, height) {
  const isBackdrop = (offset) => {
    const red = data[offset]
    const green = data[offset + 1]
    const blue = data[offset + 2]
    return Math.min(red, green, blue) >= 214 && Math.max(red, green, blue) - Math.min(red, green, blue) <= 30
  }
  if (!isBackdrop(0)) return 0

  const visited = new Uint8Array(width * height)
  const queue = new Int32Array(width * height)
  let head = 0
  let tail = 0
  const push = (x, y) => {
    const index = y * width + x
    if (visited[index] || !isBackdrop(index * 4)) return
    visited[index] = 1
    queue[tail] = index
    tail += 1
  }
  for (let x = 0; x < width; x += 1) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y)
    push(width - 1, y)
  }
  while (head < tail) {
    const index = queue[head]
    head += 1
    const x = index % width
    const y = (index - x) / width
    if (x > 0) push(x - 1, y)
    if (x < width - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < height - 1) push(x, y + 1)
  }

  for (let index = 0; index < visited.length; index += 1) {
    const offset = index * 4
    if (visited[index]) {
      data[offset + 3] = 0
      continue
    }
    // Anti-aliased edge: fade the light pixels touching the removed area so no pale outline is left.
    const x = index % width
    const y = (index - x) / width
    const touches = (x > 0 && visited[index - 1])
      || (x < width - 1 && visited[index + 1])
      || (y > 0 && visited[index - width])
      || (y < height - 1 && visited[index + width])
    if (!touches) continue
    const brightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 3
    const alpha = clamp((195 - brightness) / 85)
    if (alpha >= 1) continue
    if (alpha <= 0) {
      data[offset + 3] = 0
      continue
    }
    data[offset] = clamp((data[offset] - 255 * (1 - alpha)) / alpha, 0, 255)
    data[offset + 1] = clamp((data[offset + 1] - 255 * (1 - alpha)) / alpha, 0, 255)
    data[offset + 2] = clamp((data[offset + 2] - 255 * (1 - alpha)) / alpha, 0, 255)
    data[offset + 3] = Math.round(255 * alpha)
  }
  return tail
}

const files = readdirSync(SOURCE).filter((name) => name.endsWith('.jpg')).sort()
if (!files.length) throw new Error(`No .jpg frames in ${SOURCE}`)
mkdirSync(OUTPUT, { recursive: true })
const { width, height } = probe(join(SOURCE, files[0]))

let keyed = 0
files.forEach((name, position) => {
  const data = Buffer.from(decode(join(SOURCE, name)))
  if (data.length !== width * height * 4) throw new Error(`${name}: unexpected size`)
  const removed = keyOutBackdrop(data, width, height)
  if (removed) keyed += 1
  encode(data, width, height, join(OUTPUT, name.replace(/\.jpg$/, '.webp')))
  if ((position + 1) % 20 === 0 || position === files.length - 1) {
    console.log(`${position + 1}/${files.length} frames`)
  }
})
console.log(`Done: ${keyed} frames had their backdrop removed, ${files.length - keyed} kept as they were.`)
