const Label = require('../models/label');
const { GREEN } = require('../constants/label-colors');

describe('Label Model', () => {
  const label = Label.schema.obj;

  describe('color', () => {
    const color = label.color;

    it('is of type String', () => {
      expect(color.type).toBe(String);
    });

    it('is required', () => {
      const label = new Label();
      const err = label.validateSync();
      expect(err.errors.color).toBeDefined();
    });

    it('requires a valid hex color', () => {
      const label = new Label({
        color: 'not a hex color',
      });
      const err = label.validateSync();
      expect(err.errors.color).toBeDefined();
    });

    it('requires a hex labelColor', () => {
      const label = new Label({
        color: '#FFF',
      });
      const err = label.validateSync();
      expect(err.errors.color).toBeDefined();
    });

    it('passes with a valid theme hex labelColor', () => {
      const label = new Label({
        color: GREEN,
      });
      const err = label.validateSync();
      expect(err).not.toBeDefined();
    });
  });

  describe('text', () => {
    it('is of type String', () => {
      expect(label.text).toBe(String);
    });
  });
});
