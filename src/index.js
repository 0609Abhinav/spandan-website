import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import global styles if necessary
import App from './App';  // Import your main App component

// Render the main App component into the root element of your HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
