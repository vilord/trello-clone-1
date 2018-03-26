import * as types from '../constants/actionTypes';

/*
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
    const res = await fetch(`/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const { user, error } = await res.json();

    if (res.status === 200 && user) {
      return dispatch(loginUserSuccess(user));
    }

    return dispatch(signupUserFailure(error));
  } catch (err) {
    console.log(err);
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

    const { user, error } = await res.json();

    if (res.status === 200 && user) {
      return dispatch(loginUserSuccess(user));
    }

    return dispatch(loginUserFailure(error));
  } catch (err) {
    console.log(err);
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

    const { user } = await res.json();

    if (res.status === 200 && user) {
      return dispatch(loginUserSuccess(user));
    }

    return dispatch(logoutUser());
  } catch (err) {
    console.log(err);
  }
};

export const sendLogoutUser = () => async dispatch => {
  try {
    const res = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'inlude',
    });

    if (res.status !== 200) throw new Error(await res.json());
  } catch (err) {
    console.log(err);
  }

  dispatch(logoutUser());
};

export const setUserProfile = newProfile => async dispatch => {
  dispatch(setUserProfileRequest());

  try {
    const res = await fetch('/users/profile', {
      method: 'PUT',
      credentials: 'include',
      body: {
        profile: newProfile,
      },
    });

    const { profile, error } = await res.json();

    if (res.status === 200 && profile) {
      return dispatch(setUserProfileSuccess(profile));
    }

    return dispatch(setUserProfileFailure(error));
  } catch (err) {
    console.log(err);
  }
};
