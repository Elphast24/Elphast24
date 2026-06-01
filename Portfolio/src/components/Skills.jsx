import React, { useState } from 'react';
import '../styles/Skills.css';
import html from '../assets/img/icons/icons8-html.svg';
import css from '../assets/img/icons/icons8-css.svg';
import js from '../assets/img/icons/icons8-javascript.svg';
import react from '../assets/img/icons/codesandbox.svg';
import node from '../assets/img/icons/command.svg';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Tools'];

  const skillsData = [
    {
      id: 1,
      name: 'HTML5',
      icon: html,
      category: 'Frontend',
      level: 95,
      description: 'Semantic markup, accessibility standards, and modern HTML5 features for robust web foundations.',
      highlights: ['Semantic Tags', 'SEO', 'Accessibility', 'Forms'],
    },
    {
      id: 2,
      name: 'CSS3',
      icon: css,
      category: 'Frontend',
      level: 92,
      description: 'Advanced styling, responsive design, Grid & Flexbox, animations, and CSS preprocessors.',
      highlights: ['Flexbox', 'Grid', 'Animations', 'SASS'],
    },
    {
      id: 3,
      name: 'JavaScript',
      icon: js,
      category: 'Frontend',
      level: 88,
      description: 'ES6+, asynchronous programming, DOM manipulation, and modern JavaScript patterns.',
      highlights: ['ES6+', 'Async/Await', 'DOM API', 'TypeScript'],
    },
    {
      id: 4,
      name: 'React.js',
      icon: react,
      category: 'Frontend',
      level: 90,
      description: 'Component architecture, state management, hooks, and modern React ecosystem tools.',
      highlights: ['Hooks', 'Redux', 'Next.js', 'React Native'],
    },
    {
      id: 5,
      name: 'Node.js',
      icon: node,
      category: 'Backend',
      level: 78,
      description: 'Server-side development, API design, database integration, and backend architecture.',
      highlights: ['Express', 'REST API', 'MongoDB', 'Auth'],
    },
    {
      id: 6,
      name: 'Git & Tools',
      icon: null,
      category: 'Tools',
      level: 85,
      description: 'Version control, CI/CD pipelines, package management, and collaborative development workflows.',
      highlights: ['GitHub', 'VS Code', 'npm', 'Figma'],
    },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <span className="tag-line"></span>
            What I Know
          </span>
          <h2 className="section-title">
            Technical <span className="title-accent">Expertise</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="skills-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skills-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              )}
              {cat === 'Frontend' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              )}
              {cat === 'Backend' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              )}
              {cat === 'Tools' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className="skill-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Top accent bar */}
              <div className="skill-accent-bar"></div>

              {/* Header */}
              <div className="skill-card-header">
                <div className="skill-icon-wrapper">
                  {skill.icon ? (
                    <img src={skill.icon} alt={skill.name} />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  )}
                </div>
                <div className="skill-meta">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category-badge">{skill.category}</span>
                </div>
                <div className="skill-level-ring">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle-fill"
                      strokeDasharray={`${skill.level}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      style={{ '--delay': `${index * 0.15}s` }}
                    />
                  </svg>
                  <span className="level-text">{skill.level}%</span>
                </div>
              </div>

              {/* Description */}
              <p className="skill-description">{skill.description}</p>

              {/* Highlights */}
              <div className="skill-highlights">
                {skill.highlights.map((item, i) => (
                  <span key={i} className="skill-highlight-tag">
                    {item}
                  </span>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="skill-card-footer">
                <div className="proficiency-bar">
                  <div
                    className="proficiency-fill"
                    style={{
                      '--fill-width': `${skill.level}%`,
                      '--delay': `${index * 0.1}s`,
                    }}
                  ></div>
                </div>
                <span className="proficiency-label">Proficiency</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tools Banner */}
        <div className="tools-banner">
          <div className="tools-banner-content">
            <div className="tools-banner-text">
              <h4>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Also Experienced With
              </h4>
              <p>Additional technologies in my toolkit</p>
            </div>
            <div className="tools-tags">
              {['TypeScript', 'MongoDB', 'Express.js', 'SASS', 'Tailwind', 'Figma', 'REST APIs', 'Socket.io', 'Redux', 'Firebase'].map(
                (tool, i) => (
                  <span key={i} className="tool-tag">
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;