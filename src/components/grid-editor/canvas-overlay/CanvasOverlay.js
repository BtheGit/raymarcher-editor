import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './CanvasOverlay.css';

const drawPlayer = (canvas, player, mapWidth, mapHeight) => {
  if(player){
    const ctx = canvas.getContext('2d');
    const relativePlayerX = (player.pos.x / mapWidth) * canvas.width;
    const relativePlayerY = (player.pos.y / mapHeight) * canvas.height;
    // We're going to need to handle all the draws to the canvas (sprites)
    // in one place. For now, let's clear the thing here.
    ctx.clearRect(0,0,canvas.width, canvas.height);

    // Draw player dot
    // TODO: Handle distortion.
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(relativePlayerX, relativePlayerY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw player direction
    const relativePlayerDirX = ((player.pos.x + player.dir.x) / mapWidth) * canvas.width;
    const relativePlayerDirY = ((player.pos.y + player.dir.y) / mapHeight) * canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(relativePlayerX, relativePlayerY);
    ctx.lineTo(relativePlayerDirX, relativePlayerDirY);
    ctx.closePath();
    ctx.stroke();
  }
}

const CanvasOverlay = props => {
  const player = useSelector(store => store.editor.player);
  const map = useSelector(store => store.level.map);

  const mapHeight = map.grid.length;
  const mapWidth = map.grid[0].length;
  const initialPlayerPos = map.player;

  const canvasRef = useRef(null);

  const drawScreen = () => {
    const canvas = canvasRef.current;
    if(!player){
      drawPlayer(canvas, initialPlayerPos, mapWidth, mapHeight);
    }
    else {
      drawPlayer(canvas, player, mapWidth, mapHeight);
    }
    // TODO: Draw Sprites
  }
  
  useEffect(drawScreen);
  // TODO: Find a dynamic way to determine what size to set the canvas instead of cheating.
  return (
    <canvas id="grid-editor__canvas" ref={ canvasRef } height="360" width="360" />
  )
}

export default CanvasOverlay;