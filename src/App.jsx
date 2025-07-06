import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion' // 'framer-motion/dist/framer-motion'

import Home from "./pages/Home";
import Game from "./pages/Game";
import CustomModal from "./components/CustomModal";
import HowToPlay from "./components/HowToPlay";

import { FaInfoCircle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import "./styles/global.css";

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

  const location = useLocation()

  const [modalOpen, setModalOpen] = useState()

  return (
    <>
      <CustomModal 
        isOpen={modalOpen}
        hasDelay={false}
        onRequestClose={() => setModalOpen(false)}
        onAfterClose={() => {}}
        title={"HOW TO PLAY"}
        footer={false}
      >
        <HowToPlay />
      </CustomModal>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/jogo" element={<Game />} />
        </Routes>
      </AnimatePresence>
      <footer className="home-footer">
          <a href="https://github.com/ccostafrias" target="_blank">  
            <FaGithub className="svg-footer"/>
          </a>
          <button className="button-footer" onClick={() => setModalOpen(true)}>
            <FaInfoCircle  className="svg-footer"/>
          </button>
      </footer>
    </>
  );
}
