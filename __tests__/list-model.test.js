const List = require('../models/list');

// Schemas
const CardSchema = require('../models/card').schema;

describe('List model', () => {
  const list = List.schema.obj;

  describe('title field', () => {
    it('exists', () => {
      expect(list.title).toBeDefined();
    });

    it('is of type String', () => {
      expect(list.title.type).toBe(String);
    });

    it('is required', () => {
      const list = new List();
      const err = list.validateSync();
      expect(err.errors.title).toBeDefined();
    });
  });

  describe('cards field', () => {
    it('exists', () => {
      expect(list.cards).toBeDefined();
    });

    it('is an Array of CardSchemas', () => {
      expect(list.cards).toBeInstanceOf(Array);
      expect(list.cards[0]).toBe(CardSchema);
    });
  });

  describe('archived field', () => {
    it('exists', () => {
      expect(list.archived).toBeDefined();
    });

    it('is of type Boolean', () => {
      expect(list.archived.type).toBe(Boolean);
    });

    it('defaults to false', () => {
      expect(list.archived.default).toBe(false);
    });
  });
});