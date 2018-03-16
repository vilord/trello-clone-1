const Activity = require('../models/activity');
const User = require('../models/user');
const { ObjectId } = require('mongoose').Schema.Types;

describe('Activity Model', () => {
  const activity = Activity.schema.obj;

  it('has timestap date', () => {
    const activity = Activity.schema.paths;
    expect(activity.createdAt).toBeDefined();
    expect(activity.updatedAt).toBeDefined();
  });

  describe('user', () => {
    it('is of type ObjectId', () => {
      expect(activity.user.type).toBe(ObjectId);
    });

    it('is of ref User', () => {
      expect(activity.user.ref).toEqual('User');
    });

    it('is required', () => {
      const activity = new Activity();
      const err = activity.validateSync();
      expect(err.errors.user).toBeDefined();
    });
  });

  describe('text', () => {
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

  describe('board', () => {
    it('is of type ObjectId', () => {
      expect(activity.board.type).toBe(ObjectId);
    });

    it('is of ref Board', () => {
      expect(activity.board.ref).toEqual('Board');
    });
  });

  describe('card', () => {
    it('is of type ObjectId', () => {
      expect(activity.card.type).toBe(ObjectId);
    });

    it('is of ref Card', () => {
      expect(activity.card.ref).toEqual('Card');
    });
  });

  describe('mentions', () => {
    it('is an Array', () => {
      expect(activity.mentions).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = activity.mentions[0];
      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref User', () => {
        expect(obj.ref).toEqual('User');
      });
    });
  });
});
