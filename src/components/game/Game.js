import React from 'react';
import WorldEngine from 'raymarcher';
import './Game.css';

const Game = () => {
  // const canvasRef = React.useRef(null);
  // console.log(canvasRef);
  const renderWorld = WorldEngine({
    displayId: "raymarcher-main-display",
    width: 700,
    height: 400,
  });
  const world = renderWorld();
  return (
    <>
      <canvas
        id="raymarcher-main-display"
      ></canvas>
    </>
  )
};

export default Game;