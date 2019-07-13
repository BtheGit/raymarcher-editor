import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveCell } from '../../store/reducers/editorReducer';
import { loadTextures } from '../../store/reducers/textureReducer';
import { getCellType } from '../../utilities';
import CanvasOverlay from './canvas-overlay';
import './GridEditor.css';

const getStyleConfig = (cellConfig, textureMap) => {
  if (!cellConfig){
    return {};
  }

  const textureType = cellConfig.textureType;
  if (textureType === 'color') {
    return {
      fill: '#' + cellConfig.textureConfig.color,
    };
  }
  else {
    const imageName = cellConfig.textureConfig.name;
    const imageData = textureMap[imageName];
    const imagePath = imageData ? imageData.rawImage.src : '';
    return {
      background: `url(${ imagePath })`,
      backgroundSize: 'cover',
      fill: 'inherit',
    }
  }
}

const GridEditor = () => {
  // We want to preload all the textures. This is memory intensive, but it's a step up from generating new image for
  // each cell. We'll use a spinner until all the images are generated.
  const dispatch = useDispatch();
  const textures = useSelector(store => store.level.textures);
  useEffect(() => {
    // TODO: This loads all the textures in memory and is not ideal, especially as we are not currently
    // using this map.
    dispatch(loadTextures(textures));
  })

  // Ha, I hope we can fix this soon.
  const level = useSelector(store => store.level);
  const activeCell = useSelector(store => store.editor.activeCell);
  const textureMap = useSelector(store => store.editor.textureMap);
  const isActiveCell = (x, y) => {
    if(!activeCell) {
      return false;
    }
    if(activeCell.x === x && activeCell.y === y) {
      return true;
    }
    return false;
  }
  const map = level.map;
  const grid = map.grid;
  const selectCell = useCallback((x, y) => {
    // Calculate the current cell type to update the cell editor view.
    const cell = grid[y][x];
    const cellType = getCellType(cell);
    dispatch(selectActiveCell(x, y, cellType));
  }, [dispatch, grid]);
  // We'll add in components of course later
  const generateGridCells = grid => {
    return grid.map((row, rowIndex) => {
      return(
        <div className="grid-editor__row" key={ rowIndex }>
          {
            row.map((cell, columnIndex) => {
              if(cell.type === 'floor') {
                if(cell.textureType === 'color') {
                  // We're going to start assuming hex and refactor everything else to match.
                  const color = '#' + cell.textureConfig.color
                  return (
                    <div 
                      className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                      key={ columnIndex } 
                      style={{ background: color }} 
                      onClick={ () => selectCell(columnIndex, rowIndex) }
                    ></div>
                    )
                  }
                  else {
                    const imageName = cell.textureConfig.name;
                    const imageData = textureMap[imageName];
                    const imagePath = imageData ? imageData.rawImage.src : '';
                    return (
                      <div 
                        className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                        key={ columnIndex } 
                        style={{ background: `url(${ imagePath })`, backgroundSize: 'cover' }} 
                        onClick={ () => selectCell(columnIndex, rowIndex) }
                      ></div>
                    )
                  }
                }
              else {
                // Walls are a trickier beast. We need to render a base texture background or fall back to the color.
                // Then for each wall we need to rinse and repeat.

                // For the first MVP, we'll just use colors. If there is a texture code, we'll use a hardcoded fallback.
                if(cell.textureConfig == undefined){
                  throw new Error('Missing textureConfig property');
                }

                const baseStyleConfig = getStyleConfig(cell, textureMap);
                const hasBGTexture = baseStyleConfig.hasOwnProperty('background');
                const { faces } = cell;
                const baseFaceStyleConfig = {
                  // stroke: 'black',
                  // strokeWidth: 2,
                  // strokeLinejoin: 'round',
                  fill: hasBGTexture ? 'none' : 'inherit',
                };

                const facePaths = [
                  {
                    face: 'north',
                    points: '0,0 50,50 100,0',
                    style: {
                      ...baseFaceStyleConfig,
                      ...getStyleConfig(faces['north'], textureMap),
                    },
                  },
                  {
                    face: 'west',
                    points: '0,0 50,50 0,100',
                    style: {
                      ...baseFaceStyleConfig,
                      ...getStyleConfig(faces['west'], textureMap),
                    },
                  },
                  {
                    face: 'south',
                    points: '0,100 50,50 100,100',
                    style: {
                      ...baseFaceStyleConfig,
                      ...getStyleConfig(faces['south'], textureMap),
                    },
                  },
                  {
                    face: 'east',
                    points: '100,0 50,50 100,100',
                    style: {
                      ...baseFaceStyleConfig,
                      ...getStyleConfig(faces['east'], textureMap),
                    },
                  },
                ];
      
                return (
                  <div 
                    className={ `grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }` }
                    key={ columnIndex } 
                    style={ baseStyleConfig } 
                    onClick={ () => selectCell(columnIndex, rowIndex) }
                  >
                    {
                        <svg className="grid-editor__cell-wall" viewBox='0 0 100 100'>
                          {
                            facePaths.map(({ points, style }, i) => <polygon points={ points } style={ style } key={ i }/>)
                          }
                        </svg>
                    }
                  </div>
                )
              }
            })
          }
        </div>
      )
    })
  };

  return(
    <div className="grid-editor__container">
      <div className="grid-editor__grid-container">
        { generateGridCells(grid) }
        {
          textures
            ? <CanvasOverlay />
            : <div>SPINNER</div>

        }
      </div>
    </div>
  )
};

export default GridEditor;