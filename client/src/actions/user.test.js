import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './user';
import * as types from '../constants/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('user actions', () => {
  describe('Action Creators', () => {
    describe('Logout User', () => {
      it('creates a LOGOUT_USER action', () => {
        const expected = { type: types.LOGOUT_USER };
        expect(actions.logoutUser()).toEqual(expected);
      });
    });

    describe('Signup User', () => {
      it('creates a SIGNUP_USER_REQUEST', () => {
        const expected = { type: types.SIGNUP_USER_REQUEST };
        expect(actions.signupUserRequest()).toEqual(expected);
      });

      it('creates a SIGNUP_USER_FAILURE action', () => {
        const expected = { type: types.SIGNUP_USER_FAILURE };
        expect(actions.signupUserFailure()).toEqual(expected);
      });
    });

    describe('Login User', () => {
      it('creates a LOGIN_USER_REQUEST action', () => {
        const expected = { type: types.LOGIN_USER_REQUEST };
        expect(actions.loginUserRequest()).toEqual(expected);
      });

      it('creates a LOGIN_USER_SUCCESS action', () => {
        const user = { username: 'juanito' };
        const expected = { type: types.LOGIN_USER_SUCCESS, user };
        expect(actions.loginUserSuccess(user)).toEqual(expected);
      });

      it('creates a LOGIN_USER_FAILURE action', () => {
        const error = new Error('Login user failure');
        const expected = { type: types.LOGIN_USER_FAILURE, error };
        expect(actions.loginUserFailure(error)).toEqual(expected);
      });
    });

    describe('Set User Profile', () => {
      it('creates a SET_USER_PROFILE_REQUEST action', () => {
        const expected = { type: types.SET_USER_PROFILE_REQUEST };
        expect(actions.setUserProfileRequest()).toEqual(expected);
      });

      it('creates a SET_USER_PROFILE_SUCCESS action', () => {
        const expected = { type: types.SET_USER_PROFILE_SUCCESS };
        expect(actions.setUserProfileSuccess()).toEqual(expected);
      });

      it('creates a SET_USER_PROFILE_FAILURE action', () => {
        const expected = { type: types.SET_USER_PROFILE_FAILURE };
        expect(actions.setUserProfileFailure()).toEqual(expected);
      });
    });
  });

  describe('Async Actions', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    describe('signupUser', () => {
      const user = { username: 'johndoe' };

      it('on success', () => {
        fetchMock.post('/users', {
          headers: { 'content-type': 'application/json' },
          body: {
            user,
          },
        });

        const expected = [
          { type: types.SIGNUP_USER_REQUEST },
          { type: types.LOGIN_USER_SUCCESS, user },
        ];

        const store = mockStore({});

        return store.dispatch(actions.signupUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });

      it('on failure', () => {
        const res = {
          error: 'Signup failure.',
        };
        fetchMock.post('/users', {
          status: 409,
          body: res,
        });

        const expected = [
          { type: types.SIGNUP_USER_REQUEST },
          { type: types.SIGNUP_USER_FAILURE, error: res.error },
        ];

        const store = mockStore({});

        return store.dispatch(actions.signupUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });
    });

    describe('loginUser', () => {
      const user = { username: 'johndoe' };

      it('on success', () => {
        fetchMock.post('/auth/login', {
          headers: { 'content-type': 'application/json' },
          body: { user },
        });

        const expected = [
          { type: types.LOGIN_USER_REQUEST },
          { type: types.LOGIN_USER_SUCCESS, user },
        ];

        const store = mockStore({});

        return store.dispatch(actions.loginUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });

      it('on failure', () => {
        const res = {
          error: 'loginUser failure.',
        };

        fetchMock.post('/auth/login', {
          status: 400,
          body: res,
        });

        const expected = [
          { type: types.LOGIN_USER_REQUEST },
          { type: types.LOGIN_USER_FAILURE, error: res.error },
        ];

        const store = mockStore({});

        return store.dispatch(actions.loginUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });
    });

    describe('getUserSession', () => {
      it('on success', () => {
        const user = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '0notJohnDoe',
        };

        fetchMock.get('/auth/user-session', {
          headers: { 'content-type': 'application/json' },
          body: {
            user,
          },
        });

        const expected = [{ type: types.LOGIN_USER_SUCCESS, user }];

        const store = mockStore({ user });

        return store.dispatch(actions.getUserSession()).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });

      it('on failure', () => {
        fetchMock.get('/auth/user-session', {
          status: 400,
          body: {
            error: 'getUserSession failure.',
          },
        });

        const expected = [{ type: types.LOGOUT_USER }];

        const store = mockStore({});

        return store.dispatch(actions.getUserSession()).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });
    });

    describe('sendLogoutUser', () => {
      it('on success', () => {
        fetchMock.post('/auth/logout', {});

        const expected = [{ type: types.LOGOUT_USER }];

        const store = mockStore({});

        return store.dispatch(actions.sendLogoutUser()).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });
    });

    describe('setUserProfile', () => {
      it('on success', () => {
        const profile = {
          name: 'John Doe',
          username: 'johndoe',
          initials: 'JD',
          bio: 'Web Developer',
          avatar: 'https://example.com/profile_pic',
        };

        fetchMock.put('/users/profile', {
          headers: { 'content-type': 'application/json' },
          body: {
            profile,
          },
        });

        const expected = [
          { type: types.SET_USER_PROFILE_REQUEST },
          { type: types.SET_USER_PROFILE_SUCCESS, profile },
        ];

        const store = mockStore({});

        return store.dispatch(actions.setUserProfile(profile)).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });

      it('on failure', () => {
        const  error= 'setUserProfile failure.';

        fetchMock.put('/users/profile', {
          status: 400,
          body: { error }
        });

        const expected = [
          { type: types.SET_USER_PROFILE_REQUEST },
          { type: types.SET_USER_PROFILE_FAILURE, error },
        ];

        const store = mockStore({});

        const profile = { username: 'johndoe' };
        return store.dispatch(actions.setUserProfile(profile)).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
      });
    });
  });
});
