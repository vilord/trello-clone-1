const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user').schema;
const emojiCodes = require('../constants/emoji-codes');

const Comment = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    emoji_reaction: {
      text_code: {
        type: String,
        enum: emojiCodes,
      },
      users: {
        type: [UserSchema],
        validate: {
          validator: x => x.length >= 1,
          message: 'Your emoji_reaction need at least one user',
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Comment', Comment);
