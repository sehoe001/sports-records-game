import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [clues, setClues] = useState([]);
  const [question, setQuestion] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const maxAttempts = 5;

  const fetchClue = useCallback(async () => {
    if (attempts < maxAttempts) {
      try {
        const response = await fetch(`https://sports-records-api.smhoesman.workers.dev/clue?attempt=${attempts}`);
        const data = await response.json();
        if (attempts === 0) {
          setClues([data.clue]);
          setQuestion(data.question);
        } else {
          setClues(prevClues => [...prevClues, data.clue]);
        }
      } catch (error) {
        console.error('Error fetching clue:', error);
      }
    }
  }, [attempts, maxAttempts]);

  useEffect(() => {
    fetchClue();
  }, [fetchClue]);



  const fetchSuggestions = async (query) => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://sports-records-api.smhoesman.workers.dev/players/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSuggestions(data.matches);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setGuess(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleGuess = async (e) => {
    e.preventDefault();
    if (guess.trim() === '') return;

    try {
      const response = await fetch('https://sports-records-api.smhoesman.workers.dev/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess }),
      });
      const data = await response.json();

      if (data.correct) {
        setWon(true);
        setGameOver(true);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= maxAttempts) {
          setGameOver(true);
        }
      }
      setGuess('');
    } catch (error) {
      console.error('Error submitting guess:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sports Records Trivia</h1>
        <div className="game-container">
          <h2 className="question">{question}</h2>
          {!gameOver ? (
            <>
              <p>Attempts remaining: {maxAttempts - attempts}</p>
              <div className="clues-container">
                {clues.map((clue, index) => (
                  <p key={index} className="clue">
                    Clue {index + 1}: {clue}
                  </p>
                ))}
              </div>
              <form onSubmit={handleGuess} className="guess-form">
                <div className="input-container">
                  <input
                    type="text"
                    value={guess}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Enter your guess"
                    disabled={gameOver}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button type="submit" disabled={gameOver}>
                  Submit Guess
                </button>
              </form>
            </>
          ) : (
            <div className="game-over">
              <h2>{won ? 'Congratulations! You won!' : 'Game Over!'}</h2>
              <button onClick={async () => {
                try {
                  await fetch('https://sports-records-api.smhoesman.workers.dev/new-game', { method: 'POST' });
                  setGuess('');
                  setAttempts(0);
                  setGameOver(false);
                  setWon(false);
                  setClues([]);
                  setQuestion('');
                  fetchClue();
                } catch (error) {
                  console.error('Error starting new game:', error);
                }
              }}>Play Again</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
