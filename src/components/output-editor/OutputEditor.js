import React from 'react';
import { useSelector } from 'react-redux';
import './OutputEditor.css';

// MVP: Open a modal with the output JSON
// 2: Generate a file that automatically downloads
// 3: Handle issues with textures and texture mapping

const OutputEditor = () => {
  const wadData = useSelector(store => store.level);
  const onSaveHandler = () => {
    console.log(wadData);
  };
  return(
    <div className="output-editor__container">
      <button className="editor__save-button" onClick={ onSaveHandler }>Save WAD</button>
    </div>
  )
}

export default OutputEditor;