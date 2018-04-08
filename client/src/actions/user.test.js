import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './user';
import * as types from '../constants/actionTypes';
import * as errors from '../constants/errors';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('User Actions', () => {
  describe('Action Creators', () => {
    describe('Signup User', () => {
      it('creates a SIGNUP_USER_REQUEST', () => {
        const expected = { type: types.SIGNUP_USER_REQUEST };
        expect(actions.signupUserRequest()).toEqual(expected);
        expect(actions.signupUserRequest()).toMatchSnapshot();
      });

      it('creates a SIGNUP_USER_SUCCESS', () => {
        const user = {
          username: 'johndoe',
          email: 'johndoe@example.com',
        };
        const expected = { type: types.SIGNUP_USER_SUCCESS, user };
        expect(actions.signupUserSuccess(user)).toEqual(expected);
        expect(actions.signupUserSuccess(user)).toMatchSnapshot();
      });

      it('creates a SIGNUP_USER_FAILURE', () => {
        const expected = {
          type: types.SIGNUP_USER_FAILURE,
          error: errors.serverError,
        };
        expect(actions.signupUserFailure(errors.serverError)).toEqual(expected);
        expect(actions.signupUserFailure(errors.serverError)).toMatchSnapshot();
      });
    });

    describe('Login User', () => {
      it('creates a LOGIN_USER_REQUEST action', () => {
        const expected = { type: types.LOGIN_USER_REQUEST };
        expect(actions.loginUserRequest()).toEqual(expected);
        expect(actions.loginUserRequest()).toMatchSnapshot();
      });

      it('creates a LOGIN_USER_SUCCESS action', () => {
        const user = {
          username: 'johndoe',
          email: 'johndoe@example.com',
        };
        const expected = { type: types.LOGIN_USER_SUCCESS, user };
        expect(actions.loginUserSuccess(user)).toEqual(expected);
        expect(actions.loginUserSuccess(user)).toMatchSnapshot();
      });

      it('creates a LOGIN_USER_FAILURE action', () => {
        const error = errors.wrongCredentials;
        const expected = {
          type: types.LOGIN_USER_FAILURE,
          error,
        };
        expect(actions.loginUserFailure(error)).toEqual(expected);
        expect(actions.loginUserFailure(error)).toMatchSnapshot();
      });
    });

    describe('Logout User', () => {
      it('creates a LOGOUT_USER action', () => {
        const expected = { type: types.LOGOUT_USER };
        expect(actions.logoutUser()).toEqual(expected);
        expect(actions.logoutUser()).toMatchSnapshot();
      });
    });

    describe('Set User Profile', () => {
      it('creates a SET_USER_PROFILE_REQUEST action', () => {
        const expected = { type: types.SET_USER_PROFILE_REQUEST };
        expect(actions.setUserProfileRequest()).toEqual(expected);
        expect(actions.setUserProfileRequest()).toMatchSnapshot();
      });

      it('creates a SET_USER_PROFILE_SUCCESS action', () => {
        const profile = {
          name: 'John Doe',
          initials: 'JD',
        };
        const expected = {
          type: types.SET_USER_PROFILE_SUCCESS,
          profile,
        };
        expect(actions.setUserProfileSuccess(profile)).toEqual(expected);
        expect(actions.setUserProfileSuccess(profile)).toMatchSnapshot();
      });

      it('creates a SET_USER_PROFILE_FAILURE action', () => {
        const error = errors.serverError;
        const expected = {
          type: types.SET_USER_PROFILE_FAILURE,
          error,
        };
        expect(actions.setUserProfileFailure(error)).toEqual(expected);
        expect(actions.setUserProfileFailure(error)).toMatchSnapshot();
      });
    });
  });

  describe('Async Actions', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    describe('signupUser', () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123abc',
      };

      it('on success', () => {
        fetchMock.post('/users', {
          headers: { 'content-type': 'application/json' },
          body: {
            user,
          },
        });

        const expected = [
          { type: types.SIGNUP_USER_REQUEST },
          { type: types.SIGNUP_USER_SUCCESS, user },
        ];

        const store = mockStore({});
        const historyMock = {
          push: jest.fn(),
        };

        return store
          .dispatch(actions.signupUser(user, historyMock))
          .then(() => {
            expect(historyMock.push.mock.calls[0][0]).toBe('/');
            expect(store.getActions()).toEqual(expected);
            expect(historyMock.push.mock.calls[0][0]).toMatchSnapshot();
            expect(store.getActions()).toMatchSnapshot();
          });
      });

      it('failure -> user already exists', () => {
        fetchMock.post('/users', {
          status: 409,
          body: {
            error: 'Signup failure.',
          },
        });

        const expected = [
          { type: types.SIGNUP_USER_REQUEST },
          { type: types.SIGNUP_USER_FAILURE, error: errors.userExists },
        ];

        const store = mockStore({});

        return store.dispatch(actions.signupUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });

      it('failure -> unknown server error', () => {
        fetchMock.post('/users', {
          status: 500,
          body: {
            error: 'Signup failure.',
          },
        });

        const expected = [
          { type: types.SIGNUP_USER_REQUEST },
          { type: types.SIGNUP_USER_FAILURE, error: errors.serverError },
        ];

        const store = mockStore({});

        return store.dispatch(actions.signupUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });

    describe('loginUser', () => {
      const user = {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: '123abc',
      };

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
        const historyMock = {
          push: jest.fn(),
        };

        return store.dispatch(actions.loginUser(user, historyMock)).then(() => {
          expect(historyMock.push.mock.calls[0][0]).toBe('/');
          expect(store.getActions()).toEqual(expected);
          expect(historyMock.push.mock.calls[0][0]).toMatchSnapshot();
          expect(store.getActions()).toMatchSnapshot();
        });
      });

      it('on failure', () => {
        fetchMock.post('/auth/login', {
          status: 400,
          body: {
            error: 'loginUser failure.',
          },
        });

        const expected = [
          { type: types.LOGIN_USER_REQUEST },
          { type: types.LOGIN_USER_FAILURE, error: errors.wrongCredentials },
        ];

        const store = mockStore({});

        return store.dispatch(actions.loginUser(user)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });

    describe('getUserSession', () => {
      it('on success', () => {
        const user = {
          name: 'johndoe',
          email: 'johndoe@example.com',
        };

        fetchMock.get('/auth/user-session', {
          headers: { 'content-type': 'application/json' },
          body: {
            user,
          },
        });

        const expected = [
          { type: types.GET_USER_SESSION_REQUEST },
          { type: types.GET_USER_SESSION_SUCCESS, user },
        ];

        const store = mockStore({ user });
        const historyMock = {
          push: jest.fn(),
        };

        return store.dispatch(actions.getUserSession(historyMock)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });

      it('on failure', () => {
        fetchMock.get('/auth/user-session', {
          status: 400,
          body: {
            error: 'getUserSession failure.',
          },
        });

        const expected = [
          { type: types.GET_USER_SESSION_REQUEST },
          { type: types.LOGOUT_USER },
        ];

        const store = mockStore({});
        const historyMock = {
          push: jest.fn(),
        };

        return store.dispatch(actions.getUserSession(historyMock)).then(() => {
          expect(historyMock.push.mock.calls[0][0]).toBe('/login');
          expect(store.getActions()).toEqual(expected);
          expect(historyMock.push.mock.calls[0][0]).toMatchSnapshot();
          expect(store.getActions()).toMatchSnapshot();
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
          expect(store.getActions()).toMatchSnapshot();
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
          expect(store.getActions()).toMatchSnapshot();
        });
      });

      it('on failure', () => {
        fetchMock.put('/users/profile', {
          status: 400,
          body: {
            error: errors.serverError,
          },
        });

        const expected = [
          { type: types.SET_USER_PROFILE_REQUEST },
          { type: types.SET_USER_PROFILE_FAILURE, error: errors.serverError },
        ];

        const store = mockStore({});

        const profile = { username: 'johndoe' };
        return store.dispatch(actions.setUserProfile(profile)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });
  });
});
