import React, { useState } from 'react';
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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

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

  const categories = ['All', 'Web App', 'Tool', 'AI/ML'];

  const filteredProjects =
    activeFilter === 'All'
      ? projectData
      : projectData.filter((p) => p.category === activeFilter);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setVisibleCount(6);
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <span className="tag-line"></span>
            My Work
          </span>
          <h2 className="section-title">
            Featured <span className="title-accent">Projects</span>
          </h2>
          <p className="section-subtitle">
            A collection of projects that showcase my skills and passion
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat === 'All' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              )}
              {cat === 'Web App' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              )}
              {cat === 'Tool' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              )}
              {cat === 'AI/ML' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" />
                  <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
                  <path d="M15.25 9.93A4 4 0 0 1 17 14c0 1.95-1.4 3.58-3.25 3.93" />
                  <path d="M8.75 9.93A4 4 0 0 0 7 14c0 1.95 1.4 3.58 3.25 3.93" />
                  <circle cx="12" cy="22" r="2" />
                  <path d="M12 18v2" />
                </svg>
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Project Count */}
        <div className="portfolio-count">
          <span>
            Showing{' '}
            <strong>{displayedProjects.length}</strong> of{' '}
            <strong>{filteredProjects.length}</strong> projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="overlay-btn"
                      aria-label={`View ${project.title}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  ) : (
                    <span className="overlay-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Private
                    </span>
                  )}
                </div>
                {/* Category tag */}
                <span className="project-category">{project.category}</span>
              </div>

              {/* Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Tags */}
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="project-footer">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>View Project</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <span className="project-link disabled">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Coming Soon</span>
                    </span>
                  )}
                  <span className="project-id">#{String(project.id).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="portfolio-load-more">
            <button className="load-more-btn" onClick={handleLoadMore}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 13 12 18 17 13" />
                <polyline points="7 6 12 11 17 6" />
              </svg>
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;