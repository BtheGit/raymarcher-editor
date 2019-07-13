// Yeah, we'll move this.
import { combineReducers } from 'redux';
import { default as level } from './reducers/levelReducer';
import { default as editor } from './reducers/editorReducer';
import { default as textures } from './reducers/textureReducer';

const rootReducer = combineReducers({
  level,
  editor,
  textures,
});

export default rootReducer;