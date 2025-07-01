import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DifficultyProvider } from './contexts/DifficultyContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DifficultyProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DifficultyProvider>
);
