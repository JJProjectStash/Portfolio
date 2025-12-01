/**
 * @fileoverview Application Entry Point
 * @description Initializes the React application and mounts it to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to render
if (!rootElement) {
  throw new Error(
    'Failed to find the root element. Please ensure there is a <div id="root"></div> in your index.html'
  );
}

// Create React root and render the application
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);