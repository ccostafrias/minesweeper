import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "../styles/Home.css"

export default function Home() {
    const [difficult, setDifficult] = useState('medium')
    const navigate = useNavigate();

    function handleStartGame() {
        navigate(`/jogo?difficult=${difficult}`);
    }

    const handleChange = (event) => {
        const { name, value } = event.target ? event.target : event

        setDifficult(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // handleStartGame()
    }

  return (
    <>
        <main className="home">
            <header className="header-menu">
                {/* <Logo className="logo-svg"/> */}
                <h1>Minesweeper</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="option-wrapper">
                    <h3>Difficult:</h3>
                        <div className="bttns-wrapper">
                            <input 
                                type="radio" 
                                className="difficult-radio" 
                                name="difficult" 
                                id="easy" 
                                value="easy"
                                checked={difficult === 'easy'}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                className="difficult-radio" 
                                name="difficult" 
                                id="medium" 
                                value="medium"
                                checked={difficult === 'medium'}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                className="difficult-radio" 
                                name="difficult" 
                                id="hard" 
                                value="hard"
                                checked={difficult === 'hard'}
                                onChange={handleChange}
                            />
                        
                            <button className={`bttn ${difficult === 'easy' ? 'active' : ''}`}>
                                <label className="difficult-label" htmlFor="easy">Easy</label>
                            </button>
                            <button className={`bttn ${difficult === 'medium' ? 'active' : ''}`}>
                                <label className="difficult-label" htmlFor="medium">Medium</label>
                            </button>
                            <button className={`bttn ${difficult === 'hard' ? 'active' : ''}`}>
                                <label className="difficult-label" htmlFor="hard">Hard</label>
                            </button>
                        </div>
                </div>
                <input type='submit' className="bttn" onClick={handleStartGame} value={'Start'} />
            </form>
            
        </main>
        <footer className="home-footer">
            <a href="https://github.com/ccostafrias" target="_blank">
                <FaGithub className="svg-footer"/>
            </a>
        </footer>
    </>
  );
}