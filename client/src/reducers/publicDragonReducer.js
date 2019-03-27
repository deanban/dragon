import { PUBLIC_DRAGONS } from '../actions/types';

const initialState = {
  loading: false,
  dragons: [],
  error: ''
};

const publicDragonReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case PUBLIC_DRAGONS.LOADING_PUBLIC_DRAGONS:
      return {
        ...state,
        loading: true
      };

    case PUBLIC_DRAGONS.FETCH_PUBLIC_DRAGON_SUCCESS:
      return {
        ...state,
        dragons: action.payload,
        status: 'success'
      };

    case PUBLIC_DRAGONS.PUBLIC_DRAGONS_LOADED:
      return {
        ...state,
        loading: false
      };

    case PUBLIC_DRAGONS.PUBLIC_DRAGON_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default publicDragonReducer;
