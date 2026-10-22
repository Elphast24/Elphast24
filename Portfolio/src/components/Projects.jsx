import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LuArrowUpRight, LuChevronLeft, LuChevronRight, LuLock } from 'react-icons/lu';
import '../styles/Sections.css';
import '../styles/Projects.css';
import tsaWeb from '../assets/img/works/tsaWeb.png';
import newImage from '../assets/img/new.png';
import resto from '../assets/img/resto.png';
import ufe from '../assets/img/works/ufe.png';
import imageClassifier from '../assets/img/works/ImageClassifier.png';
import emailGenerator from '../assets/img/works/EmailGenerator.png';
import chatti from '../assets/img/works/Chatti.png';
import jobb from '../assets/img/works/jobb.png';
import taskme from '../assets/img/works/taskme.png';
import slinq from '../assets/img/works/slinq.png';
import vv from '../assets/img/works/vv.png';
import titi from '../assets/img/works/titi.png';

const projectData = [
  {
    id: 1,
    title: 'TSA Web Platform',
    description:
      'Enterprise-level web platform featuring advanced UI/UX design, real-time data visualization, and seamless user experience optimization.',
    image: tsaWeb,
    link: 'https://bespoke-choux-b0059d.netlify.app/',
    tags: ['React', 'UI/UX'],
    category: 'Web App',
  },
  {
    id: 2,
    title: 'Gaming Website',
    description:
      'Full-stack web application with sophisticated content management system and responsive design implementation.',
    image: newImage,
    link: 'https://quickstock-2r9a.onrender.com',
    tags: ['Full Stack', 'CMS'],
    category: 'Web App',
  },
  {
    id: 3,
    title: 'Restaurant Management',
    description:
      'Comprehensive restaurant management system with online ordering, inventory tracking, and customer relationship management.',
    image: resto,
    link: 'http://gripsonresto-e001.netlify.app/',
    tags: ['React', 'Node.js'],
    category: 'Web App',
  },
  {
    id: 4,
    title: 'Ultimate Football Experience',
    description:
      'Gaming system with interactive features, progress tracking, and multimedia content delivery.',
    image: ufe,
    link: 'https://dls-1.onrender.com/',
    tags: ['JavaScript', 'Gaming'],
    category: 'Web App',
  },
  {
    id: 5,
    title: 'AI Image Classifier',
    description:
      'Machine learning integrated web application with real-time image classification and advanced data processing capabilities.',
    image: imageClassifier,
    link: 'https://amber-katalin-58.tiiny.site/',
    tags: ['AI/ML', 'Python'],
    category: 'AI/ML',
  },
  {
    id: 6,
    title: 'Email Automation',
    description:
      'Professional email generation and automation tool with template management and advanced customization options.',
    image: emailGenerator,
    link: 'http://gripsonresto-e001.netlify.app/',
    tags: ['Automation', 'Node.js'],
    category: 'Tool',
  },
  {
    id: 7,
    title: 'Chatti',
    description:
      'Real-time chat application built with MERN and Socket.io for instant communication between users.',
    image: chatti,
    link: 'https://chatti-csxs.onrender.com/',
    tags: ['MERN', 'Socket.io'],
    category: 'Web App',
  },
  {
    id: 8,
    title: 'TaskMe',
    description:
      'A task management app built with React and Node.js, allowing users to organize and track tasks efficiently.',
    image: taskme,
    link: 'https://taskme.onrender.com/',
    tags: ['React', 'Node.js'],
    category: 'Tool',
  },
  {
    id: 9,
    title: 'Jobb',
    description:
      'A MERN-based job portal that connects job seekers with employers through secure authentication and job listings.',
    image: jobb,
    link: 'https://jobb.onrender.com/',
    tags: ['MERN', 'Auth'],
    category: 'Web App',
  },
  {
    id: 10,
    title: 'Venture Vault',
    description:
      'A responsive web app for managing and showcasing startup ventures using modern web technologies.',
    image: vv,
    link: null,
    tags: ['React', 'Design'],
    category: 'Web App',
  },
  {
    id: 11,
    title: 'Slinq',
    description:
      'A web-based inventory management system for tracking stock, sales, and purchases efficiently.',
    image: slinq,
    link: 'https://slinq-wxgw.onrender.com/',
    tags: ['Full Stack', 'Dashboard'],
    category: 'Tool',
  },
  {
    id: 12,
    title: 'Titi',
    description:
      'An AI-powered academic assistant that helps students organize their semester automatically. Built with React, Expo, and Node.js.',
    image: titi,
    link: 'https://titi-web.onrender.com/',
    tags: ['AI', 'React Native'],
    category: 'AI/ML',
  },
];

