import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, useInView, useReducedMotion,} from 'framer-motion';
import './portfolio.css';


/** Orion Charts UI kit–inspired tokens (community palette: violet, blue, purple, rose, lilac) */
const SITE = {
  brand: 'Abdullah.',
  name: 'M. Abdullah Iqbal',
  role: 'Developer & creative',
  headline: 'I build fast, accessible web experiences and craft visual stories.',
  focus:
    'Web development, API-driven interfaces, video production, and graphic design.',
  email: 'mailto:hello@example.com',
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ],
};

const SKILLS = [
  'Premiere Pro',
  'After Effects',
  'Brand & layout',
  'REST APIs',
  'Responsive UI',
];

/** Bar-style proficiency (Orion dashboard widgets) — edit labels & values */
const SKILL_LEVELS = [
  { name: 'React', pct: 92, tone: 'violet' },
  { name: 'JavaScript', pct: 88, tone: 'blue' },
  { name: 'HTML & CSS', pct: 90, tone: 'purple' },
  { name: 'Design systems', pct: 80, tone: 'rose' },
];

const PROJECTS = [
  {
    title: 'Dynamic product gallery',
    desc: 'React SPA with search, filters, and third-party API integration.',
    stack: 'React · Fetch API · CSS Grid',
    href: '#work',
    chartTone: 'violet',
  },
  {
    title: 'YouTube automation pipeline',
    desc: 'End-to-end scripting, editing, and publishing workflow for long-form content.',
    stack: 'Premiere · Photoshop · Notion',
    href: '#work',
    chartTone: 'blue',
  },
  {
    title: 'Brand identity kit',
    desc: 'Logo system, typography, and social templates for a local business.',
    stack: 'Illustrator · Figma',
    href: '#work',
    chartTone: 'purple',
  },
];

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const HERO_BARS = [42, 68, 55, 88, 48, 72, 61, 95, 54, 78, 66, 90];

const PROJECT_SPARKS = [
  [38, 72, 52, 88, 61],
  [55, 48, 80, 44, 70],
  [62, 58, 66, 50, 76],
];

// Animations run only once - no replay on scroll
const viewOpts = { once: true, amount: 0.22 };

