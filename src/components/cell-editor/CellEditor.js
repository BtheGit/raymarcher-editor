import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCellProperties } from '../../store/reducers/levelReducer';
import './CellEditor.css';

const CellEditor = () => {
  const activeCell = useSelector(store => store.editor.activeCell);
  const level = useSelector(store => store.level);
  const dispatch = useDispatch();
  const setCellProps = useCallback((coords, props) => dispatch(setCellProperties(coords, props)), [dispatch])
  const [checkedRadio, setRadioToChecked] = useState(0)

  if(!activeCell){
    return (
      <div className="cell-editor__container">Select a cell to edit</div>
    )
  }
  else {
    const map = level.map;
    const grid = map.grid;
    const cell = grid[activeCell.y][activeCell.x];
    if(cell !== checkedRadio){
      setRadioToChecked(cell);
    }
    return (
      <div>
        <h4>Cell [{ activeCell.x }, {activeCell.y }]</h4>
        <p>Color: { cell }</p>
        <input 
          type="radio" 
          value="0" 
          name="floor"
          checked={ checkedRadio === 0 }
          onClick={() => setRadioToChecked(0)}
          onChange={() => setCellProps({y: activeCell.y, x: activeCell.x}, 0)}
        ></input>
        <label htmlFor="floor">Floor</label>
        <input 
          type="radio" 
          value="1" 
          name="wall"
          checked={ checkedRadio === 1 }
          onClick={() => setRadioToChecked(1)}
          onChange={() => setCellProps({y: activeCell.y, x: activeCell.x}, 1)}
          ></input>
        <label htmlFor="wall">Wall</label>
      </div>
    )
  }
};

export default CellEditor;