import * as types from '../constants/actionTypes';
import initState from './initBoardState';

const boardReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_BOARD_SUCESS:
      return {
        ...state,
        ...action.board,
      };
    default:
      return state;
  }
};

export default boardReducer;
