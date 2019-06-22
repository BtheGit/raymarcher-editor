import React from 'react';
import { useSelector } from 'react-redux';

const FloorEditor = () => {
  const floorFormState = useSelector(store => store.editor.floorEditor);
  return (
    <div className="floor-editor__container">
      <h4>Floor Texture</h4>
      <label htmlFor="floor_texture">Color</label>
      <input type="number" min="0" max="5" name="floor_texture" value={ floorFormState.texture }></input>
      <h4>Ceiling</h4>
      {/* ceiling toggle */}
      {/* */}
      <label htmlFor="ceiling_texture">Color</label>
      <input type="number" min="0" max="5" name="ceiling_texture" value={ floorFormState.ceiling.texture }></input>

    </div>
  )
};
export default FloorEditor;