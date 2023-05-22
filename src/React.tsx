import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../public/css/index.css';

// (window as any).global = window
// var global = window
const root = ReactDOM.createRoot(document.getElementById('app') as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);