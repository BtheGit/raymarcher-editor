import React from 'react';
import { Rect, Image } from 'react-konva';
import FloorCell from './FloorCell';

// TODO: Turn on konva support.

const getStyleConfig = (cellConfig, textureMap) => {
  if (!cellConfig){
    return {};
  }

  const textureType = cellConfig.textureType;
  if (textureType === 'color') {
    return {
      fill: '#' + cellConfig.textureConfig.color,
    };
  }
  else {
    const imageName = cellConfig.textureConfig.name;
    const imageData = textureMap[imageName];
    const imagePath = imageData ? imageData.rawImage.src : '';
    return {
      background: `url(${ imagePath })`,
      backgroundSize: 'cover',
      fill: 'inherit',
    }
  }
}

const Cell = ({ 
  cell, 
  textureMap, 
  mapWidth, 
  mapHeight, 
  row, 
  column,
  canvasSize,
}) => {
  const left = (column / mapHeight) * canvasSize;
  const top = (row / mapWidth) * canvasSize;
  const width = canvasSize / mapWidth;
  const height = canvasSize / mapHeight;
  if(cell.type === 'floor') {
    if(cell.textureType === 'color') {
      // We're going to start assuming hex and refactor everything else to match.
      const color = '#' + cell.textureConfig.color
      return (
        <Rect
          x={ left }
          y={ top }
          width={ width }
          height={ height }
          fill={ color }
        />
        // <div 
        //   className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
        //   key={ columnIndex } 
        //   style={{ background: color }} 
        //   onClick={ () => selectCell(columnIndex, rowIndex) }
        // ></div>
        )
      }
      else {
        const imageName = cell.textureConfig.name;
        const imageData = textureMap[imageName];
        const imagePath = imageData ? imageData.rawImage.src : '';
        return (
          <FloorCell 
            x={ left }
            y={ top }
            width={ width }
            height={ height }
            src={ imagePath }
          />
          // <div 
          //   className={`grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }`}
          //   key={ columnIndex } 
          //   style={{ background: `url(${ imagePath })`, backgroundSize: 'cover' }} 
          //   onClick={ () => selectCell(columnIndex, rowIndex) }
          // ></div>
        )
      }
    }
  else {
    // Walls are a trickier beast. We need to render a base texture background or fall back to the color.
    // Then for each wall we need to rinse and repeat.

    // For the first MVP, we'll just use colors. If there is a texture code, we'll use a hardcoded fallback.
    if(cell.textureConfig == undefined){
      throw new Error('Missing textureConfig property');
    }

    const baseStyleConfig = getStyleConfig(cell, textureMap);
    const hasBGTexture = baseStyleConfig.hasOwnProperty('background');
    const { faces } = cell;
    const baseFaceStyleConfig = {
      // stroke: 'black',
      // strokeWidth: 2,
      // strokeLinejoin: 'round',
      fill: hasBGTexture ? 'none' : 'inherit',
    };

    const facePaths = [
      {
        face: 'north',
        points: '0,0 50,50 100,0',
        style: {
          ...baseFaceStyleConfig,
          ...getStyleConfig(faces['north'], textureMap),
        },
      },
      {
        face: 'west',
        points: '0,0 50,50 0,100',
        style: {
          ...baseFaceStyleConfig,
          ...getStyleConfig(faces['west'], textureMap),
        },
      },
      {
        face: 'south',
        points: '0,100 50,50 100,100',
        style: {
          ...baseFaceStyleConfig,
          ...getStyleConfig(faces['south'], textureMap),
        },
      },
      {
        face: 'east',
        points: '100,0 50,50 100,100',
        style: {
          ...baseFaceStyleConfig,
          ...getStyleConfig(faces['east'], textureMap),
        },
      },
    ];

    return (
      <Rect 
        x={ left }
        y={ top }
        width={ width }
        height={ height }
        fill="blue"
      />
      // <div 
      //   className={ `grid-editor__cell ${ isActiveCell(columnIndex, rowIndex) ? 'grid-editor__cell--active' : '' }` }
      //   key={ columnIndex } 
      //   style={ baseStyleConfig } 
      //   onClick={ () => selectCell(columnIndex, rowIndex) }
      // >
      //   {
      //       <svg className="grid-editor__cell-wall" viewBox='0 0 100 100'>
      //         {
      //           facePaths.map(({ points, style }, i) => <polygon points={ points } style={ style } key={ i }/>)
      //         }
      //       </svg>
      //   }
      // </div>
    )
  }
};

export default Cell;