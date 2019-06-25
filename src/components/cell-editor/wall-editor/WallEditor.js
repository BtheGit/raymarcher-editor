import React from 'react';
import './WallEditor.css';

// TODO: TODO: TODO: Let's keep a model that we use for this in all components instead
const DEFAULT_TEXTURE_CONFIGS = {
  color: {
    colorType: 'hex',
    color: '00b09b'
  },
  image: {
    name: 'default',
  }
}

const WallEditor = ({ cellCoords, cellProperties, updateCellProperties, textureList }) => {
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

  const handleBaseTextureTypeSwitch = e => {
    // No validation, but must be either 'color', 'image', or (eventually) 'gradient'.
    const textureType = e.target.name;
    const newCellConfig = {
      ...cellProperties,
      textureType,
      textureConfig: DEFAULT_TEXTURE_CONFIGS[textureType],
    };
    updateCellProperties(cellCoords, newCellConfig);
  }

  const handleBaseImageChange = e => {
    const name = e.target.value;
    const newCellConfig = {
      ...cellProperties,
      textureType: 'image',
      textureConfig: {
        ...cellProperties.textureConfig,
        name,
      }
    }
    updateCellProperties(cellCoords, newCellConfig);

  }

  const baseTextureType = cellProperties.textureType;
  
  return (
    <div className="wall-editor__container">
      <h4>Base</h4>
      <div className={`cell-editor__option-box ${ baseTextureType === 'color' ? 'cell-editor__option-box--active' : '' }`}>
        <form>
          <input 
            type="radio" 
            name="color" 
            id="base_texture_type__color"
            checked={ baseTextureType === 'color' }
            onChange={ handleBaseTextureTypeSwitch }
          />
          <label htmlFor="base_texture_type__color">Color</label>
          {/* I'm assuming hex here and that it lacks a hash. Bad! */}
          <input 
            type="color" 
            name="base_color_picker"
            value={ `#${ cellProperties.textureConfig.color }` } 
            onChange={ handleBaseColorChange }
            disabled={ baseTextureType !== 'color' }
          ></input>
        </form>
      </div>
      <div className={ `cell-editor__option-box ${ baseTextureType === 'image' ? 'cell-editor__option-box--active' : '' }` }>
        <form>
          <input 
            type="radio" 
            name="image" 
            id="base_texture_type__texture" 
            checked={ baseTextureType === 'image' }
            onChange={ handleBaseTextureTypeSwitch }
          />
          <label htmlFor="base_texture_type__texture">Image</label>

          <select
            disabled={ baseTextureType !== 'image' }
            value={ cellProperties.textureConfig.name }
            onChange={ handleBaseImageChange }
          >
            <option value="default">Default</option>
            {
              textureList.map((texture, i) => (
                <option value={ texture } key={ i }>{ texture }</option>
              ))
            }
          </select>
        </form>
      </div>
      <hr />
      <h4>Faces</h4>
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