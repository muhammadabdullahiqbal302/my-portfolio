import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import ProfileCard from './ProfileCard';
import AnimationCard from './AnimationCard';
import './AnimationCard.css';
import './portfolio.css';

const SITE = {
  brand: 'M.Abdullah Portfolio.',
  name: 'M.Abdullah Iqbal',
  role: 'Developer & creative Video Editor',
  headline: 'I build fast, accessible web experiences and craft visual stories.',
  focus: 'Web development, Video Editing, and Graphic Design.',
  email: 'mailto:muhammadabdullah2012726701@gmail.com',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-abdullah-913179381' },
    { label: 'GitHub', href: 'https://github.com/muhammadabdullahiqbal302' },
    { label: 'Email', href: 'mailto:muhammadabdullah2012726701@gmail.com' },
  ],
};

const SKILLS = [
  'Premiere Pro', 'After Effects', '3D Tracking', 'Photoshop',
  'Illustrator', 'Web Development', 'Brand & layout', 'REST APIs',
];

const SKILL_LEVELS = [
  { name: 'React(AI)', pct: 92, tone: 'violet' },
  { name: 'JavaScript(AI)', pct: 88, tone: 'blue' },
  { name: 'HTML & CSS(AI)', pct: 90, tone: 'purple' },
  { name: 'UX-UI Design(AI)', pct: 80, tone: 'rose' },
];

