import * as types from '../constants/actionTypes';
import initState from './initUiState';

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_UI_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.RESET_UI_ERROR:
      return {
        ...state,
        error: {
          kind: '',
          header: '',
          message: '',
        },
      };
    case types.SIGNUP_USER_REQUEST:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          signup: true,
        },
      };
    case types.SIGNUP_USER_ANSWER:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          signup: false,
        }
      };
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
