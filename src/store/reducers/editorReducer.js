// Actions
const SELECT_ACTIVE_CELL = 'SELECT ACTIVE CELL';

export const selectActiveCell = (x, y) => ({
  type: SELECT_ACTIVE_CELL,
  payload: {
    x,
    y
  }
})

const initialState = {
  activeCell: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case SELECT_ACTIVE_CELL:
      return { ...state, activeCell: action.payload }
    default:
      return state;
  }
}

export default reducer;