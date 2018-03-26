import * as types from '../constants/actionTypes';

const initState = {
  // error: '',
  isFetching: false,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
