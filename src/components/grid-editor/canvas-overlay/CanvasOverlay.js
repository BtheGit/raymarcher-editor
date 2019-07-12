import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, Circle, Text, } from 'react-konva';
import { Sprite, Player } from './elements';
// import Konva from 'konva';
import './CanvasOverlay.css';

// I think we should explore react-canvas or react-konva to handle canvas sprites (potentially also tiles).
// That would make it a lot easier to sync callbacks with drawn elements (dragging a sprite updates it's position
// for example.)

const CANVAS_SIZE = 360;

const CanvasOverlay = () => {
  const dispatch = useDispatch();
  const sprites = useSelector(store => store.level.sprites);
  const map = useSelector(store => store.level.map);
  const activeCell = useSelector(store => store.editor.activeCell);
  const textureMap = useSelector(store => store.editor.textureMap);
  const currentPlayer = useSelector(store => store.editor.player);

  const grid = map.grid;

  const player = currentPlayer ? currentPlayer : map.player;

  const mapHeight = map.grid.length;
  const mapWidth = map.grid[0].length;

  // TODO: Find a dynamic way to determine what size to set the canvas instead of cheating.
  return (
    <Stage width={ CANVAS_SIZE } height={ CANVAS_SIZE } className="overlay-canvas__container">
      <Layer>
        {/* {
          grid.map((row, rowIndex) => {

          })
        } */}
        {
          sprites.map((sprite, i) => {
            return <Sprite 
              key={ i }
              dispatch={ dispatch }
              mapWidth={ mapWidth } 
              mapHeight={ mapHeight } 
              canvasSize={ CANVAS_SIZE } 
              sprite={ sprite }
            />
          })
        }
        <Player
          mapWidth={ mapWidth } 
          mapHeight={ mapHeight } 
          canvasSize={ CANVAS_SIZE }
          player={ player }
        />
      </Layer>
    </Stage>
  )
}

export default CanvasOverlay;