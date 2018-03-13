const Label = require('../models/label');
const { GREEN } = require('../constants/label-colors');

describe('Label Model', () => {
  const user = Label.schema.obj;

  it('has color', () => {
    expect(user.color).toBeDefined();
  });

  it('requires a color', () => {
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

  it('requires an allowed label hex color', () => {
    const label = new Label({
      color: '#FFF',
    });
    const err = label.validateSync();
    expect(err.errors.color).toBeDefined();
  });

  it('passes with a valid label hex color', () => {
    const label = new Label({
      color: GREEN,
    });
    const err = label.validateSync();
    expect(err).not.toBeDefined();
  });

  it('has a text field', () => {
    expect(user.text).toBeDefined();
  });
});