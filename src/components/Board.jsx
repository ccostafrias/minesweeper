import Cell from "./Cell";
import { useMinesweeper } from "../hooks/useMineSweeper";
import "../styles/Board.css"

export default function Board({ size, mines }) {
  const { board, revealCell, toggleFlag, resetGame } = useMinesweeper(size, mines);

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
              key={`${rIdx}-${cIdx}`}
              cell={cell}
              onClick={() => {
                console.log('opa') 
                revealCell(rIdx, cIdx)}}
              onRightClick={(e) => {
                e.preventDefault();
                toggleFlag(rIdx, cIdx);
              }}
            />
          ))
        )}
      </div>
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </>
  );
}
