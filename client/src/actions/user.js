import * as types from '../constants/actionTypes';

/**
 * Signup User
 */
export const signupUserRequest = () => ({
  type: types.SIGNUP_USER_REQUEST,
});

export const signupUserFailure = error => ({
  type: types.SIGNUP_USER_FAILURE,
  error,
});

/**
 * Login User
 */
export const loginUserRequest = () => ({
  type: types.LOGIN_USER_REQUEST,
});

export const loginUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  user,
});

export const loginUserFailure = error => ({
  type: types.LOGIN_USER_FAILURE,
  error,
});

/**
 * Logout User
 */
export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

/**
 * Set User Profile
 */
export const setUserProfileRequest = () => ({
  type: types.SET_USER_PROFILE_REQUEST,
});

export const setUserProfileSuccess = profile => ({
  type: types.SET_USER_PROFILE_SUCCESS,
  profile,
});

export const setUserProfileFailure = error => ({
  type: types.SET_USER_PROFILE_FAILURE,
  error,
});

/**
 * Async Actions
 */
export const signupUser = (newUser, history) => async dispatch => {
  dispatch(signupUserRequest());

  try {
    const res = await fetch(`/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (res.status !== 200) throw new Error('userSignup failure');

    const { user } = await res.json();

    return dispatch(loginUserSuccess(user));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    dispatch(signupUserFailure(err));
  }
};

export const loginUser = (userLoginInfo, history) => async dispatch => {
  dispatch(loginUserRequest());

  try {
    const res = await fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userLoginInfo),
      credentials: 'include',
    });

    if (res.status !== 200) throw new Error('loginUser failure');

    const { user } = await res.json();

    dispatch(loginUserSuccess(user));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    dispatch(loginUserFailure(err));
  }
};

export const getUserSession = () => async dispatch => {
  try {
    const res = await fetch('/auth/user-session', {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });

    if (res.status !== 200) throw new Error('getUserSession failure');

    const user = await res.json();

    return dispatch(loginUserSuccess(user));
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    dispatch(logoutUser());
  }
};

export const sendLogoutUser = () => async dispatch => {
  try {
    const res = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'inlude',
    });

    if (res.status !== 200) throw new Error('sendLogoutUser failure');

  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
  }

  dispatch(logoutUser());
};
