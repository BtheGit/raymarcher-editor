import React from 'react';
import WorldEngine from 'raymarcher';
import { useSelector } from 'react-redux';
import './Game.css';

const Game = () => {
  const WAD = useSelector(store => store.level);
  // TODO: Validate WAD a bit more rigorously
  if(WAD){
    const renderWorld = WorldEngine({
      displayId: "raymarcher-main-display",
      width: 700,
      height: 400,
      editorMode: true,
    });
    const world = renderWorld(WAD);
  }
  return (
    <canvas
      id="raymarcher-main-display"
      tabIndex="1"
    ></canvas>
  )
};

export default Game;