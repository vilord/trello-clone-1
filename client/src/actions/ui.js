
import * as types from '../constants/actionTypes';

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
