import { ACCOUNT } from './types';

const setLoadingTrue = () => ({
  type: ACCOUNT.LOADING_ACCOUNT
});

const setLoadingFalse = () => ({
  type: ACCOUNT.ACCOUNT_LOADED
});

export const signup = ({ username, password }) => (dispatch) => {
  dispatch(setLoadingTrue());

  fetch('http://localhost:3001/account/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(res => res.json())
    .then((json) => {
      // console.log(json);
      if (json.type === 'error') {
        dispatch({
          type: ACCOUNT.ACCOUNT_ERROR,
          payload: json.message
        });
      } else {
        dispatch({
          type: ACCOUNT.FETCH_ACCOUNT_SUCCESS,
          ...json
        });
      }
    })
    .then(() => dispatch(setLoadingFalse()))
    .catch(err => dispatch({
      type: ACCOUNT.ACCOUNT_ERROR,
      payload: err.message
    }));
};
