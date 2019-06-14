import React from 'react';
import WorldSettingsEditor from '../world-settings-editor';
import PlayerEditor from '../player-editor';
import GridEditor from '../grid-editor';
import CellEditor from '../cell-editor';
import './Editor.css';

const Editor = () => {
  return (
    <div className="editor__container">
      <WorldSettingsEditor />
      <PlayerEditor />
      <GridEditor />
      <CellEditor />
    </div>
  )
};

export default Editor;