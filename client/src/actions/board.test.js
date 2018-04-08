import * as actions from './board';
import * as types from '../constants/actionTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

describe('Board Actions', () => {
  describe('Action Creators', () => {
    it('creates a SET_BOARD_TITLE action', () => {
      const expected = {
        type: types.SET_BOARD_TITLE,
        title: 'Some Title',
      };

      expect(actions.setBoardTitle(expected.title)).toEqual(expected);
      expect(actions.setBoardTitle(expected.title)).toMatchSnapshot();
    });

    it('creates a GET_BOARD_REQUEST action', () => {
      const expected = {
        type: types.GET_BOARD_REQUEST,
      };
      expect(actions.getBoardRequest()).toEqual(expected);
      expect(actions.getBoardRequest()).toMatchSnapshot();
    });

    it('creates a GET_BOARD_SUCESS action', () => {
      const board = {
        id: 'asdf',
      };
      const expected = {
        type: types.GET_BOARD_SUCESS,
        board,
      };
      expect(actions.getBoardSucess(board)).toEqual(expected);
      expect(actions.getBoardSucess(board)).toMatchSnapshot();
    });

    it('creates a GET_BOARD_FAILURE action', () => {
      const expected = {
        type: types.GET_BOARD_FAILURE,
      };
      expect(actions.getBoardFailure()).toEqual(expected);
      expect(actions.getBoardFailure()).toMatchSnapshot();
    });
  });

  describe('Async Actions', () => {
    const middleware = [thunk];
    const mockStore = configureStore(middleware);

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    describe('getBoard', () => {
      it('on success', () => {
        const board = {
          id: 'asdf123',
        };

        fetchMock.get(`/boards/${board.id}`, {
          headers: { 'content-type': 'application/json' },
          body: {
            board,
          },
        });

        const expected = [
          { type: types.GET_BOARD_REQUEST },
          { type: types.GET_BOARD_SUCESS, board },
        ];

        const store = mockStore({});

        return store.dispatch(actions.getBoard(board.id)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });

      it('on failure', () => {
        const board = {
          id: 'asdf123',
        };

        fetchMock.get(`/boards/${board.id}`, {
          headers: { 'content-type': 'application/json' },
          status: 400,
          body: {
            board,
          },
        });

        const expected = [
          { type: types.GET_BOARD_REQUEST },
          { type: types.GET_BOARD_FAILURE },
        ];

        const store = mockStore({});

        return store.dispatch(actions.getBoard(board.id)).then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });
  });
});
