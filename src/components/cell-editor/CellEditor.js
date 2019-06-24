import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloorEditor from './floor-editor';
import WallEditor from './wall-editor';
import { setCellProperties } from '../../store/reducers/levelReducer';
import './CellEditor.css';

const DEFAULT_CELL_WALL = {
  type: 'wall', 
  textureType: 'color', 
  textureConfig: { 
    colorType: 'hex', 
    color: '00b09b'
  }
}

const DEFAULT_CELL_FLOOR = {
  type: 'floor',
  textureType: 'color',
  textureConfig: { 
    colorType: 'hex',
    color: '88BBEE'
  }
}

const renderCellEditor = (cell, activeCellCoords, toggleCellType) => {
  return (
    <div>
      <div>
        <h4>Cell [{ activeCellCoords.x }, {activeCellCoords.y }]</h4>
        <input 
          type="radio" 
          value="floor" 
          id="cell-editor__floor-tab"
          checked={ cell.type === 'floor' }
          onChange={() => toggleCellType(activeCellCoords, DEFAULT_CELL_FLOOR)}
        ></input>
        <label htmlFor="cell-editor__floor-tab">Floor</label>
        <input 
          type="radio" 
          value="wall" 
          id="cell-editor__wall-tab"
          checked={ cell.type === 'wall' }
          onChange={() => toggleCellType(activeCellCoords, DEFAULT_CELL_WALL)}
          ></input>
        <label htmlFor="cell-editor__wall-tab">Wall</label>
      </div>
      <div>
        {
          cell.type === 'floor'
            ? <FloorEditor activeCellCoords={ activeCellCoords } />
            : <WallEditor activeCellCoords={ activeCellCoords } />
        }
      </div>
    </div>
  )
}


const CellEditor = () => {
  const activeCellCoords = useSelector(store => store.editor.activeCell);
  const level = useSelector(store => store.level);
  const dispatch = useDispatch();
  const toggleCellType = useCallback((cell, properties) => dispatch(setCellProperties(cell, properties)), [dispatch]);

  let cell = null;
  if(level != null && level.map != null && level.map.grid != null && level.map.grid.length){
    cell = level.map.grid[activeCellCoords.y][activeCellCoords.x];
  }
  
  return (
    <div className="cell-editor__container">
      {
        cell != null
          ? renderCellEditor(cell, activeCellCoords, toggleCellType)
          : null
      }
    </div>
  )
};

export default CellEditor;