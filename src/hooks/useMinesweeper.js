import { useState, useEffect, useMemo } from "react";

export function useMinesweeper(size, numMines, difficulty) {
  const [isNewBestTime, setIsNewBestTime] = useState(false)
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('ms-bt')
    return saved ? JSON.parse(saved) : {}
  }) // 'ms-bt' = minesweeper best times
  const [gameStatus, setGameStatus] = useState('playing')
  const [gameId, setGameId] = useState(0);
  const [board, setBoard] = useState(() => generateEmptyBoard(size));
  const [firstClick, setFirstClick] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [time, setTime] = useState(0);

  const delay = 50;

  useEffect(() => {
    if (firstClick|| isLocked) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [firstClick, isLocked]);

  // calcula quantas bandeiras restam, usando useMemo
  // useMemo = cumpre a função de um useEffect, mas como as bandeiras podem ser calculadas a partir de OUTRO valor já existente, utilizamos useMemo
  const flagsLeft = useMemo(() => {
    const flattened = board.flat()

    const totalFlags = flattened.filter(cell => cell.isFlagged).length; // calcula o total de flags no tabuleiro

    const allSafeCells = flattened.filter(cell => !cell.isMine);
    const allSafeCellsAreRevealed = allSafeCells.every(cell => cell.isRevealed);
    const totalSafeCellsCount = allSafeCells.length; // contar o número total de células seguras

    if (allSafeCellsAreRevealed && totalSafeCellsCount > 0) {
      if ((!bestTime[difficulty] && bestTime[difficulty] != 0) || bestTime[difficulty] > time) {
        const newBestTime = {...bestTime, [difficulty]: time}
        setBestTime(newBestTime)
        setIsNewBestTime(true)
        localStorage.setItem('ms-bt', JSON.stringify(newBestTime))
      }
      setGameStatus('won');
      setIsLocked(true);
      // onAllSafeCellsRevealed(); // Chama a função de vitória
    }
    return numMines - totalFlags;
  }, [board, numMines]);
  

  function generateEmptyBoard(s) {
    return Array.from({ length: s }, (_, row) =>
      Array.from({ length: s }, (_, col) => ({
        row,
        col,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );
  }

  function placeMines(safeRow, safeCol, currentBoard) {
    const newBoard = currentBoard.map(row => row.map(cell => ({ ...cell })));
    let placed = 0;

    while (placed < numMines) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);

      if (!newBoard[r][c].isMine && !isNear(r, c, safeRow, safeCol)) {
        newBoard[r][c].isMine = true;
        updateAdjacentCounts(newBoard, r, c);
        placed++;
      }
    }

    return newBoard;
  }

  function isNear(r, c, safeR, safeC) {
    return Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1;
  }

  function updateAdjacentCounts(board, r, c) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (board[nr]?.[nc] && !board[nr][nc].isMine) {
          board[nr][nc].adjacentMines++;
        }
      }
    }
  }

  const revealAllBombs = (excludedRow, excludedCol) => {
    // achar todas as bombas (elementos com isMine: true)
    const bombs = board
      .flat()
      .filter(c => {
        if (c.row == excludedRow && c.col == excludedCol) return false
        if (c.isFlagged) return false
        if (!c.isMine) return false
        return true
      })
      .sort(() => Math.random() - 0.5)

    // adicionar a chave `bombDelay` com valores crescentes e taxas aleatórias
    let currentDelay = 0;
    const bombsWithDelay = bombs.map(bomb => {
      const delayIncrement = Math.random() * 600 + 100;
      // const delayIncrement = 400;
      currentDelay += delayIncrement;
      return { ...bomb, revealDelay: parseFloat(currentDelay.toFixed(2)), isRevealed: true }; // Arredonda para 2 casas decimais
    });

    const newBoard = board.map(row =>
      row.map(cell => {
        const foundBomb = bombsWithDelay.find(b => b.row === cell.row && b.col === cell.col);
        if (foundBomb) return foundBomb;
        if (cell.col == excludedCol && cell.row == excludedRow) return {...cell, isRevealed: true};
        return cell;
      })
    );
    setBoard(newBoard);
    setGameStatus('lost')
  };

  function revealCell(row, col) {
    if (isLocked) return;

    let newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[row][col];

    if (cell.isRevealed || cell.isFlagged) return;

    if (firstClick) {
      const boardWithMines = placeMines(row, col, newBoard);
      recursiveReveal(boardWithMines, row, col);
      setBoard(boardWithMines); // só atualiza depois de revelar
      setFirstClick(false);
      return;
    }

    if (cell.isMine) {
      revealAllBombs(row, col);
      setIsLocked(true);
      return;
    }

    recursiveReveal(newBoard, row, col);
    setBoard(newBoard);
  }

  function recursiveReveal(board, r, c, depth = 0) {
    // Verifica se a célula está fora dos limites
    if (r < 0 || r >= size || c < 0 || c >= size) return;

    const cell = board[r][c];
    if (!cell || cell.isRevealed || cell.isMine) return;

    cell.isRevealed = true;
    cell.isFlagged = false;
    cell.revealDelay = depth * delay; // 50ms por nível

    // Revele as células adjacentes se a célula não tiver minas vizinhas
    if (cell.adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue; // Ignora a célula atual
          const nr = r + dr;
          const nc = c + dc;
          recursiveReveal(board, nr, nc, depth + 1);
        }
      }
    }
  }
  
  function toggleFlag(row, col) {
    if (isLocked) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[row][col];
    if (!cell.isRevealed) {
      cell.isFlagged = !cell.isFlagged;
      setBoard(newBoard);
    }
  }

  function resetGame() {
    setBoard(prev => prev.map(c => ({...c, isRevealed: false})))
    setBoard(generateEmptyBoard(size, size));
    setFirstClick(true);
    setIsLocked(false);
    setTime(0)
    setGameId(prev => prev + 1)
    setGameStatus('playing')
    setIsNewBestTime(false)
  }

  return { 
    board, 
    flagsLeft, 
    time, 
    gameId,
    gameStatus,
    bestTime: bestTime[difficulty],
    isNewBestTime,
    revealCell, 
    toggleFlag, 
    resetGame,
   };
}
