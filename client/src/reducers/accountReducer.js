import { ACCOUNT } from '../actions/types';

const initialState = {
  loading: false,
  loggedIn: false,
  error: ''
};

const accountReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ACCOUNT.LOADING_ACCOUNT:
      return {
        ...state,
        loading: true
      };

    case ACCOUNT.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        message: action.message,
        loggedIn: true,
        status: 'success'
      };

    case ACCOUNT.ACCOUNT_LOADED:
      return {
        ...state,
        loading: false
      };

    case ACCOUNT.ACCOUNT_ERROR:
      return {
        ...state,
        error: action.payload,
        status: 'failed'
      };

    default:
      return state;
  }
};

export default accountReducer;
