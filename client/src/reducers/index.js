import { combineReducers } from 'redux';

// Reducers
import user from './user';
import ui from './ui';


export default combineReducers({
  ui,
  user,
});
