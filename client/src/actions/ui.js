import * as types from '../constants/actionTypes';

export const setUiError = error => ({
  type: types.SET_UI_ERROR,
  error,
});

export const resetUiError = () => ({
  type: types.RESET_UI_ERROR,
});

export const showMainMenu = () => ({
  type: types.SHOW_MAIN_MENU,
});

export const hideMainMenu = () => ({
  type: types.HIDE_MAIN_MENU,
});

export const showBoardsMenu = () => ({
  type: types.SHOW_BOARDS_MENU,
});

export const hideBoardsMenu = () => ({
  type: types.HIDE_BOARDS_MENU,
});
