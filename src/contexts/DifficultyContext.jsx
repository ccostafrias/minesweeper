import { createContext, useContext, useState } from 'react';

const DifficultyContext = createContext();

export function DifficultyProvider({ children }) {
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
}

export function useDifficulty() {
  return useContext(DifficultyContext);
}
