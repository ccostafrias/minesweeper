import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFlag } from "react-icons/fa";
import { FaBomb } from "react-icons/fa";
import ConfettiExplosion from 'react-confetti-explosion';
import { getCssVarInSeconds } from './../utils/getCssVarInSeconds';

const confettiProps = {
  className: 'teste',
  force: 0.2,
  duration: 2200,
  particleCount: 15,
  particleSize: 5,
  width: 300,
  height: '120vh',
  zIndex: 300,
  // colors: [
  // '#dcdcdd',
  // '#c5c3c6',
  // '#46494c',
  // '#4c5c68',
  // ],
    colors: [
  '#370617',
  '#9d0208',
  '#dc2f02',
  '#f48c06',
  '#faa307',
  ],
};

export default function Cell({ z, cell, onClick, onRightClick}) {
  const classNames = ["cell"];
  if (cell.isRevealed) classNames.push("reveal");
  // if (cell.isFlagged) classNames.push("flag");

  const revealDelay = cell.revealDelay || 0;
  // const bombDelay = cell.bombDelay || 0;
  const style = { transitionDelay: `${revealDelay}ms` }

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
    return distance * direction;
  }

  const [showConfetti, setShowConfetti] = useState(false)

  const handleTransition = (isMine) => {
    if (!isMine) return
    setShowConfetti(true)
  }

    useEffect(() => {
      if (!cell.isRevealed || !cell.isMine) {
        setShowConfetti(false);
      }

    }, [cell.isRevealed, cell.isMine]);

  return (
    <button
        className={classNames.join(" ")}
        {...(!cell.isMine && { 'data-num': cell.adjacentMines || undefined })}
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
                  scale: [1, 1, 0.3],
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
        <div className={`cell-back`} style={style} onTransitionStart={() => handleTransition(cell.isMine)}>
            {!cell.isMine && cell.isRevealed && cell.adjacentMines > 0 && (
              <span>{cell.adjacentMines}</span>
            )}
            <AnimatePresence>
              {cell.isRevealed && cell.isMine && (
                <>
                  <motion.div
                    key="bomb"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: getCssVarInSeconds("--trans-time") }, // <- aqui o tempo extra da bomba após reset
                    }}
                  >
                    <FaBomb className="cell-icon" />  
                  </motion.div>
                  {showConfetti &&  (
                      <ConfettiExplosion {...confettiProps} onComplete={() => setShowConfetti(false)}/>
                  )}
                </>
              )}

            </AnimatePresence>
        </div>
    </button>
  );
}
