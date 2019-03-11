import {
  GENERATION_ACTION_TYPE,
  LOADING_GENERATIONS,
  GENERATION_LOADED
} from './types';

const setLoadingTrue = () => ({
  type: LOADING_GENERATIONS
});

const setLoadingFalse = () => ({
  type: GENERATION_LOADED
});

export const getGeneration = () => (dispatch) => {
  // debugger;
  dispatch(setLoadingTrue());

  fetch('http://localhost:3001/dragon/generation')
    .then(resp => resp.json())
    .then((data) => {
      // debugger;
      dispatch({
        type: GENERATION_ACTION_TYPE,
        payload: data.generation
      });
    })
    .then(() => {
      dispatch(setLoadingFalse());
    })
    .catch(err => console.log(err));
};

export const fetchNextGeneration = (expiration, timer) => (dispatch) => {
  const minDelay = 3000;
  dispatch(getGeneration());

  let delay = new Date(expiration).getTime() - new Date().getTime();

  if (delay < minDelay) {
    delay = minDelay;
  }

  timer = setTimeout(() => {
    fetchNextGeneration(expiration, timer);
  }, delay);
};
