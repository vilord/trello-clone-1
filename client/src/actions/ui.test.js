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
      });

      it('creates a RESET_UI_ERROR action', () => {
        const expected = { type: types.RESET_UI_ERROR };
        expect(actions.resetUiError()).toEqual(expected);
      });
    });

    describe('Main Menu', () => {
      it('creates a SHOW_MAIN_MENU action', () => {
        const expected = { type: types.SHOW_MAIN_MENU };
        expect(actions.showMainMenu()).toEqual(expected);
      });

      it('creates a HIDE_MAIN_MENU action', () => {
        const expected = { type: types.HIDE_MAIN_MENU };
        expect(actions.hideMainMenu()).toEqual(expected);
      });
    });

    describe('Boards Menu', () => {
      it('creates a SHOW_BOARDS_MENU action', () => {
        const expected = { type: types.SHOW_BOARDS_MENU };
        expect(actions.showBoardsMenu()).toEqual(expected);
      });

      it('creates a HIDE_BOARDS_MENU action', () => {
        const expected = { type: types.HIDE_BOARDS_MENU };
        expect(actions.hideBoardsMenu()).toEqual(expected);
      });
    });
  });
});
