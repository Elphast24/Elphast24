import React, { useState, useEffect, useRef } from 'react';
import { LuMail } from 'react-icons/lu';
import avatar from '../assets/img/avatar.png';
import '../styles/Navbar.css';

const EMAIL = 'samuelbannor44@gmail.com';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

// Checked bottom-up: the last section whose top has passed the nav line wins.
const sectionOrder = [...navLinks].reverse().map((link) => link.id);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 50);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      navRef.current?.style.setProperty('--progress', progress.toFixed(4));

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

  return (
    <nav
      ref={navRef}
      className={`pill-nav ${isScrolled ? 'scrolled' : ''}`}
      aria-label="Primary"
    >
      <a href="#home" className="pill-logo" aria-label="Samuel Bannor Annor, home">
        <img src={avatar} alt="" width="44" height="44" />
      </a>

      <ul className="pill-links">
        {navLinks.map((link) => (
          <li key={link.id} className={`pill-item pill-item-${link.id}`}>
            <a
              href={`#${link.id}`}
              className={`pill-link ${activeSection === link.id ? 'active' : ''}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a href={`mailto:${EMAIL}`} className="pill-cta" aria-label={`Email ${EMAIL}`}>
        <LuMail className="pill-cta-icon" aria-hidden="true" />
        <span className="pill-cta-text">{EMAIL}</span>
      </a>

      <span className="pill-progress" aria-hidden="true" />
    </nav>
  );
};

export default Navbar;
