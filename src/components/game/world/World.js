import React, { useState, useEffect } from 'react';
import WorldEngine from 'raymarcher';

const renderWorld = WorldEngine({
  displayId: "raymarcher-main-display",
  width: 600,
  height: 400,
  editorMode: true,
});

const World = props => {
  const [ world, saveWorldInstance ] = useState(null);
  useEffect(() => {
    async function updateWorld(){
      if(!world){
        const world = await renderWorld(props.WAD);
        saveWorldInstance(world);
      }
      else {
        world.updateGrid(props.WAD.map.grid);
      }
    };
    updateWorld();
  });
  return (
    <canvas
      id="raymarcher-main-display"
      tabIndex="1"
    ></canvas>
  )
};

export default World;