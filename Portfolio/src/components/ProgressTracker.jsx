import { Fragment } from 'react'
import { COPY_PAIRS } from './laptopCopyPairs'
import '../styles/ProgressTracker.css'

// A pill of numbered steps lined up beneath the laptop. The connectors fill as the stages
// advance: --tracker-p (0 to 1 across the stages) is set on the sticky stage from the scroll
// handler, so scrolling does not re-render React.
function ProgressTracker({ stage }) {
  return (
    <div className={`tracker${stage >= 0 ? ' is-visible' : ''}`} aria-hidden="true">
      <ol className="tracker__pill">
        {COPY_PAIRS.map((pair, index) => (
          <Fragment key={pair.verb}>
            {index > 0 && <li className="tracker__link" style={{ '--seg': index - 1 }} />}
            <li className={`tracker__step${index < stage ? ' is-done' : ''}${index === stage ? ' is-active' : ''}`}>
              <span className="tracker__node">{index + 1}</span>
              <span className="tracker__label">{pair.verb}</span>
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

export default ProgressTracker
