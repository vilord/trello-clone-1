// import * as types from '../constants/actionTypes';
import * as userActions from '../actions/user';

import uiReducer from './ui';

describe('ui', () => {
  let initState;

  beforeEach(() => {
    initState = {
      isFetching: false,
    };
  });

  it('initState when state is undefined', () => {
    expect(uiReducer(undefined, {})).toEqual(initState);
  });

  it('LOGIN_USER_REQUEST -> isFetching is true', () => {
    const newState = {
      isFetching: true,
    };
    expect(uiReducer(initState, userActions.loginUserRequest())).toEqual(
      newState,
    );
  });

  it('LOGIN_USER_SUCCESS -> isFetching is false', () => {
    initState.isFetching = true;
    const newState = {
      isFetching: false,
    };
    expect(uiReducer(initState, userActions.loginUserSuccess())).toEqual(
      newState,
    );
  });
});
