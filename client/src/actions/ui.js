import * as types from '../constants/actionTypes';

/**
 * UI Errors
 */
export const setUiError = error => ({
  type: types.SET_UI_ERROR,
  error,
});

export const resetUiError = () => ({
  type: types.RESET_UI_ERROR,
});

/**
 * Boards Explorer
 */
export const showBoardsExplorer = () => ({
  type: types.SHOW_BOARDS_EXPLORER,
});

export const hideBoardsExplorer = () => ({
  type: types.HIDE_BOARDS_EXPLORER,
});

/**
 * Header Search
 */
export const focusHeaderSearch = () => ({
  type: types.FOCUS_HEADER_SEARCH,
});

export const blurHeaderSearch = () => ({
  type: types.BLUR_HEADER_SEARCH,
});

/**
 * Create Menu
 */
export const showCreateMenu = () => ({
  type: types.SHOW_CREATE_MENU,
});

export const hideCreateMenu = () => ({
  type: types.HIDE_CREATE_MENU,
});

/**
 * Notifications
 */
export const showNotifications = () => ({
  type: types.SHOW_NOTIFICATIONS,
});

export const hideNotifications = () => ({
  type: types.HIDE_NOTIFICATIONS,
});

/**
 * User Menu
 */
export const showUserMenu = () => ({
  type: types.SHOW_USER_MENU,
});

export const hideUserMenu = () => ({
  type: types.HIDE_USER_MENU,
});

/**
 * Board Menu
 */
export const showBoardMenu = () => ({
  type: types.SHOW_BOARD_MENU,
});

export const hideBoardMenu = () => ({
  type: types.HIDE_BOARD_MENU,
});
