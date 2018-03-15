const Board = require('../models/board');

// Schemas
const LabelSchema = require('../models/label').schema;
const ListSchema = require('../models/list').schema;
const UserSchema = require('../models/user').schema;

// Constants
const { BLUE, GREEN } = require('../constants/background-colors');

describe('Board Model', () => {
  const board = Board.schema.obj;

  describe('title field', () => {
    it('exists', () => {
      expect(board.title).toBeDefined();
    });

    it('is of type String', () => {
      expect(board.title.type).toBe(String);
    });

    it('is required', () => {
      const board = new Board();
      const err = board.validateSync();
      expect(err.errors.title).toBeDefined();
    });
  });

  describe('visibility field', () => {
    it('exists', () => {
      expect(board.visibility).toBeDefined();
    });

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

    it('defaults to public', () => {
      expect(board.visibility.default).toEqual('public');
    });
  });

  describe('lists field', () => {
    it('exists', () => {
      expect(board.lists).toBeDefined();
    });

    it('is Array of ListSchemas', () => {
      expect(board.lists).toBeInstanceOf(Array);
      expect(board.lists[0]).toBe(ListSchema);
    });
  });

  describe('labels field', () => {
    it('exists', () => {
      expect(board.labels).toBeDefined();
    });

    it('is Array of LabelSchemas', () => {
      expect(board.labels).toBeInstanceOf(Array);
      expect(board.labels[0]).toBe(LabelSchema);
    });
  });

  describe('members field', () => {
    it('exists', () => {
      expect(board.members).toBeDefined();
    });

    it('is an Array', () => {
      expect(board.members).toBeInstanceOf(Array);
    });

    describe('nested object', () => {
      const obj = board.members[0];
      it('has a user with a UserSchema', () => {
        expect(obj.user).toBeDefined();
        expect(obj.user).toBe(UserSchema);
      });

      it('has admin field', () => {
        expect(obj.admin).toBeDefined();
      });

      it('admin is of type Boolean', () => {
        expect(obj.admin.type).toBe(Boolean);
      });

      it('admin defaults to false', () => {
        expect(obj.admin.default).toEqual(false);
      });
    });

    describe('theme field', () => {
      const { theme } = board;

      it('exists', () => {
        expect(theme).toBeDefined();
      });

      describe('color', () => {
        it('exists', () => {
          expect(theme.color).toBeDefined();
        });

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
            theme: {
              color: GREEN,
            },
          });
          const err = board.validateSync();
          expect(err).toBeUndefined();
        });
      });

      describe('picture', () => {
        it('exists', () => {
          expect(theme.picture).toBeDefined();
        });

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

  // TODO: Activities
});
