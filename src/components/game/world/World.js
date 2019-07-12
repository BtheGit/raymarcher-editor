import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const sprites = useSelector(store => store.level.sprites);
  const updateEditorState = useCallback((key, prop) => {
    dispatch(updateEditor(key, prop))
  }, [dispatch]);
  const [ world, saveWorldInstance ] = useState(null);
  async function updateWorld(){
    if(!world){
      const world = await renderWorld(props.WAD);
      const textureList = world.getTextureList();
      const textureMap = world.getTextureMap();
      world.subscribe(action => {
        // We want to also subscribe to listeners to update our store with published changes from the
        // library. Starting with the player position.
        updateEditorState('player', action.payload);
      });
      updateEditorState('textureList', textureList);
      // We probably don't need both of these. But we'll refactor later.
      updateEditorState('textureMap', textureMap);
      saveWorldInstance(world);
    }
    else {
      world.updateMap(props.WAD.map);
      if(sprites){
        console.log(sprites)
        world.updateSprites(sprites);
      }
    }
  };
  useEffect(() => {
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