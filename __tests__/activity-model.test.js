const Activity = require('../models/activity');
const User = require('../models/user');
const Board = require('../models/board');

// Schemas
const UserSchema = User.schema;
const BoardSchema = Board.schema;
const CardSchema = require('../models/card').schema;


describe('Activity Model', () => {
  const activity = Activity.schema.obj;

  it('has timestap date', () => {
    const activity = Activity.schema.paths;
    expect(activity.createdAt).toBeDefined();
    expect(activity.updatedAt).toBeDefined();
  });


  describe('user field', () => {
    it('exists', () => {
      expect(activity.user).toBeDefined();
    });

    it('is of type UserSchema', () => {
      expect(activity.user.type).toBe(UserSchema);
    });

    it('is required', () => {
      const activity = new Activity();
      const err = activity.validateSync();
      expect(err.errors.user).toBeDefined();
    });
  });

  describe('text field', () => {
    it('exists', () => {
      expect(activity.text).toBeDefined();
    });

    it('is of type String', () => {
      expect(activity.text.type).toBe(String);
    });

    it('is required', () => {
      const activity = new Activity({
        user: new User({
          username: 'some username',
          email: 'some email',
        }),
      });
      const err = activity.validateSync();
      expect(err.errors.text).toBeDefined();
    });
  });

  describe('board field', () => {
    it('exists', () => {
      expect(activity.board).toBeDefined();
    });

    it('is of type BoardSchema', () => {
      expect(activity.board.type).toBe(BoardSchema);
    });

    it('is required', () => {
      const activity = new Activity({
        user: new User({
          username: 'some username',
          email: 'some email',
        }),
      });
      const err = activity.validateSync();
      expect(err.errors.board).toBeDefined();
    });
  });

  describe('card field', () => {
    it('exists', () => {
      expect(activity.card).toBeDefined();
    });

    it('is of type CardSchema', () => {
      expect(activity.card).toBe(CardSchema);
    });
  });

  describe('mentions field', () => {
    it('exists', () => {
      expect(activity.mentions).toBeDefined();
    });

    it('is an Array of type UserSchema', () => {
      expect(activity.mentions).toBeInstanceOf(Array);
      expect(activity.mentions[0]).toBe(UserSchema);
    });
  });
});