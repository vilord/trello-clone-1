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

      it('creates a SET_HEADER_SEARCH action', () => {
        const term = 'something';
        const expected = { type: types.SET_HEADER_SEARCH, term };
        expect(actions.setHeaderSearch(term)).toEqual(expected);
        expect(actions.setHeaderSearch(term)).toMatchSnapshot();
      });
    });

    describe('Create Menu', () => {
      it('creates a SHOW_CREATE_MENU action', () => {
        const expected = { type: types.SHOW_CREATE_MENU };
        expect(actions.showCreateMenu()).toEqual(expected);
        expect(actions.showCreateMenu()).toMatchSnapshot();
      });

      it('creates a HIDE_CREATE_MENU action', () => {
        const expected = { type: types.HIDE_CREATE_MENU };
        expect(actions.hideCreateMenu()).toEqual(expected);
        expect(actions.hideCreateMenu()).toMatchSnapshot();
      });
    });

    describe('Notifications', () => {
      it('creates a SHOW_NOTIFICATIONS action', () => {
        const expected = { type: types.SHOW_NOTIFICATIONS };
        expect(actions.showNotifications()).toEqual(expected);
        expect(actions.showNotifications()).toMatchSnapshot();
      });

      it('creates a HIDE_NOTIFICATIONS action', () => {
        const expected = { type: types.HIDE_NOTIFICATIONS };
        expect(actions.hideNotifications()).toEqual(expected);
        expect(actions.hideNotifications()).toMatchSnapshot();
      });
    });

    describe('User Menu', () => {
      it('creates a SHOW_USER_MENU action', () => {
        const expected = { type: types.SHOW_USER_MENU };
        expect(actions.showUserMenu()).toEqual(expected);
        expect(actions.showUserMenu()).toMatchSnapshot();
      });

      it('creates a HIDE_USER_MENU action', () => {
        const expected = { type: types.HIDE_USER_MENU };
        expect(actions.hideUserMenu()).toEqual(expected);
        expect(actions.hideUserMenu()).toMatchSnapshot();
      });
    });

    describe('Rename Board', () => {
      it('creates a SHOW_RENAME_BOARD action', () => {
        const expected = { type: types.SHOW_RENAME_BOARD };
        expect(actions.showRenameBoard()).toEqual(expected);
        expect(actions.showRenameBoard()).toMatchSnapshot();
      });

      it('creates a HIDE_RENAME_BOARD action', () => {
        const expected = { type: types.HIDE_RENAME_BOARD };
        expect(actions.hideRenameBoard()).toEqual(expected);
        expect(actions.hideRenameBoard()).toMatchSnapshot();
      });
    });

    describe('Add to Team', () => {
      it('creates a SHOW_ADD_TO_TEAM action', () => {
        const expected = { type: types.SHOW_ADD_TO_TEAM };
        expect(actions.showAddToTeam()).toEqual(expected);
        expect(actions.showAddToTeam()).toMatchSnapshot();
      });

      it('creates a HIDE_ADD_TO_TEAM action', () => {
        const expected = { type: types.HIDE_ADD_TO_TEAM };
        expect(actions.hideAddToTeam()).toEqual(expected);
        expect(actions.hideAddToTeam()).toMatchSnapshot();
      });
    });

    describe('Visibility Menu', () => {
      it('creates a SHOW_VISIBILITY_MENU action', () => {
        const expected = { type: types.SHOW_VISIBILITY_MENU };
        expect(actions.showVisibilityMenu()).toEqual(expected);
        expect(actions.showVisibilityMenu()).toMatchSnapshot();
      });

      it('creates a HIDE_VISIBILITY_MENU action', () => {
        const expected = { type: types.HIDE_VISIBILITY_MENU };
        expect(actions.hideVisibilityMenu()).toEqual(expected);
        expect(actions.hideVisibilityMenu()).toMatchSnapshot();
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
  });
});
