const SET_CELL_PROPERTIES = 'SET CELL PROPERTIES';
const SET_SKY_PROPERTIES = 'SET SKY PROPERTIES';
const UPDATE_PLAYER_POSITION = "UPDATE PLAYER POSITION";
const UPDATE_SPRITE = "UPDATE SPRITE";

export const setCellProperties = (cell, properties) => ({
  type: SET_CELL_PROPERTIES,
  payload: {
    cell,
    properties,
  }
})

export const setSkyProperties = properties => ({
  type: SET_SKY_PROPERTIES,
  payload: {
    properties,
  }
})

export const updatePlayerPosition = properties => ({
  type: UPDATE_PLAYER_POSITION,
  payload: {
    properties,
  }
})

export const updateSprite = properties => ({
  type: UPDATE_SPRITE,
  payload: {
    ...properties,
  }
})

const initialState = {};

const reducer = (state = initialState, action) => {
  switch(action.type){
    // This is temporary, until we flatten the grid into it's own reducer.
    case SET_CELL_PROPERTIES:
      const oldGrid = state.map.grid;
      const newGrid = oldGrid.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
          if (action.payload.cell.x === columnIndex && action.payload.cell.y === rowIndex) {
            return action.payload.properties
          }
          return cell;
        })
      })
      return {
        ...state,
        // This only works because we know for now that there is only one map.
        map: {
          ...state.map,
          grid: newGrid,
        }
      }
    case SET_SKY_PROPERTIES:
      return {
        ...state,
        map: {
          ...state.map,
          sky: {
            ...action.payload.properties
          },
        }
      }
    case UPDATE_PLAYER_POSITION:
      return {
        ...state,
        map: {
          ...state.map,
          player: action.payload.properties,
        },
      }
    case UPDATE_SPRITE:
      return {
        ...state,
        sprites: [
          ...state.sprites.map(sprite => {
            if(sprite.name === action.payload.name){
              return action.payload;
            }
            return sprite;
          })
        ]
      }
    default:
      return state;
  }
}

export default reducer;