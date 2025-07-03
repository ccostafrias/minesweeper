import { useNavigate } from "react-router-dom";
import { useDifficulty } from '../contexts/DifficultyContext';
import "../styles/Home.css"

export default function Home() {
    const { difficulty, setDifficulty } = useDifficulty();
    const navigate = useNavigate();

    function handleStartGame() {
        navigate(`/jogo?difficulty=${difficulty}`);
    }

    const handleChange = (event) => {
        const { value } = event.target ? event.target : event

        setDifficulty(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // handleStartGame()
    }

    function handleKeyDown(event, dif) {
        if (event.key === 'Enter') {
            setDifficulty(dif)
        }
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
                                checked={difficulty === 'easy'}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                className="difficult-radio" 
                                name="difficult" 
                                id="medium" 
                                value="medium"
                                checked={difficulty === 'medium'}
                                onChange={handleChange}
                            />
                            <input 
                                type="radio" 
                                className="difficult-radio" 
                                name="difficult" 
                                id="hard" 
                                value="hard"
                                checked={difficulty === 'hard'}
                                onChange={handleChange}
                            />
                        
                            <button className={`bttn ${difficulty === 'easy' ? 'active' : ''}`} onKeyDown={(e) => handleKeyDown(e, 'easy')}>
                                <label className="difficult-label" htmlFor="easy">Easy</label>
                            </button>
                            <button className={`bttn ${difficulty === 'medium' ? 'active' : ''}`} onKeyDown={(e) => handleKeyDown(e, 'medium')}>
                                <label className="difficult-label" htmlFor="medium">Medium</label>
                            </button>
                            <button className={`bttn ${difficulty === 'hard' ? 'active' : ''}`} onKeyDown={(e) => handleKeyDown(e, 'hard')}>
                                <label className="difficult-label" htmlFor="hard">Hard</label>
                            </button>
                        </div>
                </div>
                <input type='submit' className="bttn" onClick={handleStartGame} value={'Start'} />
            </form>
            
        </main>
    </>
  );
}