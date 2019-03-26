import { ACCOUNT_INFO } from '../actions/types';

const initialState = {
  loading: false,
  error: '',
  status: '',
  message: ''
};

const accountInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFO.LOADING_ACCOUNT_INFO:
      return {
        ...state,
        loading: true,
        status: 'loading'
      };
    case ACCOUNT_INFO.ACCOUNT_INFO_LOADED:
      return {
        ...state,
        loading: false,
        status: 'loaded'
      };

    case ACCOUNT_INFO.ACCOUNT_INFO_ERROR:
      return {
        ...state,
        error: action.message,
        status: 'failed'
      };
    case ACCOUNT_INFO.FETCH_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        ...action.info
      };

    default:
      return state;
  }
};

export default accountInfoReducer;
