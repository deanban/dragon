import { combineReducers } from 'redux';
import generationReducer from './generationReducer';
import dragonReducer from './dragonReducer';
import accountReducer from './accountReducer';

export default combineReducers({
  account: accountReducer,
  dragon: dragonReducer,
  generation: generationReducer
});
