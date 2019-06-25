import React from 'react';
import './FloorEditor.css';

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

const DEFAULT_CEILING_CONFIG = {
  textureType: 'color',
  textureConfig: DEFAULT_TEXTURE_CONFIGS.color,
}

const FloorEditor = ({ cellCoords, cellProperties, updateCellProperties, textureList }) => {
  const floorTextureType = cellProperties.textureType;
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
  };

  const handleFloorImageChange = e => {
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

  const handleFloorTextureTypeSwitch = e => {
    // No validation, but must be either 'color', 'image', or (eventually) 'gradient'.
    const textureType = e.target.name;
    const newCellConfig = {
      ...cellProperties,
      textureType,
      textureConfig: DEFAULT_TEXTURE_CONFIGS[textureType],
    };
    updateCellProperties(cellCoords, newCellConfig);
  }

  // TODO: The following should be able to be rolled into the above functions.
  const handleCeilingColorChange = e => {
    const color = e.target.value;
    // TODO: Until we standardize the color scheme, we'll drop the leading hash. DIRTY!
    const colorMinusHash = color.substr(1);
    const newCellConfig = {
      ...cellProperties,
      ceilingConfig: {
        textureType: 'color',
        textureConfig: {
          colorType: 'hex',
          color: colorMinusHash,
        }
      }
    }
    updateCellProperties(cellCoords, newCellConfig);
  };

  const handleCeilingImageChange = e => {
    const name = e.target.value;
    // TODO: Until we standardize the color scheme, we'll drop the leading hash. DIRTY!
    const newCellConfig = {
      ...cellProperties,
      ceilingConfig: {
        textureType: 'image',
        textureConfig: {
          name,
        }
      }
    }
    updateCellProperties(cellCoords, newCellConfig);
  }

  const handleCeilingTextureTypeSwitch = e => {
    // No validation, but must be either 'color', 'image', or (eventually) 'gradient'.
    const textureType = e.target.name;
    const newCellConfig = {
      ...cellProperties,
      ceilingConfig: {
        textureType,
        textureConfig: DEFAULT_TEXTURE_CONFIGS[textureType],
      },
    };
    updateCellProperties(cellCoords, newCellConfig);
  }


  const handleCeilingToggle = e => {
    const checked = e.target.checked;
    if(!checked){
      const { ceilingConfig, ...rest } = cellProperties;
      updateCellProperties(cellCoords, rest);
    }
    else {
      const newCellConfig = {
        ...cellProperties,
        ceilingConfig: DEFAULT_CEILING_CONFIG,
      }
      updateCellProperties(cellCoords, newCellConfig);
    }
  }

  const renderCeilingEditor = (ceilingConfig) => {
    if(!ceilingConfig) {
      return null;
    }
    const ceilingTextureType = ceilingConfig.textureType;
    return (
      <>
        <div className={ `cell-editor__option-box ${ ceilingTextureType === 'color' ? 'cell-editor__option-box--active' : '' }` }>
          <form>
            <input 
              type="radio" 
              name="color" 
              id="ceiling_texture_type__color"
              checked={ ceilingTextureType === 'color' }
              onChange={ handleCeilingTextureTypeSwitch }
            />
            <label htmlFor="ceiling_texture_type__color">Color</label>
            {/* I'm assuming hex here and that it lacks a hash. Bad! */}
            <input 
              type="color" 
              name="ceiling_color_picker"
              value={ `#${ ceilingConfig.textureConfig.color }` } 
              onChange={ handleCeilingColorChange }
              disabled={ ceilingTextureType !== 'color' }
            ></input>
          </form>
        </div>
        <div className={ `cell-editor__option-box ${ ceilingTextureType === 'image' ? 'cell-editor__option-box--active' : '' }` }>
          <form>
            <input 
              type="radio" 
              name="image" 
              id="ceiling_texture_type__texture" 
              checked={ ceilingTextureType === 'image' }
              onChange={ handleCeilingTextureTypeSwitch }
            />
            <label htmlFor="ceiling_texture_type__texture">Image</label>
    
            <select
              disabled={ ceilingTextureType !== 'image' }
              value={ ceilingConfig.textureConfig.name || 'default' }
              onChange={ handleCeilingImageChange }
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
      </>
    )
  }

  return (
    <div className="floor-editor__container">
      <div className={`cell-editor__option-box ${ floorTextureType === 'color' ? 'cell-editor__option-box--active' : '' }`}>
        <form>
          <input 
            type="radio" 
            name="color" 
            id="floor_texture_type__color"
            checked={ floorTextureType === 'color' }
            onChange={ handleFloorTextureTypeSwitch }
          />
          <label htmlFor="floor_texture_type__color">Color</label>
          {/* I'm assuming hex here and that it lacks a hash. Bad! */}
          <input 
            type="color" 
            name="floor_color_picker"
            value={ `#${cellProperties.textureConfig.color}` } 
            onChange={ handleFloorColorChange }
            disabled={ floorTextureType !== 'color' }
          ></input>
        </form>
      </div>
      <div className={ `cell-editor__option-box ${ floorTextureType === 'image' ? 'cell-editor__option-box--active' : '' }` }>
        <form>
          <input 
            type="radio" 
            name="image" 
            id="floor_texture_type__texture" 
            checked={ floorTextureType === 'image' }
            onChange={ handleFloorTextureTypeSwitch }
          />
          <label htmlFor="floor_texture_type__texture">Image</label>

          <select
            disabled={ floorTextureType !== 'image' }
            value={ cellProperties.textureConfig.name }
            onChange={ handleFloorImageChange }
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
      <hr/>
      <input 
        name="ceilingConfig" 
        id="ceiling_editor_toggle"
        type="checkbox" 
        checked={ cellProperties.ceilingConfig || false } 
        onChange={ handleCeilingToggle }
      ></input>
      <label htmlFor="ceiling_editor_toggle">Ceiling</label>
      { 
        renderCeilingEditor(cellProperties.ceilingConfig)
      }
    </div>

  )
};
export default FloorEditor;