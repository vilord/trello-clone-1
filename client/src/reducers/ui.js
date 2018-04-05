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
    case types.SHOW_BOARDS_EXPLORER:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          boardsExplorer: true,
        },
      };
    case types.HIDE_BOARDS_EXPLORER:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          boardsExplorer: false,
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
    case types.SHOW_CREATE_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          create: true,
        },
      };
    case types.HIDE_CREATE_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          create: false,
        },
      };
    case types.SHOW_NOTIFICATIONS:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          notifications: true,
        },
      };
    case types.HIDE_NOTIFICATIONS:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          notifications: false,
        },
      };
    case types.SHOW_USER_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          user: true,
        },
      };
    case types.HIDE_USER_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          user: false,
        },
      };
    case types.SHOW_RENAME_BOARD:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          renameBoard: true,
        },
      };
    case types.HIDE_RENAME_BOARD:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          renameBoard: false,
        },
      };
    case types.SHOW_ADD_TO_TEAM:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          addToTeam: true,
        },
      };
    case types.HIDE_ADD_TO_TEAM:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          addToTeam: false,
        },
      };
    case types.SHOW_VISIBILITY_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          visibility: true,
        },
      };
    case types.HIDE_VISIBILITY_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          visibility: false,
        },
      };
    case types.SHOW_BOARD_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          board: true,
        },
      };
    case types.HIDE_BOARD_MENU:
      return {
        ...state,
        activeMenus: {
          ...state.activeMenus,
          board: false,
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
