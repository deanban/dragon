import {
  GENERATION_ACTION_TYPE,
  LOADING_GENERATIONS,
  GENERATION_LOADED
} from '../actions/types';

const initialState = {
  generation: { generationId: '', expiration: '' },
  loading: false
};

const generationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_GENERATIONS:
      return {
        ...state,
        loading: true
      };

    case GENERATION_ACTION_TYPE:
      return {
        ...state,
        generation: action.payload
      };

    case GENERATION_LOADED:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default generationReducer;
