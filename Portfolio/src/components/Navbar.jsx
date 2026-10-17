import React, { useState, useEffect, useRef } from 'react';
import { LuHouse, LuUser, LuCode, LuBriefcase, LuMail } from 'react-icons/lu';
import sammy from '../assets/img/sammy.png'
import '../styles/Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home', Icon: LuHouse },
  { id: 'about', label: 'About', Icon: LuUser },
  { id: 'skills', label: 'Skills', Icon: LuCode },
  { id: 'portfolio', label: 'Portfolio', Icon: LuBriefcase },
  { id: 'contact', label: 'Contact', Icon: LuMail },
];

// Checked bottom-up: the last section whose top has passed the nav line wins.
const sectionOrder = [...navLinks].reverse().map((link) => link.id);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const dockRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 50);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      dockRef.current?.style.setProperty('--progress', progress.toFixed(4));

      for (const section of sectionOrder) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection('home');
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeIndex = Math.max(0, navLinks.findIndex((link) => link.id === activeSection));

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#home" className="logo" aria-label="Samuel Bannor Annor, home">
            <span className="logo-mark">
              <img src={sammy} alt="" />
            </span>
          </a>
        </div>
      </header>

      <nav
        ref={dockRef}
        className={`dock ${isScrolled ? 'scrolled' : ''}`}
        style={{ '--active': activeIndex }}
        aria-label="Primary"
      >
        <ul className="dock-list">
          <li className="dock-indicator" aria-hidden="true" />
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`dock-link ${activeSection === link.id ? 'active' : ''}`}
                aria-label={link.label}
                aria-current={activeSection === link.id ? 'page' : undefined}
                data-label={link.label}
              >
                <link.Icon aria-hidden="true" />
              </a>
            </li>
          ))}
          <li className="dock-progress" aria-hidden="true" />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
