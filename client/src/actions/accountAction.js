import { ACCOUNT } from './types';

const setLoadingTrue = () => ({
  type: ACCOUNT.LOADING_ACCOUNT
});

const setLoadingFalse = () => ({
  type: ACCOUNT.ACCOUNT_LOADED
});

// one function to rule them all
const fetchAccountType = ({ endpoint, opts, SUCCESS_TYPE }) => (dispatch) => {
  dispatch(setLoadingTrue());

  fetch(`http://localhost:3001/account/${endpoint}`, opts)
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
          type: SUCCESS_TYPE,
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

// use FETCH_ACCOUNT_SUCCESS for both signup and login.
// they return the same object from the api

export const signup = ({ username, password }) => fetchAccountType({
  endpoint: 'signup',
  opts: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  SUCCESS_TYPE: ACCOUNT.FETCH_ACCOUNT_SUCCESS
});

export const login = ({ username, password }) => fetchAccountType({
  endpoint: 'login',
  opts: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  SUCCESS_TYPE: ACCOUNT.FETCH_ACCOUNT_SUCCESS
});

export const logout = () => fetchAccountType({
  endpoint: 'logout',
  opts: { credentials: 'include' },
  SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
});

// export const signup = ({ username, password }) => (dispatch) => {
//   dispatch(setLoadingTrue());

//   fetch('http://localhost:3001/account/signup', {
//     method: 'POST',
//     body: JSON.stringify({ username, password }),
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include'
//   })
//     .then(res => res.json())
//     .then((json) => {
//       // console.log(json);
//       if (json.type === 'error') {
//         dispatch({
//           type: ACCOUNT.ACCOUNT_ERROR,
//           payload: json.message
//         });
//       } else {
//         dispatch({
//           type: ACCOUNT.FETCH_ACCOUNT_SUCCESS,
//           ...json
//         });
//       }
//     })
//     .then(() => dispatch(setLoadingFalse()))
//     .catch(err => dispatch({
//       type: ACCOUNT.ACCOUNT_ERROR,
//       payload: err.message
//     }));
// };

// export const logout = () => (dispatch) => {
//   dispatch(setLoadingTrue());

//   fetch('http://localhost:3001/account/logout', {
//     credentials: 'include'
//   })
//     .then(res => res.json())
//     .then((json) => {
//       // console.log(json);
//       if (json.type === 'error') {
//         dispatch({
//           type: ACCOUNT.ACCOUNT_ERROR,
//           payload: json.message
//         });
//       } else {
//         dispatch({
//           type: ACCOUNT.FETCH_LOGOUT_SUCCESS,
//           ...json
//         });
//       }
//     })
//     .then(() => dispatch(setLoadingFalse()))
//     .catch(err => dispatch({
//       type: ACCOUNT.ACCOUNT_ERROR,
//       payload: err.message
//     }));
// };
