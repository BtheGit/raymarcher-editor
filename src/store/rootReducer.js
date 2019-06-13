// Yeah, we'll move this.
import { combineReducers } from 'redux';
import { default as level } from './reducers/levelReducer';

const rootReducer = combineReducers({
  level,
});

export default rootReducer;