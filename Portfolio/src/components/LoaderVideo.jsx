import { useEffect, useRef, useState } from 'react'
import '../styles/LoaderVideo.css'

const VIDEO_SRC = '/loader-video/loader-screen.mp4'
const LOGO_SRC = '/logo/logo-white.png'
const FALLBACK_HOLD_MS = 2200
const STALL_TIMEOUT_MS = 6000
const EXIT_MS = 600
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function LoaderVideo({ onDone }) {
  const videoRef = useRef(null)
  const [videoActive, setVideoActive] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  // Lock page scroll while the loader is up.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    if (gone) return undefined
    document.documentElement.classList.add('loader-lock')
    return () => document.documentElement.classList.remove('loader-lock')
  }, [gone])

  useEffect(() => {
    const video = videoRef.current
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches
    let finished = false
    let fallbackTimer = 0
    let stallTimer = 0
    let exitTimer = 0

    const finish = () => {
      if (finished) return
      finished = true
      window.clearTimeout(fallbackTimer)
      window.clearTimeout(stallTimer)
      setLeaving(true)
      exitTimer = window.setTimeout(() => {
        setGone(true)
        onDone?.()
      }, EXIT_MS)
    }

    // Dark screen + white logo only: hold briefly, then continue.
    const showFallback = () => {
      if (finished) return
      setVideoActive(false)
      window.clearTimeout(stallTimer)
      window.clearTimeout(fallbackTimer)
      fallbackTimer = window.setTimeout(finish, FALLBACK_HOLD_MS)
    }

    if (reduced || !video) {
      showFallback()
    } else {
      stallTimer = window.setTimeout(showFallback, STALL_TIMEOUT_MS)
      const onPlaying = () => {
        window.clearTimeout(stallTimer)
        setVideoActive(true)
      }
      video.addEventListener('playing', onPlaying)
      video.addEventListener('ended', finish)
      video.addEventListener('error', showFallback)
      video.play().catch(showFallback)

      return () => {
        finished = true
        window.clearTimeout(fallbackTimer)
        window.clearTimeout(stallTimer)
        window.clearTimeout(exitTimer)
        video.removeEventListener('playing', onPlaying)
        video.removeEventListener('ended', finish)
        video.removeEventListener('error', showFallback)
      }
    }

    return () => {
      finished = true
      window.clearTimeout(fallbackTimer)
      window.clearTimeout(stallTimer)
      window.clearTimeout(exitTimer)
    }
  }, [onDone])

  if (gone) return null

  return (
    <div
      className={`loader-video${leaving ? ' loader-video--leaving' : ''}`}
      role="status"
      aria-label="Loading"
    >
      <img className="loader-video__logo" src={LOGO_SRC} alt="" />
      <video
        ref={videoRef}
        className={`loader-video__video${videoActive ? ' loader-video__video--active' : ''}`}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  )
}

export default LoaderVideo
