import React from 'react';
import { useSelector } from 'react-redux';
import './GridEditor.css';



// We'll need to have a store of default colors.
const colors = ['rgba(0,0,0,0.1)', 'pink']

const GridEditor = () => {
  // Ha, I hope we can fix this soon.
  const level = useSelector(store => store.level);
  const map = level.maps[0];
  const grid = map.grid;

  // We'll add in components of course later
  const generateGridCells = grid => {
    return grid.map((row, rowIndex) => {
      return(
        <div className="grid-editor__row">
          {
            row.map((cell, columnIndex) => {
              return <div className="grid-editor__cell" style={{ background: colors[cell] }}></div>
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