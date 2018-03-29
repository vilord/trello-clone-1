// import * as types from '../constants/actionTypes';
import * as uiActions from '../actions/ui';
import * as userActions from '../actions/user';
import initUiState from '../reducers/initUiState';
import * as errors from '../constants/errors';

import uiReducer from './ui';

describe('ui', () => {
  let initState;

  beforeEach(() => {
    initState = { ...initUiState };
  });

  it('initState when state is undefined', () => {
    expect(uiReducer(undefined, {})).toEqual(initState);
  });

  it('correctly sets error on SET_UI_ERROR action', () => {
    const newState = {
      ...initState,
      error: errors.invalidEmail,
    };
    expect(
      uiReducer(initState, uiActions.setUiError(errors.invalidEmail)),
    ).toEqual(newState);
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
  });

  it('SIGNUP_USER_REQUEST -> isFetching.signup is true', () => {
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
  });

  it('SIGNUP_USER_ANSWER -> isFetching.signup is false', () => {
    const newState = {
      ...initState,
      fetching: {
        ...initState.fetching,
        signup: false,
      },
    };
    expect(uiReducer(initState, userActions.signupUserAnswer())).toEqual(
      newState,
    );
  });

  it('LOGIN_USER_SUCCESS -> isFetching is false', () => {
    initState.isFetching = true;
    const newState = {
      ...initState,
      isFetching: false,
    };
    expect(uiReducer(initState, userActions.loginUserSuccess())).toEqual(
      newState,
    );
  });

  it('LOGIN_USER_REQUEST -> isFetching is true', () => {
    const newState = {
      ...initState,
      isFetching: true,
    };
    expect(uiReducer(initState, userActions.loginUserRequest())).toEqual(
      newState,
    );
  });
});
