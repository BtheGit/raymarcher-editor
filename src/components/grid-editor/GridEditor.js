import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveCell } from '../../store/reducers/editorReducer';
import { getCellType } from '../../utilities';
import './GridEditor.css';

const GridEditor = () => {
  // Ha, I hope we can fix this soon.
  const level = useSelector(store => store.level);
  const activeCell = useSelector(store => store.editor.activeCell);
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
  const dispatch = useDispatch();
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
                    // There are two problems here.
                    // a) We don't have the image file extension types.
                    // b) default is not an image file name.
                    // TODO: To be continued...
                    const image = cell.textureConfig.name;
                    const imagePath = process.env.PUBLIC_URL + '/textures/' + image;
                    return (
                      <div 
                      className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                      key={ columnIndex } 
                      style={{ background: `url(${imagePath})` }} 
                      onClick={ () => selectCell(columnIndex, rowIndex) }
                      ></div>
                    )
                  }
                }
              else {
                // TODO: All the stuff.

                // We are going to ignore faces, the editor view will only show the default face for now.
                const cellTextureType = cell.textureType;
                // For the first MVP, we'll just use colors. If there is a texture code, we'll use a hardcoded fallback.
                if(cell.textureConfig == undefined){
                  debugger
                  throw new Error('Missing textureConfig property');
                }
                const baseColor = cellTextureType === 'color' ? '#' + cell.textureConfig.color : 'cornflowerblue';
                const { faces } = cell;
                const northColor = (faces.north || {}).textureType === 'color' ? '#' + faces.north.textureConfig.color : baseColor;
                const eastColor = (faces.east || {}).textureType === 'color' ? '#' + faces.east.textureConfig.color : baseColor;
                const southColor = (faces.south || {}).textureType === 'color' ? '#' + faces.south.textureConfig.color : baseColor;
                const westColor = (faces.west || {}).textureType === 'color' ? '#' + faces.west.textureConfig.color : baseColor;
      
                return (
                  <div 
                    className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                    key={ columnIndex } 
                    style={{ background: baseColor }} 
                    onClick={ () => selectCell(columnIndex, rowIndex) }
                  >
                    {
                      cell.type === 'wall' &&
                        <svg className="grid-editor__cell-wall" viewBox='0 0 100 100'>
                          <polygon points='0,0 50,50 100,0' style={{ fill: northColor, stroke: 'black', strokeWidth: '2', strokeLinejoin: 'round' }} />
                          <polygon points='0,0 50,50 0,100' style={{ fill: westColor, stroke: 'black', strokeWidth: '2', strokeLinejoin: 'round' }} />
                          <polygon points='0,100 50,50 100,100' style={{ fill: southColor, stroke: 'black', strokeWidth: '2', strokeLinejoin: 'round' }} />
                          <polygon points='100,0 50,50 100,100' style={{ fill: eastColor, stroke: 'black', strokeWidth: '2', strokeLinejoin: 'round' }} />
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
      </div>
    </div>
  )
};

export default GridEditor;