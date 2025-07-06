import React from 'react';
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { DifficultyProvider } from './contexts/DifficultyContext';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DifficultyProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </DifficultyProvider>
);
