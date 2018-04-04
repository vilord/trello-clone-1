// import * as types from '../constants/actionTypes';
import * as uiActions from '../actions/ui';
import * as userActions from '../actions/user';
import initUiState from '../reducers/initUiState';
import * as errors from '../constants/errors';

import uiReducer from './ui';

describe('UI Reducer', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

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
