import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// One motion language for every section below the hero, and nearly all of it is tied to the
// scroll position rather than to a timer:
//  - things rise or slide in as their trigger point moves up the screen (scrubbed, so they also
//    run backwards when you scroll up);
//  - decorative layers drift at their own speed (parallax);
//  - the About step path and the capsules it reaches are one scrubbed timeline;
//  - each section arrives as a rounded sheet over the one before, whose content recedes.
// Everything is skipped for visitors who prefer reduced motion. GSAP's inline styles are cleared
// when an entrance finishes, so the components' own CSS hover effects keep working.
const EASE = 'power3.out';
const CLEAR = 'opacity,visibility,transform,transition';
const SMOOTH = 0.6; // seconds of catch-up on scrubbed motion

// Scroll range in pixels from "trigger top at startPct of the viewport" to "... at endPct",
// clamped so it can always be reached, even by things at the very bottom of the page.
const range = (trigger, startPct, endPct) => {
  const place = (pct) => () => {
    const top = trigger.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, Math.min(ScrollTrigger.maxScroll(window), top - window.innerHeight * pct));
  };
  return { start: place(startPct), end: place(endPct) };
};

const rise = (trigger, targets, options = {}) => {
  const {
    x = 0, y = 36, scale = 1, stagger = 0.09, delay = 0, ease = EASE, from = 0.9, to = 0.55,
  } = options;
  const items = gsap.utils.toArray(targets).filter(Boolean);
  if (!trigger || !items.length) return;
  // Components carry CSS transform transitions for hover; switch them off while GSAP drives the
  // entrance (they return with the rest of the inline styles when it finishes).
  gsap.set(items, { transition: 'none' });
  gsap.from(items, {
    autoAlpha: 0,
    x,
    y,
    scale,
    ease,
    stagger,
    delay,
    clearProps: CLEAR,
    scrollTrigger: { trigger, ...range(trigger, from, to), scrub: SMOOTH },
  });
};

// Section header: chips, title, subtitle and the segmented rule arrive one after another; the
// header then lags slightly behind the scroll.
const header = (section) => {
  const head = section.querySelector('.ab-header');
  if (!head) return;
  rise(head, head.children, { y: 28, stagger: 0.18, from: 0.95, to: 0.62 });
  gsap.from(head.querySelectorAll('.ab-meter > span'), {
    scaleX: 0,
    transformOrigin: '0% 50%',
    ease: EASE,
    stagger: 0.05,
    scrollTrigger: { trigger: head, ...range(head, 0.85, 0.6), scrub: SMOOTH },
  });
  gsap.to(head, {
    y: 40,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 20%', scrub: true },
  });
};

// A soft violet disc behind each section (see Motion.css) drifts against the scroll.
const orb = (section) => {
  gsap.fromTo(
    section,
    { '--orb-y': '140px' },
    {
      '--orb-y': '-140px',
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
};

// The section above steps back as the next sheet slides over it.
const recede = (previous, next) => {
  if (!previous || !next) return;
  gsap.to(gsap.utils.toArray(previous.children), {
    opacity: 0.25,
    y: -50,
    ease: 'none',
    scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 15%', scrub: true },
  });
};

// ---------------------------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------------------------

// Geometry shared with About.jsx: the path runs through the rings, which sit at these heights
// of the 560-unit drawing. The path is revealed top to bottom; a step comes alive as the reveal
// reaches its ring.
const RING_Y = [70, 210, 350, 490];
const DRAWING = 560;

const stepTimeline = (process) => {
  const stage = process.querySelector('.ab-stage');
  const path = process.querySelector('.ab-path');
  if (!stage || !path) return;

  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: { trigger: stage, start: 'top 68%', end: 'bottom 42%', scrub: SMOOTH },
  });

  tl.fromTo(path, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' }, 0);

  process.querySelectorAll('.ab-step').forEach((step, i) => {
    const reach = RING_Y[i] / DRAWING; // where the path arrives, as a fraction of the timeline
    const sideA = step.classList.contains('ab-step--a');
    const ring = process.querySelectorAll('.ab-ring')[i];
    const capsule = step.querySelector('.ab-step__capsule');
    const tail = step.querySelector('.ab-step__tail');
    const disc = step.querySelector('.ab-step__disc');
    const text = step.querySelector('.ab-step__text');
    const label = step.querySelector('.ab-step__label');
    const covered = sideA ? 'inset(0% 0% 0% 70% round 999px)' : 'inset(0% 70% 0% 0% round 999px)';

    // 1. the ring marker appears as the dotted line reaches it
    tl.fromTo(ring, { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.05, ease: 'back.out(2)' }, reach - 0.03);
    // 2. the big circle with its icon pops
    tl.fromTo(disc, { scale: 0 }, { scale: 1, duration: 0.07, ease: 'back.out(2.2)' }, reach + 0.01);
    tl.fromTo(
      capsule,
      { scale: 0, clipPath: covered, transformOrigin: sideA ? '85% 50%' : '15% 50%' },
      { scale: 1, duration: 0.07, ease: 'back.out(2.2)' },
      reach + 0.01,
    );
    tl.fromTo(label, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.08 }, reach + 0.02);
    // 3. the rest of the capsule grows out of the circle, with its text arriving last
    tl.to(capsule, { clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: 0.13, ease: 'power2.out' }, reach + 0.08);
    tl.fromTo(
      tail,
      { autoAlpha: 0, scale: 0.4, transformOrigin: sideA ? '0% 50%' : '100% 50%' },
      { autoAlpha: 1, scale: 1, duration: 0.06 },
      reach + 0.08,
    );
    tl.fromTo(text, { autoAlpha: 0, x: sideA ? 28 : -28 }, { autoAlpha: 1, x: 0, duration: 0.09 }, reach + 0.15);
  });
};

