import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMinesweeper } from "../hooks/useMineSweeper";
import { ConfettiExplosion } from 'react-confetti-explosion';
import { formatTime } from '../utils/formatTime';
import { motion } from 'framer-motion';
import { useDifficulty } from '../contexts/DifficultyContext';

import { FaFlag } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";

import Board from "../components/Board";
import CustomModal from '../components/CustomModal';
import "../styles/Board.css";

const DIFFICULTY_CONFIG = {
    // easy: { size: 7, mines: 1 },
  easy: { size: 7, mines: 6 },
  medium: { size: 10, mines: 12 },
  hard: { size: 15, mines: 30 },
};

const confettiProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600,
  zIndex: 200,
}

export default function Game() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [showConfetti, setShowConfetti] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const { pageTransition, pageVariants } = useDifficulty();

    // Acessando um query parameter específico
    const difficulty = searchParams.get('difficulty') || 'easy';
    const { size, mines } = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;

    const { 
        board, 
        flagsLeft, 
        time, 
        gameId,
        gameStatus,
        bestTime,
        isNewBestTime,
        revealCell, 
        toggleFlag, 
        resetGame,
    } = useMinesweeper(size, mines, difficulty);

    useEffect(() => {
        if (gameStatus == 'won' || gameStatus == 'lost') {
            if (gameStatus == 'won') setShowConfetti(true)
            setModalOpen(true)
        }
    }, [gameStatus])

    useEffect(() => {
    })

    const handleConfettiCompleted = () => {
        setShowConfetti(false)
        // setModalOpen(true)
    }

    return (
        <div>
            <CustomModal 
                isOpen={modalOpen} 
                hasDelay={true}
                onRequestClose={() => {}}
                onAfterClose={resetGame}
                shouldClose={false}
                title={gameStatus == 'won' ? "YOU WON!" : "YOU LOST..."}
                footer={
                    <>
                        <button className='modal-button' onClick={() => {
                            setModalOpen(false)
                            navigate('/')
                        }}>
                            <FaHome/>
                            <span>Home</span>
                        </button>
                        <button autoFocus={true} className='modal-button' onClick={() => setModalOpen(false)}>
                            <RiResetLeftFill/>
                            <span>Restart</span>
                        </button>
                    </>
                }
            >
                <div className='win-container'>
                    <div className='win-wrapper'>
                        <span className='win-label'>Difficulty:</span>
                        <span style={{textTransform: 'uppercase'}}>{difficulty}</span>
                    </div>
                    {/* <div className='win-wrapper'>
                        <span className='win-label'>Flagged right:</span>
                        <span>---</span>
                    </div> */}
                    <div className='win-wrapper'>
                        <span className='win-label'>Time:</span>
                        <span>{gameStatus == 'won' ? formatTime(time) : '---'}</span>
                    </div>
                    <div className='win-wrapper'>
                        <span className='win-label'>Best time:</span>
                        <div className='best-wrapper'>
                            {isNewBestTime && (
                                <div className='shine-wrapper'>
                                    <span className='new-best-shine'>New Best Time!</span>
                                    <span className='new-best'>New Best Time!</span>
                                </div>
                            )}
                            <span>{bestTime >= 0 ? formatTime(bestTime) : '---'}</span>
                        </div>
                    </div>
                </div>

                {/* <p>Flagged right: {flaggedCorrectly} / {mines}</p> */}
            </CustomModal>
            {showConfetti && (
                <div style={{
                    position: 'fixed',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 300
                }}>
                    <ConfettiExplosion {...confettiProps} onComplete={handleConfettiCompleted}/>
                </div>
            )}
            <motion.div 
                className="main-game"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
            >
                <div className="board-ui">
                    <button className="icon-wrapper" onClick={() => navigate('/')}>
                        <FaHome className="board-ui--icon" size={"2rem"}/>
                    </button>
                    <div className="icon-wrapper">
                        <FaClock size={"1.7rem"}/>
                        <span>{formatTime(time)}</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaFlag size={"1.6rem"}/>
                        <span>{flagsLeft}</span>
                    </div>
                    <button className="icon-wrapper" onClick={resetGame}>
                        <RiResetLeftFill size={"1.9rem"}/>
                    </button>
                </div>
                <Board
                    board={board}
                    size={size}
                    revealCell={revealCell}
                    toggleFlag={toggleFlag}
                    gameId={gameId}
                />
            </motion.div>
        </div>
    );
}