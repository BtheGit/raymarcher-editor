import React from 'react';
import WorldEngine from 'raymarcher';
import './Game.css';

const Game = () => {
  const renderWorld = WorldEngine({
    displayId: "raymarcher-main-display",
    width: 700,
    height: 400,
    editorMode: true,
  });
  const world = renderWorld();
  return (
    <canvas
      id="raymarcher-main-display"
      tabIndex="1"
    ></canvas>
  )
};

export default Game;