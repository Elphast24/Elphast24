import React, { useEffect, useRef, useState } from 'react';
import {
  LuLayoutGrid, LuMonitor, LuServer, LuWrench, LuPlus, LuPlug, LuRadio,
} from 'react-icons/lu';
import {
  CSS3, JavaScript, React as ReactIcon, NodeJs, Git,
  TypeScript, MongoDB, ExpressJsLight, Sass, TailwindCSS, Figma, Redux, Firebase,
} from 'developer-icons';
import '../styles/Sections.css';
import '../styles/Skills.css';

// Skills: each card is one white shape with a corner cut out for a level tab, after
// the interlocking numbered cards in the reference. The corner rotates card to card
// (top-left, top-right, bottom-right, bottom-left).
const CORNERS = ['tl', 'tr', 'br', 'bl'];
const TAB = 118;
const GAP = 14;
const NOTCH = TAB + GAP;

// Outline of a W x H card with a NOTCH-square cut from the given corner. Drawn clockwise for the
// top-left cut, then mirrored (flipping arc direction when only one axis is mirrored).
const cutPath = (W, H, corner, { R = 26, c = 22, f = 12 } = {}) => {
  const n = NOTCH;
  const ops = [
    ['M', n + c, 0],
    ['L', W - R, 0], ['A', R, W, R, 1],
    ['L', W, H - R], ['A', R, W - R, H, 1],
    ['L', R, H], ['A', R, 0, H - R, 1],
    ['L', 0, n + c], ['A', c, c, n, 1],
    ['L', n - f, n], ['A', f, n, n - f, 0],
    ['L', n, c], ['A', c, n + c, 0, 1],
  ];
  const mx = corner === 'tr' || corner === 'br';
  const my = corner === 'bl' || corner === 'br';
  const X = (x) => (mx ? W - x : x);
  const Y = (y) => (my ? H - y : y);
  const flip = mx !== my;
  const d = ops
    .map(([op, a, b, c2, sweep]) => {
      if (op === 'A') return `A${a} ${a} 0 0 ${flip ? 1 - sweep : sweep} ${X(b).toFixed(2)} ${Y(c2).toFixed(2)}`;
      return `${op}${X(a).toFixed(2)} ${Y(b).toFixed(2)}`;
    })
    .join(' ');
  return `path('${d} Z')`;
};

const SkillCard = ({ skill, corner, tone }) => {
  const ref = useRef(null);
  const [clip, setClip] = useState(undefined);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width && height) setClip(cutPath(width, height, corner));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [corner]);

  const Icon = skill.Icon;

  return (
    <li className={`sx-card sx-card--${corner}`} style={{ '--tone': tone }}>
      <div ref={ref} className="sx-card__shape" style={{ clipPath: clip }}>
        <div className="sx-card__icon">
          <Icon size={60} aria-hidden="true" />
        </div>
        <div className="sx-card__body">
          <div className="sx-card__title">
            <span className="sx-card__plus" aria-hidden="true"><LuPlus /></span>
            <h3>{skill.name}</h3>
            <span className="sx-card__cat">{skill.category}</span>
          </div>
          <p>{skill.description}</p>
          <ul className="sx-card__tags">
            {skill.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sx-tab" aria-label={`Proficiency ${skill.level} percent`} role="img">
        <b>{skill.level}%</b>
        <span>level</span>
      </div>
    </li>
  );
};

const categories = [
  { name: 'All', Icon: LuLayoutGrid },
  { name: 'Frontend', Icon: LuMonitor },
  { name: 'Backend', Icon: LuServer },
  { name: 'Tools', Icon: LuWrench },
];

const skillsData = [
  {
    id: 1,
    name: 'CSS3',
    Icon: CSS3,
    category: 'Frontend',
    level: 92,
    description: 'Advanced styling, responsive design, Grid & Flexbox, animations, and CSS preprocessors.',
    highlights: ['Flexbox', 'Grid', 'Animations', 'SASS'],
  },
  {
    id: 2,
    name: 'JavaScript',
    Icon: JavaScript,
    category: 'Frontend',
    level: 88,
    description: 'ES6+, asynchronous programming, DOM manipulation, and modern JavaScript patterns.',
    highlights: ['ES6+', 'Async/Await', 'DOM API', 'TypeScript'],
  },
  {
    id: 3,
    name: 'React.js',
    Icon: ReactIcon,
    category: 'Frontend',
    level: 90,
    description: 'Component architecture, state management, hooks, and modern React ecosystem tools.',
    highlights: ['Hooks', 'Redux', 'Next.js', 'React Native'],
  },
  {
    id: 4,
    name: 'Node.js',
    Icon: NodeJs,
    category: 'Backend',
    level: 78,
    description: 'Server-side development, API design, database integration, and backend architecture.',
    highlights: ['Express', 'REST API', 'MongoDB', 'Auth'],
  },
  {
    id: 5,
    name: 'Git & Tools',
    Icon: Git,
    category: 'Tools',
    level: 85,
    description: 'Version control, CI/CD pipelines, package management, and collaborative development workflows.',
    highlights: ['GitHub', 'VS Code', 'npm', 'Figma'],
  },
];

const extraTools = [
  { name: 'TypeScript', Icon: TypeScript },
  { name: 'MongoDB', Icon: MongoDB },
  { name: 'Express.js', Icon: ExpressJsLight },
  { name: 'SASS', Icon: Sass },
  { name: 'Tailwind', Icon: TailwindCSS },
  { name: 'Figma', Icon: Figma },
  { name: 'REST APIs', Icon: LuPlug, line: true },
  { name: 'Socket.io', Icon: LuRadio, line: true },
  { name: 'Redux', Icon: Redux },
  { name: 'Firebase', Icon: Firebase },
];

const TONES = ['#5a2bff', '#4a1fd6', '#3a12b0', '#26018a'];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="sx">
      <div className="sx__container">
        <div className="ab-header">
          <div className="ab-header__chips">
            <span className="ab-chip">
              <span className="ab-chip__dot" aria-hidden="true" />
              What I know
            </span>
          </div>
          <h2 className="ab-title">Technical Expertise</h2>
          <p className="ab-sub">Technologies and tools I use to bring ideas to life</p>
          <span className="ab-meter" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ '--k': i }} />
            ))}
          </span>
        </div>

        <div className="sx-filters" role="group" aria-label="Filter skills">
          {categories.map(({ name, Icon }) => (
            <button
              key={name}
              type="button"
              className={`sx-filter${activeCategory === name ? ' is-active' : ''}`}
              aria-pressed={activeCategory === name}
              onClick={() => setActiveCategory(name)}
            >
              <Icon aria-hidden="true" />
              {name}
            </button>
          ))}
        </div>

        <ul className="sx-grid">
          {filtered.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              corner={CORNERS[index % CORNERS.length]}
              tone={TONES[index % TONES.length]}
            />
          ))}
        </ul>

        <div className="sx-extra">
          <div className="sx-extra__text">
            <h4>Also experienced with</h4>
            <p>Additional technologies in my toolkit</p>
          </div>
          <ul className="sx-extra__chips">
            {extraTools.map(({ name, Icon, line }) => (
              <li key={name} className="sx-chip">
                <Icon size={18} aria-hidden="true" className={line ? 'sx-chip__line' : undefined} />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
