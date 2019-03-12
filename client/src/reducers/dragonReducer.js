import { DRAGON } from '../actions/types';

const initialState = {
  loading: false,
  dragon: {
    dragonId: '',
    birthday: '',
    nickname: '',
    traits: [],
    generationId: []
  },
  error: ''
};

const dragonReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAGON.LOADING_DRAGONS:
      return {
        ...state,
        loading: true
      };

    case DRAGON.FETCH_DRAGON_SUCCESS:
      return {
        ...state,
        dragon: action.payload
      };

    case DRAGON.DRAGONS_LOADED:
      return {
        ...state,
        loading: false
      };

    case DRAGON.DRAGON_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default dragonReducer;
