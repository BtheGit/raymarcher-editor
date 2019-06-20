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
  }, [dispatch]);
  // We'll add in components of course later
  const generateGridCells = grid => {
    return grid.map((row, rowIndex) => {
      return(
        <div className="grid-editor__row" key={ rowIndex }>
          {
            row.map((cell, columnIndex) => {
              // We need to start handling complex cells. All cells are either a number or have a base texture key. That should
              // be enough for now (until real textures are used.)
              const cellTextureCode = typeof cell === 'object' ? cell.texture : cell;
              const cellTexture = colors[cellTextureCode];
              return (
                <div 
                  className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                  key={ columnIndex } 
                  style={{ background: cellTexture }} 
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