// Projects: a wheel with each project's favicon on its rim, half hidden behind the
// display card. It turns on a timer, and can be grabbed and rotated by hand.
const COUNT = projectData.length;
const STEP = 360 / COUNT;
const AUTO_MS = 4500;
const SNAP_TAU = 120; // ms; time constant of the settle animation
const DRAG_THRESHOLD = 6; // px before a press counts as a drag

// The active favicon rests at 9 o'clock, facing the display screen (angles run clockwise from
// 12 o'clock, so that is -90deg).
const BASE = -90;

const mod = (n, m) => ((n % m) + m) % m;
const indexAt = (theta) => mod(Math.round((BASE - theta) / STEP), COUNT);

// The site's own favicon, falling back to the project screenshot if it is missing.
const faviconUrl = (link) => {
  if (!link) return null;
  try {
    return new URL('/favicon.ico', link).href;
  } catch {
    return null;
  }
};

const Badge = ({ project }) => {
  const [failed, setFailed] = useState(false);
  const url = faviconUrl(project.link);
  if (!url || failed) {
    return <img className="pw-badge__img pw-badge__img--shot" src={project.image} alt="" draggable="false" />;
  }
  return (
    <img
      className="pw-badge__img"
      src={url}
      alt=""
      draggable="false"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const Projects = () => {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hold, setHold] = useState(false); // pointer or focus inside: pause the timer
  const [inView, setInView] = useState(false);

  const stageRef = useRef(null);
  const boxRef = useRef(null);
  const wheelRef = useRef(null);
  const theta = useRef(BASE);
  const target = useRef(BASE);
  const raf = useRef(0);
  const lastFrame = useRef(0);
  const drag = useRef(null);
  const justDragged = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const apply = useCallback(() => {
    wheelRef.current?.style.setProperty('--th', `${theta.current.toFixed(3)}deg`);
  }, []);

  // Eases toward the target; interruptible, so a grab mid-spin takes over from where it is.
  const tick = useCallback((now) => {
    const dt = Math.min(64, now - lastFrame.current);
    lastFrame.current = now;
    const diff = target.current - theta.current;
    if (Math.abs(diff) < 0.02) {
      theta.current = target.current;
      apply();
      raf.current = 0;
      return;
    }
    theta.current += diff * (1 - Math.exp(-dt / SNAP_TAU));
    apply();
    raf.current = requestAnimationFrame(tick);
  }, [apply]);

  const animateTo = useCallback((t) => {
    target.current = t;
    setActive(indexAt(t));
    if (reduceMotion.current) {
      theta.current = t;
      apply();
      return;
    }
    if (!raf.current) {
      lastFrame.current = performance.now();
      raf.current = requestAnimationFrame(tick);
    }
  }, [apply, tick]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const next = useCallback(() => animateTo(target.current - STEP), [animateTo]);
  const prev = useCallback(() => animateTo(target.current + STEP), [animateTo]);

  const goTo = (i) => {
    let diff = mod(i - indexAt(target.current), COUNT);
    if (diff > COUNT / 2) diff -= COUNT;
    if (diff !== 0) animateTo(target.current - diff * STEP);
  };

  // Automatic turn: only while the section is on screen, the tab is visible and nobody is
  // touching it. Reduced motion leaves turning to the visitor.
  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hold || dragging || !inView || reduceMotion.current) return undefined;
    const id = window.setInterval(() => {
      if (!document.hidden) next();
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [hold, dragging, inView, next, active]);

  // ----- Drag to rotate -----
  const angleOf = (e) => {
    const rect = boxRef.current.getBoundingClientRect();
    return (Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180) / Math.PI;
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      last: angleOf(e),
      lastT: performance.now(),
      vel: 0,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved) {
      if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < DRAG_THRESHOLD) return;
      d.moved = true;
      d.last = angleOf(e);
      d.lastT = performance.now();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      return;
    }
    const now = performance.now();
    const angle = angleOf(e);
    let delta = angle - d.last;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    d.vel = 0.8 * d.vel + 0.2 * (delta / Math.max(1, now - d.lastT));
    d.last = angle;
    d.lastT = now;
    theta.current += delta;
    target.current = theta.current;
    apply();
    setActive(indexAt(theta.current));
  };

  const endDrag = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    justDragged.current = true;
    window.setTimeout(() => { justDragged.current = false; }, 0);
    setDragging(false);
    const throwBy = Math.max(-STEP * 1.5, Math.min(STEP * 1.5, d.vel * 180));
    animateTo(BASE + Math.round((theta.current + throwBy - BASE) / STEP) * STEP);
  };

  const project = projectData[active];

  return (
    <section id="portfolio" className="pw">
      <div className="pw__container">
        <div className="ab-header">
          <div className="ab-header__chips">
            <span className="ab-chip">
              <span className="ab-chip__dot" aria-hidden="true" />
              My work
            </span>
          </div>
          <h2 className="ab-title">Featured Projects</h2>
          <p className="ab-sub">Spin the wheel or let it turn: every favicon is a project I built</p>
          <span className="ab-meter" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ '--k': i }} />
            ))}
          </span>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`pw-stage${dragging ? ' is-dragging' : ''}`}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        <div
          ref={boxRef}
          className="pw-wheel-box"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={wheelRef} className="pw-wheel" style={{ '--th': `${BASE}deg` }}>
            {projectData.map((p, i) => (
              <span key={`tick-${p.id}`} className="pw-tick" style={{ '--a': `${(i + 0.5) * STEP}deg` }} aria-hidden="true" />
            ))}
            {projectData.map((p, i) => (
              <div key={p.id} className="pw-item" style={{ '--a': `${i * STEP}deg` }}>
                <button
                  type="button"
                  className={`pw-badge${i === active ? ' is-active' : ''}`}
                  aria-label={`Show ${p.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => {
                    if (!justDragged.current) goTo(i);
                  }}
                >
                  <Badge project={p} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-card">
          <p className="pw-sr" aria-live="polite">
            Project {active + 1} of {COUNT}: {project.title}
          </p>
          <div className="pw-panels">
            {projectData.map((p, i) => (
              <article
                key={p.id}
                className={`pw-panel${i === active ? ' is-active' : ''}`}
                aria-hidden={i !== active}
                inert={i !== active}
              >
                <div className="pw-panel__shot">
                  <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" draggable="false" />
                  <span className="pw-panel__cat">{p.category}</span>
                </div>
                <div className="pw-panel__info">
                  <div className="pw-panel__body">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <ul className="pw-panel__tags">
                      {p.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pw-panel__foot">
                    {p.link ? (
                      <a className="pw-cta" href={p.link} target="_blank" rel="noopener noreferrer">
                        View project
                        <LuArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="pw-cta pw-cta--off">
                        <LuLock aria-hidden="true" />
                        Private
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pw-controls">
            <button type="button" className="pw-arrow" onClick={prev} aria-label="Previous project">
              <LuChevronLeft aria-hidden="true" />
            </button>
            <span className="pw-count" aria-hidden="true">
              {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
            </span>
            <button type="button" className="pw-arrow" onClick={next} aria-label="Next project">
              <LuChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
