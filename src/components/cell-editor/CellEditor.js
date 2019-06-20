import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloorEditor from './floor-editor';
import WallEditor from './wall-editor';
import { setCellProperties } from '../../store/reducers/levelReducer';
import { updateVisibleCellEditorType } from '../../store/reducers/editorReducer';
import { getCellType } from '../../utilities';
import './CellEditor.css';

const renderCellEditor = (cell, activeCellCoords, currentCellEditorType, updateCurrentCellEditorType) => {
  const activeCellType = getCellType(cell);
  if(currentCellEditorType == null){
    updateCurrentCellEditorType(activeCellType);
  }
  return (
    <div>
      <div>
        <h4>Cell [{ activeCellCoords.x }, {activeCellCoords.y }]</h4>
        <input 
          type="radio" 
          value="floor" 
          id="cell-editor__floor-tab"
          checked={ currentCellEditorType === 'floor' }
          onChange={() => updateCurrentCellEditorType('floor')}
        ></input>
        <label htmlFor="cell-editor__floor-tab">Floor</label>
        <input 
          type="radio" 
          value="wall" 
          id="cell-editor__wall-tab"
          checked={ currentCellEditorType === 'wall' }
          onChange={() => updateCurrentCellEditorType('wall')}
          ></input>
        <label htmlFor="cell-editor__wall-tab">Wall</label>
      </div>
      <div>
        {
          currentCellEditorType === 'floor'
            ? <FloorEditor activeCellCoords={ activeCellCoords } />
            : <WallEditor activeCellCoords={ activeCellCoords } />
        }
      </div>
    </div>
  )
}


const CellEditor = () => {
  const currentCellEditorType = useSelector(store => store.editor.cellEditor.visibleEditor);
  const activeCellCoords = useSelector(store => store.editor.activeCell);
  const level = useSelector(store => store.level);
  const dispatch = useDispatch();
  const updateCurrentCellEditorType = useCallback((type) => dispatch(updateVisibleCellEditorType(type)), [dispatch]);

  // const setCellProps = useCallback((coords, props) => dispatch(setCellProperties(coords, props)), [dispatch])
  // const [currentCellEditorType, setCurrentCellEditorType] = useState('floor');

  let cell = null;
  if(level != null && level.map != null && level.map.grid != null && level.map.grid.length){
    cell = level.map.grid[activeCellCoords.y][activeCellCoords.x];
  }
  
  return (
    <div className="cell-editor__container">
      {
        cell != null
          ? renderCellEditor(cell, activeCellCoords, currentCellEditorType, updateCurrentCellEditorType)
          : null
      }
    </div>
  )
};

export default CellEditor;