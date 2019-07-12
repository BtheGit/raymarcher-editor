import React from 'react';
import { updateSprite } from '../../../../store/reducers/levelReducer';
import { Circle } from 'react-konva';

const Sprite = ({ sprite, mapWidth, mapHeight, canvasSize, dispatch }) => {
  const x = (sprite.pos.x / mapWidth) * canvasSize;
  const y = (sprite.pos.y / mapHeight) * canvasSize;
  return (
    <Circle
      x={ x }
      y={ y }
      radius={ 5 }
      fill="green"
      stroke="black"
      strokeWidth=".5"
      draggable
      onDragMove={e => {
        const { x, y } = e.target.attrs;
        // We need to rescale.
        const scaledX = ((x / canvasSize) * mapWidth).toFixed(2);
        const scaledY = ((y / canvasSize) * mapHeight).toFixed(2);
        const updatedSprite = {
          ...sprite,
          pos: {
            x: scaledX,
            y: scaledY,
          }
        }
        dispatch(updateSprite(updatedSprite));
      }}
    />
  )
}

export default Sprite;