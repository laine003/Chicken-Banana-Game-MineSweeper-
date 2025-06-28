import React, { useState, useEffect } from 'react';
import './App.css';

const bananaUrl = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';
const chickenUrl = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';

const imageUrls = {
  banana: bananaUrl,
  chicken: chickenUrl,
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Matchy() {
  const [images, setImages] = useState([]);
  const [flipped, setFlipped] = useState(Array(36).fill(false));
  const [player1, setPlayer1] = useState(null); 
  const [player2, setPlayer2] = useState(null);
  const [turn, setTurn] = useState(null); 
  const [clickedBanana, setClickedBanana] = useState([]);
  const [clickedChicken, setClickedChicken] = useState([]);
  const [mistake, setMistake] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const bananaTiles = Array(18).fill(bananaUrl);
    const chickenTiles = Array(18).fill(chickenUrl);
    const shuffled = shuffleArray([...bananaTiles, ...chickenTiles]);
    setImages(shuffled);
  }, []);

  const handleCharacterSelect = (choice) => {
    const other = choice === 'banana' ? 'chicken' : 'banana';
    setPlayer1(choice);
    setPlayer2(other);
    setTurn(choice); 
  };

  const handleTileClick = (index) => {
    if (flipped[index] || gameOver || !turn) return;

    const currentImage = images[index];
    const currentPlayerUrl = imageUrls[turn];

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    if (currentImage !== currentPlayerUrl) {
      // Mistake made
      setMistake(true);
      setGameOver(true);
      setWinner(turn === 'banana' ? 'chicken' : 'banana');
    } else {
      if (turn === 'banana') {
        const newClicks = [...clickedBanana, index];
        setClickedBanana(newClicks);
        if (newClicks.length === 18) {
          setGameOver(true);
          setWinner('banana');
          return;
        }
      } else {
        const newClicks = [...clickedChicken, index];
        setClickedChicken(newClicks);
        if (newClicks.length === 18) {
          setGameOver(true);
          setWinner('chicken');
          return;
        }
      }
    
      setTurn(turn === 'banana' ? 'chicken' : 'banana');
    }
  };

  return (
    <div className="container">
      <h1>🐔 Chicken vs Banana 🍌</h1>

      {!player1 && (
        <div className="player-select">
          <p>Select your character (Player 1):</p>
          <button onClick={() => handleCharacterSelect('banana')}>🍌 Banana</button>
          <button onClick={() => handleCharacterSelect('chicken')}>🐔 Chicken</button>
        </div>
      )}

      {player1 && !gameOver && (
        <div className="turn-header">
          <p>Player 1: <strong>{player1.toUpperCase()}</strong> | Player 2: <strong>{player2.toUpperCase()}</strong></p>
          <h2>🕹️ It's {turn.toUpperCase()}'s turn</h2>
        </div>
      )}

      {gameOver && (
        <h2 className="result">
          🎉 Winner: {winner.toUpperCase()}!{" "}
          {mistake
            ? `(Opponent clicked the wrong tile)`
            : `(Clicked all 18 correctly)`}
        </h2>
      )}

      <div className="grid">
        {images.map((img, index) => (
          <div
            key={index}
            className={`square ${flipped[index] ? 'flipped' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {flipped[index] ? (
              <img src={img} alt="Tile" className="square-img" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matchy;
