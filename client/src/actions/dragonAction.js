import { DRAGON } from './types';

const setLoadingTrue = () => ({
  type: DRAGON.LOADING_DRAGONS
});

const setLoadingFalse = () => ({
  type: DRAGON.DRAGONS_LOADED
});

export const fetchNewDragon = () => (dispatch) => {
  dispatch(setLoadingTrue());

  fetch('/dragon/new', { credentials: 'include' })
    .then(res => res.json())
    .then((json) => {
      // console.log(json);
      if (json.type === 'error') {
        dispatch({
          type: DRAGON.DRAGON_ERROR,
          payload: json.message
        });
      } else {
        dispatch({
          type: DRAGON.FETCH_DRAGON_SUCCESS,
          payload: json.dragon
        });
      }
    })
    .then(() => setLoadingFalse())
    .catch(err => dispatch({
      type: DRAGON.DRAGON_ERROR,
      payload: err.message
    }));
};
