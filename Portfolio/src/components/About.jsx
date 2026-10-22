import React, { useEffect, useRef, useState } from 'react';
import Samuel from '../assets/img/samuel.jpg';
import '../styles/About.css';
import '../styles/Sections.css';

// Step layout geometry, in the units of a 560-wide drawing. Rows are 140 apart; the rings sit
// just beyond the round end of each bar (right of odd steps, left of even ones) and the dotted
// path swings from one ring to the next, bowing round the rounded ends of the bars.
const STEP_W = 560
const STEP_H = 560
const ringX = (i) => (i % 2 === 0 ? 345 : 215)
const ringY = (i) => 70 + 140 * i
const STEP_PATH = (() => {
  const lead = 'M272 12 C320 12 345 30 345 58'
  const legs = [0, 1, 2]
    .map((i) => {
      const [x0, y0, x1, y1] = [ringX(i), ringY(i) + 12, ringX(i + 1), ringY(i + 1) - 12]
      return `M${x0} ${y0} C${x0} ${y0 + 56} ${x1} ${y1 - 56} ${x1} ${y1}`
    })
    .join(' ')
  const tail = `M215 502 C215 530 245 548 285 548`
  return [lead, legs, tail].join(' ')
})()

const SKILL_SEGMENTS = 10;

// Profile card with a notch cut from its bottom-right corner for the "Hire me" button. The button
// is a 136x48 pill flush with the corner, so the cut is that pill grown by CTA_GAP on every side:
// a straight top edge, then an arc concentric with the button's rounded end. Where the arc meets
// the card's bottom edge (and the straight edge meets the right edge) the corners are rounded.
const CTA_W = 136;
const CTA_H = 48;
const CTA_GAP = 10;

// W, H: card size. R: outer corner radius. c, r: rounding of the two corners the cut creates.
// cx, cy: the button's rounded-end centre, measured in from the right and bottom edges.
// Rn: radius of the cut's arc. The inner photo frame is the same shape inset by 8px.
const notchPath = (W, H, { R, c, r, cx, cy, Rn }) => {
  const Cx = W - cx;
  const Cy = H - cy;
  const topY = Cy - Rn;
  const dx = Math.sqrt((Rn + r) ** 2 - (cy - r) ** 2);
  const Fx = Cx - dx;
  const Fy = H - r;
  const k = Rn / (Rn + r);
  const Px = Cx + (Fx - Cx) * k;
  const Py = Cy + (Fy - Cy) * k;
  const f = (n) => n.toFixed(2);
  return `path('M${R} 0 H${W - R} A${R} ${R} 0 0 1 ${W} ${R} V${f(topY - c)} A${c} ${c} 0 0 1 ${W - c} ${f(topY)} H${f(Cx)} A${Rn} ${Rn} 0 0 0 ${f(Px)} ${f(Py)} A${r} ${r} 0 0 1 ${f(Fx)} ${H} H${R} A${R} ${R} 0 0 1 0 ${H - R} V${R} A${R} ${R} 0 0 1 ${R} 0 Z')`;
};

const OUTER_CUT = { R: 36, c: 18, r: 14, cx: CTA_W - CTA_H / 2, cy: CTA_H / 2, Rn: CTA_H / 2 + CTA_GAP };
const INNER_CUT = { R: 28, c: 10, r: 6, cx: OUTER_CUT.cx - 8, cy: OUTER_CUT.cy - 8, Rn: OUTER_CUT.Rn + 8 };

