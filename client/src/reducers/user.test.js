import userReducer from './user';

import * as actions from '../actions/user';
// import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  const initState = {};

  it('returns the initial state', () => {
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

    const nextState = { ...user };

    expect(userReducer(initState, actions.loginUserSuccess(user))).toEqual(
      nextState,
    );
  });

  it('handles LOGOUT_USER', () => {
    const state = {
      name: 'John Doe',
      username: 'johndoe',
      initials: 'JD',
      bio: 'Web Developer',
      avatar: 'http://example.com/prfile_pic',
    };

    expect(userReducer(state, actions.logoutUser())).toEqual(initState);
  });

  it('handles SET_USER_PROFILE_SUCCESS', () => {
    const state = {
      name: 'John Doe',
      username: 'johndoe',
      initials: 'JD',
      bio: 'Web Developer',
      avatar: 'http://example.com/prfile_pic',
    };

    const profile = {
      name: 'John Doe Simpson',
      username: 'johndoes',
      initials: 'JDS',
      bio: 'Web Developer, Comedian',
    };

    const nextState = {
      ...state,
      ...profile,
    };

    expect(userReducer(state, actions.setUserProfileSuccess(profile))).toEqual(
      nextState,
    );
  });
});
