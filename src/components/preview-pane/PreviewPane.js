import React from 'react';
import Game from '../game';
import './PreviewPane.css';

// MVP We only want to instantiate the game if a WAD is available.
const PreviewPane = props => {
  const isWADAvailable = true;
  return (
    <div className="preview-pane__container">
      {
        isWADAvailable
          ? <Game />
          : <h1>No WAD is available to load.</h1>
      }
    </div>
  )
};

export default PreviewPane;