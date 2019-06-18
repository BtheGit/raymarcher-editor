import React from 'react';
import { useSelector } from 'react-redux';
import World from './world';
import './Game.css';


const Game = () => {
  const WAD = useSelector(store => store.level);
  // TODO: Validate WAD a bit more rigorously
  return WAD ? <World WAD={ WAD} /> : null
};

export default Game;