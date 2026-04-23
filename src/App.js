import React, { useState, useEffect } from 'react'; 
import Portfolio from './portfolio'; 
import IntroScreen from './IntroScreen'; 

// Naya animated component import kiya

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className="App">
      {loading ? (
        <IntroScreen onFinished={() => setLoading(false)} />
      ) : (
        /* Pechla code waisa hi hai, Portfolio load hoga */
        /* Ab tum Portfolio ke andar ya yahan kahin bhi <ProfileCard /> use kar sakte ho */
        <Portfolio />
      )}
    </div>
  );
}

export default App;