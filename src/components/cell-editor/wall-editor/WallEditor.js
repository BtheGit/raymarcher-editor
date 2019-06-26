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
  const baseTextureType = cellProperties.textureType;

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

  // This is clearly ready for componentization.
  const renderFace = (cellCoords, cellProperties, faceName, textureList) => {
    const faceConfig = cellProperties.faces[faceName];
    if(!faceConfig){
      return null;
    }

    const faceTextureType = faceConfig.textureType;

    // TODO: Make custom hook instead of wrapper function. Make it reusable for all faces
    const handleFaceColorChange = e => {
      const color = e.target.value;
      // TODO: Until we standardize the color scheme, we'll drop the leading hash. DIRTY!
      const colorMinusHash = color.substr(1);
      const newCellConfig = {
        ...cellProperties,
        faces: {
          ...cellProperties.faces,
          [faceName]: {
            textureType: 'color',
            textureConfig: {
              colorType: 'hex',
              color: colorMinusHash,
            }
          },
        }
      }
      updateCellProperties(cellCoords, newCellConfig);
    }

    const handleFaceTextureTypeSwitch = e => {
      // No validation, but must be either 'color', 'image', or (eventually) 'gradient'.
      const textureType = e.target.name;
      const newCellConfig = {
        ...cellProperties,
        faces: {
          ...cellProperties.faces,
          [faceName]: {
            textureType,
            textureConfig: DEFAULT_TEXTURE_CONFIGS[textureType],
          },
        },
      };
      updateCellProperties(cellCoords, newCellConfig);
    }

    const handleFaceImageChange = e => {
      const name = e.target.value;
      const newCellConfig = {
        ...cellProperties,
        faces: {
          ...cellProperties.faces,
          [faceName]: {
            textureType: 'image',
            textureConfig: {
              name,
            },
          },
        },
      }
      updateCellProperties(cellCoords, newCellConfig);
    }

    return (
      <>
        <div className={`cell-editor__option-box ${ faceTextureType === 'color' ? 'cell-editor__option-box--active' : '' }`}>
          <form>
            <input 
              type="radio" 
              name="color" 
              id="face_texture_type__color"
              checked={ faceTextureType === 'color' }
              onChange={ handleFaceTextureTypeSwitch }
            />
            <label htmlFor="face_texture_type__color">Color</label>
            {/* I'm assuming hex here and that it lacks a hash. Bad! */}
            <input 
              type="color" 
              name="face_color_picker"
              value={ `#${ faceConfig.textureConfig.color }` } 
              onChange={ handleFaceColorChange }
              disabled={ faceTextureType !== 'color' }
            ></input>
          </form>
        </div>
        <div className={ `cell-editor__option-box ${ faceTextureType === 'image' ? 'cell-editor__option-box--active' : '' }` }>
          <form>
            <input 
              type="radio" 
              name="image" 
              id="face_texture_type__texture" 
              checked={ faceTextureType === 'image' }
              onChange={ handleFaceTextureTypeSwitch }
            />
            <label htmlFor="face_texture_type__texture">Image</label>

            <select
              disabled={ faceTextureType !== 'image' }
              value={ faceConfig.textureConfig.name }
              onChange={ handleFaceImageChange }
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
    <div className="wall-editor__container">
      <h3>Base</h3>
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
      <h3>Faces</h3>
      {
        ['north', 'west', 'south', 'east'].map(faceName => {
          const face = cellProperties.faces[faceName];

          const handleFaceToggle = e => {
            const checked = e.target.checked;
            if(!checked){
              const { [faceName]: unwantedFace, ...otherFaces } = cellProperties.faces;
              cellProperties.faces = otherFaces;
              updateCellProperties(cellCoords, cellProperties);
            }
            else {
              const { textureType, textureConfig } = cellProperties;
              const newCellConfig = {
                ...cellProperties,
                faces: {
                  ...cellProperties.faces,
                  [faceName]: {
                    textureType,
                    textureConfig,
                  }
                }
              }
              updateCellProperties(cellCoords, newCellConfig);
            }        
          };

          return (
            <>
              <form className="face-editor__container">
                <input 
                  name={ `faceConfig` }
                  id={ `${ faceName }_editor_toggle` }
                  type="checkbox" 
                  checked={ face || false } 
                  onChange={ handleFaceToggle }
                ></input>
                <label htmlFor={ `${ faceName }_editor_toggle` } className="face-editor__header">{ faceName }</label>
                { 
                  renderFace(cellCoords, cellProperties, faceName, textureList)
                }
              </form>
            </>
          )
        })
      }
    </div>
  )
};
export default WallEditor;