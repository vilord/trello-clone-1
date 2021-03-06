const Board = require('./board');
const genObjectId = require('mongoose').Types.ObjectId;
const { ObjectId } = require('mongoose').Schema.Types;

// Constants
const { BLUE, GREEN } = require('../constants/background-colors');

describe('Board Model', () => {
  const board = Board.schema.obj;

  describe('title', () => {
    it('is of type String', () => {
      expect(board.title.type).toBe(String);
    });

    it('is required', () => {
      const board = new Board();
      const err = board.validateSync();
      expect(err.errors.title).toBeDefined();
    });

    it('is trimmed', () => {
      const board = new Board({
        title: '  some title  ',
      });
      expect(board.title).toEqual('some title');
    });

    it('disallows consecutive spaces', () => {
      const board = new Board({
        title: 'invalid  spaced  title',
      });
      const err = board.validateSync();
      expect(err.errors.title).toBeDefined();
    });

    it('is valid when correctly spaced', () => {
      const board = new Board({
        title: 'valid title',
        members: [genObjectId()],
      });
      const err = board.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('visibility', () => {
    it('is of type String', () => {
      expect(board.visibility.type).toBe(String);
    });

    it('should fail when passed an invalid visibility value', () => {
      const board = new Board({
        visibility: 'some',
      });
      const err = board.validateSync();
      expect(err.errors.visibility).toBeDefined();
    });

    it('should pass when given a valid value', () => {
      const board = new Board({
        visibility: 'public',
      });
      const err = board.validateSync();
      expect(err.errors.visibility).toBeUndefined();
    });

    it('defaults to private', () => {
      expect(board.visibility.default).toEqual('private');
    });
  });

  describe('lists', () => {
    it('is Array', () => {
      expect(board.lists).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = board.lists[0];
      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref List', () => {
        expect(obj.ref).toBe('List');
      });
    });
  });

  describe('labels', () => {
    it('is Array', () => {
      expect(board.labels).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = board.labels[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Label', () => {
        expect(obj.ref).toBe('Label');
      });
    });
  });

  describe('members', () => {
    it('is an Array', () => {
      expect(board.members.type).toBeInstanceOf(Array);
    });

    it('requires at least one member', () => {
      const board = new Board({
        title: 'Trello Clone',
      });
      const err = board.validateSync();
      expect(err.errors.members).toBeDefined();
    });

    describe('obj', () => {
      const obj = board.members.type[0];

      describe('user', () => {
        const user = obj.user;

        it('is of type ObjectId', () => {
          expect(user.type).toBe(ObjectId);
        });

        it('is of ref User', () => {
          expect(user.ref).toBe('User');
        });
      });

      describe('admin', () => {
        const admin = obj.admin;
        it('is of type Boolean', () => {
          expect(admin.type).toBe(Boolean);
        });

        it('defaults to false', () => {
          expect(admin.default).toEqual(false);
        });
      });
    });
  });

  describe('activity', () => {
    it('is an Array', () => {
      expect(board.activity).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = board.activity[0];
      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Activity', () => {
        expect(obj.ref).toEqual('Activity');
      });
    });
  });

  describe('theme', () => {
    const { theme } = board;

    describe('color', () => {
      it('is of Type String', () => {
        expect(theme.color.type).toBe(String);
      });

      it('defaults to BLUE background color', () => {
        expect(theme.color.default).toBe(BLUE);
      });

      it('fails if not a valid color', () => {
        const board = new Board({
          title: 'some title',
          theme: {
            color: 'invalid color',
          },
        });
        const err = board.validateSync();
        expect(err.errors['theme.color']).toBeDefined();
      });

      it('passes with a valid color', () => {
        const board = new Board({
          title: 'some title',
          members: [genObjectId()],
          theme: {
            color: GREEN,
          },
        });
        const err = board.validateSync();
        expect(err).toBeUndefined();
      });
    });

    describe('picture', () => {
      it('is of type String', () => {
        expect(theme.picture.type).toBe(String);
      });

      it('fails when not a valid URL', () => {
        const board = new Board({
          title: 'some title',
          theme: {
            picture: 'invalid URL',
          },
        });
        const err = board.validateSync();
        expect(err.errors['theme.picture']).toBeDefined();
      });

      it('pass with a valid URL', () => {
        const board = new Board({
          title: 'some title',
          members: [genObjectId()],
          theme: {
            picture: 'https://images.unsplash.com/photo',
          },
        });
        const err = board.validateSync();
        expect(err).toBeUndefined();
      });
    });
  });
});
