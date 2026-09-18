
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx'
import './index.css'

// Create a root and render the app
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
