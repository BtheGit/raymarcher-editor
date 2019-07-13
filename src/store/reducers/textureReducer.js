import { resolve } from "uri-js";

const LOAD_TEXTURES = "LOAD TEXTURES";

export const loadTextures = textures => async (dispatch) => {
  const textureMap = {};
  await Promise.all(textures.map(texture => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.addEventListener('load', () => {
        textureMap[texture] = img;
        resolve();
      })
      img.src = texture;
    })
  }))
  dispatch({
    type: LOAD_TEXTURES,
    payload: textureMap,
  })
}

const initialState = null;

const reducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_TEXTURES:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;