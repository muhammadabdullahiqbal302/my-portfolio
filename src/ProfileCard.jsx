import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import profilePic from './assets/image__portfolio.png';

const GRAPH_BARS = [60, 85, 45, 90, 70, 80, 55];

function MiniGraph() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="float-graph">
      <div className="float-graph__bars">
        {GRAPH_BARS.map((h, i) => (
          <div
            key={i}
            className={`float-graph__bar ${revealed ? 'revealed' : ''}`}
            style={{ '--h': `${h}%`, '--i': i }}
          />
        ))}
      </div>
      <span className="float-graph__label">Graph.svg</span>
    </div>
  );
}

function TypewriterText({ text, delay = 1300, className }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <div className={`animated-item ${className}`}>
      {displayed}<span className="cursor">|</span>
    </div>
  );
}

function DonutChart() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const percent = 87;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="float-donut">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="26" cy="26" r={radius}
          fill="none"
          stroke="url(#donutGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={revealed ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
        <defs>
          <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <text x="26" y="30" textAnchor="middle" 
        fill="currentColor" 
        fontSize="9" fontWeight="800">
          {revealed ? `${percent}%` : ''}
          </text>
      </svg>
      <span className="float-donut__label">Creative</span>
    </div>
  );
}

const ProfileCard = () => {
  return (
    <div className="profile-card-container">
      {/* Left side */}
      <MiniGraph />
      <TypewriterText text="< Code />" delay={1100} className="left-2" />

      {/* Main pic */}
      <div className="profile-main-wrapper">
        <img src={profilePic} alt="Abdullah Iqbal" className="profile-pic" />
      </div>

      {/* Right side */}
      <TypewriterText text="UI/UX" delay={1300} className="right-1" />
      <DonutChart />
    </div>
  );
};

export default ProfileCard;