const about = (section, wide) => {
  header(section);
  orb(section);

  const grid = section.querySelector('.about-grid');
  rise(grid, section.querySelector('.ab-profile-wrap'), { x: -48, y: 0, scale: 0.96 });
  rise(section.querySelector('.ab-facts'), section.querySelectorAll('.ab-fact'), { y: 28, stagger: 0.12 });
  rise(grid, section.querySelector('.about-content'), { x: 48, y: 0, delay: 0.1 });

  const process = section.querySelector('.ab-process');
  if (!process) return;
  rise(process, process.querySelector('.ab-process__head'), { y: 24, from: 0.95, to: 0.7 });

  if (wide) {
    stepTimeline(process);
  } else {
    process.querySelectorAll('.ab-step').forEach((step) => {
      rise(step.querySelector('.ab-step__card'), [step.querySelector('.ab-step__label'), step.querySelector('.ab-step__card')], { y: 28, stagger: 0.12 });
    });
  }
};

// ---------------------------------------------------------------------------------------------
// Skills, Projects, Contact, Footer
// ---------------------------------------------------------------------------------------------

const skills = (section) => {
  header(section);
  orb(section);

  rise(section.querySelector('.sx-filters'), section.querySelectorAll('.sx-filter'), { y: 18, stagger: 0.1, from: 0.95, to: 0.72 });

  const grid = section.querySelector('.sx-grid');
  rise(grid, grid?.querySelectorAll('.sx-card'), { y: 48, stagger: 0.14, from: 0.9, to: 0.35 });
  // Each level tab pops in just after its card, as if set into the cut.
  if (grid) {
    gsap.from(grid.querySelectorAll('.sx-tab'), {
      autoAlpha: 0,
      scale: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.14,
      delay: 0.25,
      clearProps: CLEAR,
      scrollTrigger: { trigger: grid, ...range(grid, 0.9, 0.35), scrub: SMOOTH },
    });
  }

  const extra = section.querySelector('.sx-extra');
  rise(extra, extra, { y: 32, from: 0.95, to: 0.7 });
  rise(extra, extra?.querySelectorAll('.sx-chip'), { y: 14, stagger: 0.05, delay: 0.2, from: 0.95, to: 0.62 });
};

const projects = (section) => {
  header(section);
  orb(section);

  const stage = section.querySelector('.pw-stage');
  // The wheel slides in from the left, then the screen from the right.
  rise(stage, section.querySelector('.pw-wheel-box'), { x: -110, y: 0, scale: 0.92, from: 0.95, to: 0.5 });
  rise(stage, section.querySelector('.pw-card'), { x: 90, y: 0, delay: 0.15, from: 0.95, to: 0.5 });
};

const contact = (section) => {
  orb(section);

  const card = section.querySelector('.ct-card');
  rise(card, card, { y: 56, scale: 0.97, from: 0.95, to: 0.6 });
  rise(card, card?.querySelectorAll('.ct-chip, .ct-title, .ct-lead, .ct-detail, .ct-socials li'), { y: 24, stagger: 0.08, delay: 0.2, from: 0.9, to: 0.45 });
  rise(card, card?.querySelectorAll('.ct-field, .ct-submit'), { y: 20, stagger: 0.08, delay: 0.35, from: 0.9, to: 0.4 });

  // The form panel moves against the copy as the card scrolls through.
  const panel = section.querySelector('.ct-panel');
  if (panel) {
    gsap.fromTo(
      panel,
      { y: 36 },
      {
        y: -36,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 90%', end: 'bottom 20%', scrub: true },
      },
    );
  }
};

const footer = (root) => {
  rise(root.querySelector('.footer-cta-band'), root.querySelectorAll('.footer-cta-band > *'), { y: 28, stagger: 0.14, from: 1, to: 0.7 });
  rise(root.querySelector('.footer-grid'), root.querySelectorAll('.footer-grid > *'), { y: 28, stagger: 0.12, from: 1, to: 0.72 });
  rise(root.querySelector('.footer-bottom'), root.querySelectorAll('.footer-bottom > *'), { y: 14, stagger: 0.1, from: 1.05, to: 0.9 });
};

export const initScrollMotion = () => {
  const mm = gsap.matchMedia();

  mm.add(
    { motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 641px)' },
    (context) => {
      const { motion, wide } = context.conditions;
      if (!motion) return;

      const pick = (selector) => document.querySelector(selector);
      const sections = {
        about: pick('#about'),
        skills: pick('#skills'),
        projects: pick('#portfolio'),
        contact: pick('#contact'),
        footer: pick('.footer'),
      };

      if (sections.about) about(sections.about, wide);
      if (sections.skills) skills(sections.skills);
      if (sections.projects) projects(sections.projects);
      if (sections.contact) contact(sections.contact);
      if (sections.footer) footer(sections.footer);

      recede(sections.about, sections.skills);
      recede(sections.skills, sections.projects);
      recede(sections.projects, sections.contact);
    },
  );

  // Images and fonts move things after the first layout; re-measure once they settle.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);

  return () => {
    window.removeEventListener('load', refresh);
    mm.revert();
  };
};
