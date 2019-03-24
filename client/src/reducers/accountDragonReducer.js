import { ACCOUNT_DRAGONS } from '../actions/types';

const initialState = {
  loading: false,
  dragons: [],
  error: ''
};

const accountDragonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_DRAGONS.LOADING_ACCOUNT_DRAGONS:
      return {
        ...state,
        loading: true
      };
    case ACCOUNT_DRAGONS.ACCOUNT_DRAGONS_LOADED:
      return {
        ...state,
        loading: false
      };

    case ACCOUNT_DRAGONS.ACCOUNT_DRAGON_ERROR:
      return {
        ...state,
        error: action.message,
        status: 'failed'
      };
    case ACCOUNT_DRAGONS.FETCH_ACCOUNT_DRAGON_SUCCESS:
      return {
        ...state,
        dragons: action.dragons
      };

    default:
      return state;
  }
};

export default accountDragonReducer;
