import * as actions from './ui';
import * as types from '../constants/actionTypes';
import * as errors from '../constants/errors';

describe('ui actions', () => {
  describe('Action Creators', () => {
    describe('UI Errors', () => {
      it('creates a SET_UI_ERROR action', () => {
        const expected = {
          type: types.SET_UI_ERROR,
          error: errors.invalidEmail,
        };

        expect(actions.setUiError(errors.invalidEmail)).toEqual(expected);
        expect(actions.setUiError(errors.invalidEmail)).toMatchSnapshot();
      });

      it('creates a RESET_UI_ERROR action', () => {
        const expected = { type: types.RESET_UI_ERROR };
        expect(actions.resetUiError()).toEqual(expected);
        expect(actions.resetUiError()).toMatchSnapshot();
      });
    });

    describe('Board Menu', () => {
      it('creates a SHOW_BOARD_MENU action', () => {
        const expected = { type: types.SHOW_BOARD_MENU };
        expect(actions.showBoardMenu()).toEqual(expected);
        expect(actions.showBoardMenu()).toMatchSnapshot();
      });

      it('creates a HIDE_BOARD_MENU action', () => {
        const expected = { type: types.HIDE_BOARD_MENU };
        expect(actions.hideBoardMenu()).toEqual(expected);
        expect(actions.hideBoardMenu()).toMatchSnapshot();
      });
    });

    describe('Header Search', () => {
      it('creates a FOCUS_HEADER_SEARCH action', () => {
        const expected = { type: types.FOCUS_HEADER_SEARCH };
        expect(actions.focusHeaderSearch()).toEqual(expected);
        expect(actions.focusHeaderSearch()).toMatchSnapshot();
      });

      it('creates a BLUR_HEADER_SEARCH action', () => {
        const expected = { type: types.BLUR_HEADER_SEARCH };
        expect(actions.blurHeaderSearch()).toEqual(expected);
        expect(actions.blurHeaderSearch()).toMatchSnapshot();
      });
    });

    describe('Boards Explorer', () => {
      it('creates a SHOW_BOARDS_EXPLORER action', () => {
        const expected = { type: types.SHOW_BOARDS_EXPLORER };
        expect(actions.showBoardsExplorer()).toEqual(expected);
        expect(actions.showBoardsExplorer()).toMatchSnapshot();
      });

      it('creates a HIDE_BOARDS_EXPLORER action', () => {
        const expected = { type: types.HIDE_BOARDS_EXPLORER };
        expect(actions.hideBoardsExplorer()).toEqual(expected);
        expect(actions.hideBoardsExplorer()).toMatchSnapshot();
      });
    });
  });
});
