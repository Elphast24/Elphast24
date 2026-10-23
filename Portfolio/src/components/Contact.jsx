import React, { useEffect, useRef, useState } from 'react';
import { LuMail, LuMapPin, LuClock, LuSend, LuLoaderCircle, LuCircleCheck, LuCircleAlert, LuChevronDown } from 'react-icons/lu';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import '../styles/Sections.css';
import '../styles/Contact.css';

// Contact: one white card, copy and contact details on the left, the form on a
// coloured panel on the right.
const EMAIL = 'samuelbannor44@gmail.com';

const services = [
  'Frontend development',
  'Full-stack web app',
  'UI/UX design',
  'Technical consulting',
  'Something else',
];

const details = [
  { Icon: LuMail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: LuMapPin, label: 'Location', value: 'Ghana' },
  { Icon: LuClock, label: 'Availability', value: 'Mon to Fri, 9AM to 6PM GMT' },
];

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/samuel-bannor-annor/', Icon: FaLinkedinIn },
  { name: 'GitHub', href: 'https://github.com/Elphast24', Icon: FaGithub },
  { name: 'Instagram', href: 'https://www.instagram.com', Icon: FaInstagram },
  { name: 'X (Twitter)', href: 'https://twitter.com', Icon: FaXTwitter },
];

const EMPTY = { name: '', email: '', service: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const statusTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(statusTimer.current), []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated submission, as in the original section: replace with your actual API call.
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData(EMPTY);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      window.clearTimeout(statusTimer.current);
      statusTimer.current = window.setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <section id="contact" className="ct">
      <div className="ct__container">

        <div className="ct-card">
          <div className="ct-copy">
            <span className="ct-chip">
              <span className="ct-chip__icon" aria-hidden="true"><LuMail /></span>
              Start a project
            </span>

            <h2 className="ct-title">Let&rsquo;s build your next big idea</h2>

            <p className="ct-lead">
              Have a project in mind? Fill out the form or reach out directly to start a
              conversation about what you need and how I can help you get there.
            </p>

            <ul className="ct-details">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="ct-detail">
                  <span className="ct-detail__icon" aria-hidden="true"><Icon /></span>
                  <span className="ct-detail__text">
                    <span className="ct-detail__label">{label}</span>
                    {href ? <a href={href}>{value}</a> : <span>{value}</span>}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="ct-socials" aria-label="Find me online">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="ct-panel" onSubmit={handleSubmit}>
            <div className="ct-field">
              <label htmlFor="ct-name">Your name</label>
              <input
                id="ct-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ct-field">
              <label htmlFor="ct-email">Your email</label>
              <input
                id="ct-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ct-field">
              <label htmlFor="ct-service">Service</label>
              <div className="ct-select">
                <select
                  id="ct-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <LuChevronDown aria-hidden="true" />
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="ct-message">Project details</label>
              <textarea
                id="ct-message"
                name="message"
                rows="3"
                placeholder="Tell me about your project, timeline and goals"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="ct-submit" disabled={isSubmitting}>
              <span className="ct-submit__icon" aria-hidden="true">
                {isSubmitting ? <LuLoaderCircle className="ct-spin" /> : <LuSend />}
              </span>
              {isSubmitting ? 'Sending' : 'Submit'}
            </button>

            <div className="ct-status" role="status" aria-live="polite">
              {submitStatus === 'success' && (
                <p className="ct-status__msg">
                  <LuCircleCheck aria-hidden="true" />
                  Message sent. I&rsquo;ll get back to you within 24 hours.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="ct-status__msg">
                  <LuCircleAlert aria-hidden="true" />
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
