import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveCell } from '../../store/reducers/editorReducer';
import { getCellType } from '../../utilities';
import './GridEditor.css';



// We'll need to have a store of default colors.
const colors = ['rgba(255,255,255,0.2)', 'hotpink']

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
              // We need to start handling complex cells. All cells are either a number or have a base texture key. That should
              // be enough for now (until real textures are used.)

              // We are going to ignore faces, the editor view will only show the default face for now.
              const cellTextureType = cell.textureType;
              // For the first MVP, we'll just use colors. If there is a texture code, we'll use a hardcoded fallback.
              if(cell.textureConfig == undefined){
                throw new Error('Missing textureConfig property');
              }
              const cellColorConfig = cellTextureType === 'color' ? cell.textureConfig : {};
              const colorType = cellColorConfig.colorType;
              let color;
              switch(colorType){
                case 'hex':
                  const hasLeadingHash = cellColorConfig.color[0] === '#';
                  color = hasLeadingHash ? cellColorConfig.color : '#' + cellColorConfig.color;
                  break;
                case 'hsl':
                  const defaultHSL = {
                    h: 25,
                    s: 100,
                    l: 50,
                  }
                  const mergedHSL = { ...defaultHSL, ...cellColorConfig.color }
                  color = `hsl(${ mergedHSL.h }, ${ mergedHSL.s }%, ${ mergedHSL.l }%)`;
                  break;
                case 'rgb':
                  // I'm not sure I really want to support HSL. Might be better to always convert it in the editor.
                default:
                  color = 'cornflowerblue';
                  break;
              }
    
              // const cellTextureCode = typeof cell === 'object' ? cell.texture : cell;
              // const cellTexture = colors[cellTextureCode];
              return (
                <div 
                  className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                  key={ columnIndex } 
                  style={{ background: color }} 
                  onClick={ () => selectCell(columnIndex, rowIndex) }>
                </div>
              )
            })
          }
        </div>
      )
    })
  };

  return(
    <div className="grid-editor__container">
      { generateGridCells(grid) }
    </div>
  )
};

export default GridEditor;