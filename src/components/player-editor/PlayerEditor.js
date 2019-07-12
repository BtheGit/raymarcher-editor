import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlayerPosition } from '../../store/reducers/levelReducer';
import './PlayerEditor.css';

const PlayerEditor = () => {
  const dispatch = useDispatch();
  const currentPlayerPosition = useSelector(store => store.editor.player);
  const savePlayerPosition = useCallback(() => {
    dispatch(updatePlayerPosition(currentPlayerPosition));
  })
  return(
    <div className="player-editor__container">
      <button 
        className="editor__save-button"
        onClick={ savePlayerPosition }
      >Save Current Position as Starting Position</button>
    </div>
  )
};

export default PlayerEditor;