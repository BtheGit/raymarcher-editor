import React from 'react';
import WorldEngine from 'raymarcher';

const Game = () => {
  // const canvasRef = React.useRef(null);
  // console.log(canvasRef);
  const renderWorld = WorldEngine({
    displayId: "raymarcher-main-display",
    width: 500,
    height: 300,
  });
  const world = renderWorld();
  return (
    <>
      <p>Game</p>
      <canvas
        id="raymarcher-main-display"
      ></canvas>
    </>
  )
};

export default Game;