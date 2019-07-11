import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './CanvasOverlay.css';

const drawPlayer = (ctx) => {

}

const CanvasOverlay = props => {
  const player = useSelector(store => store.level.player);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawPlayer(ctx);
  })
  return (
    <canvas id="grid-editor__canvas" ref={ canvasRef }/>
  )
}

export default CanvasOverlay;