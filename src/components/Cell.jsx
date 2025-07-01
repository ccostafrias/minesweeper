import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFlag } from "react-icons/fa";
import { FaBomb } from "react-icons/fa";

export default function Cell({ z, cell, onClick, onRightClick }) {
  const classNames = ["cell"];
  if (cell.isRevealed) classNames.push("reveal");
  // if (cell.isFlagged) classNames.push("flag");

  const revealDelay = cell.revealDelay || 0;
  const bombDelay = cell.bombDelay || 0;
  const style = { transitionDelay: `${revealDelay ? revealDelay : bombDelay}ms` }

  const [exitX, setExitX] = useState(0);

  // Gera nova direção lateral ao desmarcar a bandeira
  useEffect(() => {
    if (!cell.isFlagged) {
      setExitX(getRandomOffset());
    }
  }, [cell.isFlagged]);

  function getRandomOffset() {
    const distance = Math.floor(Math.random() * 30 + 10); // 10 ~ 40px
    const direction = Math.random() < 0.5 ? -1 : 1;
    console.log(direction)
    return distance * direction;
  }

  return (
    <div
        className={classNames.join(" ")}
        data-num={cell.adjacentMines || undefined}
        onClick={onClick}
        onContextMenu={onRightClick}
        style={{ zIndex: z }}
    >
        <div className="cell-front" style={style}>
          <AnimatePresence>
            {cell.isFlagged && (
              <motion.div
                key="flag"
                className="flag-wrapper"
                initial={{ opacity: 0, y: -10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: [1, 1, 0],
                  x: exitX,
                  y: [0, -10, 80],
                  scale: [1, 1, 0],
                  rotate: 45*Math.sign(exitX),
                  transition: { 
                    duration: 0.6, 
                    ease: 'easeIn' ,
                    times: [0, 0.3, 1]
                  }
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <FaFlag className={`flag-icon`} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        {/* <div className={`cell-back ${cell.isMine ? "mine" : ""}`} style={style}> */}
        <div className={`cell-back`} style={style}>
            {!cell.isMine && cell.isRevealed && cell.adjacentMines > 0 && (
              <span>{cell.adjacentMines}</span>
            )}
            {cell.isRevealed && cell.isMine && (
              <FaBomb className="cell-icon" />
            )}
        </div>
    </div>
  );
}