function OrionHeroChart({ revealed }) {
  const pathRef = useRef(null);
  const gradId = `orionLineGrad-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!revealed) return;
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== 'function') return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.transition = 'none';
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.transition =
          'stroke-dashoffset 1.15s cubic-bezier(0.22, 1, 0.36, 1)';
        path.style.strokeDashoffset = '0';
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [revealed]);

  return (
    <div
      className={`orion-panel ${revealed ? 'chart-revealed' : ''}`}
      aria-hidden="true"
    >
      <div className="orion-panel__header">
        <span className="orion-panel__title">Overview</span>
        <span className="orion-pill">Live</span>
      </div>
      <div className="orion-bars" role="presentation">
        {HERO_BARS.map((h, i) => (
          <span
            key={i}
            className="orion-bars__bar"
            style={{ height: `${h}%`, '--bar-i': i }}
          />
        ))}
      </div>
      <svg className="orion-line" viewBox="0 0 320 80" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c39f4" />
            <stop offset="45%" stopColor="#599fd4" />
            <stop offset="100%" stopColor="#de3f6c" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 58 L48 42 L92 52 L136 28 L180 38 L224 22 L268 34 L312 18"
        />
      </svg>
      <div className="orion-legend">
        <span className="orion-legend__item orion-legend__item--violet">Builds</span>
        <span className="orion-legend__item orion-legend__item--blue">Shipped</span>
        <span className="orion-legend__item orion-legend__item--rose">Creative</span>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [navVisible, setNavVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? JSON.parse(saved) : true;
  });
  const reduceMotion = useReducedMotion();

  const heroRef = useRef(null);
  const workRef = useRef(null);
  const skillsRef = useRef(null);
  const lastScrollRef = useRef(0);

  const heroInView = useInView(heroRef, viewOpts);
  const workInView = useInView(workRef, viewOpts);
  const skillsInView = useInView(skillsRef, viewOpts);

  const t = reduceMotion ? 0.01 : 0.55;
  const tFast = reduceMotion ? 0.01 : 0.4;
  const spring = reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 120, damping: 22 };

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 24);
      // setNavVisible(true); 
      lastScrollRef.current = currentScroll;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    // if (menuOpen) setNavVisible(true);
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const closeMenu = () => setMenuOpen(false);

  const heroText = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: 0.04 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: t, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: t, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.06 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: spring,
    },
  };

  return (
    <div className="portfolio">
      <div className="portfolio__glow" aria-hidden="true" />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <motion.header
        className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
        initial={reduceMotion ? false : { y: -100, opacity: 0 }}
        animate={reduceMotion ? false : { y: 0, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 80, damping: 15 }
        }
      >
        <div className="site-header__inner">
          <button
            type="button"
            className="theme-toggle"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setIsDarkMode((m) => !m)}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            <svg
              className="theme-toggle__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isDarkMode ? (
                <circle cx="12" cy="12" r="5" />
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </svg>
          </button>

          <a className="site-logo" href="#top" onClick={closeMenu}>
            {SITE.brand}
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav-toggle__bar" aria-hidden />
            <span className="nav-toggle__bar" aria-hidden />
            <span className="nav-toggle__bar" aria-hidden />
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>

          <nav
            id="site-nav"
            className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
            aria-label="Primary"
          >
            <ul className="site-nav__list">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={closeMenu}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="site-nav__cta" href={SITE.email} onClick={closeMenu}>
              Let&apos;s talk
            </a>
          </nav>
        </div>
      </motion.header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero__layout">
            <motion.div
              className="hero__copy"
              variants={heroText}
              initial="hidden"
              animate="visible"
            >
              <motion.p className="eyebrow" variants={fadeUp}>
                Orion-style portfolio · {new Date().getFullYear()}
              </motion.p>
              <motion.h1 className="hero__title" variants={fadeUp}>
                <span className="hero__line hero__line--gradient">{SITE.role}</span>
              </motion.h1>
              <motion.p className="hero__lead" variants={fadeUp}>
                {SITE.headline}
              </motion.p>
              <motion.p className="hero__meta" variants={fadeUp}>
                {SITE.focus}
              </motion.p>
              <motion.div className="hero__actions" variants={fadeUp}>
                <motion.a
                  className="btn btn--primary"
                  href="#work"
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                >
                  View selected work
                </motion.a>
                <motion.a
                  className="btn btn--ghost"
                  href={SITE.email}
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                >
                  Contact
                </motion.a>
              </motion.div>
            </motion.div>

           <motion.aside
  className="hero__aside"
  ref={heroRef}
  data-chart-reveal="hero"
  initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
  animate={
    reduceMotion || heroInView
      ? { opacity: 1, x: 0, scale: 1 }
      : { opacity: 0, x: 28, scale: 0.96 }
  }
  transition={{ duration: t, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
>
  {/* Sirf original chart wapis agaya */}
  <OrionHeroChart revealed={heroInView} />
</motion.aside>
          </div>
        </section>

        <motion.section
          id="work"
          ref={workRef}
          className={`section section--work ${workInView ? 'section--charts-in' : ''}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: '-8% 0px' }}
          variants={sectionReveal}
        >
          <div className="section__head">
            <span className="section__tag">Data viz · Projects</span>
            <h2 className="section__title">Selected work</h2>
            <p className="section__intro">
              Cards styled like Orion dashboard tiles. Point each link to your demo or
              case study.
            </p>
          </div>
          <motion.ul
            className="project-list"
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {PROJECTS.map((p, cardIndex) => (
              <motion.li key={p.title} variants={cardItem}>
                <motion.a
                  className={`project-card project-card--${p.chartTone}`}
                  href={p.href}
                  style={{ '--spark-card': cardIndex }}
                  whileHover={
                    reduceMotion
                      ? {}
                      : { y: -4, transition: { duration: 0.2 } }
                  }
                >
                  <div className="project-card__accent" aria-hidden />
                  <div className="project-card__top">
                    <h3>{p.title}</h3>
                    <span className="project-card__arrow" aria-hidden>
                      →
                    </span>
                  </div>
                  <p className="project-card__desc">{p.desc}</p>
                  <div
                    className="project-card__spark"
                    aria-hidden
                    role="presentation"
                  >
                    {(PROJECT_SPARKS[cardIndex] || PROJECT_SPARKS[0]).map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%`, '--spark-i': i }}
                      />
                    ))}
                  </div>
                  <p className="project-card__stack">{p.stack}</p>
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          id="about"
          className="section section--about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionReveal}
        >
          <div className="section__head">
            <span className="section__tag">About</span>
            <h2 className="section__title">Profile</h2>
          </div>
          <motion.div 
            className="profile-avatar-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: t, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            <motion.img
              src="/IMG_2890.JPG" alt="Abdullah Iqbal Profile"  
              className="profile-avatar"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
          </motion.div>
          <motion.div
            className="about-grid"
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="about-card" variants={cardItem}>
              <h3>Who I am</h3>
              <p>
                I&apos;m <strong>{SITE.name}</strong> — I care about clear structure,
                performance, and visuals that support the story. I enjoy owning a
                project from outline to shipped pixels.
              </p>
            </motion.div>
            <motion.div className="about-card" variants={cardItem}>
              <h3>How I work</h3>
              <p>
                Short feedback loops, documented decisions, and reusable components.
                On the creative side, I keep timelines organized and deliverables
                consistent with brand guidelines.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          className="section section--skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <div className="section__head">
            <span className="section__tag">Widgets · Skills</span>
            <h2 className="section__title">Skills & tools</h2>
            <p className="section__intro">
              Bar rows mirror Orion chart widgets. Edit <code>SKILL_LEVELS</code> in{' '}
              <code>portfolio.jsx</code>.
            </p>
          </div>
          <div className="skills-split">
            <ul
              ref={skillsRef}
              data-chart-reveal="skills"
              className={`skill-bars ${skillsInView ? 'chart-revealed' : ''}`}
            >
              {SKILL_LEVELS.map(({ name, pct, tone }, i) => (
                <li
                  key={name}
                  className={`skill-bars__row skill-bars__row--${tone}`}
                  style={{ '--row-i': i }}
                >
                  <div className="skill-bars__label">
                    <span>{name}</span>
                    <span className="skill-bars__pct">{pct}%</span>
                  </div>
                  <div className="skill-bars__track">
                    <div
                      className="skill-bars__fill"
                      style={{ '--skill-pct': `${pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <motion.ul
              className="skill-pills"
              variants={cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {SKILLS.map((s) => (
                <motion.li key={s} variants={cardItem}>
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="section section--contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: t, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <motion.div
            className="contact-panel"
            initial={reduceMotion ? false : { scale: 0.985, opacity: 0.92 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: tFast }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="section__tag section__tag--on-dark">Contact</span>
            <h2 className="contact-panel__title">Let&apos;s work together</h2>
            <p className="contact-panel__text">
              Share your project scope, timeline, and links. I typically reply within
              two business days.
            </p>
            <div className="contact-panel__links">
              {SITE.social.map(({ label, href }) => {
                const openInNewTab = /^https?:\/\//i.test(href);
                return (
                  <motion.a
                    key={label}
                    className="contact-link"
                    href={href}
                    whileHover={reduceMotion ? {} : { x: 3 }}
                    {...(openInNewTab
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer
        className="site-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: tFast }}
      >
        <p>
          © {new Date().getFullYear()} {SITE.name}. Orion-style UI · Framer Motion ·
          React.
        </p>
      </motion.footer>
    </div>
  );
};

export default Portfolio;