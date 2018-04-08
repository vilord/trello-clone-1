import { combineReducers } from 'redux';

// Reducers
import user from './user';
import ui from './ui';
import board from './board';


export default combineReducers({
  ui,
  user,
  board,
});
