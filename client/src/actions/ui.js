import * as types from '../constants/actionTypes';

export const setUiError = error => ({
  type: types.SET_UI_ERROR,
  error,
});

export const resetUiError = () => ({
  type: types.RESET_UI_ERROR,
});

export const showBoardMenu = () => ({
  type: types.SHOW_BOARD_MENU,
});

export const hideBoardMenu = () => ({
  type: types.HIDE_BOARD_MENU,
});

export const focusHeaderSearch = () => ({
  type: types.FOCUS_HEADER_SEARCH,
});

export const blurHeaderSearch = () => ({
  type: types.BLUR_HEADER_SEARCH,
});

export const showBoardsExplorer = () => ({
  type: types.SHOW_BOARDS_EXPLORER,
});

export const hideBoardsExplorer = () => ({
  type: types.HIDE_BOARDS_EXPLORER,
});
