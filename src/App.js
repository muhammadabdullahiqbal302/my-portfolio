import React, { useState, useEffect } from 'react';
import Portfolio from './portfolio';
import IntroScreen from './IntroScreen';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    // IntroScreen khud 4.8s baad onFinished call karti hai
    // Lekin agar user ne pehle se dekha hua hai toh skip karo
    const seen = sessionStorage.getItem('intro-seen');
    if (seen) {
      setShowIntro(false);
      setIntroVisible(false);
    }
  }, []);

  const handleIntroFinished = () => {
    sessionStorage.setItem('intro-seen', '1');
    // Pehle fade out hone do, phir unmount karo
    setTimeout(() => setShowIntro(false), 850);
    setIntroVisible(false);
  };

  return (
    <div className="App">
      {showIntro && (
        <IntroScreen onFinished={handleIntroFinished} />
      )}
      <Portfolio />
    </div>
  );
}

export default App;
