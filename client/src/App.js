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
  const [gameId, setGameId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const maxAttempts = 5;

  const fetchClue = useCallback(async () => {
    if (won || gameOver) {
      return;
    }
    if (attempts >= maxAttempts) {
      setGameOver(true);
      return;
    }
    try {
      const response = await fetch(`https://sports-records-api.smhoesman.workers.dev/clue?attempt=${attempts}&gameId=${gameId || ''}`);
      const data = await response.json();
      if (attempts === 0) {
        setClues([]);
        setQuestion(data.question);
      } else {
        setClues(prevClues => [...prevClues, data.clue]);
        // Store answer on last attempt
        if (data.answer) {
          setAnswer(data.answer);
        }
      }
    } catch (error) {
    }
  }, [attempts, maxAttempts, gameId, won, gameOver]);

  useEffect(() => {
    // Start a new game when component mounts
    const startNewGame = async () => {
      try {
        const response = await fetch('https://sports-records-api.smhoesman.workers.dev/new-game', { method: 'POST' });
        const data = await response.json();
        setGameId(data.gameId);
      } catch (error) {
      }
    };
    startNewGame();
  }, []);

  useEffect(() => {
    // Only fetch clue when we have a game ID
    if (gameId) {
      fetchClue();
    }
  }, [fetchClue, gameId, gameOver]);



  const fetchSuggestions = async (query) => {
    try {
      if (!query || query.trim() === '') {
        setSuggestions([]);
        return;
      }

      const response = await fetch(`https://sports-records-api.smhoesman.workers.dev/players/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data.matches)) {
        setSuggestions(data.matches);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    try {
      const value = e.target.value;
      setGuess(value);
      if (value.trim()) {
        fetchSuggestions(value);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setGuess(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleGuess = async (e) => {
    e.preventDefault();
    const cleanGuess = guess.trim();
    if (cleanGuess === '') return;

    // Check if this guess has been made before
    if (previousGuesses.includes(cleanGuess)) {
      setClues(prevClues => [...prevClues, '❌ You already tried that name!']);
      setGuess('');
      return;
    }

    try {
      const response = await fetch('https://sports-records-api.smhoesman.workers.dev/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess, gameId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.error) {
        console.error('Server error:', data.error);
        return;
      }

      if (data.correct === true) { // Explicitly check for true
        // Update state in a single batch
        setWon(true);
        setGameOver(true);
        setClues(prevClues => [...prevClues, '🎉 Correct! You won!']);
        setAttempts(prevAttempts => prevAttempts + 1);
        setPreviousGuesses(prev => [...prev, cleanGuess]);
        return;
      } else if (data.correct === false) { // Explicitly check for false
        setPreviousGuesses(prev => [...prev, cleanGuess]);
        setAttempts(prevAttempts => {
          const newAttempts = prevAttempts + 1;
          if (newAttempts >= maxAttempts) {
            setGameOver(true);
          }
          return newAttempts;
        });
      }
      setGuess('');
    } catch (error) {
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
              <p className="attempts-remaining">
                {maxAttempts - attempts} {maxAttempts - attempts === 1 ? 'attempt' : 'attempts'} remaining
              </p>
              <div className="clues-container">
                {clues.map((clue, index) => (
                  <p key={index} className="clue">
                    <strong>Clue {index + 1}:</strong> {clue}
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
                    placeholder="Type a player's name..."
                    disabled={gameOver}
                    autoComplete="off"
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
                <button type="submit" disabled={gameOver || !guess.trim()}>
                  Submit Guess
                </button>
              </form>
            </>
          ) : (
            <div className="game-over">
              <h2>
                {won ? (
                  <>
                    🎉 Congratulations! You won!
                    <p style={{ fontSize: '1rem', marginTop: '1rem', color: '#64748b' }}>
                      You got it in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}!
                    </p>
                  </>
                ) : (
                  <>
                    Game Over!
                    {answer && (
                      <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: '#ef4444' }}>
                        The answer was: {answer}
                      </p>
                    )}
                  </>
                )}
              </h2>
              <button onClick={async () => {
                try {
                  // Reset all state first
                  setGuess('');
                  setAttempts(0);
                  setGameOver(false);
                  setWon(false);
                  setClues([]);
                  setQuestion('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                  setAnswer(null);
                  setPreviousGuesses([]);

                  // Start new game
                  const response = await fetch('https://sports-records-api.smhoesman.workers.dev/new-game', { method: 'POST' });
                  const data = await response.json();
                  // Set game ID (this will trigger clue fetch through useEffect)
                  setGameId(data.gameId);
                } catch (error) {
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
