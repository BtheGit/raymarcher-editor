import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveCell } from '../../store/reducers/editorReducer';
import './GridEditor.css';



// We'll need to have a store of default colors.
const colors = ['rgba(0,0,0,0.1)', 'pink']

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
  const selectCell = useCallback((x, y) => dispatch(selectActiveCell(x, y)), [dispatch])

  // We'll add in components of course later
  const generateGridCells = grid => {
    return grid.map((row, rowIndex) => {
      return(
        <div className="grid-editor__row" key={ rowIndex }>
          {
            row.map((cell, columnIndex) => {
              return (
                <div 
                  className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
                  key={ columnIndex } 
                  style={{ background: colors[cell] }} 
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