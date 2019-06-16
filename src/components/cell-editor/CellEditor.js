import React from 'react';
import { useSelector } from 'react-redux';
import './CellEditor.css';

const CellEditor = () => {
  const activeCell = useSelector(store => store.editor.activeCell);
  const level = useSelector(store => store.level)
  if(!activeCell){
    return (
      <div className="cell-editor__container">Select a cell to edit</div>
    )
  }
  else {
    const map = level.maps[0];
    const grid = map.grid;
    const cell = grid[activeCell.y][activeCell.x];
    return (
      <div>
        <h4>Cell [{ activeCell.x }, {activeCell.y }]</h4>
        <p>Color: { cell }</p>
      </div>
    )
  }
};

export default CellEditor;