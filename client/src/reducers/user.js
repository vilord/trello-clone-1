import * as types from '../constants/actionTypes';
import initUserState from './initUserState';

const userReducer = (state = initUserState, action) => {
  switch (action.type) {
    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
      };
    case types.GET_USER_SESSION_SUCCESS:
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
      };
    case types.SET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.profile,
      };
    default:
      return state;
  }
};

/**
 * Higher order function that resets
 * the state to its initial value on
 * LOGOUT_USER action.
 */
const logoutWrapper = (state, action) => {
  if (action.type === types.LOGOUT_USER) {
    state = undefined;
  }
  return userReducer(state, action);
};

export default logoutWrapper;
