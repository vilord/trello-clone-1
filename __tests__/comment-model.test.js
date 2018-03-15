const Comment = require('../models/comment');
const User = require('../models/user');
const emojiCodes = require('../constants/emoji-codes');

// Schemas
const UserSchema = User.schema;

describe('Comment Model', () => {
  const comment = Comment.schema.obj;

  it('has timestap date', () => {
    const comment = Comment.schema.paths;
    expect(comment.createdAt).toBeDefined();
  });

  describe('user field', () => {
    it('exists', () => {
      expect(comment.user).toBeDefined();
    });

    it('is of type UserSchema', () => {
      expect(comment.user.type).toBe(UserSchema);
    });

    it('is required', () => {
      const comment = new Comment({
        text: 'some comment',
      });
      const err = comment.validateSync();
      expect(err.errors.user).toBeDefined();
    });
  });

  describe('text field', () => {
    it('exists', () => {
      expect(comment.text).toBeDefined();
    });

    it('is required', () => {
      const comment = new Comment();
      const err = comment.validateSync();
      expect(err.errors.text).toBeDefined();
    });

    it('is of type String', () => {
      expect(comment.text.type).toBe(String);
    });
  });

  describe('emoji_reaction field', () => {
    it('exists', () => {
      expect(comment.emoji_reaction).toBeDefined();
    });

    it('has text_code', () => {
      expect(comment.emoji_reaction.text_code).toBeDefined();
    });

    it('text_code must be one of the valid emojiCodes', () => {
      const comment = new Comment({
        text: 'some comment',
        emoji_reaction: {
          text_code: 'invalid code',
        },
      });
      const err = comment.validateSync();
      expect(err.errors['emoji_reaction.text_code']).toBeDefined();
    });

    it('text_code passes with a valid emojiCode', () => {
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
              email: 'some email',
              username: 'some username',
            }),
          ],
        },
      });
      const err = comment.validateSync();
      expect(err).toBeUndefined();
    });

    it('has users', () => {
      expect(comment.emoji_reaction.users).toBeDefined();
    });

    it('users is required', () => {
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
