// Actions
const SELECT_ACTIVE_CELL = 'SELECT ACTIVE CELL';
const UPDATE_VISIBLE_CELL_EDITOR = 'UPDATE VISIBLE CELL EDITOR';
const UPDATE_EDITOR = 'UPDATE EDITOR';
const UPDATE_SPRITE_EDITOR = "UPDATE SPRITE EDITOR";

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

export const updateEditor = (key, prop) => ({
  type: UPDATE_EDITOR,
  payload: {
    key, 
    prop,
  }
})

// This isn't necessary. We could use the action creator above. But it does
// let us change one element without knowing the state of the sprite editor 
// (ie changing the active state as a toggle);
export const updateSpriteEditor = properties => ({
  type: UPDATE_SPRITE_EDITOR,
  payload: properties,
})

const initialState = {
  textureList: [],
  textureMap: {},
  player: null,
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
  spriteEditor: {
    isActive: false,
  }
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case UPDATE_EDITOR:
      return {
        ...state,
        [action.payload.key]: action.payload.prop,
      }
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
    case UPDATE_SPRITE_EDITOR:
      // We're going to keep it dumb here and let any properties be overwritten.
      // Be sure to pass the right shape of things being overwritten
      return {
        ...state,
        spriteEditor: {
          ...state.spriteEditor,
          ...action.payload,
        }
      }
    default:
      return state;
  }
}

export default reducer;