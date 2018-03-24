// import * as actions from '../actions/user';
import * as types from '../constants/actionTypes';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
      };
    case types.SET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
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
