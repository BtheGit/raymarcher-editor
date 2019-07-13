import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { Sprite, Player, Cell } from './elements';
import './CanvasOverlay.css';

const CANVAS_SIZE = 360;

const CanvasOverlay = () => {
  const dispatch = useDispatch();
  const sprites = useSelector(store => store.level.sprites);
  const map = useSelector(store => store.level.map);
  // const activeCell = useSelector(store => store.editor.activeCell);
  // const textureMap = useSelector(store => store.editor.textureMap);
  const currentPlayer = useSelector(store => store.editor.player);

  // const grid = map.grid;

  const player = currentPlayer ? currentPlayer : map.player;

  const mapHeight = map.grid.length;
  const mapWidth = map.grid[0].length;

  // TODO: Find a dynamic way to determine what size to set the canvas instead of cheating.
  return (
    <Stage width={ CANVAS_SIZE } height={ CANVAS_SIZE } className="overlay-canvas__container">
      <Layer>
        {/* // TODO: */}
        {/* {
          grid.map((row, rowIndex) => row.map((cell, columnIndex) => (
            <Cell 
              key={`${ rowIndex }x${ columnIndex }`} 
              cell={ cell }
              textureMap={ textureMap }
              mapHeight={ mapHeight }
              mapWidth={ mapWidth }
              row={ rowIndex }
              column={ columnIndex }
              canvasSize={ CANVAS_SIZE }
            />
          )))
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