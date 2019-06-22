// Actions
const SELECT_ACTIVE_CELL = 'SELECT ACTIVE CELL';
const UPDATE_VISIBLE_CELL_EDITOR = 'UPDATE VISIBLE CELL EDITOR';

export const selectActiveCell = (x, y, type) => ({
  type: SELECT_ACTIVE_CELL,
  payload: {
    x,
    y,
    type,
  }
})

export const updateVisibleCellEditorType = type => ({
  type: UPDATE_VISIBLE_CELL_EDITOR,
  payload: {
    type,
  }
})

const initialState = {
  activeCell: { x: 0, y: 0 },
  cellEditor: {
    // null | 'floor' | 'wall'
    visibleEditor: null,
  },
  floorEditor: {
    texture: null,
    ceiling: {
      texture: null,
    },
  },
  wallEditor: {
    texture: null,
    faces: {
      north: null,
      south: null,
      east: null,
      west: null,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case SELECT_ACTIVE_CELL:
      return { 
        ...state, 
        activeCell: action.payload,
        cellEditor: {
          ...state.cellEditor,
          visibleEditor: action.payload.type,
        }
      }
    case UPDATE_VISIBLE_CELL_EDITOR:
      return {
        ...state,
        cellEditor: {
          ...state.cellEditor,
          visibleEditor: action.payload.type,
        }
      }
    default:
      return state;
  }
}

export default reducer;