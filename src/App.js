import React, { useState, useEffect } from 'react'; // 'useState' aur 'useEffect' add kiya
import Portfolio from './portfolio'; // Path check kar lena agar './portfolio' hai ya kuch aur
import IntroScreen from './IntroScreen'; 

function App() {
  // Shuru mein intro dikhane ke liye state 'true' rakhi hai
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3 seconds baad loading ko false kar dega
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        // Jab tak loading true hai, IntroScreen dikhao
        <IntroScreen onFinished={() => setLoading(false)} />
      ) : (
        // Jab loading false ho jaye, tab Portfolio dikhao
        <Portfolio />
      )}
    </div>
  );
}

export default App;