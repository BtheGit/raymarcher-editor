import React from 'react';
// import WorldSettingsEditor from '../world-settings-editor';
import PlayerEditor from '../player-editor';
import GridEditor from '../grid-editor';
import CellEditor from '../cell-editor';
import PreviewPane from '../preview-pane';
import OutputEditor from '../output-editor';
import SkyEditor from '../sky-editor';
import './Editor.css';

const Editor = () => {
  return (
    <div className="editor__container">
      <SkyEditor />
      <GridEditor />
      <PreviewPane />
      <CellEditor />
      <PlayerEditor />
      <OutputEditor />
    </div>
  )
};

export default Editor;