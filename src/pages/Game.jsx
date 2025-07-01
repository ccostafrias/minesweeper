import { useParams, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import Board from "../components/Board";
import { useState } from "react";

export default function Game() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Acessando um query parameter específico
    let size, mines
    const difficulty = searchParams.get('difficulty');

    if (difficulty === 'easy') {
        size = 5
        mines = 8
    }
    else if (difficulty === 'medium') {
        size = 10
        mines = 15
    }
    else if (difficulty === 'hard') {
        size = 15
        mines = 20
    }

    return (
        <div className="main-game">
            <button className="reset-button" onClick={() => navigate("/")}>Home</button>
            <Board
                size={parseInt(size)}
                mines={parseInt(mines)}
            />
        </div>
    );
}