import * as actions from './board';
import * as types from '../constants/actionTypes';

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
  });
});
