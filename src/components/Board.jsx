import Cell from "./Cell";
import { useEffect } from "react";

export default function Board(props) {
  const { 
    board, 
    revealCell, 
    toggleFlag, 
    size,
  } = props

  useEffect(() => {
    document.documentElement.style.setProperty('--board-size', size);
  }, [board]);

  return (
    <>
      <div
        id="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`
        }}
      >
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Cell
              key={`${rIdx}-${cIdx}}`}
              z={(size - rIdx) * size - cIdx}
              cell={cell}
              onClick={() => {
                revealCell(rIdx, cIdx)}}
              onRightClick={(e) => {
                e.preventDefault();
                toggleFlag(rIdx, cIdx);
              }}
            />
          ))
        )}
      </div>
    </>
  );
}
