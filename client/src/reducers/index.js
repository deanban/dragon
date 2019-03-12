import { combineReducers } from 'redux';
import generationReducer from './generationReducer';
import dragonReducer from './dragonReducer';

export default combineReducers({
  generation: generationReducer,
  dragon: dragonReducer
});
