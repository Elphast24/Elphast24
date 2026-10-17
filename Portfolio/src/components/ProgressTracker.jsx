import { useEffect, useMemo, useRef, useState } from 'react'
import { COPY_PAIRS } from './laptopCopyPairs'
import '../styles/ProgressTracker.css'

// Where each numeral sits, as fractions of the stage. The path runs through them in order:
// along the bottom, then up the right-hand side. Phones get a path down the right edge.
const ANCHORS_WIDE = [
  { x: 0.41, y: 0.85 },
  { x: 0.65, y: 0.86 },
  { x: 0.91, y: 0.6 },
]
const ANCHORS_NARROW = [
  { x: 0.84, y: 0.27 },
  { x: 0.9, y: 0.5 },
  { x: 0.84, y: 0.74 },
]

function buildLayout(width, height) {
  if (!width || !height) return null
  const narrow = width <= 900
  const anchors = (narrow ? ANCHORS_NARROW : ANCHORS_WIDE).map((a) => ({ x: a.x * width, y: a.y * height }))
  const fontSize = narrow
    ? Math.min(width * 0.3, height * 0.2)
    : Math.min(height * 0.3, width * 0.17, 260)
  const lineWidth = Math.max(8, Math.min(16, height * 0.016))

  const [a, b, c] = anchors
  let d
  if (narrow) {
    // Down the right edge: two S-curves.
    d = `M${a.x} ${a.y} C${a.x + width * 0.14} ${a.y + height * 0.07}, ${b.x - width * 0.16} ${b.y - height * 0.08}, ${b.x} ${b.y}`
      + ` C${b.x + width * 0.1} ${b.y + height * 0.08}, ${c.x - width * 0.2} ${c.y - height * 0.07}, ${c.x} ${c.y}`
  } else {
    // Along the bottom with a dip and a rise, then up the right side. The second control point
    // of each curve mirrors the first of the next, so the join is smooth.
    d = `M${a.x} ${a.y} C${a.x + width * 0.08} ${a.y + height * 0.1}, ${b.x - width * 0.08} ${b.y - height * 0.12}, ${b.x} ${b.y}`
      + ` C${b.x + width * 0.08} ${b.y + height * 0.12}, ${c.x - width * 0.02} ${c.y + height * 0.24}, ${c.x} ${c.y}`
  }
  return { anchors, fontSize, lineWidth, d, width, height }
}

// Three huge outlined numerals joined by a thick curvy line that fills as the stages advance.
// The fill itself is driven by the --tracker-p custom property on the sticky stage, set from
// the scroll handler, so scrolling does not re-render React.
function ProgressTracker({ stage }) {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width: Math.round(width), height: Math.round(height) })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const layout = useMemo(() => buildLayout(size.width, size.height), [size])

  return (
    <div ref={ref} className={`tracker${stage >= 0 ? ' is-visible' : ''}`} aria-hidden="true">
      {layout && (
        <svg
          className="tracker__svg"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          width={layout.width}
          height={layout.height}
        >
          <defs>
            <linearGradient id="tracker-line" gradientUnits="userSpaceOnUse" x1={layout.anchors[0].x} y1="0" x2={layout.anchors[2].x} y2="0">
              <stop offset="0" stopColor="#26018a" />
              <stop offset="1" stopColor="#ff00d4" />
            </linearGradient>
            <linearGradient id="tracker-digit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#26018a" />
              <stop offset="1" stopColor="#ff00d4" />
            </linearGradient>
            {/* Keeps the line out from under the numerals so it reads as joining them. */}
            <mask id="tracker-cut" maskUnits="userSpaceOnUse" x="0" y="0" width={layout.width} height={layout.height}>
              <rect width={layout.width} height={layout.height} fill="#fff" />
              {layout.anchors.map((anchor, index) => (
                <rect
                  key={COPY_PAIRS[index].verb}
                  x={anchor.x - layout.fontSize * 0.42}
                  y={anchor.y - layout.fontSize * 0.46}
                  width={layout.fontSize * 0.84}
                  height={layout.fontSize * 0.92}
                  rx={layout.fontSize * 0.22}
                  fill="#000"
                />
              ))}
            </mask>
          </defs>

          <g mask="url(#tracker-cut)" strokeLinecap="round" fill="none" strokeWidth={layout.lineWidth}>
            <path className="tracker__track" d={layout.d} />
            <path className="tracker__progress" d={layout.d} pathLength="1" stroke="url(#tracker-line)" />
          </g>

          {layout.anchors.map((anchor, index) => (
            <text
              key={COPY_PAIRS[index].verb}
              className={`tracker__digit${index < stage ? ' is-done' : ''}${index === stage ? ' is-active' : ''}`}
              x={anchor.x}
              y={anchor.y}
              fontSize={layout.fontSize}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {index + 1}
            </text>
          ))}
        </svg>
      )}
    </div>
  )
}

export default ProgressTracker
