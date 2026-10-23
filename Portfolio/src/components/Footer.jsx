import React, { useState, useEffect } from 'react';
import {
  LuMail, LuMapPin, LuClock, LuSend, LuArrowUp, LuChevronRight,
} from 'react-icons/lu';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import '../styles/Footer.css';

const EMAIL = 'samuelbannor44@gmail.com';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const contactItems = [
  { Icon: LuMail, text: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: LuMapPin, text: 'Ghana' },
  { Icon: LuClock, text: 'Mon to Fri, 9AM to 6PM GMT' },
];

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/samuel-bannor-annor/', Icon: FaLinkedinIn },
  { name: 'GitHub', href: 'https://github.com/Elphast24', Icon: FaGithub },
  { name: 'Instagram', href: 'https://www.instagram.com', Icon: FaInstagram },
  { name: 'X (Twitter)', href: 'https://twitter.com', Icon: FaXTwitter },
];

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-container">
          {/* Call to action */}
          <div className="footer-cta-band">
            <div>
              <h2 className="footer-cta-title">Have a project in mind?</h2>
              <p className="footer-cta-sub">Tell me what you need and I&rsquo;ll reply within 24 hours.</p>
            </div>
            <a href="#contact" className="footer-cta">
              <span className="footer-cta__icon" aria-hidden="true"><LuSend /></span>
              Start a project
            </a>
          </div>

          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <a href="#home" className="footer-logo" aria-label="Samuel, back to the top">
                <span className="footer-logo-text">SAMUEL</span>
                <span className="footer-logo-dot">.</span>
              </a>
              <p className="footer-tagline">
                Fullstack developer building responsive, accessible and fast web apps.
              </p>
              <ul className="footer-socials" aria-label="Find me online">
                {socials.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <nav className="footer-links-col" aria-label="Footer">
              <h3 className="footer-col-title">Quick links</h3>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      <LuChevronRight aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="footer-contact-col">
              <h3 className="footer-col-title">Get in touch</h3>
              <ul className="footer-contact-items">
                {contactItems.map(({ Icon, text, href }) => (
                  <li key={text} className="footer-contact-item">
                    <span className="footer-contact-icon" aria-hidden="true"><Icon /></span>
                    {href ? <a href={href}>{text}</a> : <span>{text}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {currentYear} Samuel Bannor Annor. All rights reserved.
              <span className="footer-credit"> Built by <span className="footer-brand-name">Unrelinquish</span></span>
            </p>
            <span className="footer-status">
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`scroll-to-top${showScrollTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        tabIndex={showScrollTop ? 0 : -1}
      >
        <LuArrowUp aria-hidden="true" />
      </button>
    </footer>
  );
};

export default Footer;
