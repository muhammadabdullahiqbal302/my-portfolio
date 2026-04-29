import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// StrictMode hataya — dev mein double render hota tha
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
