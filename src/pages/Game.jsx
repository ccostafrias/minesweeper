import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMinesweeper } from "../hooks/useMineSweeper";
import { formatTime } from '../utils/formatTime';

import { FaFlag } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";

import Board from "../components/Board";
import CustomModal from '../components/CustomModal';
import "../styles/Board.css";
import { ConfettiExplosion } from 'react-confetti-explosion';

const DIFFICULTY_CONFIG = {
//   easy: { size: 7, mines: 6 },
  easy: { size: 7, mines: 1 },
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
    const [modalOpen, setModalOpen] = useState()

    // Acessando um query parameter específico
    const difficulty = searchParams.get('difficulty') || 'easy';
    const { size, mines } = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;

    const { 
        board, 
        flagsLeft, 
        time, 
        gameId,
        gameStatus,
        setGameStatus,
        revealCell, 
        toggleFlag, 
        resetGame,
    } = useMinesweeper(size, mines);

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
        <>
            <CustomModal 
                isOpen={modalOpen} 
                onRequestClose={() => {}}
                onAfterClose={resetGame}
                title={gameStatus == 'won' ? "YOU WON!" : "YOU LOST..."}
                footer={
                    <>
                        <button onClick={() => navigate('/')}>Home</button>
                        <button onClick={() => setModalOpen(false)}>Restart</button>
                    </>
                }
            >
                <p>Dificuldade: {difficulty}</p>
                {/* <p>Flagged right: {flaggedCorrectly} / {mines}</p> */}
                <p>Time: {formatTime(time)}</p>
            </CustomModal>
            {showConfetti && (
                <div style={{
                    position: 'fixed',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 200
                }}>
                    <ConfettiExplosion {...confettiProps} onComplete={handleConfettiCompleted}/>
                </div>
            )}
            <div className="main-game">
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
            </div>
        </>
    );
}