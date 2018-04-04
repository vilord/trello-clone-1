import * as actions from './ui';
import * as types from '../constants/actionTypes';
import * as errors from '../constants/errors';

describe('ui actions', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

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

    describe('Main Menu', () => {
      it('creates a SHOW_MAIN_MENU action', () => {
        const expected = { type: types.SHOW_MAIN_MENU };
        expect(actions.showMainMenu()).toEqual(expected);
        expect(actions.showMainMenu()).toMatchSnapshot();
      });

      it('creates a HIDE_MAIN_MENU action', () => {
        const expected = { type: types.HIDE_MAIN_MENU };
        expect(actions.hideMainMenu()).toEqual(expected);
        expect(actions.hideMainMenu()).toMatchSnapshot();
      });
    });

    describe('Boards Menu', () => {
      it('creates a SHOW_BOARDS_MENU action', () => {
        const expected = { type: types.SHOW_BOARDS_MENU };
        expect(actions.showBoardsMenu()).toEqual(expected);
        expect(actions.showBoardsMenu()).toMatchSnapshot();
      });

      it('creates a HIDE_BOARDS_MENU action', () => {
        const expected = { type: types.HIDE_BOARDS_MENU };
        expect(actions.hideBoardsMenu()).toEqual(expected);
        expect(actions.hideBoardsMenu()).toMatchSnapshot();
      });
    });
  });
});
