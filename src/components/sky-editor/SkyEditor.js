import React from 'react';
import './SkyEditor.css';

/**
 * MVP:
 * Specify a color, which on submit will change the sky (be a one color stop gradient). No validation.
 * 
 * 2:
 * Validate color (we can use 0-255 for simplicity)
 * 
 * 3:
 * Allow for stop percentage to be specified. Clamp between 0 and 1.
 * 
 * 4:
 * Allow for multiple stops to be added.
 * 
 * 5:
 * Validate stops to ensure they are ordered
 * 
 * 6:
 * This will be when we have textures...
 */

const SkyEditor = () => {
  return (
    <div className="sky-editor__container">
      <p>SkyEditor</p>
    </div>
  )
}

export default SkyEditor;