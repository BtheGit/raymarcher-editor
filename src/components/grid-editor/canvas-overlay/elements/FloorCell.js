import React, { useState, useEffect } from 'react';
import { Rect } from 'react-konva';

// TODO:

const FloorCell = ({
  x,
  y,
  width,
  height,
  src,
}) => {
  // We need to actually create an image here.
  // TODO: Move this up a level and reuse the image.
  // const [image, setImage] = useState(null);
  // useEffect(() => {
  //   const img = new window.Image();
  //   img.onload = () => {
  //     setImage(img)
  //   }
  //   img.src = src;
  // })
  return(
    <Rect
      x={ x }
      y={ y }
      width={ width }
      height={ height }
      fill="red"
      // fillPatternImage={ image }
    />
  )
}

export default FloorCell;