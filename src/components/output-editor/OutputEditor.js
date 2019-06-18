import React from 'react';
import { useState } from 'react-redux';

// MVP: Open a modal with the output JSON
// 2: Generate a file that automatically downloads
// 3: Handle issues with textures and texture mapping

const OutputEditor = () => {
  const onSaveHandler = () => {};
  return(
    <div className="output-editor__container">
      <button onClick={ onSaveHandler }>Save</button>
    </div>
  )
}

export default OutputEditor;