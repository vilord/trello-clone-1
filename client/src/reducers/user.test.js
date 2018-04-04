import userReducer from './user';
import initUserState from './initUserState';

import * as actions from '../actions/user';
// import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let initState;

  beforeEach(() => {
    initState = { ...initUserState };
  });

  it('returns init state when state arg is undefined', () => {
    expect(userReducer(undefined, {})).toEqual(initState);
  });

  it('handles LOGIN_USER_SUCCESS', () => {
    const user = {
      name: 'John Doe',
      username: 'johndoe',
      initials: 'JD',
      bio: 'Web Developer',
      avatar: 'http://example.com/prfile_pic',
    };

    const nextState = {
      ...initState,
      ...user,
    };

    expect(userReducer(initState, actions.loginUserSuccess(user))).toEqual(
      nextState,
    );
    expect(
      userReducer(initState, actions.loginUserSuccess(user)),
    ).toMatchSnapshot();
  });

  it('handles LOGOUT_USER', () => {
    const currState = {
      name: 'John Doe',
      username: 'johndoe',
    };

    expect(userReducer(currState, actions.logoutUser())).toEqual(initState);
    expect(userReducer(currState, actions.logoutUser())).toMatchSnapshot();
  });

  it('handles SET_USER_PROFILE_SUCCESS', () => {
    initState = {
      ...initState,
      name: 'John Doe',
      username: 'johndoe',
    };

    const profile = {
      name: 'John Doe Simpson',
      username: 'johndoes',
      initials: 'JDS',
    };

    const nextState = {
      ...initState,
      ...profile,
    };

    expect(
      userReducer(initState, actions.setUserProfileSuccess(profile)),
    ).toEqual(nextState);
    expect(
      userReducer(initState, actions.setUserProfileSuccess(profile)),
    ).toMatchSnapshot();
  });
});
