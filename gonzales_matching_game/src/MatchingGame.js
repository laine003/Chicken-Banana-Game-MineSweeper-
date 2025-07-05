import React, { useState, useEffect } from 'react';
import './App.css';

const bananaUrl = 'https://cdn.dribbble.com/userupload/8375514/file/original-90dcc568e41965849c37a596a1f4bc3e.png?crop=0x284-2133x1884&format=webp&resize=400x300&vertical=center';
const chickenUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQgxghfvWm2QPVl2ACaYYXZxBDx_cT1YGPVg&s';

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
  const [clickedBanana, setClickedBanana] = useState([]);
  const [clickedChicken, setClickedChicken] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(null); 
  const [gameOver, setGameOver] = useState(false); 

  useEffect(() => {
    const bananaTiles = Array(18).fill(bananaUrl);
    const chickenTiles = Array(18).fill(chickenUrl);
    const shuffled = shuffleArray([...bananaTiles, ...chickenTiles]);
    setImages(shuffled);
  }, []);

  const handleTileClick = (index) => {
    if (flipped[index] || gameOver) return; 

    const currentImage = images[index];
    const isBanana = currentImage === bananaUrl;
    const isChicken = currentImage === chickenUrl;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    if (playerChoice === 'banana' && isBanana) {
      setClickedBanana((prev) => [...prev, index]);
    } else if (playerChoice === 'chicken' && isChicken) {
      setClickedChicken((prev) => [...prev, index]);
    } else {
      setGameOver(true); 
    }
  };

  const getProgressPercentage = (clickedTiles) => {
    return ((clickedTiles.length / 18) * 100).toFixed(2);
  };

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
  };

  return (
    <div className="container">
      <h1>🐔 Chicken vs Banana 🍌</h1>

      {playerChoice === null ? (
        <div className="player-choice">
          <button onClick={() => handlePlayerChoice('banana')}>Choose Banana</button>
          <button onClick={() => handlePlayerChoice('chicken')}>Choose Chicken</button>
        </div>
      ) : (
        <div className="progress">
          {playerChoice === 'banana' && (
            <div>
              <strong>Banana Progress: </strong>
              <span>{getProgressPercentage(clickedBanana)}%</span>
            </div>
          )}
          {playerChoice === 'chicken' && (
            <div>
              <strong>Chicken Progress: </strong>
              <span>{getProgressPercentage(clickedChicken)}%</span>
            </div>
          )}
        </div>
      )}

      {gameOver && (
        <div className="game-over">
          {playerChoice === 'banana' ? (
            <h2>Oops! You clicked a Chicken tile. Chicken Wins!</h2>
          ) : (
            <h2>Oops! You clicked a Banana tile. Banana Wins!</h2>
          )}
        </div>
      )}

      <div className="grid">
        {images.map((img, index) => (
          <div
            key={index}
            className={`square ${flipped[index] ? 'flipped' : ''}`}
            onClick={() => handleTileClick(index)}
            style={{ pointerEvents: playerChoice === null ? 'none' : 'auto' }} 
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
