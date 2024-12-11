import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for createRoot
import App from "./App.tsx";
import "./index.css";

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Ensure you have an element with id='root' in your HTML.");
}

// Use createRoot to initialize and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
