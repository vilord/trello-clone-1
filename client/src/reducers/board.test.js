import boardReducer from './board';
import * as actions from '../actions/board';
import initBoardState from './initBoardState';

describe('Board Reducer', () => {
  let initState;
  beforeEach(() => {
    initState = { ...initBoardState };
  });

  it('returns init state when undefined', () => {
    expect(boardReducer(undefined, actions.getBoardRequest())).toEqual(
      initState,
    );
  });

  it('handles GET_BOARD_SUCESS action', () => {
    const board = {
      title: 'Trello Clone',
      visibility: 'team',
    };

    const newState = {
      ...initState,
      ...board,
    };

    expect(boardReducer(initState, actions.getBoardSucess(board))).toEqual(
      newState,
    );
  });
});
