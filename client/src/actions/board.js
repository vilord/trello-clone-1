import * as types from '../constants/actionTypes';

export const setBoardTitle = title => ({
  type: types.SET_BOARD_TITLE,
  title,
});

export const getBoardRequest = () => ({
  type: types.GET_BOARD_REQUEST,
});

export const getBoardSucess = board => ({
  type: types.GET_BOARD_SUCESS,
  board,
});

export const getBoardFailure = () => ({
  type: types.GET_BOARD_FAILURE,
});

export const getBoard = id => async dispatch => {
  dispatch(getBoardRequest());
  try {
    const res = await fetch(`/boards/${id}`, {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });

    if (res.status === 200) {
      const { board } = await res.json();
      return dispatch(getBoardSucess(board));
    }

    dispatch(getBoardFailure());
  } catch (err) {
    dispatch(getBoardFailure());
    console.log(err);
  }
};