const PROJECTS = [
  {
    title: 'Web Development',
    desc: [
      'Building modern, fast & accessible web apps with React.',
      '2 years of experience with AI-assisted workflows.',
      'Responsive UIs and API-driven interfaces.',
    ],
    stack: 'React · JavaScript · REST APIs · AI Tools · UX-UI Design',
    href: '#work',
    chartTone: 'violet',
  },
  {
    title: 'Video Editing',
    desc: [
      'End-to-end video production with Premiere Pro & After Effects.',
      '3D tracking , faceless video , podcast video and motion graphics experience.',
      '2.5 years creating long-form and short-form content.',
    ],
    stack: 'Premiere Pro · After Effects · 3D Camera Tracking',
    href: '#work',
    chartTone: 'blue',
  },
  {
    title: 'Graphic Design',
    desc: [
      'Brand identities, logos, and social media assets.',
      'Photoshop & Illustrator — driven by original ideas.',
      'Creative concepts fused with personal vision.',
      'I use AI to make my projects more creative.',
    ],
    stack: 'Photoshop · Illustrator · Brand Design',
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

const PROJECT_SPARKS = [
  [38, 72, 52, 88, 61],
  [55, 48, 80, 44, 70],
  [62, 58, 66, 50, 76],
];

const viewOpts = { once: true, amount: 0.22 };

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? JSON.parse(saved) : true;
  });

  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const lastScrollRef = useRef(0);

  const heroInView = useInView(heroRef, viewOpts);
  const skillsInView = useInView(skillsRef, viewOpts);

  const t = reduceMotion ? 0.01 : 0.55;
  const tFast = reduceMotion ? 0.01 : 0.4;
  const spring = reduceMotion
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 120, damping: 22 };

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 24);
      lastScrollRef.current = currentScroll;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
    visible: { opacity: 1, y: 0, transition: { duration: t, ease: [0.22, 1, 0.36, 1] } },
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: { opacity: 1, y: 0, transition: { duration: t, ease: [0.22, 1, 0.36, 1] } },
  };

  const cardStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.06 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: spring },
  };

  return (
    <div className={`portfolio ${menuOpen ? 'nav-is-open' : ''}`}>
      <div className="portfolio__glow" aria-hidden="true" />

      <a className="skip-link" href="#main">Skip to content</a>

      {/* ===== HEADER ===== */}
      <motion.header
        className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
        initial={reduceMotion ? false : { y: -100, opacity: 0 }}
        animate={reduceMotion ? false : { y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 80, damping: 15 }}
      >
        <div className="site-header__inner">
          {/* Theme toggle - left */}
          <button
            type="button"
            className="theme-toggle"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setIsDarkMode((m) => !m)}
          >
            <svg className="theme-toggle__icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isDarkMode
                ? <circle cx="12" cy="12" r="5" />
                : <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />}
            </svg>
          </button>

          {/* Logo - center */}
          <a className="site-logo" href="#top" onClick={closeMenu}>
            {SITE.brand}
          </a>

          {/* Hamburger - right */}
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

          {/* ===== NAV — single nav, no nesting ===== */}
          <nav
            id="site-nav"
            className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
            aria-label="Primary"
          >
            {/* Backdrop tap to close */}
            {menuOpen && (
              <div
                onClick={closeMenu}
                aria-hidden="true"
                style={{
                  position: 'fixed', inset: 0,
                  right: '70%', zIndex: -1, cursor: 'pointer',
                }}
              />
            )}

            {/* Close button inside drawer */}
            <button
              type="button"
              className="drawer-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>

            <ul className="site-nav__list">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={closeMenu}>{label}</a>
                </li>
              ))}
            </ul>

            <a className="site-nav__cta" href={SITE.email} onClick={closeMenu}>
              Let's talk
            </a>
          </nav>
        </div>
      </motion.header>

      {/* ===== MAIN ===== */}
      <main id="main">

        {/* Hero */}
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
              <motion.p className="hero__lead" variants={fadeUp}>{SITE.headline}</motion.p>
              <motion.p className="hero__meta" variants={fadeUp}>{SITE.focus}</motion.p>
              <motion.div className="hero__actions" variants={fadeUp}>
                <motion.a className="btn btn--primary" href="#work"
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}>
                  View selected work
                </motion.a>
                <motion.a className="btn btn--ghost" href={SITE.email}
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}>
                  Contact
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.aside
              className="hero__aside"
              ref={heroRef}
              initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
              animate={reduceMotion || heroInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 28, scale: 0.96 }}
              transition={{ duration: t, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              style={{ touchAction: 'manipulation' }}
            >
              <ProfileCard />
            </motion.aside>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="section section--work">
          <div className="section__head">
            <span className="section__tag">Data viz · Projects</span>
            <h2 className="section__title">Selected work</h2>
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
                <motion.div
                  className={`project-card project-card--${p.chartTone}`}
                  onClick={() => setSelectedProject(p)}
                  style={{ '--spark-card': cardIndex, cursor: 'pointer' }}
                  whileHover={reduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="project-card__accent" aria-hidden />
                  <div className="project-card__top">
                    <h3>{p.title}</h3>
                    <span className="project-card__arrow" aria-hidden>→</span>
                  </div>
                  <ul className="project-card__desc-list">
                    {p.desc.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                  <div className="project-card__spark" aria-hidden role="presentation">
                    {(PROJECT_SPARKS[cardIndex] || PROJECT_SPARKS[0]).map((h, i) => (
                      <span key={i} style={{ height: `${h}%`, '--spark-i': i }} />
                    ))}
                  </div>
                  <p className="project-card__stack">{p.stack}</p>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* About */}
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
            className="about-grid"
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="about-card" variants={cardItem}>
              <h3>Who I am</h3>
              <p>
                I&apos;m <strong>{SITE.name}</strong> — A web developer, video editor, and
                graphic designer. I bring ideas to life using my own creativity and
                AI-assisted workflows, turning concepts into professional digital experiences.
              </p>
            </motion.div>
            <motion.div className="about-card" variants={cardItem}>
              <h3>How I work</h3>
              <p>
                I handle most of the work myself — building files independently and with AI
                assistance to maintain professional quality. My video editing is driven by my
                own thinking and vision. For graphic design, I draw from my imagination,
                sometimes taking inspiration from social media and fusing it with my own
                creative ideas to produce something entirely new.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Skills */}
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
          </div>
          <div className="skills-split">
            <motion.ul
              className="skill-pills skill-pills--top"
              variants={cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {SKILLS.map((s) => (
                <motion.li key={s} variants={cardItem}>{s}</motion.li>
              ))}
            </motion.ul>

            <div className="skills-bars-row">
              <ul ref={skillsRef} className={`skill-bars ${skillsInView ? 'chart-revealed' : ''}`}>
                {SKILL_LEVELS.map(({ name, pct, tone }, i) => (
                  <li key={name} className={`skill-bars__row skill-bars__row--${tone}`} style={{ '--row-i': i }}>
                    <div className="skill-bars__label">
                      <span>{name}</span>
                      <span className="skill-bars__pct">{pct}%</span>
                    </div>
                    <div className="skill-bars__track">
                      <div className="skill-bars__fill" style={{ '--skill-pct': `${pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>

              <ul className={`skill-bars ${skillsInView ? 'chart-revealed' : ''}`}>
                {[
                  { name: 'After Effects', pct: 85, tone: 'violet' },
                  { name: 'Premiere Pro', pct: 88, tone: 'blue' },
                  { name: 'Photoshop', pct: 82, tone: 'purple' },
                  { name: 'Illustrator', pct: 78, tone: 'rose' },
                ].map(({ name, pct, tone }, i) => (
                  <li key={name} className={`skill-bars__row skill-bars__row--${tone}`} style={{ '--row-i': i }}>
                    <div className="skill-bars__label">
                      <span>{name}</span>
                      <span className="skill-bars__pct">{pct}%</span>
                    </div>
                    <div className="skill-bars__track">
                      <div className="skill-bars__fill" style={{ '--skill-pct': `${pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          className="section section--contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
            visible: { opacity: 1, y: 0, transition: { duration: t, ease: [0.22, 1, 0.36, 1] } },
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
              Share your project scope, timeline, and links. I typically reply within two business days.
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
                    {...(openInNewTab ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* ===== MODAL — outside main, no blur trap ===== */}
      <AnimatePresence>
        {selectedProject && (
          <AnimationCard
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <motion.footer
        className="site-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: tFast }}
      >
        <p>© {new Date().getFullYear()} {SITE.name}. Orion-style UI · Framer Motion · React.</p>
      </motion.footer>
    </div>
  );
};

export default Portfolio;
