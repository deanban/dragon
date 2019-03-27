import { ACCOUNT } from './types';

const setLoadingTrue = LOADING_TYPE => ({
  type: LOADING_TYPE
});

const setLoadingFalse = LOADING_TYPE => ({
  type: LOADING_TYPE
});

// one function to rule them all
export const fetchAccountType = ({
  endpoint,
  opts,
  LOADING_TYPE1,
  LOADING_TYPE2,
  ERROR_TYPE,
  SUCCESS_TYPE
}) => (dispatch) => {
  dispatch(setLoadingTrue(LOADING_TYPE1));

  fetch(`/account/${endpoint}`, opts)
    .then(res => res.json())
    .then((json) => {
      // console.log(json);
      if (json.type === 'error') {
        dispatch({
          type: ERROR_TYPE,
          payload: json.message
        });
      } else {
        dispatch({
          type: SUCCESS_TYPE,
          ...json
        });
      }
    })
    .then(() => dispatch(setLoadingFalse(LOADING_TYPE2)))
    .catch(err => dispatch({
      type: ERROR_TYPE,
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
  LOADING_TYPE1: ACCOUNT.LOADING_ACCOUNT,
  LOADING_TYPE2: ACCOUNT.ACCOUNT_LOADED,
  ERROR_TYPE: ACCOUNT.ACCOUNT_ERROR,
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
  LOADING_TYPE1: ACCOUNT.LOADING_ACCOUNT,
  LOADING_TYPE2: ACCOUNT.ACCOUNT_LOADED,
  ERROR_TYPE: ACCOUNT.ACCOUNT_ERROR,
  SUCCESS_TYPE: ACCOUNT.FETCH_ACCOUNT_SUCCESS
});

export const logout = () => fetchAccountType({
  endpoint: 'logout',
  opts: { credentials: 'include' },
  LOADING_TYPE1: ACCOUNT.LOADING_ACCOUNT,
  LOADING_TYPE2: ACCOUNT.ACCOUNT_LOADED,
  ERROR_TYPE: ACCOUNT.ACCOUNT_ERROR,
  SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
});

export const fetchAuthenticated = () => fetchAccountType({
  endpoint: 'authenticated',
  opts: { credentials: 'include' },
  LOADING_TYPE1: ACCOUNT.LOADING_ACCOUNT,
  LOADING_TYPE2: ACCOUNT.ACCOUNT_LOADED,
  ERROR_TYPE: ACCOUNT.ACCOUNT_ERROR,
  SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS
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
