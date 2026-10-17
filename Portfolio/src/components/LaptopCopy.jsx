import { useEffect, useRef } from 'react'
import { animate, splitText, stagger, utils } from 'animejs'
import { COPY_PAIRS } from './laptopCopyPairs'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const HIDDEN = { opacity: 0, y: '110%' }

// Either side of the laptop: a giant verb (split into letters) and one quiet line (split
// into words), both with anime.js splitText. `stage` picks the visible pair (-1 = none).
// On a change the old pair exits and the new one enters, following the scroll direction.
function LaptopCopy({ stage }) {
  const elementsRef = useRef([]) // [{ verb, line }] per pair
  const splitsRef = useRef([]) // [{ verb: TextSplit, line: TextSplit }] per pair
  const animationsRef = useRef([])
  const previousStageRef = useRef(-1)

  const unitsOf = (index) => {
    const pair = splitsRef.current[index]
    return pair ? { letters: pair.verb.chars, words: pair.line.words } : { letters: [], words: [] }
  }

  useEffect(() => {
    splitsRef.current = elementsRef.current.map((pair) => ({
      verb: splitText(pair.verb, { chars: { wrap: 'clip' }, words: false }),
      line: splitText(pair.line, { words: { wrap: 'clip' } }),
    }))
    splitsRef.current.forEach((_, index) => {
      const { letters, words } = unitsOf(index)
      utils.set([...letters, ...words], HIDDEN)
    })
    elementsRef.current.forEach((pair) => {
      pair.verb.style.visibility = 'visible'
      pair.line.style.visibility = 'visible'
    })

    return () => {
      animationsRef.current.forEach((animation) => animation.pause())
      animationsRef.current = []
      splitsRef.current.forEach((pair) => {
        pair.verb.revert()
        pair.line.revert()
      })
      splitsRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!splitsRef.current.length) return
    const previous = previousStageRef.current
    if (previous === stage) return
    previousStageRef.current = stage

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches
    const direction = stage > previous ? 1 : -1
    animationsRef.current.forEach((animation) => animation.pause())
    animationsRef.current = []

    // Anything neither leaving nor arriving must be hidden (fast scrolling).
    splitsRef.current.forEach((_, index) => {
      if (index === previous || index === stage) return
      const { letters, words } = unitsOf(index)
      utils.set([...letters, ...words], HIDDEN)
    })

    if (previous >= 0) {
      const { letters, words } = unitsOf(previous)
      const exit = reduced
        ? { opacity: 0, duration: 150, ease: 'linear' }
        : { opacity: 0, y: `${-direction * 110}%`, duration: 360, ease: 'in(3)' }
      animationsRef.current.push(
        animate(letters, { ...exit, delay: reduced ? 0 : stagger(25) }),
        animate(words, { ...exit, delay: reduced ? 0 : stagger(12) }),
      )
    }

    if (stage >= 0) {
      const { letters, words } = unitsOf(stage)
      const lead = previous >= 0 ? 300 : 100
      utils.set([...letters, ...words], { opacity: 0, y: reduced ? '0%' : `${direction * 110}%` })
      animationsRef.current.push(
        animate(letters, reduced
          ? { opacity: 1, duration: 200, ease: 'linear', delay: lead / 2 }
          : { opacity: [0, 1], y: '0%', duration: 950, ease: 'out(4)', delay: stagger(55, { start: lead }) }),
        animate(words, reduced
          ? { opacity: 1, duration: 200, ease: 'linear', delay: lead / 2 }
          : { opacity: [0, 1], y: '0%', duration: 800, ease: 'out(4)', delay: stagger(38, { start: lead + 280 }) }),
      )
    }
  }, [stage])

  return (
    <>
      {COPY_PAIRS.map((pair, index) => (
        <div
          key={pair.verb}
          className={`laptop-copy-pair${stage === index ? ' is-active' : ''}`}
          aria-hidden={stage !== index}
        >
          <div className="laptop-copy laptop-copy--left">
            <h2
              ref={(element) => {
                elementsRef.current[index] = { ...elementsRef.current[index], verb: element }
              }}
              className="laptop-copy__verb"
              style={{ visibility: 'hidden' }}
            >
              {pair.verb}
            </h2>
          </div>
          <div className="laptop-copy laptop-copy--right">
            <span className="laptop-copy__rule" aria-hidden="true" />
            <p
              ref={(element) => {
                elementsRef.current[index] = { ...elementsRef.current[index], line: element }
              }}
              className="laptop-copy__line"
              style={{ visibility: 'hidden' }}
            >
              {pair.line}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default LaptopCopy
