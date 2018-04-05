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
    case types.FOCUS_HEADER_SEARCH:
      return {
        ...state,
        focus: 'search',
      };
    case types.BLUR_HEADER_SEARCH:
      return {
        ...state,
        focus: '',
      };
    case types.SIGNUP_USER_REQUEST:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          signup: true,
        },
      };
    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          signup: false,
        },
      };
    case types.SIGNUP_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        fetching: {
          ...state.fetching,
          signup: false,
        },
      };
    case types.LOGIN_USER_REQUEST:
    case types.GET_USER_SESSION_REQUEST:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          login: true,
        },
      };
    case types.LOGIN_USER_SUCCESS:
    case types.GET_USER_SESSION_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          login: false,
        },
      };
    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        fetching: {
          ...state.fetching,
          login: false,
        },
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          login: false,
        },
      };
    default:
      return state;
  }
};

export default uiReducer;
