import * as types from '../constants/actionTypes';

export const setBoardTitle = title => ({
  type: types.SET_BOARD_TITLE,
  title,
});
