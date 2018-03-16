const Comment = require('../models/comment');
const Schema = require('mongoose').Schema;
const User = require('../models/user');

const emojiCodes = require('../constants/emoji-codes');

describe('Comment Model', () => {
  const comment = Comment.schema.obj;

  it('has timestap date', () => {
    const comment = Comment.schema.paths;
    expect(comment.createdAt).toBeDefined();
  });

  describe('user', () => {
    it('is of type UserSchema', () => {
      expect(comment.user.type).toBe(Schema.Types.ObjectId);
    });

    it('is a ref to User', () => {
      expect(comment.user.ref).toBe('User');
    });
  });

  describe('text', () => {
    it('is required', () => {
      const comment = new Comment();
      const err = comment.validateSync();
      expect(err.errors.text).toBeDefined();
    });

    it('is of type String', () => {
      expect(comment.text.type).toBe(String);
    });
  });

  describe('emoji_reaction', () => {
    describe('text_code', () => {
      it('fails with an invalid emojiCode', () => {
        const comment = new Comment({
          text: 'some comment',
          emoji_reaction: {
            text_code: 'invalid code',
          },
        });
        const err = comment.validateSync();
        expect(err.errors['emoji_reaction.text_code']).toBeDefined();
      });

      it('passes with a valid emojiCode', () => {
        const comment = new Comment({
          user: new User({
            username: 'pepito',
            email: 'pepito@perez.com',
          }),
          text: 'some comment',
          emoji_reaction: {
            text_code: emojiCodes[0],
            users: [
              new User({
                email: 'pepito@example.com',
                username: 'someone',
              }),
            ],
          },
        });
        const err = comment.validateSync();
        expect(err).toBeUndefined();
      });
    });

    describe('users', () => {
      const users = comment.emoji_reaction.users;
      it('is of type ObjectId', () => {
        expect(users.type[0].type).toBe(Schema.Types.ObjectId);
      });

      it('is of ref User', () => {
        expect(users.type[0].ref).toBe('User');
      });

      it('is required', () => {
        const comment = new Comment({
          text: 'some comment',
          emoji_reaction: {
            text_code: emojiCodes[0],
          },
        });
        const err = comment.validateSync();
        expect(err.errors['emoji_reaction.users']).toBeDefined();
      });
    });
  });
});
