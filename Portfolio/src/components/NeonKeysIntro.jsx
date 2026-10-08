import { useEffect, useRef, useState } from 'react'
import '../styles/NeonKeysIntro.css'

const FRAME_COUNT = 145
const PREFIX = 'ezgif-frame-'
const PAD = 3
const START = 1
const EXT = 'png'
const INITIAL_FRAME_COUNT = 20
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const getFrameUrl = (i) => `/laptop/${PREFIX}${String(i + START - 1).padStart(PAD, '0')}.${EXT}`
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function NeonKeysIntro() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [sequenceProgress, setSequenceProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [frameAspectRatio, setFrameAspectRatio] = useState(16 / 9)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { willReadFrequently: true })
    if (!container || !canvas || !context) return undefined

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const images = new Array(FRAME_COUNT + 1)
    let isReducedMotion = mediaQuery.matches
    let isDisposed = false
    let drawFrame = 0
    let scrollFrame = 0
    let lastFrameIndex = -1
    let currentFrameIndex = FRAME_COUNT
    let progressValue = 0
    let hasWarnedFrameLoad = false
    let sourceFrameWidth = 0
    let sourceFrameHeight = 0

    setReducedMotion(isReducedMotion)

    const loadImage = (index) => {
      if (images[index]) return images[index].promise

      const image = new Image()
      const entry = { image, promise: null }
      entry.promise = new Promise((resolve) => {
        image.onload = () => {
          if (!isDisposed && !sourceFrameWidth && image.naturalWidth && image.naturalHeight) {
            sourceFrameWidth = image.naturalWidth
            sourceFrameHeight = image.naturalHeight
            setFrameAspectRatio(image.naturalWidth / image.naturalHeight)
          }
          resolve(image)
        }
        image.onerror = () => {
          entry.failed = true
          if (!hasWarnedFrameLoad) {
            console.warn(`NeonKeysIntro: failed to load ${getFrameUrl(index)}; reusing the previous frame when available.`)
            hasWarnedFrameLoad = true
          }
          resolve(null)
        }
      })
      image.src = getFrameUrl(index)
      images[index] = entry
      return entry.promise
    }

    const removeWhiteMatte = () => {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = pixels.data
      for (let offset = 0; offset < data.length; offset += 4) {
        const red = data[offset]
        const green = data[offset + 1]
        const blue = data[offset + 2]
        const lightest = Math.max(red, green, blue)
        const darkest = Math.min(red, green, blue)
        if (lightest < 229 || lightest - darkest > 24) continue

        const brightness = (red + green + blue) / 3
        if (brightness >= 250) {
          data[offset + 3] = 0
          continue
        }

        const alpha = clamp((250 - brightness) / 21)
        if (alpha <= 0) {
          data[offset + 3] = 0
          continue
        }
        data[offset] = clamp((red - 255 * (1 - alpha)) / alpha, 0, 255)
        data[offset + 1] = clamp((green - 255 * (1 - alpha)) / alpha, 0, 255)
        data[offset + 2] = clamp((blue - 255 * (1 - alpha)) / alpha, 0, 255)
        data[offset + 3] = Math.round(255 * alpha)
      }
      context.putImageData(pixels, 0, 0)
    }

    const render = () => {
      drawFrame = 0
      if (isDisposed) return

      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return

      const pixelRatio = window.devicePixelRatio || 1
      const scale = Math.min(pixelRatio, window.innerWidth < 768 ? 1.5 : pixelRatio)
      const pixelWidth = Math.round(bounds.width * scale)
      const pixelHeight = Math.round(bounds.height * scale)
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth
        canvas.height = pixelHeight
      }
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.setTransform(scale, 0, 0, scale, 0, 0)

      let image = images[currentFrameIndex]?.image
      if (!image?.complete || !image.naturalWidth) {
        for (let fallbackIndex = currentFrameIndex - 1; fallbackIndex >= 1; fallbackIndex -= 1) {
          const previousImage = images[fallbackIndex]?.image
          if (previousImage?.complete && previousImage.naturalWidth) {
            image = previousImage
            break
          }
        }
      }
      if (!image?.complete || !image.naturalWidth) {
        lastFrameIndex = currentFrameIndex
        return
      }

      const fitScale = Math.min(bounds.width / sourceFrameWidth, bounds.height / sourceFrameHeight)
      const drawWidth = sourceFrameWidth * fitScale
      const drawHeight = sourceFrameHeight * fitScale
      context.drawImage(image, (bounds.width - drawWidth) / 2, (bounds.height - drawHeight) / 2, drawWidth, drawHeight)
      removeWhiteMatte()
      lastFrameIndex = currentFrameIndex
    }

    const scheduleDraw = (force = false) => {
      if (!force && currentFrameIndex === lastFrameIndex) return
      if (!drawFrame) drawFrame = window.requestAnimationFrame(render)
    }

    const updateProgress = () => {
      if (isReducedMotion) return
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const scrollDistance = Math.max(container.offsetHeight - window.innerHeight, 1)
      progressValue = clamp((window.scrollY - containerTop) / scrollDistance)
      setSequenceProgress(progressValue)

      const closeProgress = clamp((progressValue - 0.48) / 0.52)
      const nextFrameIndex = progressValue < 0.48
        ? FRAME_COUNT
        : Math.max(1, FRAME_COUNT - Math.round(closeProgress * (FRAME_COUNT - 1)))
      if (nextFrameIndex !== currentFrameIndex) {
        currentFrameIndex = nextFrameIndex
        scheduleDraw()
      }
    }

    const loadRemainingFrames = () => {
      for (let index = INITIAL_FRAME_COUNT + 1; index < FRAME_COUNT; index += 1) {
        loadImage(index).then(() => {
          if (!isDisposed && index === currentFrameIndex) scheduleDraw(true)
        })
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
    const onMotionChange = (event) => {
      isReducedMotion = event.matches
      setReducedMotion(isReducedMotion)
      if (isReducedMotion) {
        currentFrameIndex = FRAME_COUNT
        loadImage(FRAME_COUNT).then(() => {
          if (!isDisposed && isReducedMotion) scheduleDraw(true)
        })
      } else {
        updateProgress()
        for (let index = 1; index <= FRAME_COUNT; index += 1) {
          loadImage(index).then(() => {
            if (!isDisposed && index === currentFrameIndex) scheduleDraw(true)
          })
        }
      }
      scheduleDraw(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    mediaQuery.addEventListener?.('change', onMotionChange)

    const initialIndices = [
      ...Array.from({ length: INITIAL_FRAME_COUNT }, (_, index) => index + 1),
      FRAME_COUNT,
    ]
    if (isReducedMotion) initialIndices.splice(0, initialIndices.length, FRAME_COUNT)

    Promise.all(initialIndices.map((index) => loadImage(index))).then(() => {
      if (isDisposed) return
      setIsReady(true)
      scheduleDraw(true)
      if (!isReducedMotion) loadRemainingFrames()
      updateProgress()
    })

    return () => {
      isDisposed = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      mediaQuery.removeEventListener?.('change', onMotionChange)
      if (drawFrame) window.cancelAnimationFrame(drawFrame)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  const laptopEntry = reducedMotion ? 0 : clamp((sequenceProgress - 0.24) / 0.24)
  const moveProgress = laptopEntry
  const logoStyle = { opacity: 1 - laptopEntry }
  const laptopStyle = {
    aspectRatio: frameAspectRatio,
    opacity: laptopEntry,
    '--shift-x': `${moveProgress * 22}vw`,
    '--laptop-scale': 1.45 - moveProgress * 0.45,
  }

  return (
    <section
      id="intro"
      ref={containerRef}
      className={`neon-keys-intro${reducedMotion ? ' neon-keys-intro--reduced' : ''}${isReady ? ' neon-keys-intro--ready' : ''}`}
      aria-label="Samuel Bannor Annor introduction"
    >
      <div className="neon-keys-intro__sticky">
        <img className="neon-keys-intro__logo" src="/logo-white.png" alt="Samuel Bannor Annor logo" style={logoStyle} />
        <div className="neon-keys-intro__laptop" style={laptopStyle} aria-hidden="true">
          <canvas ref={canvasRef} className="neon-keys-intro__canvas" />
        </div>
      </div>
    </section>
  )
}

export default NeonKeysIntro