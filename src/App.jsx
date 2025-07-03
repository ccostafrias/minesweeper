import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./styles/global.css";

import { FaInfoCircle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function App() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault(); // Previne o comportamento padrão do menu de contexto
    };

    // Adiciona o event listener ao body quando o componente é montado
    document.body.addEventListener('contextmenu', handleContextMenu);

    // Remove o event listener do body quando o componente é desmontado
    return () => {
      document.body.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo" element={<Game />} />
      </Routes>
      <footer className="home-footer">
          <a href="https://github.com/ccostafrias" target="_blank">  
            <FaGithub className="svg-footer"/>
          </a>
          <button className="button-footer">
            <FaInfoCircle  className="svg-footer"/>
          </button>
      </footer>
    </>
  );
}
