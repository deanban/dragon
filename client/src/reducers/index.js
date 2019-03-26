import { combineReducers } from 'redux';
import generationReducer from './generationReducer';
import dragonReducer from './dragonReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import accountInfoReducer from './accountInfoReducer';

export default combineReducers({
  account: accountReducer,
  dragon: dragonReducer,
  generation: generationReducer,
  accountDragons: accountDragonReducer,
  accountInfo: accountInfoReducer
});
