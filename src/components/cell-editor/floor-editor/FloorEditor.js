import React from 'react';
import './FloorEditor.css';

const FloorEditor = ({ cellCoords, cellProperties, updateCellProperties }) => {
  
  // TODO: Make custom hook instead of wrapper function. Make it reusable for all cell properties
  const handleFloorColorChange = e => {
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

  const floorTextureType = cellProperties.textureType;

  return (
    <div className="floor-editor__container">
      <h4>Floor</h4>
      <input type="radio" name="floor_texture_type__color" id="floor_texture_type__color" checked={ floorTextureType === 'color' }/>
      <label htmlFor="floor_texture_type__color">Color</label>

      {/* <label htmlFor="floor_color_picker">Color</label> */}
      {/* I'm assuming hex here and that it lacks a hash. Bad! */}
      <input type="color" name="floor_color_picker" value={ `#${cellProperties.textureConfig.color}` } onChange={ handleFloorColorChange }></input>

      <input type="radio" name="floor_texture_type__texture" id="floor_texture_type__texture" checked={ floorTextureType === 'texture' }/>
      <label htmlFor="floor_texture_type__texture">Texture</label>
      
      {/* <input type="number" min="0" max="5" name="floor_texture" value={ floorFormState.texture }></input> */}

      <h4>Ceiling</h4>
      {/* ceiling toggle */}
      {/* */}
      {/* <label htmlFor="ceiling_texture">Color</label>
      <input type="number" min="0" max="5" name="ceiling_texture" value={ floorFormState.ceiling.texture }></input> */}

    </div>
  )
};
export default FloorEditor;