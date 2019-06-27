import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateEditor } from '../../../store/reducers/editorReducer';
import WorldEngine from 'raymarcher';

const renderWorld = WorldEngine({
  displayId: "raymarcher-main-display",
  width: 600,
  height: 400,
  editorMode: true,
});

const World = props => {
  const dispatch = useDispatch();
  const updateEditorState = useCallback((key, prop) => {
    dispatch(updateEditor(key, prop))
  }, [dispatch]);
  const [ world, saveWorldInstance ] = useState(null);
  useEffect(() => {
    async function updateWorld(){
      if(!world){
        const world = await renderWorld(props.WAD);
        const textureList = world.getTextureList();
        const textureMap = world.getTextureMap();
        updateEditorState('textureList', textureList);
        // We probably don't need both of these. But we'll refactor later.
        updateEditorState('textureMap', textureMap);
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