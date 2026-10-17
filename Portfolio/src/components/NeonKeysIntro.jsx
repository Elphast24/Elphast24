import { useEffect, useRef, useState } from 'react'
import LaptopCopy from './LaptopCopy'
import HeroExtras from './HeroExtras'
import ProgressTracker from './ProgressTracker'
import { COPY_PAIRS } from './laptopCopyPairs'
import '../styles/NeonKeysIntro.css'

const FRAME_COUNT = 158
const PREFIX = 'ezgif-frame-'
const PAD = 3
const EXT = 'webp'
// Frame 001 is not in the source folder; reuse the next one.
const FRAME_ALIASES = { 1: 2 }
const INITIAL_FRAME_COUNT = 24
// Scroll progress at which the sequence reaches its last frame; the rest is a hold.
const SEQUENCE_END = 0.92
// Share of the viewport the scroll frames fill (1 = touch the nearest edge).
// The opening frames are a close-up of the logo, so they start smaller and ease up to
// the laptop size by ZOOM_EASE_END.
const FRAME_ZOOM_START = 0.4
const FRAME_ZOOM = 0.56
const FRAME_ZOOM_START_MOBILE = 0.7
const FRAME_ZOOM_MOBILE = 0.95
// Scrolling less than this keeps the start frame on screen.
const START_HOLD = 0.004
const ZOOM_EASE_END = 70
// The camera pulls back from an all-black screen. Over these frames the black becomes a
// circle that shrinks towards the laptop's centre and vanishes behind it, so the white
// page closes in from the outside.
const IRIS_START = 50
const IRIS_END = 76
// The side text starts once the circle is gone and the laptop body is settled, then
// one pair per equal slice of the remaining frames.
const COPY_SHOW_FRAME = 78
const getCopyStage = (frame) => (frame < COPY_SHOW_FRAME
  ? -1
  : Math.min(COPY_PAIRS.length - 1, Math.floor(((frame - COPY_SHOW_FRAME) / (FRAME_COUNT - COPY_SHOW_FRAME + 1)) * COPY_PAIRS.length)))

// Index 0 is the resting frame shown when the loader ends, before any scrolling.
const START_FRAME_URL = '/start-frame-loader-logo.png'
const getFrameUrl = (i) => (i === 0
  ? START_FRAME_URL
  : `/after-loader-alpha/${PREFIX}${String(FRAME_ALIASES[i] ?? i).padStart(PAD, '0')}.${EXT}`)
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2)
// 1 while the black still covers the whole viewport, falling to 0 as the circle vanishes.
const getIrisAmount = (frame) => 1 - easeInOutCubic(clamp((frame - IRIS_START) / (IRIS_END - IRIS_START)))

