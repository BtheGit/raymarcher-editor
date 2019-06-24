import React from 'react';

const WallEditor = ({ cellCoords, cellProperties, updateCellProperties }) => {
  // TODO: Make custom hook instead of wrapper function. Make it reusable for all faces
  const handleBaseColorChange = e => {
    const color = e.target.value;
    // TODO: Until we standardize the color scheme, we'll drop the leading hash. DIRTY!
    const colorMinusHash = color.substr(1);
    const newCellConfig = {
      ...cellProperties,
      textureConfig: {
        ...cellProperties.textureConfig,
        color: colorMinusHash,
      }
    }
    updateCellProperties(cellCoords, newCellConfig);
  }

  const baseTextureType = cellProperties.textureType;
  
  return (
    <div className="wall-editor__container">
      <h4>Base</h4>
      <label htmlFor="base_texture_type__color">Color</label>
      <input 
        type="color" 
        name="base_texture_type__color" 
        value={ cellProperties.textureConfig.color ? `#${cellProperties.textureConfig.color}` : '#000000' }
        onChange={ handleBaseColorChange }
      ></input>
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