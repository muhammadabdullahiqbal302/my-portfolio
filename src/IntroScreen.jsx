import React, { useEffect, useState } from 'react';
import './IntroScreen.css'; // Styling ke liye niche CSS bhi di hai

const IntroScreen = ({ onFinished }) => {
  useEffect(() => {
    // 3 seconds baad intro khatam ho jayega
    const timer = setTimeout(() => {
      onFinished();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-text">M. Abdullah Iqbal</h1>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default IntroScreen;