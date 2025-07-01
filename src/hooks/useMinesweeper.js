import { useState } from "react";

export function useMinesweeper(size, numMines) {
  const [board, setBoard] = useState(() => generateEmptyBoard(size));
  const [firstClick, setFirstClick] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  const delay = 50;

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
      cell.isRevealed = true;
      setBoard(newBoard);
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
    setBoard(generateEmptyBoard(size, size));
    setFirstClick(true);
    setIsLocked(false);
  }

  return { board, revealCell, toggleFlag, resetGame };
}
