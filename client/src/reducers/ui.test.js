// import * as types from '../constants/actionTypes';
import * as uiActions from '../actions/ui';
import * as userActions from '../actions/user';
import initUiState from '../reducers/initUiState';
import * as errors from '../constants/errors';

import uiReducer from './ui';

describe('UI Reducer', () => {
  let initState;
  beforeEach(() => {
    initState = { ...initUiState };
  });

  it('initState when state is undefined', () => {
    expect(uiReducer(undefined, {})).toEqual(initState);
  });

  describe('UI Errors', () => {
    it('handles SET_UI_ERROR action', () => {
      const newState = {
        ...initState,
        error: errors.invalidEmail,
      };
      expect(
        uiReducer(initState, uiActions.setUiError(errors.invalidEmail)),
      ).toEqual(newState);
      expect(
        uiReducer(initState, uiActions.setUiError(errors.invalidEmail)),
      ).toMatchSnapshot();
    });

    it('RESET_UI_ERROR', () => {
      initState.error = errors.invalidEmail;
      const newState = {
        ...initState,
        error: {
          kind: '',
          header: '',
          message: '',
        },
      };
      expect(uiReducer(initState, uiActions.resetUiError())).toEqual(newState);
      expect(uiReducer(initState, uiActions.resetUiError())).toMatchSnapshot();
    });
  });

  describe('Boards Explorer', () => {
    it('handles SHOW_BOARDS_EXPLORER action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          boardsExplorer: true,
        },
      };
      expect(uiReducer(initState, uiActions.showBoardsExplorer())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.showBoardsExplorer()),
      ).toMatchSnapshot();
    });

    it('handles HIDE_BOARDS_EXPLORER action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          boardsExplorer: true,
        },
      };
      expect(uiReducer(state, uiActions.hideBoardsExplorer())).toEqual(
        initState,
      );
      expect(
        uiReducer(state, uiActions.hideBoardsExplorer()),
      ).toMatchSnapshot();
    });
  });

  describe('Header Search', () => {
    it('handles FOCUS_HEADER_SEARCH action', () => {
      const newState = {
        ...initState,
        focus: 'search',
      };
      expect(uiReducer(initState, uiActions.focusHeaderSearch())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.focusHeaderSearch()),
      ).toMatchSnapshot();
    });

    it('handles BLUR_HEADER_SEARCH action', () => {
      const newState = {
        ...initState,
        focus: 'search',
        search: 'something',
      };
      expect(uiReducer(newState, uiActions.blurHeaderSearch())).toEqual(
        initState,
      );
      expect(
        uiReducer(newState, uiActions.blurHeaderSearch()),
      ).toMatchSnapshot();
    });

    it('handles SET_HEADER_SEARCH action', () => {
      const search = 'something';
      const newState = {
        ...initState,
        search,
      };
      expect(uiReducer(initState, uiActions.setHeaderSearch(search))).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.setHeaderSearch(search)),
      ).toMatchSnapshot();
    });
  });

  describe('Create Menu', () => {
    it('handles SHOW_CREATE_MENU action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          create: true,
        },
      };
      expect(uiReducer(initState, uiActions.showCreateMenu())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.showCreateMenu()),
      ).toMatchSnapshot();
    });

    it('handles HIDE_CREATE_MENU action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          create: true,
        },
      };
      expect(uiReducer(state, uiActions.hideCreateMenu())).toEqual(initState);
      expect(
        uiReducer(initState, uiActions.hideCreateMenu()),
      ).toMatchSnapshot();
    });
  });

  describe('Notifications', () => {
    it('handles SHOW_NOTIFICATIONS action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          notifications: true,
        },
      };
      expect(uiReducer(initState, uiActions.showNotifications())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.showNotifications()),
      ).toMatchSnapshot();
    });

    it('handles HIDE_NOTIFICATIONS action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          notifications: true,
        },
      };
      expect(uiReducer(state, uiActions.hideNotifications())).toEqual(
        initState,
      );
      expect(
        uiReducer(initState, uiActions.hideNotifications()),
      ).toMatchSnapshot();
    });
  });

  describe('User Menu', () => {
    it('handles SHOW_USER_MENU action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          user: true,
        },
      };
      expect(uiReducer(initState, uiActions.showUserMenu())).toEqual(newState);
      expect(uiReducer(initState, uiActions.showUserMenu())).toMatchSnapshot();
    });

    it('handles HIDE_USER_MENU action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          user: true,
        },
      };
      expect(uiReducer(state, uiActions.hideUserMenu())).toEqual(initState);
      expect(uiReducer(initState, uiActions.hideUserMenu())).toMatchSnapshot();
    });
  });

  describe('Rename Board', () => {
    it('handles SHOW_RENAME_BOARD action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          renameBoard: true,
        },
      };
      expect(uiReducer(initState, uiActions.showRenameBoard())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.showRenameBoard()),
      ).toMatchSnapshot();
    });

    it('handles HIDE_RENAME_BOARD action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          renameBoard: true,
        },
      };
      expect(uiReducer(state, uiActions.hideRenameBoard())).toEqual(initState);
      expect(
        uiReducer(initState, uiActions.hideRenameBoard()),
      ).toMatchSnapshot();
    });
  });

  describe('Add to Team', () => {
    it('handles SHOW_ADD_TO_TEAM action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          addToTeam: true,
        },
      };
      expect(uiReducer(initState, uiActions.showAddToTeam())).toEqual(newState);
      expect(uiReducer(initState, uiActions.showAddToTeam())).toMatchSnapshot();
    });

    it('handles HIDE_ADD_TO_TEAM action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          addToTeam: true,
        },
      };
      expect(uiReducer(state, uiActions.hideAddToTeam())).toEqual(initState);
      expect(uiReducer(initState, uiActions.hideAddToTeam())).toMatchSnapshot();
    });
  });

  describe('Visibility Menu', () => {
    it('handles SHOW_VISIBILITY_MENU action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          visibility: true,
        },
      };
      expect(uiReducer(initState, uiActions.showVisibilityMenu())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, uiActions.showVisibilityMenu()),
      ).toMatchSnapshot();
    });

    it('handles HIDE_VISIBILITY_MENU action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          visibility: true,
        },
      };
      expect(uiReducer(state, uiActions.hideVisibilityMenu())).toEqual(
        initState,
      );
      expect(
        uiReducer(initState, uiActions.hideVisibilityMenu()),
      ).toMatchSnapshot();
    });
  });

  describe('Board Menu', () => {
    it('handles SHOW_BOARD_MENU action', () => {
      const newState = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          board: true,
        },
      };
      expect(uiReducer(initState, uiActions.showBoardMenu())).toEqual(newState);
      expect(uiReducer(initState, uiActions.showBoardMenu())).toMatchSnapshot();
    });

    it('handles HIDE_BOARD_MENU action', () => {
      const state = {
        ...initState,
        activeMenus: {
          ...initState.activeMenus,
          board: true,
        },
      };
      expect(uiReducer(state, uiActions.hideBoardMenu())).toEqual(initState);
      expect(uiReducer(initState, uiActions.hideBoardMenu())).toMatchSnapshot();
    });
  });

  describe('Signup User', () => {
    it('handles SIGNUP_USER_REQUEST action', () => {
      const newState = {
        ...initState,
        fetching: {
          ...initState.fetching,
          signup: true,
        },
      };
      expect(uiReducer(initState, userActions.signupUserRequest())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, userActions.signupUserRequest()),
      ).toMatchSnapshot();
    });

    it('handles SIGNUP_USER_SUCCESS action', () => {
      const newState = {
        ...initState,
        fetching: {
          ...initState.fetching,
          signup: false,
        },
      };
      expect(uiReducer(initState, userActions.signupUserSuccess())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, userActions.signupUserSuccess()),
      ).toMatchSnapshot();
    });

    it('handles SIGNUP_USER_FAILURE action', () => {
      const newState = {
        ...initState,
        error: errors.serverError,
        fetching: {
          ...initState.fetching,
          signup: false,
        },
      };
      expect(
        uiReducer(initState, userActions.signupUserFailure(errors.serverError)),
      ).toEqual(newState);
      expect(
        uiReducer(initState, userActions.signupUserFailure(errors.serverError)),
      ).toMatchSnapshot();
    });
  });

  describe('Login User', () => {
    it('handles LOGIN_USER_REQUEST action', () => {
      const newState = {
        ...initState,
        fetching: {
          ...initState.fetching,
          login: true,
        },
      };
      expect(uiReducer(initState, userActions.loginUserRequest())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, userActions.loginUserRequest()),
      ).toMatchSnapshot();
    });

    it('handles LOGIN_USER_SUCCESS action', () => {
      initState.isFetching = true;
      const newState = {
        ...initState,
        fetching: {
          ...initState.fetching,
          login: false,
        },
      };
      expect(uiReducer(initState, userActions.loginUserSuccess())).toEqual(
        newState,
      );
      expect(
        uiReducer(initState, userActions.loginUserSuccess()),
      ).toMatchSnapshot();
    });

    it('handles LOGIN_USER_FAILURE action', () => {
      initState.isFetching = true;
      const newState = {
        ...initState,
        error: errors.wrongCredentials,
        fetching: {
          ...initState.fetching,
          login: false,
        },
      };
      expect(
        uiReducer(
          initState,
          userActions.loginUserFailure(errors.wrongCredentials),
        ),
      ).toEqual(newState);
      expect(
        uiReducer(
          initState,
          userActions.loginUserFailure(errors.wrongCredentials),
        ),
      ).toMatchSnapshot();
    });
  });

  describe('Logout User', () => {
    it('handles LOGOUT_USER action', () => {
      initState.fetching.login = true;
      const newState = {
        ...initState,
        fetching: {
          ...initState.fetching,
          login: false,
        },
      };
      expect(uiReducer(initState, userActions.logoutUser())).toEqual(newState);
      expect(uiReducer(initState, userActions.logoutUser())).toMatchSnapshot();
    });
  });
});
