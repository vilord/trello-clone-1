const Checklist = require('../models/checklist');

describe('Checklist model', () => {
  const checklist = Checklist.schema.obj;

  it('has title', () => {
    expect(checklist.title).toBeDefined();
  });

  it('title is required', () => {
    const checklist = new Checklist();
    const err = checklist.validateSync();
    expect(err).toBeDefined();
    expect(err.errors.title).toBeDefined();
  });

  describe('items', () => {
    it('field exists', () => {
      expect(checklist.items).toBeDefined();
    });

    it('items is array', () => {
      expect(checklist.items).toBeInstanceOf(Array);
    });

    it('items have boolean status', () => {
      expect(checklist.items[0].status.type).toBe(Boolean);
    });

    it('items boolean status defaults to false', () => {
      expect(checklist.items[0].status.default).toBe(false);
    });

    it('items have text', () => {
      expect(checklist.items[0].text).toBeDefined();
    });

    it('items text is a String', () => {
      expect(checklist.items[0].text.type).toBe(String);
    });

    it('items text is required', () => {
      const checklist = new Checklist({
        title: 'Some title',
        items: [{
        }],
      });
      const err = checklist.validateSync();
      expect(err).toBeDefined();
      expect(err.errors['items.0.text']).toBeDefined();
    });
  });
});