function NeonKeysIntro() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const [copyStage, setCopyStage] = useState(-1)

  useEffect(() => {
    const container = containerRef.current
    const sticky = stickyRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!container || !canvas || !context) return undefined

    const entries = new Array(FRAME_COUNT + 1)
    let isDisposed = false
    let drawFrame = 0
    let scrollFrame = 0
    let lastDrawn = -1
    let lastDrawnFloat = -1
    let currentIndex = 0
    let currentFloat = 0
    let hasWarned = false

    const loadImage = (index) => {
      if (entries[index]) return entries[index].promise
      const image = new Image()
      const entry = { image, promise: null }
      entry.promise = new Promise((resolve) => {
        image.onload = () => resolve(image)
        image.onerror = () => {
          if (!hasWarned) {
            console.warn(`NeonKeysIntro: failed to load ${getFrameUrl(index)}; reusing the previous frame when available.`)
            hasWarned = true
          }
          resolve(null)
        }
      })
      image.src = getFrameUrl(index)
      entries[index] = entry
      return entry.promise
    }

    const findDrawable = (index) => {
      for (let i = index; i >= 0; i -= 1) {
        const image = entries[i]?.image
        if (image?.complete && image.naturalWidth) return entries[i]
      }
      return null
    }

    const render = () => {
      drawFrame = 0
      if (isDisposed) return
      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return

      const entry = findDrawable(currentIndex)
      if (!entry) return

      const pixelRatio = window.devicePixelRatio || 1
      const scale = Math.min(pixelRatio, window.innerWidth < 768 ? 1.5 : 2)
      const pixelWidth = Math.round(bounds.width * scale)
      const pixelHeight = Math.round(bounds.height * scale)
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth
        canvas.height = pixelHeight
      }

      const { image } = entry
      context.setTransform(scale, 0, 0, scale, 0, 0)
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, bounds.width, bounds.height)

      // The start frame fills the screen. Scroll frames are small (768px), so they are
      // fitted whole and shrunk: less upscaling keeps them sharp and the laptop stays
      // centred with room around it.
      const isStartFrame = currentIndex === 0 || entry === entries[0]
      const containScale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      const coverScale = Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      const isMobile = bounds.width < 768
      const zoomStart = isMobile ? FRAME_ZOOM_START_MOBILE : FRAME_ZOOM_START
      const zoomEnd = isMobile ? FRAME_ZOOM_MOBILE : FRAME_ZOOM
      const zoomEase = clamp((currentIndex - 1) / (ZOOM_EASE_END - 1))
      const zoom = zoomStart + (zoomEnd - zoomStart) * zoomEase * zoomEase * (3 - 2 * zoomEase)
      const fitScale = isStartFrame ? coverScale : containScale * zoom
      const drawWidth = image.naturalWidth * fitScale
      const drawHeight = image.naturalHeight * fitScale
      const drawX = (bounds.width - drawWidth) / 2
      const drawY = (bounds.height - drawHeight) / 2
      context.imageSmoothingQuality = 'high'

      // The black: a circle around the laptop's centre. It covers the viewport at first, then
      // shrinks until it disappears behind the laptop.
      if (!isStartFrame) {
        const centerX = bounds.width / 2
        const centerY = drawY + drawHeight * 0.52
        const cover = Math.hypot(Math.max(centerX, bounds.width - centerX), Math.max(centerY, bounds.height - centerY)) + 2
        const radius = cover * getIrisAmount(currentFloat)
        if (radius > 0.5) {
          context.fillStyle = '#000000'
          context.beginPath()
          context.arc(centerX, centerY, radius, 0, Math.PI * 2)
          context.fill()
        }
      }

      // Frames have a transparent backdrop, so the white page and the black circle show through.
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight)
      lastDrawn = currentIndex
      lastDrawnFloat = currentFloat
    }

    const scheduleDraw = (force = false) => {
      // Between whole frames only the circle's radius changes, and only during the transition.
      const inIris = currentFloat > IRIS_START - 1 && currentFloat < IRIS_END + 1
      if (!force && currentIndex === lastDrawn && (!inIris || Math.abs(currentFloat - lastDrawnFloat) < 0.02)) return
      if (!drawFrame) drawFrame = window.requestAnimationFrame(render)
    }

    const updateProgress = () => {
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const scrollDistance = Math.max(container.offsetHeight - window.innerHeight, 1)
      const progress = clamp((window.scrollY - containerTop) / scrollDistance)
      currentFloat = progress < START_HOLD ? 0 : 1 + clamp(progress / SEQUENCE_END) * (FRAME_COUNT - 1)
      const next = Math.round(currentFloat)
      if (next !== currentIndex) {
        currentIndex = next
        setCopyStage(getCopyStage(next))
      }
      // The tracker's line fills as the stages advance, reaching each numeral as its stage starts.
      const stageProgress = clamp((currentFloat - COPY_SHOW_FRAME) / (FRAME_COUNT - COPY_SHOW_FRAME))
      sticky?.style.setProperty('--tracker-p', clamp(stageProgress * COPY_PAIRS.length / (COPY_PAIRS.length - 1)).toFixed(4))
      // The circle's radius follows the scroll smoothly, between whole frames.
      scheduleDraw()
      setBackdropTone(currentFloat, container.getBoundingClientRect().bottom)
    }

    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0
        updateProgress()
      })
    }
    const onResize = () => {
      updateProgress()
      scheduleDraw(true)
    }

    // The navbar reads this to switch its glass between a dark and a light backdrop.
    const root = document.documentElement
    const setBackdropTone = (frame, sectionBottom) => {
      // Dark while the black circle still reaches the spot where the dock sits.
      const width = window.innerWidth
      const height = window.innerHeight
      const dockX = width <= 640 ? width / 2 : width - 150
      const dockY = width <= 640 ? height - 48 : 40
      const reach = Math.hypot(dockX - width / 2, dockY - height / 2)
      const cover = Math.hypot(width / 2, height / 2)
      const circleIsBehindDock = frame === 0 || cover * getIrisAmount(frame) > reach
      const tone = sectionBottom > 90 && circleIsBehindDock ? 'dark' : 'light'
      if (root.dataset.backdrop !== tone) root.dataset.backdrop = tone
    }
    root.dataset.backdrop = 'dark'

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const redrawIfCurrent = (index) => {
      if (!isDisposed && index <= currentIndex) scheduleDraw(true)
    }

    // First frames immediately, the rest in the background.
    Promise.all(
      Array.from({ length: INITIAL_FRAME_COUNT + 1 }, (_, i) => loadImage(i)),
    ).then(() => {
      if (isDisposed) return
      updateProgress()
      scheduleDraw(true)
      for (let index = INITIAL_FRAME_COUNT + 1; index <= FRAME_COUNT; index += 1) {
        loadImage(index).then(() => redrawIfCurrent(index))
      }
    })

    return () => {
      isDisposed = true
      delete root.dataset.backdrop
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (drawFrame) window.cancelAnimationFrame(drawFrame)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="neon-keys-intro"
      aria-label="Samuel Bannor Annor introduction"
    >
      <div ref={stickyRef} className="neon-keys-intro__sticky">
        <canvas ref={canvasRef} className="neon-keys-intro__canvas" role="img" aria-label="Animated Elphast logo laptop" />
        <ProgressTracker stage={copyStage} />
        <LaptopCopy stage={copyStage} />
        <HeroExtras stage={copyStage} />
      </div>
    </section>
  )
}

export default NeonKeysIntro
