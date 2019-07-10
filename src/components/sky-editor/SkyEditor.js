import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSkyProperties } from '../../store/reducers/levelReducer';
import './SkyEditor.css';

/**
 * MVP:
 * Specify a color, which on submit will change the sky (be a one color stop gradient). No validation.
 * 
 * 2:
 * Validate color (we can use 0-255 for simplicity)
 * 
 * 3:
 * Allow for stop percentage to be specified. Clamp between 0 and 1.
 * 
 * 4:
 * Allow for multiple stops to be added.
 * 
 * 5:
 * Validate stops to ensure they are ordered
 * 
 * 6:
 * This will be when we have textures...
 */

 // NOTES: We need to have a tabbed select screen, like the cell editor. One for color, gradient, and texture.
 // The gradient tab will need to allow for dynamically adding and removing stops (like a todo list). And the stops
 // will need to be validated to make sure they are in the correct sequence.

 const renderImageForm = config => {
   // Before we implement this we'll need to create a separate list for sky textures
  return (
    <div>Texture</div>
  )
 }

 const renderGradientForm = config => {
  return (
    <div>Gradient</div>
  )
 }

 const renderColorForm = (config, updateSkyProperties) => {
  return (
    <form className="sky-editor__color-editor">
      <input 
        type="color" 
        value={`#${ config.color }`}
        onChange={ e => updateSkyProperties({
          textureType: 'color',
          textureConfig: {
            color: e.target.value.substr(1),
          }
        }) }
      />
    </form>
  )
 }

const SkyEditor = () => {
  const sky = useSelector(store => store.level.map.sky);
  const dispatch = useDispatch();
  const updateSkyProperties = useCallback(properties => dispatch(setSkyProperties(properties)), [dispatch]);

  // We're going to operate under the assumption that a sky always exists and that it has a valid config
  // This is because in the future we'll use a JSON schema validator on load to make sure.
  const { textureType, textureConfig } = sky;
  return (
    <div className="sky-editor__container">
      <div className="sky-editor__container-inner">
        <ul className="sky-editor__select-menu">
          <li className={`${ textureType === 'color' ? 'active' : '' }`}>Color</li>
          <li className={`${ textureType === 'image' ? 'active' : '' }`}>Image</li>
          <li className={`${ textureType === 'gradient' ? 'active' : '' }`}>Gradient</li>
        </ul>
        <div className="sky-editor__form-container">
          {
            textureType === 'image'
              ? renderImageForm(textureConfig, updateSkyProperties)
              : textureType === 'gradient'
                ? renderGradientForm(textureConfig, updateSkyProperties)
                : renderColorForm(textureConfig, updateSkyProperties)
          }
        </div>
      </div>
    </div>
  )
}

export default SkyEditor;