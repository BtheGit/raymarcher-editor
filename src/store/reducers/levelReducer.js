const SET_CELL_PROPERTIES = 'SET CELL PROPERTIES';
const SET_SKY_PROPERTIES = 'SET SKY PROPERTIES';

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
    default:
      return state;
  }
}

export default reducer;