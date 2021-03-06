import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSkyProperties } from '../../store/reducers/levelReducer';
import { clamp } from '../../utilities';
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

const DEFAULT_SKY_COLOR = {
  textureType: 'color',
  textureConfig: {
    color: '00ccdf'
  },
};

const DEFAULT_SKY_GRADIENT = {
  textureType: 'gradient',
  textureConfig: {
    stops: [
      {
        stop: 0,
        color: "#7AA1D2"
      },
      {
        stop: .8,
        color: "#DBD4B4"
      },
    ]
  }
};

const DEFAULT_SKY_IMAGE = {
  textureType: 'image',
  textureConfig: {
    name: 'background__clouds1'
  }
};

 const renderImageForm = (textureMap, textureList, textureConfig, updateSkyProperties) => {
  const imageName = textureConfig.name;
  const imageData = textureMap[imageName];
  const imagePath = imageData ? imageData.rawImage.src : '';
  // Before we implement this we'll need to create a separate list for sky textures
  // For the meantime, we can use a dumb naming scheme to regex against a leading 'background'.
  // TODO: Temp:
  const backgroundsList = textureList.filter(name => name.match(/^background__/));
  return (
    <form className="sky-editor__image-editor">
      <p>{ imageName }</p>
      <div className="image-preview__container">
        <img className="image-preview__image" src={ imagePath }/>
      </div>
      <select
        value={ imageName }
        onChange={ e => {
          const name = e.target.value
          updateSkyProperties({
            textureType: 'image',
            textureConfig: {
              name,
            },
          });
        } }
      >
        {
          backgroundsList.map((texture, i) => (
            <option value={ texture } key={ i }>{ texture }</option>
          ))
        }
      </select>
    </form>
  )
 }

 const renderGradientForm = (config, updateSkyProperties) => {
  const { stops } = config;
  // We want to update a specific stops properties based on the index.
  const updateStops = (baseStops, index, stop, color) => baseStops.map((baseStop, i) => i === index ? { stop, color } : baseStop);
  return (
    <div className="sky-editor__gradient-editor">
      <form>
        {
          stops.map(({ stop, color }, i) => {
            return (
              <div key={ i } className="stop-editor__container">
                <input 
                  type="number" 
                  value={ stop } 
                  min="0" 
                  max="1"
                  step=".01"
                  onChange={ e => {
                    const clamped = clamp(e.target.value, 0, 1);
                    // TODO: Clamp value between previous and next stop
                    const newStops = updateStops(stops, i, clamped, color);
                    updateSkyProperties({
                      textureType: 'gradient',
                      textureConfig: {
                        stops: newStops,
                      }
                    });
                  }}
                  ></input>
                <input 
                  type="color" 
                  value={ color }
                  onChange={ e => {
                    const newStops = updateStops(stops, i, stop, e.target.value);
                    updateSkyProperties({
                      textureType: 'gradient',
                      textureConfig: {
                        stops: newStops,
                      }
                    });
                  }}
                ></input>
                <div 
                  className="stop-editor__button-close" 
                  tabIndex="0"
                  onClick={() => {
                    const newStops = stops.filter((_, idx) => idx !== i);
                    updateSkyProperties({
                      textureType: 'gradient',
                      textureConfig: {
                        stops: newStops,
                      }
                    });
                  }}
                >X</div>
              </div>
            )
          })
        }
      </form>
      <div 
        className="stop-editor__button-new"
        onClick={() => {
          // Add a copy of the last stop as a new last stop.
          const newStop = stops[stops.length - 1];
          const newStops = [ ...stops, newStop ];
          updateSkyProperties({
            textureType: 'gradient',
            textureConfig: {
              stops: newStops,
            }
          });
        }}
      >+</div>
    </div>
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
  const textureMap = useSelector(store => store.editor.textureMap);
  const textureList = useSelector(store => store.editor.textureList);
  const dispatch = useDispatch();
  const updateSkyProperties = useCallback(properties => dispatch(setSkyProperties(properties)), [dispatch]);

  // We're going to operate under the assumption that a sky always exists and that it has a valid config
  // This is because in the future we'll use a JSON schema validator on load to make sure.
  const { textureType, textureConfig } = sky;
  return (
    <div className="sky-editor__container">
      <div className="sky-editor__container-inner">
        <div className="sky-editor__header">Sky Editor</div>
        <ul className="sky-editor__select-menu">
          <li 
            className={`${ textureType === 'color' ? 'active' : '' }`} 
            tabIndex="0"
            onClick={ () => updateSkyProperties(DEFAULT_SKY_COLOR) }
          >Color</li>
          <li 
            className={`${ textureType === 'image' ? 'active' : '' }`} 
            tabIndex="0"
            onClick={ () => updateSkyProperties(DEFAULT_SKY_IMAGE) }
          >Image</li>
          <li 
            className={`${ textureType === 'gradient' ? 'active' : '' }`} 
            tabIndex="0"
            onClick={ () => updateSkyProperties(DEFAULT_SKY_GRADIENT) }
          >Gradient</li>
        </ul>
        <div className="sky-editor__form-container">
          {
            textureType === 'image'
              ? renderImageForm(textureMap, textureList, textureConfig, updateSkyProperties)
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