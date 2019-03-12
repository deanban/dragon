import { GENERATION } from '../actions/types';

const initialState = {
  generation: { generationId: '', expiration: '' },
  loading: false,
  error: ''
};

const generationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATION.LOADING_GENERATIONS:
      return {
        ...state,
        loading: true
      };

    case GENERATION.GENERATION_ACTION_TYPE:
      return {
        ...state,
        generation: action.payload
      };

    case GENERATION.GENERATION_LOADED:
      return {
        ...state,
        loading: false
      };

    case GENERATION.GENERATION_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default generationReducer;