const About = () => {
  // The stack animates in once, when it first scrolls into view.
  const stackRef = useRef(null);
  const [stackShown, setStackShown] = useState(false);
  const profileRef = useRef(null);
  const [clips, setClips] = useState({ outer: undefined, inner: undefined });

  useEffect(() => {
    const node = profileRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => {
      const { width: w, height: h } = node.getBoundingClientRect();
      if (!w || !h) return;
      setClips({
        outer: notchPath(w, h, OUTER_CUT),
        inner: notchPath(w - 16, h - 16, INNER_CUT),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = stackRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setStackShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStackShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 75 },
    { name: 'CSS/SASS', level: 90 },
    { name: 'Node.js', level: 70 },
    { name: 'Figma', level: 80 },
  ];

  const average = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);

  const highlights = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: 'Problem Solver',
      desc: 'Analytical approach to complex challenges',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: 'Fast Learner',
      desc: 'Quick to adapt to new technologies',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Team Player',
      desc: 'Collaborative and communicative',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      title: 'Result Driven',
      desc: 'Focused on delivering quality outcomes',
    },
  ];

  const infoItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: 'Ghana',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      label: 'Role',
      value: 'Frontend Developer',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      label: 'Education',
      value: 'Software Engineering',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: 'Email',
      value: 'samuelbannor44@gmail.com',
    },
  ];

  return (
    <section id="about" className="about about--alt">
      <div className="about-container">
        {/* Section Header */}
        <div className="ab-header">
          <div className="ab-header__chips">
            <span className="ab-chip">
              <span className="ab-chip__dot" aria-hidden="true" />
              Get to know me
            </span>
          </div>
          <h2 className="ab-title">About Me</h2>
          <p className="ab-sub">Passionate about creating impactful digital experiences</p>
          <span className="ab-meter" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ '--k': i }} />
            ))}
          </span>
        </div>

        {/* Main Grid */}
        <div className="about-grid">
          {/* Left — Image + Info */}
          <div className="about-left">
            <div className="ab-profile-wrap">
            <article ref={profileRef} className="ab-profile" style={{ clipPath: clips.outer }}>
              <div className="ab-profile__frame" style={{ clipPath: clips.inner }}>
                <img className="ab-profile__photo" src={Samuel} alt="Samuel Bannor Annor" />
                <div className="ab-profile__panel">
                  <h3 className="ab-profile__name">
                    Samuel Bannor Annor
                    <svg className="ab-profile__check" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="11" fill="currentColor" />
                      <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </h3>
                  <p className="ab-profile__bio">
                    Fullstack developer who builds responsive, accessible and fast web apps.
                  </p>
                  <div className="ab-profile__row">
                    <ul className="ab-profile__stats">
                      <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect width="20" height="14" x="2" y="7" rx="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        <b>5+</b>
                        <span>years</span>
                      </li>
                      <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m12 2 10 5-10 5L2 7z" />
                          <path d="m2 12 10 5 10-5" />
                          <path d="m2 17 10 5 10-5" />
                        </svg>
                        <b>15+</b>
                        <span>projects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
            <a className="ab-profile__cta" href="mailto:samuelbannor44@gmail.com">
              Hire me
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </a>
            </div>

            {/* Info Card */}
            <ul className="ab-facts">
              {infoItems.map((item, i) => (
                <li className="ab-fact" key={i}>
                  <span className="ab-fact__tab">{item.icon}</span>
                  <span className="ab-fact__body">
                    <span className="ab-fact__label">{item.label}</span>
                    <span className="ab-fact__value">{item.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Content */}
          <div className="about-right">
            <div className="about-content">
              <h3 className="about-role">
                <span className="role-line"></span>
                Software Engineer
              </h3>

              <div className="about-text">
                <p>
                  I'm a dedicated fullstack developer with over five years of experience creating exceptional digital experiences. With a strong foundation in modern web technologies, I focus on building responsive, accessible, and performant web applications , from intuitive frontend interfaces to robust backend systems.
                </p>
                <p>
                  My expertise spans across multiple frontend and backend frameworks and tools, allowing me to deliver end-to-end solutions that meet both user needs and business objectives. I have a proven track record of leading development teams and architecting scalable, fullstack web applications.
                </p>
                <p>
                  My approach combines technical excellence with strategic thinking, ensuring that every project not only meets current requirements but is also positioned for future growth and scalability.
                </p>
              </div>

              {/* Tech stack: ring summary, segmented bars, percent readout */}
              <div ref={stackRef} className={`ab-stack${stackShown ? ' is-shown' : ''}`}>
                <div className="ab-stack__head">
                  <div className="ab-ring-meter" style={{ '--avg': average }}>
                    <svg viewBox="0 0 80 80" aria-hidden="true">
                      <circle className="ab-ring-meter__track" cx="40" cy="40" r="34" />
                      <circle className="ab-ring-meter__value" cx="40" cy="40" r="34" pathLength="100" />
                    </svg>
                    <span className="ab-ring-meter__num">{average}%</span>
                  </div>
                  <div>
                    <h4 className="ab-stack__title">Tech Stack</h4>
                    <p className="ab-stack__sub">{skills.length} core tools, {average}% average comfort</p>
                  </div>
                </div>

                <ul className="ab-skills">
                  {skills.map((skill, i) => (
                    <li className="ab-skill" key={skill.name} style={{ '--row': i }}>
                      <div className="ab-skill__top">
                        <span className="ab-skill__name">{skill.name}</span>
                        <span className="ab-skill__pct">{skill.level}%</span>
                      </div>
                      <div
                        className="ab-skill__bar"
                        role="img"
                        aria-label={`${skill.name}: ${skill.level} percent`}
                      >
                        {Array.from({ length: SKILL_SEGMENTS }, (_, j) => (
                          <span
                            key={j}
                            className="ab-skill__seg"
                            style={{ '--f': Math.min(1, Math.max(0, skill.level / 10 - j)), '--seg': j }}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="about-social">
                <span className="social-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Find me on
                </span>
                <div className="social-links">
                  <a
                    href="https://www.linkedin.com/in/samuel-bannor-annor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Elphast24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="GitHub"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="mailto:samuelbannor44@gmail.com"
                    className="social-btn"
                    aria-label="Email"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What I bring: winding step layout */}
        <div className="ab-process">
          <div className="ab-process__head">
            <h3 className="ab-process__title">How I work</h3>
            <span className="ab-meter ab-meter--steps" aria-hidden="true">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} style={{ '--k': i }} />
              ))}
            </span>
          </div>
          <div className="ab-stage">
            <svg className="ab-path" viewBox={`0 0 ${STEP_W} ${STEP_H}`} aria-hidden="true">
              <path d={STEP_PATH} />
              <circle className="ab-path__end" cx="272" cy="12" r="5" />
              <circle className="ab-path__end" cx="285" cy="548" r="5" />
              {highlights.map((item, i) => (
                <g key={item.title} className="ab-ring" style={{ '--n': i }}>
                  <circle cx={ringX(i)} cy={ringY(i)} r="10" />
                  <circle className="ab-ring__dot" cx={ringX(i)} cy={ringY(i)} r="3.5" />
                </g>
              ))}
            </svg>
            <ol className="ab-steps">
              {highlights.map((item, i) => (
                <li className={`ab-step ab-step--${i % 2 === 0 ? 'a' : 'b'}`} key={item.title} style={{ '--n': i }}>
                  <div className="ab-step__card">
                    <span className="ab-step__disc">{item.icon}</span>
                    <span className="ab-step__text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </span>
                  </div>
                  <div className="ab-step__label" aria-hidden="true">
                    <span>Step</span>
                    <b>{String(i + 1).padStart(2, '0')}</b>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;