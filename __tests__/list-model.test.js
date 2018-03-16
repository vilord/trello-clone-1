const List = require('../models/list');
const { ObjectId } = require('mongoose').Schema.Types;

describe('List model', () => {
  const list = List.schema.obj;

  describe('title', () => {
    it('is of type String', () => {
      expect(list.title.type).toBe(String);
    });

    it('is required', () => {
      const list = new List();
      const err = list.validateSync();
      expect(err.errors.title).toBeDefined();
    });
  });

  describe('cards', () => {
    it('is an Array', () => {
      expect(list.cards).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = list.cards[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Card', () => {
        expect(obj.ref).toBe('Card');
      });
    });
  });

  describe('archived', () => {
    it('is of type Boolean', () => {
      expect(list.archived.type).toBe(Boolean);
    });

    it('defaults to false', () => {
      expect(list.archived.default).toBe(false);
    });
  });
});
