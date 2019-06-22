import React from 'react';
import { useSelector } from 'react-redux';

const WallEditor = () => {
  const wallFormState = useSelector(store => store.editor.wallEditor);
  return (
    <div className="wall-editor__container">
      <h4>Base Texture</h4>
      <label htmlFor="base_texture">Color</label>
      <input type="number" min="0" max="5" name="base_texture" value={ wallFormState.texture }></input>
      <h4>Individual Faces</h4>
      { /* Add checkboxes to enable a face */}
      { /* Replace numbers with three 0-255 fields (rgb) */}
      <h5>North</h5>
      <label htmlFor="north_texture">Color</label>
      <input type="number" min="0" max="5" name="north_texture"></input>
      <h5>West</h5>
      <label htmlFor="west_texture">Color</label>
      <input type="number" min="0" max="5" name="west_texture"></input>
      <h5>South</h5>
      <label htmlFor="south_texture">Color</label>
      <input type="number" min="0" max="5" name="south_texture"></input>
      <h5>East</h5>
      <label htmlFor="east_texture">Color</label>
      <input type="number" min="0" max="5" name="east_texture"></input>
    </div>
  )
};
export default WallEditor;