import React, { createContext, useContext, useState } from 'react';

const DifficultyContext = createContext();

export function DifficultyProvider({ children }) {
  const [difficulty, setDifficulty] = useState('easy');
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8 // Começa um pouco menor (para zoom in)
  },
  in: {
    opacity: 1,
    scale: 1 // Vai para o tamanho normal
  },
  out: {
    opacity: 0,
    scale: 0.6 // Zoom out um pouco ao sair
  }
};

const pageTransition = {
  type: "spring",
  ease: "easeIn",
  duration: 0.3
};

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty, pageTransition, pageVariants }}>
      {children}
    </DifficultyContext.Provider>
  );
}

export function useDifficulty() {
  return useContext(DifficultyContext);
}
