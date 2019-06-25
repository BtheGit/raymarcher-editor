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
    color: '00b09b'
  }
}

const renderCellEditor = (cell, activeCellCoords, updateCellProperties, textureList) => {
  return (
    <>
      <div className="cell-editor__header">
        <h2>[{ activeCellCoords.x }, {activeCellCoords.y }]</h2>
        <input 
          type="radio" 
          value="floor" 
          id="cell-editor__floor-tab"
          checked={ cell.type === 'floor' }
          onChange={() => updateCellProperties(activeCellCoords, DEFAULT_CELL_FLOOR)}
        ></input>
        <label htmlFor="cell-editor__floor-tab" className="cell-editor__header__tab">Floor</label>
        <input 
          type="radio" 
          value="wall" 
          id="cell-editor__wall-tab"
          checked={ cell.type === 'wall' }
          onChange={() => updateCellProperties(activeCellCoords, DEFAULT_CELL_WALL)}
          ></input>
        <label htmlFor="cell-editor__wall-tab" className="cell-editor__header__tab">Wall</label>
      </div>
      {
        cell.type === 'floor'
          ? 
            <FloorEditor 
              cellCoords={ activeCellCoords } 
              cellProperties={ cell } 
              updateCellProperties={ updateCellProperties }
              textureList={ textureList }
            />
          : 
            <WallEditor 
              cellCoords={ activeCellCoords } 
              cellProperties={ cell } 
              updateCellProperties={ updateCellProperties }
              textureList={ textureList }
            />
      }
    </>
  )
}


const CellEditor = () => {
  const activeCellCoords = useSelector(store => store.editor.activeCell);
  const level = useSelector(store => store.level);
  const textureList = useSelector(store => store.editor.textureList);
  const dispatch = useDispatch();
  const updateCellProperties = useCallback((cell, properties) => dispatch(setCellProperties(cell, properties)), [dispatch]);

  let cell = null;
  if(level != null && level.map != null && level.map.grid != null && level.map.grid.length){
    cell = level.map.grid[activeCellCoords.y][activeCellCoords.x];
  }
  
  return (
    <div className="cell-editor__container">
      {
        cell != null
          ? renderCellEditor(cell, activeCellCoords, updateCellProperties, textureList)
          : null
      }
    </div>
  )
};

export default CellEditor;