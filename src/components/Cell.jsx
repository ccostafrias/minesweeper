export default function Cell({ cell, onClick, onRightClick }) {
  const classNames = ["cell"];
  if (cell.isRevealed) classNames.push("reveal");
  if (cell.isFlagged) classNames.push("flag");

  const delay = cell.revealDelay || 0;
  const style = {
            transitionDelay: `${delay}ms`,
        }

  return (
    <div
        className={classNames.join(" ")}
        data-num={cell.adjacentMines || undefined}
        onClick={onClick}
        onContextMenu={onRightClick}
    >
        <div className="cell-front" style={style}/>
        <div className={`cell-back ${cell.isMine ? "mine" : ""}`} style={style}>
            {!cell.isMine && cell.isRevealed && cell.adjacentMines > 0 && cell.adjacentMines}
        </div>
    </div>
  );
}
