import React, { useState, useEffect } from 'react';
import Portfolio from './portfolio';
import IntroScreen from './IntroScreen';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Sirf same session mein skip karo — nahi toh hamesha dikhao
    const seen = sessionStorage.getItem('intro-seen');
    if (seen) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroFinished = () => {
    sessionStorage.setItem('intro-seen', '1');
    setTimeout(() => setShowIntro(false), 850);
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