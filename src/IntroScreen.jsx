import React, { useEffect, useState } from 'react';
import './IntroScreen.css';

const CODE_SNIPPETS = [
  'const dev = () => {}', 'import React from "react"',
  'npm run build', 'git commit -m "init"',
  'flex-direction: column', 'useState(null)',
  'border-radius: 14px', 'async/await fetch()',
  'grid-template-columns: 1fr', 'transform: translateY(-4px)',
  'export default App', 'padding: 1.5rem',
  'z-index: 9999', 'opacity: 0.85',
  'useEffect(() => {}, [])', 'background: linear-gradient',
  'position: absolute', 'display: flex',
  'const [state, setState]', 'return <Component />',
  'margin: 0 auto', 'font-weight: 800',
  'transition: 0.3s ease', 'overflow: hidden',
];

const POSITIONS = [
  { top: '4%',  left: '2%' },  { top: '4%',  left: '38%' },
  { top: '4%',  right: '3%' }, { top: '13%', left: '16%' },
  { top: '13%', right: '18%' },{ top: '22%', left: '4%' },
  { top: '22%', right: '4%' }, { top: '31%', left: '20%' },
  { top: '31%', right: '20%' },{ top: '42%', left: '2%' },
  { top: '42%', right: '3%' }, { top: '53%', left: '14%' },
  { top: '53%', right: '15%' },{ top: '63%', left: '3%' },
  { top: '63%', right: '4%' }, { top: '72%', left: '22%' },
  { top: '72%', right: '22%' },{ top: '81%', left: '5%' },
  { top: '81%', right: '5%' }, { top: '89%', left: '18%' },
  { top: '89%', right: '18%' },{ top: '93%', left: '48%' },
  { top: '17%', left: '46%' }, { top: '76%', left: '46%' },
];

// Skill bar rows for background
const SKILL_ROWS = [
  { label: 'React',   pct: 92, color: 'violet', pos: { top: '8%',  left: '2%'  } },
  { label: 'CSS',     pct: 90, color: 'blue',   pos: { top: '8%',  right: '2%' } },
  { label: 'JS',      pct: 88, color: 'purple', pos: { top: '48%', left: '2%'  } },
  { label: 'Design',  pct: 80, color: 'rose',   pos: { top: '48%', right: '2%' } },
  { label: 'APIs',    pct: 75, color: 'violet', pos: { bottom: '12%', left: '2%'  } },
  { label: 'Figma',   pct: 70, color: 'blue',   pos: { bottom: '12%', right: '2%' } },
];

function FloatingGraph({ style, delay }) {
  const bars = Array.from({ length: 7 }, () => Math.floor(Math.random() * 55) + 30);
  return (
    <div className="intro-graph" style={{ ...style, animationDelay: `${delay}s` }}>
      {bars.map((h, i) => (
        <div key={i} className="intro-graph__bar"
          style={{ '--h': `${h}%`, '--delay': `${delay + 0.3 + i * 0.06}s` }} />
      ))}
    </div>
  );
}

function FloatingDonut({ style, delay, percent = 87, label = 'Creative' }) {
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  return (
    <div className="intro-donut" style={{ ...style, animationDelay: `${delay}s` }}>
      <svg width="58" height="58" viewBox="0 0 58 58">
        <defs>
          <linearGradient id={`dg-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="29" cy="29" r={radius} fill="none"
          stroke="rgba(99,102,241,0.12)" strokeWidth="6" />
        <circle cx="29" cy="29" r={radius} fill="none"
          stroke={`url(#dg-${label})`} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)', transformOrigin: 'center',
            transition: `stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1) ${delay + 0.5}s`,
          }} />
        <text x="29" y="33" textAnchor="middle"
          fill="rgba(99,102,241,0.8)" fontSize="9" fontWeight="800">
          {percent}%
        </text>
      </svg>
      <span className="intro-donut__label">{label}</span>
    </div>
  );
}

function FloatingSkillBar({ label, pct, color, pos, delay }) {
  return (
    <div className="intro-skill-bar" style={{ ...pos, animationDelay: `${delay}s` }}>
      <div className="intro-skill-bar__header">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="intro-skill-bar__track">
        <div className={`intro-skill-bar__fill intro-skill-bar__fill--${color}`}
          style={{ '--pct': `${pct}%`, '--delay': `${delay + 0.4}s` }} />
      </div>
    </div>
  );
}

const GRAPH_POSITIONS = [
  { top: '25%', left: '1%'  }, { top: '25%', right: '1%' },
  { top: '62%', left: '1%'  }, { top: '62%', right: '1%' },
  { bottom: '4%', left: '30%' }, { bottom: '4%', right: '30%' },
  { top: '4%', left: '28%'  }, { top: '4%',  right: '28%' },
];

const DONUT_POSITIONS = [
  { pos: { top: '18%', left: '1%'  }, pct: 87, label: 'Creative', delay: 0.4 },
  { pos: { top: '18%', right: '1%' }, pct: 92, label: 'React',    delay: 0.6 },
  { pos: { top: '72%', left: '1%'  }, pct: 80, label: 'Design',   delay: 0.5 },
  { pos: { top: '72%', right: '1%' }, pct: 88, label: 'JS',       delay: 0.7 },
];

const IntroScreen = ({ onFinished }) => {
  useEffect(() => {
    const timer = setTimeout(() => onFinished(), 4800);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="intro-container">
      <div className="intro-bg-layer">
        {/* Code snippets */}
        {POSITIONS.map((pos, i) => (
          <div key={i} className="intro-floating-item"
            style={{ ...pos, animationDelay: `${i * 0.07}s` }}>
            {CODE_SNIPPETS[i % CODE_SNIPPETS.length]}
          </div>
        ))}
        {/* Bar graphs */}
        {GRAPH_POSITIONS.map((pos, i) => (
          <FloatingGraph key={i} style={pos} delay={i * 0.12} />
        ))}
        {/* Donut charts */}
        {DONUT_POSITIONS.map((d, i) => (
          <FloatingDonut key={i} style={d.pos} delay={d.delay} pct={d.pct} label={d.label} />
        ))}
        {/* Skill bars */}
        {SKILL_ROWS.map((s, i) => (
          <FloatingSkillBar key={i} label={s.label} pct={s.pct}
            color={s.color} pos={s.pos} delay={0.3 + i * 0.15} />
        ))}
      </div>

      {/* Center */}
      <div className="intro-content">
        <div className="intro-tag">Portfolio · 2026</div>
        <h1 className="intro-text">M. Abdullah Iqbal</h1>
        <p className="intro-role">Developer & Creative</p>
        <div className="loading-bar-track">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;