import React from 'react';
import { Circle, Line } from 'react-konva';

const Player = ({ player, mapWidth, mapHeight, canvasSize }) => {
  if(!player){
    return null;
  }
  const relativePlayerX = (player.pos.x / mapWidth) * canvasSize;
  const relativePlayerY = (player.pos.y / mapHeight) * canvasSize;
  const relativePlayerDirX = ((player.pos.x + player.dir.x) / mapWidth) * canvasSize;
  const relativePlayerDirY = ((player.pos.y + player.dir.y) / mapHeight) * canvasSize;
  return (
    <>
      <Circle
        x={ relativePlayerX }
        y={ relativePlayerY }
        radius={ 5 }
        fill="white"
      />
      <Line
        points={ [relativePlayerX, relativePlayerY, relativePlayerDirX, relativePlayerDirY] }
        stroke="white"
      />
    </>
  )
}

export default Player;