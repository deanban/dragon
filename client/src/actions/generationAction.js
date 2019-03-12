import { GENERATION } from './types';

const setLoadingTrue = () => ({
  type: GENERATION.LOADING_GENERATIONS
});

const setLoadingFalse = () => ({
  type: GENERATION.GENERATION_LOADED
});

export const getGeneration = () => (dispatch) => {
  // debugger;
  dispatch(setLoadingTrue());

  fetch('http://localhost:3001/dragon/generation')
    .then(resp => resp.json())
    .then((data) => {
      // debugger;
      if (data.type === 'error') {
        dispatch({
          type: GENERATION.GENERATION_ERROR,
          payload: data.message
        });
      } else {
        dispatch({
          type: GENERATION.GENERATION_ACTION_TYPE,
          payload: data.generation
        });
      }
    })
    .then(() => {
      dispatch(setLoadingFalse());
    })
    .catch(err => dispatch({
      type: GENERATION.GENERATION_ERROR,
      payload: err.message
    }));
};
