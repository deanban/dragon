import { PUBLIC_DRAGONS } from './types';

const setLoadingTrue = () => ({
  type: PUBLIC_DRAGONS.LOADING_PUBLIC_DRAGONS
});

const setLoadingFalse = () => ({
  type: PUBLIC_DRAGONS.PUBLIC_DRAGONS_LOADED
});

export const fetchPublicDragons = () => (dispatch) => {
  dispatch(setLoadingTrue());

  return fetch('http://localhost:3001/dragon/public-dragons')
    .then(res => res.json())
    .then((json) => {
      if (json.type === 'error') {
        dispatch({
          type: PUBLIC_DRAGONS.PUBLIC_DRAGON_ERROR,
          error: json.message
        });
      } else {
        dispatch({
          type: PUBLIC_DRAGONS.FETCH_PUBLIC_DRAGON_SUCCESS,
          payload: json.dragons
        });
      }
    })
    .then(() => dispatch(setLoadingFalse()))
    .catch(err => dispatch({
      type: PUBLIC_DRAGONS.PUBLIC_DRAGON_ERROR,
      error: err.message
    }));
};
