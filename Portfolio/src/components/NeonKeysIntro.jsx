import { useEffect, useRef } from 'react'
import '../styles/NeonKeysIntro.css'

const FRAME_COUNT = 158
const PREFIX = 'ezgif-frame-'
const PAD = 3
const EXT = 'jpg'
const INITIAL_FRAME_COUNT = 24
// Scroll progress at which the sequence reaches its last frame; the rest is a hold.
const SEQUENCE_END = 0.92
// Share of the viewport the scroll frames fill (1 = touch the nearest edge).
const FRAME_ZOOM = 0.66
const FRAME_ZOOM_MOBILE = 1
// Scrolling less than this keeps the start frame on screen.
const START_HOLD = 0.004

// Index 0 is the resting frame shown when the loader ends, before any scrolling.
const START_FRAME_URL = '/start-frame-loader-logo.png'
const getFrameUrl = (i) => (i === 0
  ? START_FRAME_URL
  : `/after-loader/${PREFIX}${String(i).padStart(PAD, '0')}.${EXT}`)
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function NeonKeysIntro() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!container || !canvas || !context) return undefined

    const probe = document.createElement('canvas')
    probe.width = 1
    probe.height = 1
    const probeContext = probe.getContext('2d', { willReadFrequently: true })

    const entries = new Array(FRAME_COUNT + 1)
    let isDisposed = false
    let drawFrame = 0
    let scrollFrame = 0
    let lastDrawn = -1
    let currentIndex = 0
    let hasWarned = false

    const loadImage = (index) => {
      if (entries[index]) return entries[index].promise
      const image = new Image()
      const entry = { image, background: '#000', promise: null }
      entry.promise = new Promise((resolve) => {
        image.onload = () => {
          // Frames run from a black to a white backdrop; remember each frame's
          // corner colour so letterboxing blends in with it.
          try {
            probeContext.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 1)
            const [r, g, b] = probeContext.getImageData(0, 0, 1, 1).data
            entry.background = `rgb(${r}, ${g}, ${b})`
          } catch {
            // keep the default
          }
          resolve(image)
        }
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

      const { image, background } = entry
      context.setTransform(scale, 0, 0, scale, 0, 0)
      context.fillStyle = background
      context.fillRect(0, 0, bounds.width, bounds.height)

      // The start frame fills the screen. Scroll frames are small (768px), so they are
      // fitted whole and shrunk a little: less upscaling keeps them sharp and the laptop
      // stays centred with room around it.
      const isStartFrame = currentIndex === 0 || entry === entries[0]
      const containScale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      const coverScale = Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      const zoom = bounds.width < 768 ? FRAME_ZOOM_MOBILE : FRAME_ZOOM
      const fitScale = isStartFrame ? coverScale : containScale * zoom
      const drawWidth = image.naturalWidth * fitScale
      const drawHeight = image.naturalHeight * fitScale
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, (bounds.width - drawWidth) / 2, (bounds.height - drawHeight) / 2, drawWidth, drawHeight)
      lastDrawn = currentIndex
    }

    const scheduleDraw = (force = false) => {
      if (!force && currentIndex === lastDrawn) return
      if (!drawFrame) drawFrame = window.requestAnimationFrame(render)
    }

    const updateProgress = () => {
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const scrollDistance = Math.max(container.offsetHeight - window.innerHeight, 1)
      const progress = clamp((window.scrollY - containerTop) / scrollDistance)
      const next = progress < START_HOLD
        ? 0
        : 1 + Math.round(clamp(progress / SEQUENCE_END) * (FRAME_COUNT - 1))
      if (next !== currentIndex) {
        currentIndex = next
        scheduleDraw()
      }
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
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (drawFrame) window.cancelAnimationFrame(drawFrame)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  return (
    <section
      id="intro"
      ref={containerRef}
      className="neon-keys-intro"
      aria-label="Samuel Bannor Annor introduction"
    >
      <div className="neon-keys-intro__sticky">
        <canvas ref={canvasRef} className="neon-keys-intro__canvas" role="img" aria-label="Animated Elphast logo laptop" />
      </div>
    </section>
  )
}

export default NeonKeysIntro
