import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['contact', 'portfolio', 'about', 'home'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#home" className="logo" onClick={closeMenu}>
            <span className="logo-name">SAMUEL</span>
            <span className="logo-accent"></span>
          </a>

          {/* Desktop + Mobile Nav */}
          <nav>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navLinks.map((link, i) => (
                <li
                  key={link.label}
                  className="nav-item"
                  style={{ animationDelay: `${i * 0.08 + 0.15}s` }}
                >
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <span className="nav-index">0{i + 1}</span>
                    <span className="nav-label">{link.label}</span>
                  </a>
                </li>
              ))}
              <li className="nav-item nav-cta-item" style={{ animationDelay: '0.5s' }}>
                <a href="#contact" className="nav-cta" onClick={closeMenu}>
                  Let's Talk
                  {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg> */}
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Background overlay */}
      <div
        className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />
    </>
  );
};

export default Navbar;