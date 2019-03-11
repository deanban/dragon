import { combineReducers } from 'redux';
import generationReducer from './generationReducer';

export default combineReducers({
  generation: generationReducer
});
